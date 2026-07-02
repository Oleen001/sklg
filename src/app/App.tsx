"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SkillBuilderPage from "./pages/SkillBuilderPage";
import SkillDashboardPage from "./pages/SkillDashboardPage";
import SkillOpportunitiesPage from "./pages/SkillOpportunitiesPage";
import ProfilePage from "./pages/ProfilePage";
import RiasecPage from "./pages/RiasecPage";
import SkillTrendsRoutePage from "./pages/SkillTrendsRoutePage";
import ResponsiveNavbar from "./ResponsiveNavbar";
import ResponsiveFooter from "./ResponsiveFooter";
import { currentUserProfile } from "./mock-api/profile";
import { getRouteByPath, isHomeRouteKey, type AppRouteKey } from "./routes";

const DESIGN_WIDTH  = 1180;
const HOME_HEIGHT   = 3200;
const TRENDS_HEIGHT = 1498;
const SKILL_SCAN_HEIGHT = 1220;
const SKILL_BUILDER_HEIGHT = 3820;
const MOCK_AUTH_STORAGE_KEY = "skillogy_mock_logged_in";

type Page = AppRouteKey;

/* Hide the original Figma-embedded Navbar/Footer — routing + chrome now live
   in the React ResponsiveNavbar/Footer rendered outside the scaled body.
   The markup stays in place so the animation layer's selectors don't break. */
const CHROME_HIDE_CSS = `[data-name="Navbar"], [data-name="Footer"] { display: none !important; }`;

/* ═══════════════════════════════════════════════════════════
   STAR ROTATION — scroll-driven + timed auto-spin
   • 100 vh scroll  = 360° (1 full rotation) at mult = 1
   • Every 18 s each star auto-spins gently, fast→slow (easeOut³)
   • CSS `rotate` property — additive with existing `transform`
═══════════════════════════════════════════════════════════ */
const STAR_MULTS = [0.6, 1.0, 1.5, 0.8, 1.3, 0.5, 2.0, 0.9, 1.4, 0.7, 1.8, 1.1, 1.3, 1.6, 0.75];
const STAR_DIRS: (1 | -1)[] = [1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1];
const STAR_SPIN_DEGS = [120, 160, 220, 260, 320, 360];
const SPIN_DURS  = [2600, 3000, 3400, 3800, 4200, 4600];

const DECORATIVE_SPIN_VIEWBOXES = new Set([
  "0 0 12 12",
  "0 0 13.0331 13",
  "0 0 14 14",
  "0 0 20.2044 20.2019",
  "0 0 21.8067 22.7154",
  "0 0 29 30",
  "0 0 30.0765 29",
  "0 0 36 35",
  "0 0 38.3138 36.8565",
  "0 0 39 39",
  "0 0 39.0534 39.941",
  "0 0 40.7623 41.0807",
  "0 0 43.0904 41.5514",
  "0 0 49.9878 49.1428",
  "0 0 54.6787 52.7259",
  "0 0 56.4756 56.4746",
  "0 0 60.0583 61.4233",
  "0 0 64.6546 64.6342",
  "0 0 72 72",
]);

function isDecorativeSpinTarget(el: HTMLElement) {
  if (el.closest("[data-spin-decoration=\"false\"]")) return false;
  if (el.matches("[data-spin-decoration=\"true\"]")) return true;
  if (el.querySelector("img, p, span, button, input, a")) return false;
  if (!isInDecorativeSpinRegion(el)) return false;

  const svg = el.querySelector("svg");
  if (!svg) return false;

  const r = el.getBoundingClientRect();
  if (r.width < 5 || r.width > 110 || r.height < 5 || r.height > 110) return false;

  const viewBox = svg.getAttribute("viewBox")?.trim() ?? "";
  return DECORATIVE_SPIN_VIEWBOXES.has(viewBox);
}

function getDataNameChain(el: HTMLElement) {
  const names: string[] = [];
  let node: HTMLElement | null = el;
  while (node && node !== document.body && names.length < 8) {
    if (node.dataset.name) names.push(node.dataset.name);
    node = node.parentElement;
  }
  return names;
}

function isInDecorativeSpinRegion(el: HTMLElement) {
  const names = getDataNameChain(el);
  if (names.includes("Industry Section") || names.includes("Industry Card")) return false;
  if (names.includes("Header Section") || names.includes("Summary Section")) return true;
  if (names[0] === "Homepage") return true;
  if (names.includes("Skill Trends")) return true;
  return false;
}

/* ─── Homepage animations ─── */
const HOME_STYLES = `
  @keyframes sk-float {
    0%, 100% { transform: translateY(0px);   }
    50%       { transform: translateY(-14px); }
  }
  @keyframes sk-float-sm {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes sk-pulse-scale {
    0%, 100% { transform: scale(1);    }
    50%       { transform: scale(1.04); }
  }

  [data-name="The Champion"]         { animation: sk-float 3s ease-in-out infinite; }
  [data-name="Icon Group Container"] { animation: sk-float 3.5s ease-in-out infinite 0.4s; }
  [data-name="Mask Group Container"] { animation: sk-float-sm 3.2s ease-in-out infinite 0.8s; }
  [data-name="R animate"] { animation: sk-float 2.8s ease-in-out infinite 0s; }
  [data-name="I animate"] { animation: sk-float 2.8s ease-in-out infinite 0.15s; }
  [data-name="A animate"] { animation: sk-float 2.8s ease-in-out infinite 0.3s; }
  [data-name="S animate"] { animation: sk-float 2.8s ease-in-out infinite 0.05s; }
  [data-name="E animate"] { animation: sk-float 2.8s ease-in-out infinite 0.2s; }
  [data-name="C animate"] { animation: sk-float 2.8s ease-in-out infinite 0.35s; }
  [data-name="Summary Section"] [data-name="The Champion"] {
    animation: sk-pulse-scale 3s ease-in-out infinite;
  }

  @media (max-width: 900px) {
    [data-name="Homepage"] [data-name="Header Section"] {
      transform: translateY(40px);
    }
  }

  @media (max-width: 600px) {
    [data-name="Homepage"] [data-name="Header Section"] {
      transform: translateY(180px);
    }
  }

  .sk-hero-mascot {
    z-index: 4;
    --mascot-look-x: 0px;
    --mascot-look-y: 0px;
    animation: sk-float 3.3s ease-in-out infinite;
  }
  .sk-hero-mascot[aria-label^="The Champion"] {
    animation-duration: 3s;
  }
  .sk-hero-mascot[aria-label^="The Challenger"] {
    animation-duration: 3.5s;
    animation-delay: 0.4s;
  }
  .sk-hero-mascot[aria-label^="The Explorer"] {
    animation-duration: 3.2s;
    animation-delay: 0.8s;
  }

  .sk-work-card {
    position: absolute;
    display: block;
    overflow: hidden;
    border: 0;
    border-radius: 16px;
    padding: 0;
    background: var(--work-card-bg);
    color: var(--work-card-text);
    cursor: pointer;
    isolation: isolate;
    font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif;
  }
  .sk-work-card-face {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .sk-work-card-front {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding-top: 40px;
    transition: opacity 360ms cubic-bezier(0.16, 1, 0.3, 1), transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .sk-work-card-icon {
    width: 150px;
    height: 150px;
    object-fit: contain;
  }
  .sk-work-card-copy {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    text-align: center;
    line-height: 1;
  }
  .sk-work-card-title {
    margin: 0;
    font-size: 32px;
    font-weight: 600;
    line-height: 36px;
  }
  .sk-work-card-body {
    margin: 0;
    font-size: 20px;
    font-weight: 400;
    line-height: normal;
  }
  .sk-work-card-peek {
    position: absolute;
    bottom: -8px;
    left: 50%;
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: var(--work-card-circle);
    opacity: 0.34;
    transform: translateX(-50%);
  }
  .sk-work-card-back {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 300ms ease, transform 460ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .sk-work-card-helper {
    position: absolute;
    top: 74px;
    left: 0;
    right: 0;
    z-index: 3;
    margin: 0;
    padding: 0 24px;
    color: var(--work-card-text);
    font-size: 16px;
    font-weight: 400;
    line-height: 36px;
    text-align: center;
  }
  .sk-work-card-circle {
    position: absolute;
    left: 50%;
    bottom: -375px;
    z-index: 1;
    width: 740px;
    height: 740px;
    border-radius: 999px;
    background: var(--work-card-circle);
    transform: translateX(-50%) translateY(96px) scale(0.04);
    transform-origin: 50% 100%;
    transition: transform 620ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .sk-work-card-character {
    position: absolute;
    z-index: 2;
    display: block;
  }
  .sk-work-card-character-explorer {
    left: -75px;
    top: 136px;
    width: 445px;
    height: 445px;
  }
  .sk-work-card-character-challenger {
    left: 24px;
    top: 140px;
    width: 445px;
    height: 445px;
  }
  .sk-work-card-character-champion {
    left: -48px;
    top: 120px;
    width: 445px;
    height: 445px;
  }
  .sk-work-card:hover .sk-work-card-front,
  .sk-work-card:focus-visible .sk-work-card-front,
  .sk-work-card[data-active="true"] .sk-work-card-front {
    opacity: 0;
    transform: translateY(-18px) scale(0.96);
  }
  .sk-work-card:hover .sk-work-card-back,
  .sk-work-card:focus-visible .sk-work-card-back,
  .sk-work-card[data-active="true"] .sk-work-card-back {
    opacity: 1;
    transform: translateY(0);
  }
  .sk-work-card:hover .sk-work-card-circle,
  .sk-work-card:focus-visible .sk-work-card-circle,
  .sk-work-card[data-active="true"] .sk-work-card-circle {
    transform: translateX(-50%) translateY(0) scale(1);
  }
  /* Hero text letter-by-letter */
  @keyframes hero-char-in {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .hero-char {
    display: inline-block;
    vertical-align: top;
    animation: hero-char-in 0.38s cubic-bezier(0.16, 1, 0.3, 1) both;
    white-space: pre;
  }

  /* 3-D card flip */
  .sk-flip-overlay { position: absolute; perspective: 900px; cursor: pointer; z-index: 6; }
  .sk-flip-inner {
    width: 100%; height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  .sk-flip-overlay:hover:not(.flipped) .sk-flip-inner { transform: rotateY(12deg); }
  .sk-flip-overlay.flipped .sk-flip-inner { transform: rotateY(180deg); }
  .sk-flip-front, .sk-flip-back {
    position: absolute; width: 100%; height: 100%;
    backface-visibility: hidden; -webkit-backface-visibility: hidden;
    border-radius: 12px;
  }
  .sk-flip-front { background: transparent; }
  .sk-flip-back  { transform: rotateY(180deg); display: flex; flex-direction: column;
                   align-items: center; justify-content: center; padding: 28px;
                   box-sizing: border-box; gap: 12px; }
  .sk-flip-hint {
    position: absolute; bottom: 10px; right: 12px;
    font-size: 20px; opacity: 0.5; user-select: none;
  }

  /* Scroll-reveal helpers */
  .sk-up {
    opacity: 0; transform: translateY(52px);
    transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1);
    will-change: opacity, transform;
  }
  .sk-left {
    opacity: 0; transform: translateX(-60px);
    transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1);
    will-change: opacity, transform;
  }
  .sk-right {
    opacity: 0; transform: translateX(60px);
    transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1);
    will-change: opacity, transform;
  }
  .sk-up.sk-in, .sk-left.sk-in, .sk-right.sk-in { opacity: 1; transform: none; }

  @media (prefers-reduced-motion: reduce) {
    [data-name="The Champion"], .sk-hero-mascot, .sk-work-card, [data-name="Icon Group Container"], [data-name="Mask Group Container"],
    [data-name="R animate"], [data-name="I animate"], [data-name="A animate"],
    [data-name="S animate"], [data-name="E animate"], [data-name="C animate"] { animation: none; }
    .sk-work-card-front, .sk-work-card-back, .sk-work-card-circle, .sk-work-card-character {
      transition: none !important;
    }
    .sk-up, .sk-left, .sk-right { transition: none; opacity: 1; transform: none; }
    .hero-char { animation: none !important; opacity: 1 !important; transform: none !important; }
  }
`;

type HomeReveal = {
  selector: string;
  cls: "sk-up" | "sk-left" | "sk-right";
  delay?: number;
  stagger?: number;
};

const HOME_REVEALS: readonly HomeReveal[] = [
  { selector: "[data-name=\"Header Section\"]",               cls: "sk-up",    delay: 0.1  },
  { selector: "[data-name=\"Discover Background\"]",          cls: "sk-up",    stagger: 0.12 },
  { selector: "[data-name=\"Plan Background\"]",              cls: "sk-up",    delay: 0.12 },
  { selector: "[data-name=\"Test Course Container\"]",        cls: "sk-left",  delay: 0    },
  { selector: "[data-name=\"Vector Container Inner\"]",       cls: "sk-right", delay: 0.15 },
  { selector: "[data-name=\"Career Plan Container\"]",        cls: "sk-right", delay: 0    },
  { selector: "[data-name=\"Icon Group Container\"]",         cls: "sk-left",  delay: 0.1  },
  { selector: "[data-name=\"Guide Text Container\"]",         cls: "sk-up",    delay: 0    },
  { selector: "[data-name=\"Plan Text Container\"]",          cls: "sk-up",    delay: 0.1  },
  { selector: "[data-name=\"Summary Section\"]",              cls: "sk-up",    delay: 0    },
  { selector: "[data-name=\"Ads Background\"]",               cls: "sk-up",    delay: 0    },
  { selector: "[data-name=\"Skill Course Container\"]",       cls: "sk-right", delay: 0    },
  { selector: "[data-name=\"Certification Text Container\"]", cls: "sk-up",    delay: 0.1  },
] as const;

const FLIP_CARD_DATA = [
  { left: 108, top: 793, w: 294, h: 342, text: "รู้จักตัวเองก่อน\nเลือกทางได้ถูก",          bg: "#2b7db8", color: "white"   },
  { left: 443, top: 793, w: 294, h: 342, text: "รู้ว่าขาดอะไร\nแล้วเติมให้ครบ",             bg: "#ffe040", color: "#1b3a5c" },
  { left: 778, top: 793, w: 294, h: 342, text: "ลงมือทำ\nเปลี่ยน skill\nเป็นของจริง",        bg: "#db475f", color: "white"   },
] as const;

const LEGACY_BACKGROUND_BANDS = {
  home: [
    { top: 0, height: 656, color: "#eff4f9" },
    { top: 1227, height: 470, color: "#c6ebfe" },
    { top: 2115, height: 566, color: "#1b3476" },
  ],
  "skill-trends": [
    { top: 0, height: 440, color: "#1560b3" },
    { top: 440, height: TRENDS_HEIGHT - 440, color: "#dceeff" },
  ],
} satisfies Partial<Record<Page, readonly { top: number; height: number; color: string }[]>>;

/* ─── Helpers ─── */
const easeOut3 = (t: number) => 1 - Math.pow(1 - t, 3);

export default function App() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const route = useMemo(() => getRouteByPath(pathname), [pathname]);
  const page = route.key;
  const riasecResultId = useMemo(() => {
    const match = pathname.match(/^\/RIASEC\/test\/result\/([^/]+)$/);
    return match?.[1];
  }, [pathname]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authHydrated, setAuthHydrated] = useState(false);
  const [scale, setScale] = useState(1);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 1024px)").matches;
  });
  const [readyPage, setReadyPage] = useState<Page>(page);
  const requestedPage = useRef<Page>(page);
  const reduceMotion = useReducedMotion();
  requestedPage.current = page;

  const designHeight =
    route.kind === "home"          ? HOME_HEIGHT   :
    route.kind === "skill-trends"  ? TRENDS_HEIGHT :
    route.kind === "skill-builder" ? SKILL_BUILDER_HEIGHT :
    SKILL_SCAN_HEIGHT;

  const pageTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const };
  const isRiasecRoute = route.kind === "riasec" || route.kind === "riasec-test" || route.kind === "riasec-result" || route.kind === "riasec-history";
  const showChrome = route.kind !== "login" && !isRiasecRoute;

  const handleMockLogin = () => {
    window.localStorage.setItem(MOCK_AUTH_STORAGE_KEY, "true");
    setIsLoggedIn(true);
    setAuthHydrated(true);
  };

  const handleMockLogout = () => {
    window.localStorage.removeItem(MOCK_AUTH_STORAGE_KEY);
    setIsLoggedIn(false);
    setAuthHydrated(true);
  };

  const navigate = (path: string) => {
    router.push(path);
  };

  /* ── Responsive scale ── */
  useEffect(() => {
    setIsLoggedIn(window.localStorage.getItem(MOCK_AUTH_STORAGE_KEY) === "true");
    setAuthHydrated(true);
  }, []);

  useEffect(() => {
    const update = () => setScale(Math.min(1, window.innerWidth / DESIGN_WIDTH));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  /* ── Hide the original embedded Navbar/Footer (routing moved to React) ── */
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.id = "sk-chrome-hide";
    styleEl.textContent = CHROME_HIDE_CSS;
    document.head.appendChild(styleEl);
    return () => styleEl.remove();
  }, []);

  /* ══════════════════════════════════════════════════════════
     SCROLL-DRIVEN STAR ROTATION + 10-s TIMED AUTO-SPIN
  ══════════════════════════════════════════════════════════ */
  useEffect(() => {
    if (reduceMotion) return;

    type Star = {
      el: HTMLElement;
      mult: number;
      dir: 1 | -1;
      spinBase: number;   // accumulated degrees from past spins
      spinFrom: number;   // start of current active spin
      spinTo: number;     // target of current active spin
      spinT0: number;     // performance.now() when spin began (-1 = idle)
      spinDur: number;
    };

    const stars: Star[] = [];
    const VH = window.innerHeight;
    const BASE = 360 / VH; // deg per CSS pixel → 100 vh = 360°
    const useScrollRotation = window.innerWidth >= 1024;

    /* Collect decorative star elements */
    const collect = () => {
      stars.length = 0;
      document.querySelectorAll<HTMLElement>(".absolute").forEach((el) => {
        if (!isDecorativeSpinTarget(el)) return;
        const i = stars.length;
        stars.push({
          el,
          mult: STAR_MULTS[i % STAR_MULTS.length],
          dir: STAR_DIRS[i % STAR_DIRS.length],
          spinBase: 0, spinFrom: 0, spinTo: 0, spinT0: -1,
          spinDur: SPIN_DURS[i % SPIN_DURS.length],
        });
      });
    };

    let raf = 0;
    let prevSY = -1;
    const spinTids: ReturnType<typeof setTimeout>[] = [];

    /* Fire a timed spin for every decorative star (staggered) */
    const triggerSpin = () => {
      if (stars.length === 0) return;

      stars.forEach((s) => {
        const phase = Math.random() * 250;
        const spinDeg = STAR_SPIN_DEGS[Math.floor(Math.random() * STAR_SPIN_DEGS.length)];
        const tid = setTimeout(() => {
          s.spinFrom = s.spinBase;
          s.spinTo   = s.spinBase + spinDeg * (s.dir as number);
          s.spinT0   = performance.now();
          wake();
        }, phase);
        spinTids.push(tid);
      });
    };

    /* Wake the rAF loop if it has idled */
    const wake = () => {
      if (raf === 0) raf = requestAnimationFrame(tick);
    };

    const tick = (now: number) => {
      const sy = window.scrollY;
      const scrollChanged = useScrollRotation && sy !== prevSY;
      if (scrollChanged) prevSY = sy;

      let anySpinning = false;

      stars.forEach((s) => {
        const scrollDeg = useScrollRotation ? sy * BASE * s.mult * s.dir : 0;

        // Timed spin
        let spinDeg = s.spinBase;
        let spinning = false;
        if (s.spinT0 >= 0) {
          const elapsed = now - s.spinT0;
          if (elapsed >= s.spinDur) {
            s.spinBase = s.spinTo;
            s.spinT0   = -1;
            spinDeg    = s.spinBase;
          } else {
            spinDeg  = s.spinFrom + (s.spinTo - s.spinFrom) * easeOut3(elapsed / s.spinDur);
            spinning = true;
            anySpinning = true;
          }
        }

        if (scrollChanged || spinning) {
          s.el.style.rotate = `${scrollDeg + spinDeg}deg`;
        }
      });

      // Idle-pause: stop rescheduling when nothing is moving. Scroll/spin re-wakes.
      if (scrollChanged || anySpinning) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onScroll = () => wake();
    if (useScrollRotation) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // Collect + start loop
    let firstSpinTid: ReturnType<typeof setTimeout> | undefined;
    const initTid = setTimeout(() => {
      collect();
      raf = requestAnimationFrame(tick);
      // First auto-spin after 4 s, then every 18 s
      firstSpinTid = setTimeout(triggerSpin, 4000);
    }, 200);

    const spinInterval = setInterval(triggerSpin, 18000);

    return () => {
      clearTimeout(initTid);
      if (firstSpinTid) clearTimeout(firstSpinTid);
      spinTids.forEach(clearTimeout);
      clearInterval(spinInterval);
      if (useScrollRotation) {
        window.removeEventListener("scroll", onScroll);
      }
      if (raf !== 0) cancelAnimationFrame(raf);
      stars.forEach(({ el }) => { el.style.rotate = ""; });
    };
  }, [readyPage, reduceMotion]);

  /* ── Sticky section parallax: previous section drifts upward while the next one covers it ── */
  useEffect(() => {
    if (route.kind !== "home" || reduceMotion) return;

    type ParallaxTarget = {
      el: HTMLElement;
      section: HTMLElement;
      startY: number;
      speed: number;
      maxOffset: number;
    };

    let frame = 0;
    let targets: ParallaxTarget[] = [];
    const retryTids: ReturnType<typeof setTimeout>[] = [];

    const collect = () => {
      targets = Array.from(document.querySelectorAll<HTMLElement>("[data-sticky-parallax]"))
        .map((el) => {
          const section = el.closest("section");
          if (!(section instanceof HTMLElement)) return null;

          return {
            el,
            section,
            startY: section.getBoundingClientRect().top + window.scrollY,
            speed: Number(el.dataset.parallaxSpeed ?? 0.2),
            maxOffset: Number(el.dataset.parallaxMax ?? 160),
          };
        })
        .filter((target): target is ParallaxTarget => Boolean(target));
      document.documentElement.dataset.skStickyParallax = targets.length ? "active" : "waiting";
    };

    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight || 1;

      targets.forEach(({ el, startY, speed, maxOffset }) => {
        const progress = Math.min(Math.max((window.scrollY - startY) / viewportHeight, 0), 1.35);
        const y = -Math.min(progress * viewportHeight * speed, maxOffset);

        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
        el.dataset.parallaxY = y.toFixed(2);
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    const handleResize = () => {
      collect();
      requestUpdate();
    };

    const init = (attempt = 0) => {
      collect();
      update();
      if (targets.length === 0 && attempt < 20) {
        retryTids.push(setTimeout(() => init(attempt + 1), 100));
      }
    };

    const initTid = setTimeout(() => init(), 120);

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(initTid);
      retryTids.forEach(clearTimeout);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", handleResize);
      delete document.documentElement.dataset.skStickyParallax;
      targets.forEach(({ el }) => {
        el.style.transform = "";
        delete el.dataset.parallaxY;
      });
    };
  }, [route.kind, reduceMotion]);

  /* ── How Skillogy works: pinned scroll cards, one-by-one, then active state ── */
  useEffect(() => {
    if (route.kind !== "home" || reduceMotion) return;

    type WorkScrollTarget = {
      section: HTMLElement;
      cards: HTMLElement[];
      startY: number;
      scrollLength: number;
    };

    let frame = 0;
    let target: WorkScrollTarget | null = null;
    const retryTids: ReturnType<typeof setTimeout>[] = [];

    const collect = () => {
      const section = document.querySelector<HTMLElement>("[data-work-scroll-section]");
      const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-work-motion-card]"));

      if (!section || cards.length === 0) {
        target = null;
        document.documentElement.dataset.skWorkScroll = "waiting";
        return;
      }

      const viewportHeight = window.innerHeight || 1;
      target = {
        section,
        cards,
        startY: section.getBoundingClientRect().top + window.scrollY,
        scrollLength: Math.max(section.offsetHeight - viewportHeight, viewportHeight),
      };
      document.documentElement.dataset.skWorkScroll = "active";
    };

    const update = () => {
      frame = 0;
      if (!target) return;

      const progress = Math.min(Math.max((window.scrollY - target.startY) / target.scrollLength, 0), 1);
      const allActive = progress >= 0.76;
      const fromXs = [-180, 0, 180];
      const fromYs = [72, 96, 72];
      const fromRotates = [-6, 2, 6];

      target.cards.forEach((card, index) => {
        const start = 0.1 + index * 0.19;
        const end = start + 0.18;
        const local = Math.min(Math.max((progress - start) / (end - start), 0), 1);
        const eased = easeOut3(local);
        const x = (fromXs[index] ?? 0) * (1 - eased);
        const y = (fromYs[index] ?? 72) * (1 - eased);
        const rotate = (fromRotates[index] ?? 0) * (1 - eased);
        const scale = 0.94 + eased * 0.06;
        const isVisible = local > 0.02 || progress >= end;
        const isSettled = progress >= end + 0.02;
        const input = card.querySelector<HTMLInputElement>("input[type='checkbox']");

        card.style.opacity = `${Math.max(0, Math.min(1, eased))}`;
        card.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rotate.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        card.style.filter = `blur(${((1 - eased) * 10).toFixed(2)}px)`;
        card.style.pointerEvents = isVisible ? "auto" : "none";
        card.style.zIndex = `${10 + index}`;
        card.dataset.workScrollState = allActive ? "active" : isSettled ? "settled" : isVisible ? "entering" : "waiting";

        if (input) {
          input.checked = allActive;
        }
      });

      document.documentElement.dataset.skWorkProgress = progress.toFixed(3);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    const handleResize = () => {
      collect();
      requestUpdate();
    };

    const init = (attempt = 0) => {
      collect();
      update();
      if (!target && attempt < 20) {
        retryTids.push(setTimeout(() => init(attempt + 1), 100));
      }
    };

    const initTid = setTimeout(() => init(), 140);

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(initTid);
      retryTids.forEach(clearTimeout);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", handleResize);
      delete document.documentElement.dataset.skWorkScroll;
      delete document.documentElement.dataset.skWorkProgress;
      target?.cards.forEach((card) => {
        card.style.opacity = "";
        card.style.transform = "";
        card.style.filter = "";
        card.style.pointerEvents = "";
        card.style.zIndex = "";
        delete card.dataset.workScrollState;
        const input = card.querySelector<HTMLInputElement>("input[type='checkbox']");
        if (input) input.checked = false;
      });
    };
  }, [route.kind, reduceMotion]);

  /* ══════════════════════════════════════════════════════════
     HOMEPAGE: scroll-reveals + hero text + card flip
  ══════════════════════════════════════════════════════════ */
  useEffect(() => {
    if (!isHomeRouteKey(readyPage)) return;

    const styleEl = document.createElement("style");
    styleEl.id = "sk-home-anims";
    styleEl.textContent = HOME_STYLES;
    document.head.appendChild(styleEl);

    /* Scroll-reveal with IntersectionObserver */
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("sk-in"); io.unobserve(e.target); }
      }),
      { threshold: 0.07, rootMargin: "0px 0px -24px 0px" }
    );

    /* Hero text + card flip run after paint */
    const tid = setTimeout(() => {
      const preferStaticScroll = window.innerWidth < 1024 || window.matchMedia("(pointer: coarse)").matches;

      /* ── Scroll-reveal ── */
      HOME_REVEALS.forEach(({ selector, cls, stagger = 0, delay = 0 }) => {
        document.querySelectorAll(selector).forEach((el, i) => {
          if (el.classList.contains("sk-up") || el.classList.contains("sk-left") || el.classList.contains("sk-right")) return;
          if (preferStaticScroll) return;
          el.classList.add(cls);
          (el as HTMLElement).style.transitionDelay = `${delay + i * stagger}s`;
          io.observe(el);
        });
      });

      /* ── Hero text: letter-by-letter float-in ── */
      const seg = new Intl.Segmenter("th", { granularity: "grapheme" });
      let charIdx = 0;
      const CHAR_MS = 32;

      // Target the spans that hold the actual Thai text
      document.querySelectorAll<HTMLElement>(
        "[data-name=\"Header Section\"] span.leading-\\[69\\.973px\\]"
      ).forEach((span) => {
        const text = span.textContent ?? "";
        if (!text.trim() || span.querySelector(".hero-char")) return;
        const chars = [...seg.segment(text)].map((s) => s.segment);
        span.innerHTML = chars
          .map((ch) => {
            const d = charIdx++ * CHAR_MS;
            return `<span class="hero-char" style="animation-delay:${d}ms">${ch === " " ? "&nbsp;" : ch}</span>`;
          })
          .join("");
      });

      // Also animate the standalone <p> lines (blue + small)
      document.querySelectorAll<HTMLElement>(
        "[data-name=\"Header Section\"] .flex.flex-col > p"
      ).forEach((p) => {
        const text = p.textContent ?? "";
        if (!text.trim() || p.querySelector(".hero-char")) return;
        const chars = [...seg.segment(text)].map((s) => s.segment);
        p.innerHTML = chars
          .map((ch) => {
            const d = charIdx++ * CHAR_MS;
            return `<span class="hero-char" style="animation-delay:${d}ms">${ch === " " ? "&nbsp;" : ch}</span>`;
          })
          .join("");
      });

      document.querySelectorAll(".sk-flip-overlay").forEach((el) => el.remove());
    }, 80);

    return () => {
      clearTimeout(tid);
      io.disconnect();
      styleEl.remove();
      document.querySelectorAll(".sk-flip-overlay").forEach((el) => el.remove());
    };
  }, [readyPage]);

  const scaledWidth  = DESIGN_WIDTH * scale;
  const scaledHeight = designHeight * scale;
  const isLegacyScaledPage = isDesktop && route.kind === "skill-trends";
  const isNativeResponsivePage = !isLegacyScaledPage;
  const scaledPageFlex = route.kind === "skill-trends" ? "0 0 auto" : "1 0 auto";
  const legacyBackgroundBands = isLegacyScaledPage ? LEGACY_BACKGROUND_BANDS[page] ?? [] : [];

  const routedPage = (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={page}
        data-sk-page={page}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        transition={pageTransition}
        onAnimationComplete={() => {
          if (requestedPage.current === page) setReadyPage(page);
        }}
      >
        {route.kind === "home" ? <HomePage /> : null}
        {route.kind === "login" ? <LoginPage onLogin={handleMockLogin} onNavigate={navigate} /> : null}
        {route.kind === "skill-dashboard" ? <SkillDashboardPage /> : null}
        {route.kind === "skill-trends" ? <SkillTrendsRoutePage /> : null}
        {route.kind === "skill-builder" ? <SkillBuilderPage /> : null}
        {route.kind === "skill-opportunities" ? <SkillOpportunitiesPage /> : null}
        {route.kind === "profile" ? <ProfilePage profile={currentUserProfile} /> : null}
        {route.kind === "riasec" ? <RiasecPage view="landing" /> : null}
        {route.kind === "riasec-test" ? <RiasecPage view="test" /> : null}
        {route.kind === "riasec-result" ? <RiasecPage view="result" resultId={riasecResultId} /> : null}
        {route.kind === "riasec-history" ? <RiasecPage view="history" /> : null}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100dvh", background: "#fff" }}>
      {showChrome ? (
        <ResponsiveNavbar
          isLoggedIn={authHydrated && isLoggedIn}
          onLogout={handleMockLogout}
          profile={currentUserProfile}
        />
      ) : null}

      {isNativeResponsivePage ? (
        <div style={{ width: "100%", overflowX: "clip", background: "#eff4f9", flex: "1 0 auto", touchAction: "pan-y" }}>
          {routedPage}
        </div>
      ) : (
        <>
          {/* Scaled design body — centered horizontally; the outer box reserves the
              real (scaled) footprint so the sticky navbar + footer never overlap it. */}
          <div style={{ width: "100%", overflowX: "clip", background: "#fff", flex: scaledPageFlex, position: "relative", touchAction: "pan-y" }}>
            <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              {legacyBackgroundBands.map((band) => (
                <div
                  key={`${band.top}-${band.height}-${band.color}`}
                  style={{
                    position: "absolute",
                    top: band.top * scale,
                    left: 0,
                    width: "100%",
                    height: band.height * scale,
                    background: band.color,
                  }}
                />
              ))}
            </div>
            <div style={{ width: scaledWidth, height: scaledHeight, margin: "0 auto", position: "relative" }}>
              <div
                style={{
                  width: DESIGN_WIDTH,
                  minHeight: designHeight,
                  transformOrigin: "top left",
                  transform: `scale(${scale})`,
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                {routedPage}
              </div>
            </div>
          </div>
        </>
      )}

      {showChrome ? <ResponsiveFooter /> : null}
    </div>
  );
}

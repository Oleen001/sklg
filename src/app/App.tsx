import { useEffect, useState } from "react";
import Homepage from "@/imports/Homepage/index";
import SkillTrendsPage from "./SkillTrendsPage";
import CareerExplorePage from "./CareerExplorePage";

const DESIGN_WIDTH  = 1180;
const HOME_HEIGHT   = 3200;
const TRENDS_HEIGHT = 1850;
const CAREER_HEIGHT = 1950;

type Page = "home" | "skill-trends" | "skill-dashboard";

/* ─── Nav routing ─── */
const NAV_ROUTES: Record<string, Page> = {
  "Skill Trends":        "skill-trends",
  "Skill Dashboard":     "skill-dashboard",
  "Skill Builder":       "home",
  "Skill Opportunities": "home",
};

/* ═══════════════════════════════════════════════════════════
   STAR ROTATION — scroll-driven + timed auto-spin
   • 100 vh scroll  = 720° (2 full rotations) at mult = 1
   • Every 10 s each star auto-spins 720°, fast→slow (easeOut³)
   • CSS `rotate` property — additive with existing `transform`
═══════════════════════════════════════════════════════════ */
const STAR_MULTS = [0.6, 1.0, 1.5, 0.8, 1.3, 0.5, 2.0, 0.9, 1.4, 0.7, 1.8, 1.1, 1.3, 1.6, 0.75];
const STAR_DIRS: (1 | -1)[] = [1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1];
const SPIN_DURS  = [1400, 1100, 1700, 1200, 1600, 1000, 1800, 1300, 1500, 1050];

const STAR_SKIP = [
  "[data-name=\"Navbar\"]",
  "[data-name=\"Footer\"]",
  "[data-name=\"General\"]",
  "[data-name=\"Animated Group Container\"]",
  "[data-name=\"Icon Group Container\"]",
  "[data-name=\"Mask Group Container\"]",
  "[data-name=\"Industry Section\"]",
  "[data-name=\"Industry Card\"]",
  "[data-motion-wrapper-for]",
  ".ce-ellipse2",
];

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

  [data-name="Sunny-A"]              { animation: sk-float 3s ease-in-out infinite; }
  [data-name="Icon Group Container"] { animation: sk-float 3.5s ease-in-out infinite 0.4s; }
  [data-name="Mask Group Container"] { animation: sk-float-sm 3.2s ease-in-out infinite 0.8s; }
  [data-name="R animate"] { animation: sk-float 2.8s ease-in-out infinite 0s; }
  [data-name="I animate"] { animation: sk-float 2.8s ease-in-out infinite 0.15s; }
  [data-name="A animate"] { animation: sk-float 2.8s ease-in-out infinite 0.3s; }
  [data-name="S animate"] { animation: sk-float 2.8s ease-in-out infinite 0.05s; }
  [data-name="E animate"] { animation: sk-float 2.8s ease-in-out infinite 0.2s; }
  [data-name="C animate"] { animation: sk-float 2.8s ease-in-out infinite 0.35s; }
  [data-name="Summary Section"] [data-name="Sunny-A"] {
    animation: sk-pulse-scale 3s ease-in-out infinite;
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
    [data-name="Sunny-A"], [data-name="Icon Group Container"], [data-name="Mask Group Container"],
    [data-name="R animate"], [data-name="I animate"], [data-name="A animate"],
    [data-name="S animate"], [data-name="E animate"], [data-name="C animate"] { animation: none; }
    .sk-up, .sk-left, .sk-right { transition: none; opacity: 1; transform: none; }
    .hero-char { animation: none !important; opacity: 1 !important; transform: none !important; }
  }
`;

const HOME_REVEALS = [
  { selector: "[data-name=\"Navbar\"]",                       cls: "sk-up",    delay: 0    },
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
  { selector: "[data-name=\"Footer\"]",                       cls: "sk-up",    delay: 0    },
] as const;

const FLIP_CARD_DATA = [
  { left: 108, top: 793, w: 294, h: 342, text: "รู้จักตัวเองก่อน\nเลือกทางได้ถูก",          bg: "#2b7db8", color: "white"   },
  { left: 443, top: 793, w: 294, h: 342, text: "รู้ว่าขาดอะไร\nแล้วเติมให้ครบ",             bg: "#ffe040", color: "#1b3a5c" },
  { left: 778, top: 793, w: 294, h: 342, text: "ลงมือทำ\nเปลี่ยน skill\nเป็นของจริง",        bg: "#db475f", color: "white"   },
] as const;

/* ─── Helpers ─── */
const easeOut3 = (t: number) => 1 - Math.pow(1 - t, 3);

export default function App() {
  const [page, setPage]   = useState<Page>("home");
  const [scale, setScale] = useState(1);

  const designHeight =
    page === "home"          ? HOME_HEIGHT   :
    page === "skill-trends"  ? TRENDS_HEIGHT :
    CAREER_HEIGHT;

  /* ── Responsive scale ── */
  useEffect(() => {
    const update = () => setScale(Math.min(1, window.innerWidth / DESIGN_WIDTH));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── Navbar click routing ── */
  useEffect(() => {
    const tid = setTimeout(() => {
      document.querySelectorAll<HTMLElement>("[data-name=\"Nav-menu\"]").forEach((el) => {
        const label = el.textContent?.trim() ?? "";
        const target = NAV_ROUTES[label];
        if (!target) return;
        el.style.cursor = "pointer";
        el.style.userSelect = "none";
        el.style.fontWeight = target === page ? "700" : "";
        el.style.borderBottom = target === page ? "2px solid #0d6ec8" : "";
        el.addEventListener("click", () => setPage(target));
      });
      document.querySelectorAll("[data-name=\"Navbar Content\"] > div > p").forEach((p) => {
        (p as HTMLElement).style.cursor = "pointer";
        p.addEventListener("click", () => setPage("home"));
      });
    }, 120);
    return () => clearTimeout(tid);
  }, [page]);

  /* ══════════════════════════════════════════════════════════
     SCROLL-DRIVEN STAR ROTATION + 10-s TIMED AUTO-SPIN
  ══════════════════════════════════════════════════════════ */
  useEffect(() => {
    type Star = {
      el: HTMLElement;
      mult: number;
      dir: 1 | -1;
      spinBase: number;   // accumulated degrees from past spins
      spinFrom: number;   // start of current active spin
      spinTo: number;     // target of current active spin
      spinT0: number;     // performance.now() when spin began (-1 = idle)
      spinDur: number;
      phase: number;      // stagger delay (ms)
    };

    const stars: Star[] = [];
    const VH = window.innerHeight;
    const BASE = 720 / VH; // deg per CSS pixel → 100 vh = 720°

    /* Collect decorative star elements */
    const collect = () => {
      stars.length = 0;
      document.querySelectorAll<HTMLElement>(".absolute").forEach((el) => {
        if (!el.querySelector("svg")) return;
        if (el.querySelector("img, p, span, button, input, a")) return;
        if (STAR_SKIP.some((s) => el.closest(s))) return;
        const r = el.getBoundingClientRect();
        if (r.width < 5 || r.width > 110 || r.height < 5 || r.height > 110) return;
        const i = stars.length;
        stars.push({
          el,
          mult: STAR_MULTS[i % STAR_MULTS.length],
          dir: STAR_DIRS[i % STAR_DIRS.length],
          spinBase: 0, spinFrom: 0, spinTo: 0, spinT0: -1,
          spinDur: SPIN_DURS[i % SPIN_DURS.length],
          phase: Math.random() * 250,
        });
      });
    };

    /* Fire a timed spin for every star (staggered) */
    const triggerSpin = () => {
      stars.forEach((s) => {
        setTimeout(() => {
          s.spinFrom = s.spinBase;
          s.spinTo   = s.spinBase + 720 * (s.dir as number);
          s.spinT0   = performance.now();
        }, s.phase);
      });
    };

    let raf = 0;
    let prevSY = -1;

    const tick = (now: number) => {
      const sy = window.scrollY;
      const scrollChanged = sy !== prevSY;
      if (scrollChanged) prevSY = sy;

      stars.forEach((s) => {
        const scrollDeg = sy * BASE * s.mult * s.dir;

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
          }
        }

        if (scrollChanged || spinning) {
          s.el.style.rotate = `${scrollDeg + spinDeg}deg`;
        }
      });

      raf = requestAnimationFrame(tick);
    };

    // Collect + start loop
    const initTid = setTimeout(() => {
      collect();
      raf = requestAnimationFrame(tick);
      // First auto-spin after 2 s, then every 10 s
      setTimeout(triggerSpin, 2000);
    }, 200);

    const spinInterval = setInterval(triggerSpin, 10000);

    return () => {
      clearTimeout(initTid);
      clearInterval(spinInterval);
      cancelAnimationFrame(raf);
      stars.forEach(({ el }) => { el.style.rotate = ""; });
    };
  }, [page]);

  /* ══════════════════════════════════════════════════════════
     HOMEPAGE: scroll-reveals + hero text + card flip
  ══════════════════════════════════════════════════════════ */
  useEffect(() => {
    if (page !== "home") return;

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
      /* ── Scroll-reveal ── */
      HOME_REVEALS.forEach(({ selector, cls, stagger = 0, delay = 0 }) => {
        document.querySelectorAll(selector).forEach((el, i) => {
          if (el.classList.contains("sk-up") || el.classList.contains("sk-left") || el.classList.contains("sk-right")) return;
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
        if (!text.trim()) return;
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

      /* ── How Skillogy Works — 3D flip cards ── */
      const homepage = document.querySelector("[data-name=\"Homepage\"]");
      if (!homepage) return;

      // Remove previously injected overlays on hot-reload
      document.querySelectorAll(".sk-flip-overlay").forEach((el) => el.remove());

      FLIP_CARD_DATA.forEach(({ left, top, w, h, text, bg, color }, idx) => {
        const overlay = document.createElement("div");
        overlay.className = "sk-flip-overlay";
        Object.assign(overlay.style, {
          left: `${left}px`, top: `${top}px`,
          width: `${w}px`,   height: `${h}px`,
        });

        const inner = document.createElement("div");
        inner.className = "sk-flip-inner";

        /* Front face — transparent so original card shows through */
        const front = document.createElement("div");
        front.className = "sk-flip-front";

        /* Hint icon on front */
        const hint = document.createElement("span");
        hint.className = "sk-flip-hint";
        hint.textContent = "↺";
        front.appendChild(hint);

        /* Back face — colored with text */
        const back = document.createElement("div");
        back.className = "sk-flip-back";
        back.style.background = bg;
        back.innerHTML = `<p style="font-family:'Noto Sans Thai',sans-serif;font-size:26px;font-weight:700;color:${color};text-align:center;line-height:1.5;margin:0;">${text.replace(/\n/g, "<br>")}</p>`;

        inner.appendChild(front);
        inner.appendChild(back);
        overlay.appendChild(inner);

        /* Click to toggle flip */
        overlay.addEventListener("click", () => {
          overlay.classList.toggle("flipped");
        });

        homepage.appendChild(overlay);
      });
    }, 80);

    return () => {
      clearTimeout(tid);
      io.disconnect();
      styleEl.remove();
      document.querySelectorAll(".sk-flip-overlay").forEach((el) => el.remove());
    };
  }, [page]);

  return (
    <div style={{ width: "100%", height: designHeight * scale, overflowX: "hidden", background: "#fff" }}>
      <div style={{ width: DESIGN_WIDTH, minHeight: designHeight, transformOrigin: "top left", transform: `scale(${scale})` }}>
        {page === "home" ? (
          <Homepage />
        ) : page === "skill-trends" ? (
          <SkillTrendsPage />
        ) : (
          <CareerExplorePage />
        )}
      </div>
    </div>
  );
}

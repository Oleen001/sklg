import { useEffect, useRef, useState } from "react";
import SkillTrends from "@/imports/SkillTrends/index";
import svgPaths from "@/imports/SkillTrends/svg-79qsf1o8t9";
import SkillTrendsMobilePage from "./pages/SkillTrendsMobilePage";
import HeroMascot from "./components/HeroMascot";
import explorerIdleSvg from "@/assets/characters/new-3/the-explorer-idle.svg?raw";

const DESKTOP_QUERY = "(min-width: 1024px)";

function getIsDesktop() {
  if (typeof window === "undefined") return true;
  return window.matchMedia(DESKTOP_QUERY).matches;
}

/* ─────────────────────────────────────────────────────────────
   Animations for the Skill Trends page

   Additional animations: float for both mascot characters,
   staggered card reveals on scroll, and a slow 2D physics
   background magnifier that follows the pointer.
───────────────────────────────────────────────────────────── */
const STYLES = `
  /* Gentle vertical float for both mascot groups */
  @keyframes st-float {
    0%, 100% { transform: translateY(0px);  }
    50%       { transform: translateY(-16px); }
  }
  @keyframes st-float-sm {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }

  #st-root {
    isolation: isolate;
    position: relative;
  }

  #st-root [data-motion-wrapper-for="7:650"] {
    display: none !important;
  }

  .st-static-mascot-hidden {
    display: none !important;
  }

  .st-header-motion-field {
    height: 440px;
    left: 50%;
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    width: min(100%, 1180px);
    z-index: 1;
  }

  .st-bg-magnifier {
    height: clamp(180px, 24vw, 320px);
    left: 0;
    opacity: 0.3;
    pointer-events: none;
    position: absolute;
    top: 0;
    transform: translate3d(820px, 46px, 0) rotate(-10deg);
    transform-origin: 50% 50%;
    width: clamp(180px, 24vw, 320px);
    will-change: transform;
    z-index: 1;
  }

  .st-bg-magnifier svg {
    display: block;
    height: 100%;
    width: 100%;
  }

  .st-explorer-hero {
    height: 348px;
    left: calc(50% + 84px);
    top: 62px;
    width: 480px;
    z-index: 2;
  }

  #st-root [data-name="Navbar"],
  #st-root [data-name="Section Description"],
  #st-root [data-name="Industry Section Description"],
  #st-root [data-name="Industry Card"],
  #st-root [data-name="Footer"] {
    z-index: 2;
  }

  /* Large goggles mascot (Group2, header right side) */
  .st-float-large {
    animation: st-float 3.5s ease-in-out infinite 0.3s;
    z-index: 2;
  }

  /* Small goggles mascot (Group3, bottom of industry section) */
  .st-float-small {
    animation: st-float-sm 3.2s ease-in-out infinite 0.7s;
    pointer-events: none;
    z-index: 6;
  }

  /* ── Scroll-reveal states ── */
  .st-up {
    opacity: 0;
    transform: translateY(48px);
    transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                transform  0.85s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
  }
  .st-left {
    opacity: 0;
    transform: translateX(-56px) translateY(var(--st-safe-offset-y, 0px));
    transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                transform  0.85s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
  }
  .st-right {
    opacity: 0;
    transform: translateX(56px);
    transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                transform  0.85s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
  }
  .st-up.st-in,
  .st-right.st-in {
    opacity: 1;
    transform: none;
  }
  .st-left.st-in {
    opacity: 1;
    transform: translateY(var(--st-safe-offset-y, 0px));
  }

  #st-root [data-name="Industry Card"].sk-press-tilt-card {
    --sk-tilt-x: 2deg;
    --sk-tilt-y: -2deg;
    --sk-press-y: 3px;
    transform-origin: 50% 55%;
    transform-style: preserve-3d;
    transition:
      opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.55s cubic-bezier(0.16, 1, 0.3, 1),
      box-shadow 160ms cubic-bezier(0.16, 1, 0.3, 1),
      filter 160ms cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
  }

  #st-root [data-name="Industry Card"].sk-press-tilt-card.st-tilt-ready {
    transition:
      transform 160ms cubic-bezier(0.16, 1, 0.3, 1),
      box-shadow 160ms cubic-bezier(0.16, 1, 0.3, 1),
      filter 160ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  #st-root [data-name="Industry Card"].sk-press-tilt-card.st-tilt-ready:hover,
  #st-root [data-name="Industry Card"].sk-press-tilt-card.st-tilt-ready:focus-within {
    filter: saturate(1.02);
    transform:
      perspective(900px)
      translate3d(0, var(--sk-press-y), 0)
      rotateX(var(--sk-tilt-x))
      rotateY(var(--sk-tilt-y))
      scale(0.992);
    z-index: 3;
  }

  #st-root [data-name="Industry Card"].sk-press-tilt-card.st-tilt-ready:active {
    transform:
      perspective(900px)
      translate3d(0, calc(var(--sk-press-y) + 2px), 0)
      rotateX(calc(var(--sk-tilt-x) * 1.15))
      rotateY(calc(var(--sk-tilt-y) * 1.15))
      scale(0.985);
  }

  #st-root [data-name="Section Description"] {
    --st-safe-offset-y: 0px;
  }

  @media (max-width: 900px) {
    #st-root [data-name="Section Description"] {
      --st-safe-offset-y: 56px;
    }
  }

  @media (max-width: 600px) {
    #st-root [data-name="Section Description"] {
      --st-safe-offset-y: 160px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .st-float-large,
    .st-float-small { animation: none; }
    .st-bg-magnifier {
      transform: translate3d(820px, 46px, 0) rotate(-10deg);
    }
    .st-up, .st-left, .st-right {
      transition: none;
      opacity: 1;
      transform: translateY(var(--st-safe-offset-y, 0px));
    }
    #st-root [data-name="Industry Card"].sk-press-tilt-card,
    #st-root [data-name="Industry Card"].sk-press-tilt-card.st-tilt-ready,
    #st-root [data-name="Industry Card"].sk-press-tilt-card.st-tilt-ready:hover,
    #st-root [data-name="Industry Card"].sk-press-tilt-card.st-tilt-ready:focus-within,
    #st-root [data-name="Industry Card"].sk-press-tilt-card.st-tilt-ready:active {
      filter: none;
      transform: none;
      transition: none;
    }
  }
`;

/* ══════════════════════════════════════════════════
   PARALLAX — images inside Industry Cards move at
   different rates as the user scrolls. Each card gets
   a unique factor (slower = deeper parallax feel).
══════════════════════════════════════════════════ */
const PARALLAX_FACTORS = [0.04, 0.06, 0.03, 0.05, 0.07, 0.03, 0.05, 0.07, 0.04, 0.03, 0.06];

function BackgroundMagnifier() {
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const el = ref.current;
    if (!field || !el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const pointer = {
      x: field.clientWidth * 0.78,
      y: field.clientHeight * 0.28,
    };
    const body = {
      x: Math.max(0, field.clientWidth - 340),
      y: 48,
      vx: -0.82,
      vy: 0.58,
      angle: -10,
      spin: -0.42,
    };

    const onPointerMove = (event: PointerEvent) => {
      const fieldRect = field.getBoundingClientRect();
      pointer.x = event.clientX - fieldRect.left;
      pointer.y = event.clientY - fieldRect.top;
    };

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 16.667, 2);
      last = now;

      const rect = el.getBoundingClientRect();
      const width = rect.width || 240;
      const height = rect.height || width;
      const fieldWidth = field.clientWidth || 1180;
      const fieldHeight = field.clientHeight || 440;
      const maxX = Math.max(0, fieldWidth - width);
      const maxY = Math.max(0, fieldHeight - height);
      const centerX = body.x + width / 2;
      const centerY = body.y + height / 2;
      const dx = pointer.x - centerX;
      const dy = pointer.y - centerY;

      body.vx += dx * 0.00018 * dt;
      body.vy += dy * 0.00018 * dt;
      body.vx *= Math.pow(0.998, dt);
      body.vy *= Math.pow(0.998, dt);

      const speed = Math.hypot(body.vx, body.vy);
      const maxSpeed = 2.1;
      if (speed > maxSpeed) {
        body.vx = (body.vx / speed) * maxSpeed;
        body.vy = (body.vy / speed) * maxSpeed;
      }

      body.x += body.vx * dt;
      body.y += body.vy * dt;

      if (body.x <= 0) {
        body.x = 0;
        body.vx = Math.max(0.75, Math.abs(body.vx)) * 0.96;
        body.spin = Math.abs(body.spin) + body.vy * 0.08;
      } else if (body.x >= maxX) {
        body.x = maxX;
        body.vx = -Math.max(0.75, Math.abs(body.vx)) * 0.96;
        body.spin = -Math.abs(body.spin) + body.vy * 0.08;
      }

      if (body.y <= 0) {
        body.y = 0;
        body.vy = Math.max(0.65, Math.abs(body.vy)) * 0.96;
        body.spin = -body.spin + body.vx * 0.06;
      } else if (body.y >= maxY) {
        body.y = maxY;
        body.vy = -Math.max(0.65, Math.abs(body.vy)) * 0.96;
        body.spin = -body.spin + body.vx * 0.06;
      }

      body.angle += body.spin * dt;
      body.spin *= Math.pow(0.999, dt);
      el.style.transform = `translate3d(${body.x}px, ${body.y}px, 0) rotate(${body.angle}deg)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (raf !== 0) cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, []);

  return (
    <div ref={fieldRef} aria-hidden className="st-header-motion-field">
      <div ref={ref} className="st-bg-magnifier">
        <svg fill="none" preserveAspectRatio="none" viewBox="0 0 189.454 189.454">
          <g id="skill-trends-background-magnifier">
            <circle cx="67.149" cy="67.148" fill="#A8CEFC" fillOpacity="0.5" r="62.3524" />
            <path clipRule="evenodd" d={svgPaths.p26efe100} fill="#1B3476" fillRule="evenodd" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function SkillTrendsSkeleton() {
  const cards = Array.from({ length: 9 });

  return (
    <div className="min-h-[1498px] w-full overflow-hidden bg-[#dceeff] text-[#0e2440]">
      <section className="relative h-[440px] overflow-hidden bg-[#1560b3] px-14 pt-6">
        <div className="mx-auto h-20 max-w-[1068px] rounded-[40px] bg-white/85 shadow-[0_18px_45px_rgba(14,36,64,0.14)]">
          <div className="flex h-full items-center justify-between px-16">
            <div className="h-9 w-44 animate-pulse rounded-full bg-[#dceeff]" />
            <div className="h-5 w-36 animate-pulse rounded-full bg-[#c2dcf7]" />
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-[1068px] grid-cols-[1fr_420px] gap-8">
          <div className="space-y-5">
            <div className="h-16 w-[520px] animate-pulse rounded-[22px] bg-white/26" />
            <div className="h-5 w-[620px] animate-pulse rounded-full bg-white/22" />
            <div className="h-5 w-[500px] animate-pulse rounded-full bg-white/18" />
            <div className="mt-8 h-12 w-36 animate-pulse rounded-full bg-white/75" />
          </div>
          <div className="h-56 animate-pulse rounded-[40px] bg-[#b9dbff]/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]" />
        </div>
      </section>

      <section className="mx-auto grid max-w-[1068px] grid-cols-4 gap-5 px-0 py-8">
        <div className="col-span-2 h-28 animate-pulse rounded-[24px] bg-white/80" />
        <div className="h-28 animate-pulse rounded-[24px] bg-white/72" />
        <div className="h-28 animate-pulse rounded-[24px] bg-white/72" />
        {cards.map((_, index) => (
          <div
            key={index}
            className={[
              "animate-pulse rounded-[24px] bg-white/80",
              index === 1 || index === 5 ? "col-span-2 h-[280px]" : "h-[178px]",
            ].join(" ")}
          >
            <div className="m-7 h-8 w-3/5 rounded-full bg-[#cfe6fc]" />
            <div className="mx-7 mt-4 h-5 w-2/5 rounded-full bg-[#d9ecff]" />
            <div className="mx-7 mt-12 h-24 rounded-[22px] bg-[#b8dcff]" />
          </div>
        ))}
      </section>
    </div>
  );
}

function useIndustryParallax(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    type ParallaxEntry = { img: HTMLElement; factor: number; flip: boolean };
    const items: ParallaxEntry[] = [];

    const collect = () => {
      items.length = 0;
      document.querySelectorAll<HTMLElement>("[data-name=\"Industry Card\"]").forEach((card, i) => {
        card.querySelectorAll<HTMLElement>("img").forEach((img) => {
          // Detect upside-down images (parent has -scale-y-100)
          const flip = !!img.closest(".-scale-y-100");
          items.push({ img, factor: PARALLAX_FACTORS[i % PARALLAX_FACTORS.length], flip });
        });
      });
    };

    let raf = 0;
    let prevSY = -1;
    let cancelled = false;

    const tick = () => {
      if (cancelled) { raf = 0; return; }
      const sy = window.scrollY;
      const scrollChanged = sy !== prevSY;
      if (scrollChanged) {
        prevSY = sy;
        const vh2 = window.innerHeight / 2;
        items.forEach(({ img, factor, flip }) => {
          const card = img.closest("[data-name=\"Industry Card\"]") as HTMLElement;
          if (!card) return;
          const r    = card.getBoundingClientRect();
          const dist = r.top + r.height / 2 - vh2; // distance from viewport centre
          const offset = dist * factor * (flip ? -1 : 1);
          // CSS `translate` is additive with `transform` — safe to set here
          img.style.translate = `0px ${offset}px`;
        });
      }
      // Idle-pause: only keep rescheduling while scroll position keeps changing.
      raf = scrollChanged ? requestAnimationFrame(tick) : 0;
    };

    const wake = () => {
      if (!cancelled && raf === 0) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => wake();
    window.addEventListener("scroll", onScroll, { passive: true });

    const tid = setTimeout(() => {
      if (cancelled) return;
      collect();
      raf = requestAnimationFrame(tick);
    }, 150);

    return () => {
      cancelled = true;
      clearTimeout(tid);
      window.removeEventListener("scroll", onScroll);
      if (raf !== 0) cancelAnimationFrame(raf);
      items.forEach(({ img }) => { img.style.translate = ""; });
    };
  }, [enabled]);
}

export default function SkillTrendsPage() {
  const [isDesktop, setIsDesktop] = useState(getIsDesktop);
  const [hasMounted, setHasMounted] = useState(false);

  useIndustryParallax(hasMounted && isDesktop);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!hasMounted || !isDesktop) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("st-in");
            if ((e.target as HTMLElement).dataset.name === "Industry Card") {
              window.setTimeout(() => e.target.classList.add("st-tilt-ready"), 480);
            }
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -20px 0px" }
    );

    const tid = setTimeout(() => {
      const root = document.getElementById("st-root");
      if (!root) return;

      /* ── Float: find mascot elements by their specific Tailwind height classes ──
         Checking classList directly avoids the need to escape bracket notation. */
      root.querySelectorAll(".absolute").forEach((el) => {
        const cl = el.classList;
        // Group2 — large goggles character (h-[366.002px])
          if (cl.contains("h-[366.002px]")) el.classList.add("st-static-mascot-hidden");
        // Group3 — small goggles character (h-[98.472px])
        if (cl.contains("h-[98.472px]"))  el.classList.add("st-float-small");
      });

      root.querySelectorAll<HTMLElement>('[data-name="Industry Card"]').forEach((card, index) => {
        const tiltY = index % 2 === 0 ? "-2deg" : "2deg";
        const tiltX = index % 3 === 0 ? "1.5deg" : "2deg";
        card.classList.add("sk-press-tilt-card");
        card.style.setProperty("--sk-tilt-x", tiltX);
        card.style.setProperty("--sk-tilt-y", tiltY);
      });

      /* ── Scroll reveal ── */
      const observe = (sel: string, cls: string, stagger = 0) => {
        root.querySelectorAll(sel).forEach((el, i) => {
          el.classList.add(cls);
          (el as HTMLElement).style.transitionDelay = `${i * stagger}s`;
          io.observe(el);
        });
      };

      // Header area
      observe('[data-name="Section Description"]', "st-left");

      // Industry cards — staggered up
      observe('[data-name="Industry Section Description"]', "st-left");
      observe('[data-name="Industry Card"]', "st-up", 0.07);

      // Footer
      observe('[data-name="Footer"]', "st-up");
    }, 80);

    return () => {
      clearTimeout(tid);
      io.disconnect();
    };
  }, [hasMounted, isDesktop]);

  if (!isDesktop) return <SkillTrendsMobilePage />;
  if (!hasMounted) return <SkillTrendsSkeleton />;

  return (
    <div id="st-root" style={{ width: "100%" }}>
      <style id="st-anims">{STYLES}</style>
      <BackgroundMagnifier />
      <HeroMascot svg={explorerIdleSvg} label="The Explorer" className="st-explorer-hero" maxLook={9} />
      <SkillTrends />
    </div>
  );
}

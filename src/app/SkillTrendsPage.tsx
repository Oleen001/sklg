import { useEffect, useRef, useState } from "react";
import SkillTrends from "@/imports/SkillTrends/index";
import svgPaths from "@/imports/SkillTrends/svg-79qsf1o8t9";
import SkillTrendsMobilePage from "./pages/SkillTrendsMobilePage";

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

  .st-bg-magnifier {
    height: clamp(180px, 24vw, 320px);
    left: 0;
    opacity: 0.2;
    pointer-events: none;
    position: fixed;
    top: 0;
    transform: translate3d(72vw, 12vh, 0) rotate(-10deg);
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
    z-index: 2;
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
      transform: translate3d(66vw, 14vh, 0) rotate(-10deg);
    }
    .st-up, .st-left, .st-right {
      transition: none;
      opacity: 1;
      transform: translateY(var(--st-safe-offset-y, 0px));
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
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const pointer = {
      x: window.innerWidth * 0.78,
      y: window.innerHeight * 0.28,
    };
    const body = {
      x: window.innerWidth * 0.72,
      y: window.innerHeight * 0.12,
      vx: 0.18,
      vy: 0.1,
      angle: -10,
      spin: 0.012,
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 16.667, 2);
      last = now;

      const rect = el.getBoundingClientRect();
      const width = rect.width || 240;
      const height = rect.height || width;
      const maxX = Math.max(0, window.innerWidth - width);
      const maxY = Math.max(0, window.innerHeight - height);
      const centerX = body.x + width / 2;
      const centerY = body.y + height / 2;
      const dx = pointer.x - centerX;
      const dy = pointer.y - centerY;

      body.vx += dx * 0.00055 * dt;
      body.vy += dy * 0.00055 * dt;
      body.vx *= Math.pow(0.992, dt);
      body.vy *= Math.pow(0.992, dt);

      const speed = Math.hypot(body.vx, body.vy);
      const maxSpeed = 1.35;
      if (speed > maxSpeed) {
        body.vx = (body.vx / speed) * maxSpeed;
        body.vy = (body.vy / speed) * maxSpeed;
      }

      body.x += body.vx * dt;
      body.y += body.vy * dt;

      if (body.x <= 0) {
        body.x = 0;
        body.vx = Math.abs(body.vx) * 0.72;
        body.spin += 0.002;
      } else if (body.x >= maxX) {
        body.x = maxX;
        body.vx = -Math.abs(body.vx) * 0.72;
        body.spin -= 0.002;
      }

      if (body.y <= 0) {
        body.y = 0;
        body.vy = Math.abs(body.vy) * 0.72;
        body.spin += 0.0015;
      } else if (body.y >= maxY) {
        body.y = maxY;
        body.vy = -Math.abs(body.vy) * 0.72;
        body.spin -= 0.0015;
      }

      body.angle += body.spin * dt;
      body.spin *= Math.pow(0.9995, dt);
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
    <div ref={ref} aria-hidden className="st-bg-magnifier">
      <svg fill="none" preserveAspectRatio="none" viewBox="0 0 189.454 189.454">
        <g id="skill-trends-background-magnifier">
          <circle cx="67.149" cy="67.148" fill="#A8CEFC" fillOpacity="0.5" r="62.3524" />
          <path clipRule="evenodd" d={svgPaths.p26efe100} fill="#EF5F5E" fillRule="evenodd" />
        </g>
      </svg>
    </div>
  );
}

function useIndustryParallax() {
  useEffect(() => {
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
  }, []);
}

export default function SkillTrendsPage() {
  const [isDesktop, setIsDesktop] = useState(getIsDesktop);

  useIndustryParallax();

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.id = "st-anims";
    styleEl.textContent = STYLES;
    document.head.appendChild(styleEl);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("st-in");
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
        if (cl.contains("h-[366.002px]")) el.classList.add("st-float-large");
        // Group3 — small goggles character (h-[98.472px])
        if (cl.contains("h-[98.472px]"))  el.classList.add("st-float-small");
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
      styleEl.remove();
    };
  }, []);

  if (!isDesktop) return <SkillTrendsMobilePage />;

  return (
    <div id="st-root" style={{ width: "100%" }}>
      <BackgroundMagnifier />
      <SkillTrends />
    </div>
  );
}

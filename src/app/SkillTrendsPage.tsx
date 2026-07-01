import { useEffect } from "react";
import SkillTrends from "@/imports/SkillTrends/index";

/* ─────────────────────────────────────────────────────────────
   Animations for the Skill Trends page

   Figma motion context node 7:650 (Group 1000002698):
   - scaleX: 1.2 → 1, 2 s, ease-in-out, repeat Infinity
   - scaleY: 1.2 → 1, 2 s, ease-in-out, repeat Infinity
   - transformOrigin: 50% 50%
   Applied to the inner content of the motion.div wrapper so the
   Tailwind translate-x/y positioning on the wrapper is preserved.

   Additional animations: float for both mascot characters,
   staggered card reveals on scroll.
───────────────────────────────────────────────────────────── */
const STYLES = `
  /* Figma node 7:650 — breathing scale pop */
  @keyframes st-mascot-scale {
    from { transform: scale(1.2); }
    to   { transform: scale(1);   }
  }

  /* Gentle vertical float for both mascot groups */
  @keyframes st-float {
    0%, 100% { transform: translateY(0px);  }
    50%       { transform: translateY(-16px); }
  }
  @keyframes st-float-sm {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }

  /* Figma-specified character: scale breathe */
  .st-mascot-breathe {
    animation: st-mascot-scale 2s ease-in-out infinite;
    transform-origin: center center;
  }

  /* Large goggles mascot (Group2, header right side) */
  .st-float-large {
    animation: st-float 3.5s ease-in-out infinite 0.3s;
  }

  /* Small goggles mascot (Group3, bottom of industry section) */
  .st-float-small {
    animation: st-float-sm 3.2s ease-in-out infinite 0.7s;
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
    transform: translateX(-56px);
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
  .st-left.st-in,
  .st-right.st-in {
    opacity: 1;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .st-mascot-breathe,
    .st-float-large,
    .st-float-small { animation: none; }
    .st-up, .st-left, .st-right {
      transition: none;
      opacity: 1;
      transform: none;
    }
  }
`;

/* ══════════════════════════════════════════════════
   PARALLAX — images inside Industry Cards move at
   different rates as the user scrolls. Each card gets
   a unique factor (slower = deeper parallax feel).
══════════════════════════════════════════════════ */
const PARALLAX_FACTORS = [0.10, 0.16, 0.08, 0.13, 0.19, 0.07, 0.14, 0.18, 0.11, 0.09, 0.15];

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

    const tick = () => {
      const sy = window.scrollY;
      if (sy !== prevSY) {
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
      raf = requestAnimationFrame(tick);
    };

    const tid = setTimeout(() => { collect(); raf = requestAnimationFrame(tick); }, 150);

    return () => {
      clearTimeout(tid);
      cancelAnimationFrame(raf);
      items.forEach(({ img }) => { img.style.translate = ""; });
    };
  }, []);
}

export default function SkillTrendsPage() {
  useIndustryParallax();

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

      /* ── Figma motion node 7:650 ──
         The imported motion.div has translate -50%/-50% on it for positioning.
         We target the inner layout div (child of .flex-none) so the translate
         is untouched; scale applies to the content only. */
      const mascotContent = root.querySelector(
        '[data-motion-wrapper-for="7:650"] .flex-none > div'
      );
      mascotContent?.classList.add("st-mascot-breathe");

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

  return (
    <div id="st-root" style={{ width: "100%" }}>
      <SkillTrends />
    </div>
  );
}

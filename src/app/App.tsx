import { useEffect, useRef, useState } from "react";
import Homepage from "@/imports/Homepage/index";

const DESIGN_WIDTH = 1180;
const DESIGN_HEIGHT = 3200;

/* ─────────────────────────────────────────────
   Animation styles (characters + scroll reveal)
───────────────────────────────────────────── */
const STYLES = `
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

  [data-name="Sunny-A"]           { animation: sk-float 3s ease-in-out infinite; }
  [data-name="Icon Group Container"] { animation: sk-float 3.5s ease-in-out infinite 0.4s; }
  [data-name="Mask Group Container"] { animation: sk-float-sm 3.2s ease-in-out infinite 0.8s; }

  [data-name="R animate"] { animation: sk-float 2.8s ease-in-out infinite 0s;    }
  [data-name="I animate"] { animation: sk-float 2.8s ease-in-out infinite 0.15s; }
  [data-name="A animate"] { animation: sk-float 2.8s ease-in-out infinite 0.3s;  }
  [data-name="S animate"] { animation: sk-float 2.8s ease-in-out infinite 0.05s; }
  [data-name="E animate"] { animation: sk-float 2.8s ease-in-out infinite 0.2s;  }
  [data-name="C animate"] { animation: sk-float 2.8s ease-in-out infinite 0.35s; }

  [data-name="Summary Section"] [data-name="Sunny-A"] {
    animation: sk-pulse-scale 3s ease-in-out infinite;
  }

  .sk-up {
    opacity: 0;
    transform: translateY(52px);
    transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1),
                transform  0.85s cubic-bezier(0.16,1,0.3,1);
    will-change: opacity, transform;
  }
  .sk-left {
    opacity: 0;
    transform: translateX(-60px);
    transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1),
                transform  0.85s cubic-bezier(0.16,1,0.3,1);
    will-change: opacity, transform;
  }
  .sk-right {
    opacity: 0;
    transform: translateX(60px);
    transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1),
                transform  0.85s cubic-bezier(0.16,1,0.3,1);
    will-change: opacity, transform;
  }
  .sk-up.in-view,
  .sk-left.in-view,
  .sk-right.in-view {
    opacity: 1;
    transform: none;
  }
`;

type RevealEntry = {
  selector: string;
  cls: "sk-up" | "sk-left" | "sk-right";
  stagger?: number;
  delay?: number;
};

const REVEAL_MAP: RevealEntry[] = [
  { selector: '[data-name="Navbar"]',                  cls: "sk-up",    delay: 0 },
  { selector: '[data-name="Header Section"]',           cls: "sk-up",    delay: 0.1 },
  { selector: '[data-name="Discover Background"]',      cls: "sk-up",    stagger: 0.12 },
  { selector: '[data-name="Plan Background"]',          cls: "sk-up",    delay: 0.12 },
  { selector: '[data-name="Test Course Container"]',    cls: "sk-left",  delay: 0 },
  { selector: '[data-name="Vector Container Inner"]',   cls: "sk-right", delay: 0.15 },
  { selector: '[data-name="Career Plan Container"]',    cls: "sk-right", delay: 0 },
  { selector: '[data-name="Icon Group Container"]',     cls: "sk-left",  delay: 0.1 },
  { selector: '[data-name="Guide Text Container"]',     cls: "sk-up",    delay: 0 },
  { selector: '[data-name="Plan Text Container"]',      cls: "sk-up",    delay: 0.1 },
  { selector: '[data-name="Summary Section"]',          cls: "sk-up",    delay: 0 },
  { selector: '[data-name="Ads Background"]',           cls: "sk-up",    delay: 0 },
  { selector: '[data-name="Skill Course Container"]',   cls: "sk-right", delay: 0 },
  { selector: '[data-name="Certification Text Container"]', cls: "sk-up", delay: 0.1 },
  { selector: '[data-name="Footer"]',                  cls: "sk-up",    delay: 0 },
];

export default function App() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  /* ── Scale to fit viewport ── */
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      setScale(Math.min(1, vw / DESIGN_WIDTH));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── Animations + scroll reveal ── */
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.id = "skillogy-anims";
    styleEl.textContent = STYLES;
    document.head.appendChild(styleEl);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -24px 0px" }
    );

    const applyReveal = ({ selector, cls, stagger = 0, delay = 0 }: RevealEntry) => {
      document.querySelectorAll(selector).forEach((el, i) => {
        if (
          el.classList.contains("sk-up") ||
          el.classList.contains("sk-left") ||
          el.classList.contains("sk-right")
        ) return;
        el.classList.add(cls);
        (el as HTMLElement).style.transitionDelay = `${delay + i * stagger}s`;
        io.observe(el);
      });
    };

    const tid = setTimeout(() => REVEAL_MAP.forEach(applyReveal), 60);

    return () => {
      clearTimeout(tid);
      io.disconnect();
      styleEl.remove();
    };
  }, []);

  const scaledHeight = DESIGN_HEIGHT * scale;

  return (
    /*
      Outer shell: full viewport width, height follows scaled content.
      overflow-x hidden prevents horizontal scroll on small viewports.
    */
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        height: scaledHeight,
        overflowX: "hidden",
        background: "#fff",
      }}
    >
      {/*
        Scale container: origin top-left so the design starts at (0,0).
        Width is always DESIGN_WIDTH; the scale shrinks it to fit.
      */}
      <div
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}
      >
        <Homepage />
      </div>
    </div>
  );
}

import { useEffect, useRef, type CSSProperties } from "react";

type HeroMascotProps = {
  svg: string;
  label: string;
  className?: string;
  maxLook?: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function HeroMascot({ svg, label, className = "", maxLook = 7 }: HeroMascotProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const shadow = root.shadowRoot ?? root.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        :host { display: block; width: 100%; height: 100%; }
        svg { display: block; width: 100%; height: 100%; overflow: visible; }
        #pupils,
        .sunny2-pupil,
        .windy3-pupil {
          transform: translate3d(var(--mascot-look-x, 0px), var(--mascot-look-y, 0px), 0) !important;
          transform-box: fill-box;
          transform-origin: 50% 50%;
          transition: transform 120ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          #pupils,
          .sunny2-pupil,
          .windy3-pupil {
            transform: none !important;
            transition: none;
          }
        }
      </style>
      ${svg}
    `;
  }, [svg]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;

    const updateLook = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const maxDistance = Math.max(rect.width, rect.height, 1);
      const x = clamp(((pointerX - centerX) / maxDistance) * maxLook * 2, -maxLook, maxLook);
      const y = clamp(((pointerY - centerY) / maxDistance) * maxLook * 2, -maxLook, maxLook);

      root.style.setProperty("--mascot-look-x", `${x.toFixed(2)}px`);
      root.style.setProperty("--mascot-look-y", `${y.toFixed(2)}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frame === 0) frame = window.requestAnimationFrame(updateLook);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    updateLook();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [maxLook]);

  return (
    <div
      ref={rootRef}
      aria-label={label}
      className={`sk-hero-mascot absolute pointer-events-none ${className}`}
      role="img"
      style={
        {
          "--mascot-look-x": "0px",
          "--mascot-look-y": "0px",
        } as CSSProperties
      }
    />
  );
}

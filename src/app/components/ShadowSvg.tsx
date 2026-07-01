import { useEffect, useRef, type HTMLAttributes } from "react";

type ShadowSvgProps = HTMLAttributes<HTMLDivElement> & {
  svg: string;
  label: string;
};

export default function ShadowSvg({ svg, label, className = "", ...divProps }: ShadowSvgProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const shadow = root.shadowRoot ?? root.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        :host { display: block; width: 100%; height: 100%; }
        svg { display: block; width: 100%; height: 100%; overflow: visible; }
      </style>
      ${svg}
    `;
  }, [svg]);

  return <div ref={rootRef} aria-label={label} className={className} role="img" {...divProps} />;
}

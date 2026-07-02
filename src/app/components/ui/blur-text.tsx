"use client";

import { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

type BlurTextProps = {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  stagger?: number;
};

function splitThaiAware(text: string) {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("th", { granularity: "word" });
    return [...segmenter.segment(text)].map((item) => item.segment);
  }

  return text.split(/(\s+)/);
}

export function BlurText({
  text,
  className = "",
  once = true,
  delay = 0,
  stagger = 0.035,
}: BlurTextProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(ref, { once, margin: "0px 0px -12% 0px" });
  const segments = useMemo(() => splitThaiAware(text), [text]);

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={text}>
      {segments.map((segment, index) => (
        <motion.span
          aria-hidden
          className="inline-block whitespace-pre"
          key={`${segment}-${index}`}
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
          transition={{
            duration: 0.62,
            delay: delay + index * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {segment}
        </motion.span>
      ))}
    </span>
  );
}

import { useEffect, useState } from "react";
import CareerExplore from "@/imports/CareerExplore/index";

/* ═══════════════════════════════════════════════════════════════
   Figma motion context — authoritative values used below:

   8:3372  Ellipse 2207 (large bg ellipse)
           rotate: 52.038 → -307.962  (full backward revolution), 4s linear ∞

   8:3373  Ellipse 2208 (small inner ellipse)
           rotate: 0 → 360  (full forward revolution), 4s linear ∞

   8:3375  Explorer mascot slot
           scaleX: 1.235 → 0.87 (squash/stretch), 4s ∞
           scaleY: 0.81  → 1.15
           y:      0 → -23px bounce, 4s ∞

   8:3383  Mouth — scaleY: 1 → 1.1 → 1, 4s ∞
   8:3384  Right Eye — scaleY blink: 1 → 0.05 → 1 at t=77–81.5%, 4s ∞
   8:3387  Left Eye  — same blink pattern

   8:3390  magnifying glass
           scaleX/Y: 1.2 → 1, ease-in-out, 4s ∞
           y: same bounce as Explorer mascot

   8:3393+ HighestSalary pills — sinusoidal y orbit, amplitude ~7px, 4s linear ∞
═══════════════════════════════════════════════════════════════ */

const ANIM_CSS = `
  /* ── Node 8:3372: large bg ellipse rotates backward 360° in 4 s ── */
  @keyframes ce-orbit1 {
    from { transform: translateX(-50%) translateY(-50%) rotate(52.038deg); }
    to   { transform: translateX(-50%) translateY(-50%) rotate(-307.962deg); }
  }
  #ce-root [data-motion-wrapper-for="8:3372"] {
    animation: ce-orbit1 4s linear infinite;
    transform-origin: center center;
  }
  /* The inner flex-none div has a static Tailwind rotate; clear it so the parent animation drives all rotation */
  #ce-root [data-motion-wrapper-for="8:3372"] > div {
    transform: none !important;
  }

  /* ── Node 8:3373: small inner ellipse rotates forward 360° in 4 s ── */
  @keyframes ce-orbit2 {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  #ce-root .ce-ellipse2 {
    animation: ce-orbit2 4s linear infinite;
    transform-origin: center center;
  }

  /* ── Nodes 8:3375 + 8:3390: shared Y-bounce of entire General container ──
     Both ExplorerMascot and MagnifyingGlass bob together since they live inside General. */
  @keyframes ce-y-bounce {
    0%, 25%, 50%, 75%, 100%              { transform: translateX(-50%) translateY(-50%); }
    10.75%, 35.75%, 60.75%, 85.75% { transform: translateX(-50%) translateY(calc(-50% - 23px)); }
  }
  #ce-root [data-name="General"] {
    animation: ce-y-bounce 4s cubic-bezier(0,0,0.15,1) infinite;
  }

  /* ── Node 8:3375: Explorer mascot slot squash / stretch ── */
  @keyframes ce-squash {
    0%, 25%, 50%, 75%, 100%              { transform: scaleX(1.235) scaleY(0.81); }
    10.75%, 35.75%, 60.75%, 85.75% { transform: scaleX(0.87) scaleY(1.15); }
  }
  #ce-root [data-name="Body"] {
    animation: ce-squash 4s cubic-bezier(0,0,0.15,1) infinite;
    transform-origin: center bottom;
  }

  /* ── Nodes 8:3384 / 8:3387: eyes blink at 77–81.5 % of each 4 s cycle ── */
  @keyframes ce-blink {
    0%, 77%       { transform: scaleY(1); }
    79.25%        { transform: scaleY(0.05); }
    81.5%, 100%   { transform: scaleY(1); }
  }
  #ce-root [data-name="Right Eye"],
  #ce-root [data-name="Left Eye"] {
    animation: ce-blink 4s linear infinite;
    transform-origin: center center;
  }

  /* ── Node 8:3390: magnifying glass scale pop (1.2 → 1 over first half) ── */
  @keyframes ce-glass-pop {
    0%         { transform: scale(1.2); }
    50%, 100%  { transform: scale(1); }
  }
  #ce-root [data-motion-wrapper-for="8:3390"] {
    animation: ce-glass-pop 4s ease-in-out infinite;
    transform-origin: center center;
  }

  /* ── Nodes 8:3393+: career pills orbit sinusoidally (simplified sine wave) ── */
  @keyframes ce-pill-up {
    0%, 100% { transform: translateY(0px);  }
    50%      { transform: translateY(-7px); }
  }
  #ce-root [data-name="Highest salary"] {
    animation: ce-pill-up 4s ease-in-out infinite;
  }

  /* ── Tab bar UX ── */
  #ce-root [data-name="Segment button"] {
    cursor: pointer;
    user-select: none;
  }

  /* Reduced-motion accessibility */
  @media (prefers-reduced-motion: reduce) {
    #ce-root [data-motion-wrapper-for="8:3372"],
    #ce-root .ce-ellipse2,
    #ce-root [data-name="General"],
    #ce-root [data-name="Body"],
    #ce-root [data-name="Right Eye"],
    #ce-root [data-name="Left Eye"],
    #ce-root [data-motion-wrapper-for="8:3390"],
    #ce-root [data-name="Highest salary"] {
      animation: none !important;
      transform: none !important;
    }
    #ce-root [data-name="General"] {
      transform: translateX(-50%) translateY(-50%) !important;
    }
  }
`;

type InnerTab = "skill-scan" | "skill-to-career" | "my-skills";

const PLACEHOLDER: Record<Exclude<InnerTab, "skill-scan">, { title: string; desc: string; emoji: string }> = {
  "skill-to-career": {
    title: "Skill-to-Career Match",
    desc: "วิเคราะห์ทักษะของคุณ แล้วจับคู่กับอาชีพที่เหมาะสมที่สุด",
    emoji: "🎯",
  },
  "my-skills": {
    title: "My Skill Collection",
    desc: "ดูและจัดการคอลเลกชันทักษะทั้งหมดของคุณ",
    emoji: "📚",
  },
};

export default function CareerExplorePage() {
  const [activeTab, setActiveTab] = useState<InnerTab>("skill-scan");

  /* ── Inject CSS + wire up all post-render DOM work ── */
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.id = "ce-anims";
    styleEl.textContent = ANIM_CSS;
    document.head.appendChild(styleEl);

    let removeTabListener: (() => void) | null = null;

    const tid = setTimeout(() => {
      const root = document.getElementById("ce-root");
      if (!root) return;

      /* Tag the second ellipse (no data-motion-wrapper-for in import) */
      root.querySelectorAll('[data-name="Container"] > .absolute').forEach((el) => {
        if (el.classList.contains("h-[500px]")) el.classList.add("ce-ellipse2");
      });

      /* Stagger career pills — phase offset so they orbit at different positions */
      root.querySelectorAll('[data-name="Highest salary"]').forEach((pill, i) => {
        (pill as HTMLElement).style.animationDelay = `${-((i * 0.47) % 4).toFixed(2)}s`;
      });

      /* Tab click delegation */
      const onTabClick = (e: Event) => {
        const btn = (e.target as Element).closest('[data-name="Segment button"]');
        if (!btn) return;
        const label = btn.textContent?.trim() ?? "";
        if (label.includes("Skill Scan")) setActiveTab("skill-scan");
        else if (label.includes("Career")) setActiveTab("skill-to-career");
        else if (label.includes("Collection")) setActiveTab("my-skills");
      };
      root.addEventListener("click", onTabClick);
      removeTabListener = () => root.removeEventListener("click", onTabClick);
    }, 80);

    return () => {
      clearTimeout(tid);
      styleEl.remove();
      removeTabListener?.();
    };
  }, []);

  return (
    <div id="ce-root" style={{ position: "relative", width: "100%" }}>
      {/* The imported Figma page — always rendered so animation CSS targets its DOM */}
      <CareerExplore />

      {/* Content overlay for the two non-implemented inner tabs */}
      {activeTab !== "skill-scan" && (
        <div
          style={{
            position: "absolute",
            /* sit just below the tab bar (top ≈ 178 px) and above the footer */
            top: 178,
            left: 56,
            width: 1068,
            bottom: 160,
            background: "#ffffff",
            borderRadius: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            zIndex: 20,
            boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ fontSize: 64, lineHeight: 1 }}>
            {PLACEHOLDER[activeTab].emoji}
          </div>
          <p
            style={{
              margin: 0,
              fontFamily: "Noto Sans Thai, sans-serif",
              fontSize: 32,
              fontWeight: 600,
              color: "#0e2440",
            }}
          >
            {PLACEHOLDER[activeTab].title}
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "Noto Sans Thai, sans-serif",
              fontSize: 18,
              color: "#767279",
              textAlign: "center",
              maxWidth: 480,
              lineHeight: 1.6,
            }}
          >
            {PLACEHOLDER[activeTab].desc}
          </p>
          <div
            style={{
              marginTop: 8,
              background: "#dbe6f0",
              color: "#507da4",
              fontFamily: "Noto Sans Thai, sans-serif",
              fontSize: 15,
              fontWeight: 600,
              borderRadius: 100,
              padding: "10px 24px",
            }}
          >
            เร็วๆ นี้
          </div>
        </div>
      )}
    </div>
  );
}

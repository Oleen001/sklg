// Recolorable MESS character — the body fill is the only thing that changes; the
// eyes (whites + dark pupils) stay fixed. Each eye group squashes vertically on
// the shared `mess-blink` keyframe; `blinkDelay` staggers characters so they
// don't blink in unison. Consumers must render <MessBlinkStyle /> once in their
// tree for the blink to animate.
export function MessBlob({
  color,
  blinkDelay,
}: {
  readonly color: string
  readonly blinkDelay?: string
}) {
  return (
    <svg viewBox="0 0 408 421" fill="none" className="h-full w-full select-none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M203.729 420.58C180.229 420.58 158.969 410.06 144.829 391.57C137.909 393.63 130.819 394.67 123.689 394.67C103.909 394.67 84.5388 386.46 70.5488 372.14C57.3888 358.68 50.0088 341.11 49.5288 322.33C27.5788 314.59 10.9988 297.62 3.73878 275.27C-3.52122 252.92 -0.0912151 229.45 13.1188 210.29C-0.0912151 191.13 -3.53122 167.66 3.73878 145.31C10.9988 122.96 27.5788 105.99 49.5288 98.25C50.0088 79.47 57.3888 61.8999 70.5488 48.4399C84.5388 34.1199 103.909 25.91 123.689 25.91C130.809 25.91 137.909 26.95 144.829 29.01C158.969 10.53 180.239 0 203.729 0C227.219 0 248.489 10.52 262.629 29.01C269.549 26.95 276.639 25.91 283.769 25.91C303.549 25.91 322.919 34.1199 336.909 48.4399C350.059 61.8999 357.449 79.47 357.929 98.25C379.879 105.99 396.459 122.96 403.719 145.31C410.979 167.66 407.539 191.13 394.339 210.29C407.549 229.45 410.989 252.92 403.719 275.27C396.459 297.62 379.879 314.59 357.929 322.33C357.449 341.11 350.069 358.67 336.909 372.13C322.919 386.45 303.549 394.66 283.759 394.66C276.639 394.66 269.539 393.62 262.619 391.56C248.479 410.04 227.209 420.57 203.719 420.57L203.729 420.58Z"
        fill={color}
      />
      <g className="mess-eye" style={{ animationDelay: blinkDelay }}>
        <path
          d="M152.464 249.779C174.213 249.779 191.843 232.148 191.843 210.4C191.843 188.651 174.213 171.02 152.464 171.02C130.715 171.02 113.084 188.651 113.084 210.4C113.084 232.148 130.715 249.779 152.464 249.779Z"
          fill="white"
        />
        <path
          d="M157.397 218.619C161.986 218.619 165.706 214.899 165.706 210.31C165.706 205.72 161.986 202 157.397 202C152.807 202 149.087 205.72 149.087 210.31C149.087 214.899 152.807 218.619 157.397 218.619Z"
          fill="#231F20"
        />
      </g>
      <g className="mess-eye" style={{ animationDelay: blinkDelay }}>
        <path
          d="M255.839 249.779C277.587 249.779 295.218 232.148 295.218 210.4C295.218 188.651 277.587 171.02 255.839 171.02C234.09 171.02 216.459 188.651 216.459 210.4C216.459 232.148 234.09 249.779 255.839 249.779Z"
          fill="white"
        />
        <path
          d="M250.704 218.619C255.294 218.619 259.014 214.899 259.014 210.31C259.014 205.72 255.294 202 250.704 202C246.115 202 242.395 205.72 242.395 210.31C242.395 214.899 246.115 218.619 250.704 218.619Z"
          fill="#231F20"
        />
      </g>
    </svg>
  )
}

// Shared blink keyframes — render once anywhere in the tree that uses <MessBlob />.
export function MessBlinkStyle() {
  return (
    <style>{`
      .mess-eye {
        transform-box: fill-box;
        transform-origin: center;
        animation: mess-blink 4.5s ease-in-out infinite;
      }
      @keyframes mess-blink {
        0%, 93%, 100% { transform: scaleY(1); }
        96% { transform: scaleY(0.08); }
      }
    `}</style>
  )
}

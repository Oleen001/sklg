import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocation, useNavigate } from "react-router";
import { getRouteByPath, NAV_ROUTES } from "./routes";
import logoutIconSvg from "@/assets/icons/logout-3-linear.svg?raw";

const FONT_MENU = "'Noto Sans Thai', 'Noto Sans', sans-serif";
const NAV_HIDE_OFFSET = 96;
const NAV_SCROLL_DELTA = 8;
const NAV_HIDE_Y = -112;
const NAV_MAX_WIDTH = 1180;

type ResponsiveNavbarProps = {
  isLoggedIn: boolean;
  onLogout: () => void;
};

function LogoutIcon() {
  return (
    <span
      aria-hidden
      className="block size-5 [&_svg]:block [&_svg]:size-full"
      dangerouslySetInnerHTML={{ __html: logoutIconSvg }}
    />
  );
}

export default function ResponsiveNavbar({ isLoggedIn, onLogout }: ResponsiveNavbarProps) {
  const [open, setOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);
  const frame = useRef<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const currentRoute = getRouteByPath(location.pathname);
  const reduceMotion = useReducedMotion();

  const spring = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.8 };

  const pressable = reduceMotion
    ? {}
    : { whileHover: { y: -1, scale: 1.02 }, whileTap: { y: 0, scale: 0.98 } };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setNavHidden(false);
    lastScrollY.current = window.scrollY;
  }, [location.pathname]);

  useEffect(() => {
    if (open) {
      setNavHidden(false);
      lastScrollY.current = window.scrollY;
      return;
    }

    const updateNavVisibility = () => {
      frame.current = null;
      const currentScrollY = Math.max(window.scrollY, 0);
      const delta = currentScrollY - lastScrollY.current;

      if (currentScrollY <= NAV_HIDE_OFFSET) {
        setNavHidden(false);
      } else if (delta > NAV_SCROLL_DELTA) {
        setNavHidden(true);
      } else if (delta < -NAV_SCROLL_DELTA) {
        setNavHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(updateNavVisibility);
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current !== null) {
        window.cancelAnimationFrame(frame.current);
        frame.current = null;
      }
    };
  }, [open]);

  const go = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const logout = () => {
    onLogout();
    go("/");
  };

  return (
    <motion.header
      className="pointer-events-none fixed left-0 top-0 z-50 w-full bg-transparent px-4 pt-4 pb-2 will-change-transform"
      animate={{ y: navHidden ? NAV_HIDE_Y : 0 }}
      transition={spring}
    >
      <div
        className="pointer-events-auto mx-auto grid min-h-16 w-full grid-cols-[44px_1fr_44px] items-center rounded-full bg-white/70 px-5 shadow-[0_18px_45px_rgba(14,36,64,0.10)] ring-1 ring-white/70 backdrop-blur-2xl backdrop-saturate-150 md:px-10 lg:flex lg:justify-between lg:px-10"
        style={{ maxWidth: NAV_MAX_WIDTH }}
      >
        <motion.button
          type="button"
          onClick={() => go("/")}
          className="sk-brand-logo col-start-2 cursor-pointer justify-self-center text-[24px] leading-none text-[#0e2440] transition-opacity duration-200 hover:opacity-70 lg:col-auto lg:justify-self-auto"
          aria-label="Skillogy home"
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          Skillogy
        </motion.button>

        {/* Desktop menu */}
        <nav className="hidden items-center gap-1 lg:flex" style={{ fontFamily: FONT_MENU }}>
          {NAV_ROUTES.map((item) => {
            const active = item.path === currentRoute.path;
            return (
              <motion.button
                key={item.key}
                type="button"
                onClick={() => go(item.path)}
                aria-current={active ? "page" : undefined}
                className={`relative cursor-pointer rounded-full px-3 py-2 text-[16px] whitespace-nowrap transition-colors duration-200 hover:text-[#0d6ec8] ${
                  active ? "font-semibold text-[#0d6ec8]" : "text-[#1b3a5c]"
                }`}
                {...pressable}
              >
                {item.label}
                {active ? (
                  <motion.span
                    layoutId="desktop-active-nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[#0d6ec8]"
                    transition={spring}
                    aria-hidden
                  />
                ) : null}
              </motion.button>
            );
          })}
          {isLoggedIn ? (
            <div className="ml-4 flex items-center gap-2">
              <motion.button
                type="button"
                aria-label="Open profile"
                onClick={() => go("/skill-dashboard")}
                className="relative size-9 cursor-pointer rounded-full bg-[#2ccb6f] text-[#0e2440] transition hover:brightness-105 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#2ccb6f]"
                {...pressable}
              >
                <span className="absolute left-[10px] top-[10px] size-[5px] rounded-full bg-white" />
                <span className="absolute left-[20px] top-[8px] size-[5px] rounded-full bg-white" />
                <span className="absolute left-[12px] top-[11px] size-1.5 rounded-full bg-[#0e2440]" />
                <span className="absolute left-[22px] top-[9px] size-1.5 rounded-full bg-[#0e2440]" />
                <span className="absolute left-[12px] top-[20px] h-2 w-4 rounded-b-full border-b-2 border-[#0e2440]" />
              </motion.button>
              <motion.button
                type="button"
                aria-label="Log out"
                onClick={logout}
                className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/58 text-[#1b3a5c] ring-1 ring-[#dbe6f0]/70 transition-colors duration-200 hover:bg-[#fff1f3] hover:text-[#db475f] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#db475f]/30"
                {...pressable}
              >
                <LogoutIcon />
              </motion.button>
            </div>
          ) : (
            <motion.button
              type="button"
              onClick={() => go("/login")}
              className="ml-3 cursor-pointer rounded-full bg-[#1e78d4] px-4 py-2 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-[#0d6ec8]"
              {...pressable}
            >
              Join Skillogy
            </motion.button>
          )}
        </nav>

        {/* Mobile hamburger */}
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="col-start-3 flex size-11 cursor-pointer items-center justify-center justify-self-end rounded-full text-[#1b3a5c] transition-colors duration-200 hover:bg-[#eff4f9] lg:hidden"
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        >
          <span className="relative block h-4 w-6">
            <motion.span
              className="absolute left-0 block h-0.5 w-6 rounded-full bg-current"
              animate={open ? { top: "50%", y: "-50%", rotate: 45 } : { top: 0, y: 0, rotate: 0 }}
              transition={spring}
            />
            <motion.span
              className="absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 rounded-full bg-current"
              animate={open ? { opacity: 0, scaleX: 0.35 } : { opacity: 1, scaleX: 1 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.16 }}
            />
            <motion.span
              className="absolute left-0 block h-0.5 w-6 rounded-full bg-current"
              animate={open ? { bottom: "50%", y: "50%", rotate: -45 } : { bottom: 0, y: 0, rotate: 0 }}
              transition={spring}
            />
          </span>
        </motion.button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            className="pointer-events-auto mx-auto mt-2 overflow-hidden rounded-[24px] bg-white/78 shadow-[0_18px_45px_rgba(14,36,64,0.12)] ring-1 ring-white/70 backdrop-blur-2xl backdrop-saturate-150 lg:hidden"
            style={{ fontFamily: FONT_MENU, maxWidth: NAV_MAX_WIDTH }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={spring}
          >
            <nav className="flex flex-col gap-1 px-5 py-3">
              {NAV_ROUTES.map((item) => {
                const active = item.path === currentRoute.path;
                return (
                  <motion.button
                    key={`m-${item.key}`}
                    type="button"
                    onClick={() => go(item.path)}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-11 cursor-pointer items-center rounded-lg px-3 text-left text-[16px] transition-colors duration-200 ${
                      active
                        ? "bg-[#eff4f9] font-semibold text-[#0d6ec8]"
                        : "text-[#1b3a5c] hover:bg-[#f5f8fc]"
                    }`}
                    {...pressable}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
              {isLoggedIn ? (
                <div className="mt-2 grid grid-cols-[1fr_44px] gap-2">
                  <motion.button
                    type="button"
                    onClick={() => go("/skill-dashboard")}
                    className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#2ccb6f] px-4 text-[16px] font-semibold text-[#0e2440] transition-colors duration-200 hover:bg-[#29bd68]"
                    {...pressable}
                  >
                    Profile
                  </motion.button>
                  <motion.button
                    type="button"
                    aria-label="Log out"
                    onClick={logout}
                    className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/70 text-[#1b3a5c] ring-1 ring-[#dbe6f0]/70 transition-colors duration-200 hover:bg-[#fff1f3] hover:text-[#db475f]"
                    {...pressable}
                  >
                    <LogoutIcon />
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  type="button"
                  onClick={() => go("/login")}
                  className="mt-2 min-h-11 cursor-pointer rounded-full bg-[#1e78d4] px-4 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-[#0d6ec8]"
                  {...pressable}
                >
                  Join Skillogy
                </motion.button>
              )}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

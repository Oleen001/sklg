"use client";

import { Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Athiti, DM_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RiasecLandingPage } from "@/features/strength-finder/RiasecLandingPage";
import { RiasecHistoryView, RiasecResultView, RiasecTestView } from "@/features/riasec-test";

type RiasecView = "landing" | "test" | "result" | "history";

type SamudpokNavItem = {
  label: string;
  href: string;
};

const navItems: SamudpokNavItem[] = [
  { label: "Skill Dashboard", href: "/skill-dashboard" },
  { label: "Skill Trends", href: "/skill-trends" },
  { label: "Skill Builder", href: "/skill-builder" },
  { label: "Skill Opportunities", href: "/skill-opportunities" },
];

const NAV_SPRING = { type: "spring", stiffness: 420, damping: 34, mass: 0.8 } as const;

const athiti = Athiti({
  variable: "--font-athiti",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

function SamudpokNavbar() {
  const pathname = usePathname() ?? "/";
  const reduceMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;
      if (Math.abs(delta) >= 8) {
        setIsHidden(currentY > 96 && delta > 0);
        lastY = currentY;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pressable = reduceMotion
    ? {}
    : { whileHover: { y: -1, scale: 1.02 }, whileTap: { y: 0, scale: 0.98 } };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-4 pb-2 pt-4 md:px-8"
      animate={reduceMotion ? undefined : { y: isHidden ? -112 : 0 }}
      transition={reduceMotion ? { duration: 0 } : NAV_SPRING}
    >
      <div className="container-desktop">
        <div className="relative flex min-h-16 items-center justify-between rounded-full border border-bg-base-white/70 bg-bg-base-white/70 px-5 shadow-[0_18px_45px_rgba(14,36,64,0.10)] backdrop-blur-2xl backdrop-saturate-150 md:px-10">
          <motion.div {...pressable}>
            <Link href="/" className="flex h-8 shrink-0 items-center gap-1" aria-label="Skillogy home">
              <span className="relative block h-7 w-[90px] shrink-0">
                <Image src="/images/logo-bg-light.png" alt="Skillogy" fill className="object-contain" priority />
              </span>
            </Link>
          </motion.div>

          <div className="hidden shrink-0 items-center gap-10 lg:flex">
            <nav className="flex items-center gap-3" aria-label="Main navigation">
              {navItems.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <motion.div key={item.label} className="relative" {...pressable}>
                    <Link
                      href={item.href}
                      className={`relative flex items-center whitespace-nowrap px-3 py-2 text-base font-medium transition-colors hover:text-text-brand-primary-medium ${
                        active ? "font-semibold text-text-brand-primary-medium" : "text-text-base-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {active ? (
                      <motion.span
                        layoutId="samudpok-desktop-active-nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-bg-brand-primary-medium"
                        transition={reduceMotion ? { duration: 0 } : NAV_SPRING}
                      />
                    ) : null}
                  </motion.div>
                );
              })}
            </nav>

            <motion.div {...pressable}>
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-full bg-bg-brand-primary-medium px-5 text-sm font-semibold text-text-base-inverse shadow-[0_12px_28px_rgba(75,92,255,0.22)] transition-colors hover:bg-bg-brand-primary-strong"
              >
                Join Skillogy
              </Link>
            </motion.div>
          </div>

          <button
            type="button"
            className="-mr-2 inline-flex size-10 items-center justify-center rounded-full text-text-base-primary transition-colors hover:bg-bg-base-gray-light lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {isMenuOpen ? (
          <div className="absolute inset-x-4 top-full z-40 mt-2 overflow-hidden rounded-[24px] border border-bg-base-white/70 bg-bg-base-white/80 shadow-[0_18px_45px_rgba(14,36,64,0.12)] backdrop-blur-2xl backdrop-saturate-150 md:inset-x-6 lg:hidden">
            <nav className="flex flex-col p-2" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-bg-base-gray-light ${
                      active ? "bg-bg-base-gray-light font-semibold text-text-brand-primary-medium" : "text-text-base-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-full bg-bg-brand-primary-medium px-5 text-sm font-semibold text-text-base-inverse"
              >
                Join Skillogy
              </Link>
            </nav>
          </div>
        ) : null}
      </div>
    </motion.header>
  );
}

function SamudpokFooter() {
  return (
    <footer className="border-t border-border-base-subtle bg-bg-base-subtle">
      <div className="container-desktop flex flex-col gap-6 pb-10 pt-10 md:flex-row md:items-start md:gap-10 md:pb-14 md:pt-14">
        <div className="flex h-8 shrink-0 items-center">
          <div className="relative h-8 w-[104px] shrink-0">
            <Image src="/images/logo-bg-light.png" alt="Skillogy" fill className="object-contain" />
          </div>
        </div>

        <div className="flex flex-col md:flex-1">
          <p className="text-base leading-6 text-text-base-primary">
            A personalized system to track and manage academic skills
          </p>
          <p className="text-base leading-6 text-text-base-primary">
            and credits for lifelong learning.
          </p>
        </div>

        <div className="shrink-0">
          <p className="text-sm font-semibold leading-[21px] text-text-base-primary">Digital Credentials</p>
        </div>
      </div>
    </footer>
  );
}

function RiasecContent({ view, resultId }: { view: RiasecView; resultId?: string }) {
  if (view === "landing") return <RiasecLandingPage />;
  if (view === "test") return <RiasecTestView />;
  if (view === "result") return <RiasecResultView resultId={resultId ?? "mock-ria"} />;
  return <RiasecHistoryView />;
}

export default function RiasecPage({ view, resultId }: { view: RiasecView; resultId?: string }) {
  return (
    <div className={`samudpok-riasec min-h-svh bg-bg-base-white ${athiti.variable} ${dmSans.variable}`}>
      <SamudpokNavbar />
      <main className="pt-24 md:pt-28">
        <RiasecContent view={view} resultId={resultId} />
      </main>
      <SamudpokFooter />
    </div>
  );
}

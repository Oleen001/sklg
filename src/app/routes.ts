export type AppRouteKey =
  | "home"
  | "login"
  | "skill-dashboard"
  | "skill-trends"
  | "skill-builder"
  | "skill-opportunities"
  | "profile"
  | "riasec"
  | "riasec-test"
  | "riasec-result"
  | "riasec-history";

export type AppRouteKind =
  | "home"
  | "login"
  | "skill-dashboard"
  | "skill-trends"
  | "skill-builder"
  | "skill-opportunities"
  | "profile"
  | "riasec"
  | "riasec-test"
  | "riasec-result"
  | "riasec-history";

export type AppRoute = {
  key: AppRouteKey;
  label: string;
  path: string;
  kind: AppRouteKind;
  nav: boolean;
};

export const APP_ROUTES = [
  { key: "home", label: "Home", path: "/", kind: "home", nav: false },
  { key: "login", label: "Login", path: "/login", kind: "login", nav: false },
  { key: "skill-dashboard", label: "Skill Dashboard", path: "/skill-dashboard", kind: "skill-dashboard", nav: true },
  { key: "skill-trends", label: "Skill Trends", path: "/skill-trends", kind: "skill-trends", nav: true },
  { key: "skill-builder", label: "Skill Builder", path: "/skill-builder", kind: "skill-builder", nav: true },
  { key: "skill-opportunities", label: "Skill Opportunities", path: "/skill-opportunities", kind: "skill-opportunities", nav: true },
  { key: "profile", label: "Profile", path: "/profile", kind: "profile", nav: false },
  { key: "riasec", label: "RIASEC", path: "/RIASEC", kind: "riasec", nav: false },
  { key: "riasec-test", label: "RIASEC Test", path: "/RIASEC/test", kind: "riasec-test", nav: false },
  { key: "riasec-result", label: "RIASEC Result", path: "/RIASEC/test/result/:resultId", kind: "riasec-result", nav: false },
  { key: "riasec-history", label: "RIASEC History", path: "/RIASEC/test/result/history", kind: "riasec-history", nav: false },
] as const satisfies readonly AppRoute[];

export const NAV_ROUTES = APP_ROUTES.filter((route) => route.nav);

export function normalizePath(pathname: string) {
  if (pathname === "/home") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

export function getRouteByPath(pathname: string) {
  const path = normalizePath(pathname);
  if (path === "/RIASEC/test/result/history") return APP_ROUTES.find((route) => route.kind === "riasec-history") ?? APP_ROUTES[0];
  if (/^\/RIASEC\/test\/result\/[^/]+$/.test(path)) return APP_ROUTES.find((route) => route.kind === "riasec-result") ?? APP_ROUTES[0];
  return APP_ROUTES.find((route) => route.path === path) ?? APP_ROUTES[0];
}

export function isHomeRouteKey(key: AppRouteKey) {
  return key === "home";
}

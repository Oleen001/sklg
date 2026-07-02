const regexCache = new Map<string, RegExp>()

function compilePattern(pattern: string): RegExp {
  const cached = regexCache.get(pattern)
  if (cached) return cached

  const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const withParams = escaped.replace(/:[A-Za-z0-9_]+/g, '[^/]+')
  const regex = new RegExp(`^${withParams}$`)

  regexCache.set(pattern, regex)
  return regex
}

function normalize(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }
  return pathname
}

export function matchRoute(pathname: string, pattern: string): boolean {
  return compilePattern(pattern).test(normalize(pathname))
}

export function isRouteInList(pathname: string, patterns: ReadonlyArray<string>): boolean {
  return patterns.some((pattern) => matchRoute(pathname, pattern))
}

export function isNavItemActive(pathname: string, href: string): boolean {
  const normalized = normalize(pathname)
  if (href === '/') return normalized === '/'
  return normalized === href || normalized.startsWith(`${href}/`)
}

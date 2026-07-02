'use client'

import * as React from 'react'

import { cn } from '@/libs/utils.lib'

export interface SectionNavItem {
  id: string
  label: string
}

export interface SectionNavProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  sections: SectionNavItem[]
  /** Initial active id before scrolling reveals one. Defaults to the first section. */
  defaultActiveId?: string
}

/**
 * SectionNav — horizontal anchor navigation with scroll-spy active state.
 *
 * Renders one `<a href="#id">` per section. Clicking smooth-scrolls to the target;
 * an IntersectionObserver tracks which section is in view and marks it active.
 * The caller is responsible for sticky positioning — wrap in `sticky top-0 ...`.
 *
 * Target sections should set `scroll-mt-*` so they land below the sticky nav
 * when the browser anchors to them.
 */
export function SectionNav({ sections, defaultActiveId, className, ...props }: SectionNavProps) {
  const [activeId, setActiveId] = React.useState<string | undefined>(
    defaultActiveId ?? sections[0]?.id,
  )

  React.useEffect(() => {
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => ({ id: e.target.id, top: e.boundingClientRect.top }))
          .sort((a, b) => a.top - b.top)
        if (visible[0]) {
          setActiveId(visible[0].id)
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    )

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveId(id)
    if (window.history.replaceState) {
      window.history.replaceState(null, '', `#${id}`)
    }
  }

  return (
    <nav
      aria-label="Section navigation"
      className={cn(
        'flex items-center overflow-x-auto overflow-y-hidden border-b border-border-base-gray-medium w-full md:w-fit md:mx-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className,
      )}
      {...props}
    >
      {sections.map((section) => {
        const isActive = activeId === section.id
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => handleClick(e, section.id)}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'relative inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-t-lg px-4 py-3 text-base transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn-focus md:px-6',
              "after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px] after:content-['']",
              isActive
                ? 'font-semibold text-text-brand-primary-dark after:bg-border-brand-primary-dark'
                : 'text-text-base-secondary after:bg-transparent hover:text-text-base-primary hover:after:bg-border-brand-primary-medium',
            )}
          >
            {section.label}
          </a>
        )
      })}
    </nav>
  )
}

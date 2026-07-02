'use client'

import * as React from 'react'
import { cva } from 'class-variance-authority'
import { ChevronRight, MoreHorizontal } from 'lucide-react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/libs/utils.lib'

export type BreadcrumbTheme = 'light' | 'dark'

const BreadcrumbThemeContext = React.createContext<BreadcrumbTheme>('light')

const linkVariants = cva('rounded transition-colors hover:underline', {
  variants: {
    theme: {
      light: 'text-text-brand-primary-dark',
      dark: 'text-text-base-white',
    },
  },
  defaultVariants: { theme: 'light' },
})

const pageVariants = cva('font-medium', {
  variants: {
    theme: {
      light: 'text-text-base-primary',
      dark: 'text-text-base-white',
    },
  },
  defaultVariants: { theme: 'light' },
})

const separatorVariants = cva('[&>svg]:size-4', {
  variants: {
    theme: {
      light: 'text-text-base-secondary',
      dark: 'text-text-base-white',
    },
  },
  defaultVariants: { theme: 'light' },
})

function Breadcrumb({
  theme = 'light',
  ...props
}: React.ComponentProps<'nav'> & { theme?: BreadcrumbTheme }) {
  return (
    <BreadcrumbThemeContext.Provider value={theme}>
      <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
    </BreadcrumbThemeContext.Provider>
  )
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        'flex flex-wrap items-center gap-2 text-sm break-words text-text-base-secondary',
        className,
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn('inline-flex items-center gap-2', className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'a'
  const theme = React.useContext(BreadcrumbThemeContext)

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(linkVariants({ theme }), className)}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  const theme = React.useContext(BreadcrumbThemeContext)

  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(pageVariants({ theme }), className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  const theme = React.useContext(BreadcrumbThemeContext)

  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn(separatorVariants({ theme }), className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}

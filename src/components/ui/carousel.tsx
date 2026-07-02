'use client'

import * as React from 'react'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/libs/utils.lib'
import { IconButton } from '@/components/ui/icon-button'

const dotsContainerVariants = cva('flex items-center justify-center', {
  variants: {
    variant: {
      default: 'gap-2 h-3',
      bar: 'gap-0.5 h-1',
      banner: 'gap-1 h-1',
    },
  },
  defaultVariants: { variant: 'default' },
})

const dotVariants = cva('cursor-pointer rounded-full transition-all', {
  variants: {
    variant: { default: 'h-3', bar: 'h-2', banner: 'h-1' },
    active: { true: '', false: '' },
  },
  compoundVariants: [
    { variant: 'default', active: true, class: 'w-10 bg-text-brand-primary-medium' },
    { variant: 'default', active: false, class: 'w-3 bg-fill-base-gray-medium' },
    { variant: 'bar', active: true, class: 'w-10 bg-text-brand-primary-medium' },
    { variant: 'bar', active: false, class: 'w-5 bg-bg-transparent-black10' },
    { variant: 'banner', active: true, class: 'w-6 bg-bootcamp-banner-dot-active' },
    { variant: 'banner', active: false, class: 'w-4 bg-bootcamp-banner-dot-inactive' },
  ],
  defaultVariants: { variant: 'default', active: false },
})

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

function Carousel({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins,
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext],
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync initial scroll state on mount (shadcn carousel pattern)
    onSelect(api)
    api.on('reInit', onSelect)
    api.on('select', onSelect)

    return () => {
      api?.off('select', onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { carouselRef, orientation } = useCarousel()

  // py-2 / px-2 reserves room inside overflow:hidden so item focus rings & shadows aren't clipped.
  return (
    <div ref={carouselRef} className="overflow-hidden" data-slot="carousel-content">
      <div
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4 py-2' : '-mt-4 flex-col px-2',
          className,
        )}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  variant = 'soft',
  size = 'lg',
  ...props
}: React.ComponentProps<typeof IconButton>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  if (!canScrollPrev) return null

  return (
    <IconButton
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      aria-label="Previous slide"
      className={cn(
        'absolute z-10 [&_svg]:size-8',
        orientation === 'horizontal'
          ? 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2'
          : '-top-6 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeft />
    </IconButton>
  )
}

function CarouselNext({
  className,
  variant = 'soft',
  size = 'lg',
  ...props
}: React.ComponentProps<typeof IconButton>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  if (!canScrollNext) return null

  return (
    <IconButton
      data-slot="carousel-next"
      variant={variant}
      size={size}
      aria-label="Next slide"
      className={cn(
        'absolute z-10 [&_svg]:size-8',
        orientation === 'horizontal'
          ? 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2'
          : '-bottom-6 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRight />
    </IconButton>
  )
}

function CarouselDots({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof dotsContainerVariants>) {
  const { api } = useCarousel()
  const [snapCount, setSnapCount] = React.useState(0)
  const [activeSnap, setActiveSnap] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    const update = () => {
      setSnapCount(api.scrollSnapList().length)
      setActiveSnap(api.selectedScrollSnap())
    }
    update()
    api.on('select', update)
    api.on('reInit', update)
    return () => {
      api.off('select', update)
      api.off('reInit', update)
    }
  }, [api])

  if (snapCount <= 1) return null

  return (
    <div
      data-slot="carousel-dots"
      className={cn(dotsContainerVariants({ variant }), className)}
      {...props}
    >
      {Array.from({ length: snapCount }).map((_, idx) => (
        <button
          key={idx}
          type="button"
          aria-label={`Go to slide ${idx + 1}`}
          aria-current={idx === activeSnap}
          onClick={() => api?.scrollTo(idx)}
          className={dotVariants({ variant, active: idx === activeSnap })}
        />
      ))}
    </div>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
}

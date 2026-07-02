import { cn } from '@/libs/utils.lib'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('animate-pulse rounded-md bg-fill-base-gray-light', className)} {...props} />
  )
}

export { Skeleton }

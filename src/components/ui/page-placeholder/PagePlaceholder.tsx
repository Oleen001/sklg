interface PagePlaceholderProps {
  title: string
  description?: string
  contentRef?: string
  figmaRef?: string
}

export function PagePlaceholder({
  title,
  description,
  contentRef,
  figmaRef,
}: PagePlaceholderProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 py-12 text-center">
      <span className="rounded-full bg-bg-system-warning-light px-3 py-1 text-xs font-medium text-text-system-warning">
        TODO — scaffolded page
      </span>
      <h1 className="text-2xl font-semibold text-text-base-primary md:text-3xl">{title}</h1>
      {description ? (
        <p className="max-w-xl text-base text-text-base-secondary">{description}</p>
      ) : null}
      {(contentRef || figmaRef) && (
        <div className="mt-4 flex flex-col gap-1 text-sm text-text-base-tertiary">
          {contentRef ? (
            <span>
              Content: <code className="font-mono">{contentRef}</code>
            </span>
          ) : null}
          {figmaRef ? (
            <span>
              Figma: <code className="font-mono">{figmaRef}</code>
            </span>
          ) : null}
        </div>
      )}
    </div>
  )
}

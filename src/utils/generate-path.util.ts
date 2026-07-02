type ExtractParams<T extends string> = T extends `${string}:${infer Param}/${infer Rest}`
  ? Param | ExtractParams<`/${Rest}`>
  : T extends `${string}:${infer Param}`
    ? Param
    : never

type PathParams<T extends string> = {
  [K in ExtractParams<T>]: string | number
}

type GeneratePathArgs<T extends string> = [ExtractParams<T>] extends [never]
  ? []
  : [params: PathParams<T>]

export function generatePath<T extends string>(pattern: T, ...args: GeneratePathArgs<T>): string {
  const params = args[0] as Record<string, string | number> | undefined
  if (!params) return pattern
  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replaceAll(`:${key}`, encodeURIComponent(String(value))),
    pattern as string,
  )
}

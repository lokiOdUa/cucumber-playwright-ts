export function truncate(value: string, maxLength: number): string {
  if (value && value.length > maxLength) {
    return `${value.slice(0, maxLength)}...`
  }

  return value
}

export function isError(o): o is Error {
  return (
    o instanceof Error ||
    (typeof o.stack === 'string' && typeof o.message === 'string')
  )
}

export function isNullOrUndefined(value: any): value is null | undefined {
  return value === undefined || value === null
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

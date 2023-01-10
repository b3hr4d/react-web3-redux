export function getEllipsis(str?: string, s = 4, e = 4) {
  if (!str) return ""
  return str.slice(0, s) + "..." + str.slice(-e)
}

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export default function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T {
  let lastCall = 0

  return function (...args: Parameters<T>): ReturnType<T> | undefined {
    const now = new Date().getTime()

    if (now - lastCall < delay) {
      return
    }

    lastCall = now
    return func(...args)
  } as T
}

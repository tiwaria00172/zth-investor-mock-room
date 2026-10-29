import { useEffect, useState } from 'react'

export function useAnimatedCounter(targetValue: number, duration: number = 1000): number {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(targetValue)
      return
    }

    if (targetValue === 0) {
      setDisplayValue(0)
      return
    }

    let startTimestamp: number | null = null
    const startValue = 0

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const elapsed = timestamp - startTimestamp
      const progress = Math.min(elapsed / duration, 1)

      // Smooth cubic ease-out curve
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(startValue + (targetValue - startValue) * easeOut)

      setDisplayValue(current)

      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        setDisplayValue(targetValue)
      }
    }

    const frameId = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(frameId)
  }, [targetValue, duration])

  return displayValue
}

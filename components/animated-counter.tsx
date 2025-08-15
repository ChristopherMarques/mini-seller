"use client"

import { useEffect, useState } from "react"

interface AnimatedCounterProps {
  value: number
  duration?: number
  suffix?: string
  decimals?: number
}

export function AnimatedCounter({ value, duration = 2000, suffix = "", decimals = 0 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = value * easeOutQuart

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [value, duration])

  const formatNumber = (num: number) => {
    if (decimals === 0) {
      return Math.floor(num).toString()
    }
    return num.toFixed(decimals)
  }

  return (
    <span className="tabular-nums">
      {formatNumber(count)}
      {suffix}
    </span>
  )
}

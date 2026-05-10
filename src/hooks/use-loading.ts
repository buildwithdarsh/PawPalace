"use client"

import { useState, useEffect } from "react"

export function useLoading(delay: () => Promise<void>) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    delay().then(() => {
      if (!cancelled) setIsLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return isLoading
}

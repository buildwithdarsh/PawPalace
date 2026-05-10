"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "light" | "dark"
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  setTheme: () => {},
  resolvedTheme: "light",
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system")
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const stored = localStorage.getItem("pawpalace-theme") as Theme | null
    if (stored) setTheme(stored)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    let resolved: "light" | "dark"

    if (theme === "system") {
      resolved = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    } else {
      resolved = theme
    }

    setResolvedTheme(resolved)
    root.classList.toggle("dark", resolved === "dark")
  }, [theme])

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem("pawpalace-theme", newTheme)
  }

  return (
    <ThemeContext value={{ theme, setTheme: handleSetTheme, resolvedTheme }}>
      {children}
    </ThemeContext>
  )
}

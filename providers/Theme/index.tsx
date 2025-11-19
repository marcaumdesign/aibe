'use client'

import React, { createContext, useCallback, use, useEffect, useState } from 'react'

import type { Theme, ThemeContextType } from './types'

import canUseDOM from '@/utilities/canUseDOM'
import { defaultTheme, getImplicitPreference, themeLocalStorageKey } from './shared'
import { themeIsValid } from './types'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: undefined,
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme | undefined>(
    canUseDOM ? (document.documentElement.getAttribute('data-theme') as Theme) : undefined,
  )

  const setTheme = useCallback((themeToSet: Theme | null) => {
    // Forçar sempre o tema claro, ignorar qualquer tentativa de mudança
    setThemeState('light')
    window.localStorage.setItem(themeLocalStorageKey, 'light')
    document.documentElement.setAttribute('data-theme', 'light')
  }, [])

  useEffect(() => {
    // Forçar sempre o tema claro
    const themeToSet: Theme = 'light'

    // Limpar qualquer preferência salva
    window.localStorage.setItem(themeLocalStorageKey, 'light')
    
    document.documentElement.setAttribute('data-theme', themeToSet)
    setThemeState(themeToSet)
  }, [])

  return <ThemeContext.Provider value={{ setTheme, theme }}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => use(ThemeContext)

import type { Theme } from './types'

export const themeLocalStorageKey = 'payload-theme'

export const defaultTheme = 'light'

// Forçar sempre o tema claro, ignorando preferências do sistema
export const getImplicitPreference = (): Theme => {
  return 'light'
}

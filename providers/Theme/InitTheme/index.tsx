import Script from 'next/script'
import React from 'react'

import { defaultTheme, themeLocalStorageKey } from '../ThemeSelector/types'

export const InitTheme: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    // Forçar sempre o tema claro, ignorando preferências do sistema e localStorage
    var themeToSet = 'light'
    
    // Garantir que o localStorage também está definido como light
    window.localStorage.setItem('${themeLocalStorageKey}', 'light')
    
    document.documentElement.setAttribute('data-theme', themeToSet)
  })();
  `,
      }}
      id="theme-script"
      strategy="beforeInteractive"
    />
  )
}

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { getEffectiveTheme, setThemeCookie, type Theme } from '~/utils/cookies';

interface ThemeContextType {
  theme: Theme;
  effectiveTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return initialTheme || 'system';
  });

  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') {
      return initialTheme === 'system' ? 'light' : (initialTheme as 'light' | 'dark') || 'light';
    }
    return getEffectiveTheme(initialTheme || 'system');
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    setThemeCookie(newTheme);

    const newEffectiveTheme = getEffectiveTheme(newTheme);
    setEffectiveTheme(newEffectiveTheme);

    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      const themeClass = String(newEffectiveTheme).trim();
      if (themeClass && (themeClass === 'light' || themeClass === 'dark')) {
        document.documentElement.classList.add(themeClass);
      } else {
        console.error('Invalid theme class:', themeClass, 'from theme:', newTheme);
      }
    }
  };

  const isDark = effectiveTheme === 'dark';

  // Handle client-side hydration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const clientEffectiveTheme = getEffectiveTheme(theme);
      if (clientEffectiveTheme !== effectiveTheme) {
        setEffectiveTheme(clientEffectiveTheme);
      }
    }
  }, [theme, effectiveTheme]);

  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      const newEffectiveTheme = getEffectiveTheme('system');
      setEffectiveTheme(newEffectiveTheme);

      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('light', 'dark');
        const themeClass = String(newEffectiveTheme).trim();
        if (themeClass && (themeClass === 'light' || themeClass === 'dark')) {
          document.documentElement.classList.add(themeClass);
        } else {
          console.error('Invalid theme class in handleChange:', themeClass);
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      const themeClass = String(effectiveTheme).trim();
      if (themeClass && (themeClass === 'light' || themeClass === 'dark')) {
        document.documentElement.classList.add(themeClass);
      } else {
        console.error(
          'Invalid theme class in useEffect:',
          themeClass,
          'effectiveTheme:',
          effectiveTheme,
        );
      }
    }
  }, [effectiveTheme]);

  const value: ThemeContextType = {
    theme,
    effectiveTheme,
    setTheme,
    isDark,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

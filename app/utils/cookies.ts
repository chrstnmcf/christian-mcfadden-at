/**
 * Client-side theme utilities
 */

export type Theme = 'light' | 'dark' | 'system';

/**
 * Get the effective theme (resolves 'system' to actual light/dark)
 */
export function getEffectiveTheme(theme: Theme): 'light' | 'dark' {
  if (typeof theme !== 'string') {
    console.warn('Invalid theme type:', typeof theme, theme);
    return 'light';
  }
  
  if (theme === 'system') {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    // Default to light for SSR when system preference is not available
    return 'light';
  }
  
  // Ensure we only return valid theme values
  if (theme === 'light' || theme === 'dark') {
    return theme;
  }
  
  console.warn('Invalid theme value:', theme);
  return 'light';
}

/**
 * Set theme cookie on client side
 */
export function setThemeCookie(theme: Theme): void {
  if (typeof document === 'undefined') return;
  
  try {
    // Simple cookie setting for client-side
    const expires = new Date();
    expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 year
    
    document.cookie = `theme=${theme};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  } catch (error) {
    console.error('Failed to set theme cookie:', error);
  }
}

/**
 * Get theme from cookie on client side
 */
export function getThemeFromCookie(): Theme {
  if (typeof document === 'undefined') return 'system';
  
  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; theme=`);
    if (parts.length === 2) {
      const theme = parts.pop()?.split(';').shift();
      if (theme === 'light' || theme === 'dark' || theme === 'system') {
        return theme;
      }
    }
    return 'system';
  } catch (error) {
    console.error('Failed to parse theme cookie:', error);
    return 'system';
  }
}

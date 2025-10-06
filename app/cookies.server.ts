import { createCookie } from 'react-router';

export type Theme = 'light' | 'dark' | 'system';

export const themeCookie = createCookie('theme', {
  maxAge: 60 * 60 * 24 * 365, // 1 year
  path: '/',
  sameSite: 'lax',
  httpOnly: false, // Allow client-side access for theme switching
  secure: process.env.NODE_ENV === 'production',
});

export { themeCookie as THEME_COOKIE_NAME };

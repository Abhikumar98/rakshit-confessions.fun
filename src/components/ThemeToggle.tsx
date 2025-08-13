'use client';

import { Moon, Sun } from 'lucide-react';
import * as React from 'react';

/**
 * A simple dark/light mode toggle that adds or removes the `dark` class on the
 * <html> element.  Tailwind is configured with `darkMode: 'class'`.
 */
export default function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const root = document.documentElement;

    // Determine user/system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const hasClass = root.classList.contains('dark');

    // Sync <html> class to either existing class or system preference
    if (!hasClass && prefersDark) root.classList.add('dark');
    if (hasClass && !prefersDark) root.classList.remove('dark');

    setIsDark(root.classList.contains('dark'));
  }, []);

  function toggle() {
    const root = document.documentElement;
    root.classList.toggle('dark');
    setIsDark(root.classList.contains('dark'));
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className='absolute top-0 right-0 m-8 h-8 w-8 text-neutral-700 transition-colors hover:text-black dark:text-neutral-100 dark:hover:text-white'
    >
      {isDark ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
}

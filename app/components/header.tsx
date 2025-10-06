import { Link } from 'react-router';

import { useTheme } from '~/contexts/ThemeContext';
import useStickyHeader from '~/hooks/useStickyHeader';
import { classNames } from '~/utils/helper';

import { Bluesky } from './social/bluesky';
import { GitHub } from './social/github';
import { LinkedIn } from './social/linkedin';
import Toggle from './toggle';

export function Header() {
  const sticky = useStickyHeader(0);
  const { isDark, setTheme } = useTheme();

  const headerClass = classNames(
    'z-20 flex bg-white/80 backdrop-blur-xl dark:bg-gray-900/80 h-18 transition-shadow inset-x-0',
    !sticky && 'absolute top-0',
    sticky && `fixed h-12 top-0 shadow-sm dark:border-b dark:border-gray-800`,
  );

  const iconClassName = classNames(
    'grayscale opacity-60 hover:filter-none hover:opacity-100 transition-all',
  );

  return (
    <header className={headerClass}>
      <nav className="container flex items-center justify-between text-gray-400">
        <Link to="/" className="flex flex-auto">
          <h1 className="header-title">christian.mcfadden</h1>
        </Link>
        <ul className="list-none grid grid-flow-col items-center gap-3 md:gap-5">
          <li>
            <a
              className="text-gray-400 dark:text-gray-500 hover:text-black"
              href="https://github.com/chrstnmcf"
              rel="noreferrer"
              target="_blank"
              aria-label="GitHub"
            >
              <GitHub size={24} className={iconClassName} />
            </a>
          </li>
          <li>
            <a
              className="text-gray-400 dark:text-gray-500 hover:text-purple-500"
              href="https://www.linkedin.com/in/christianmcfadden0/"
              rel="noreferrer"
              target="_blank"
              aria-label="LinkedIn"
            >
              <LinkedIn size={24} className={iconClassName} />
            </a>
          </li>
          <li>
            <a
              className="text-gray-400 dark:text-gray-500 hover:text-blue-400"
              href="https://bsky.app/profile/chris.mcfadden.at"
              rel="noreferrer"
              target="_blank"
              aria-label="Bluesky"
            >
              <Bluesky size={24} className={iconClassName} />
            </a>
          </li>

          <li className="flex">
            <Toggle 
              label="Toggle dark mode" 
              active={isDark}
              onClick={() => setTheme(isDark ? 'light' : 'dark')} 
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}

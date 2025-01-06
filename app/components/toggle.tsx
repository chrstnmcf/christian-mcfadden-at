import { useState } from 'react';

import { classNames } from '~/utils/helper';

type ToggleSize = 'sm' | 'md' | 'lg';

interface ToggleStyleProps {
  active?: boolean;
  size?: ToggleSize;
}

interface ToggleProps extends ToggleStyleProps {
  label?: string;
  onClick: (_active: boolean) => void;
}

const toggleButtonClass = (active: boolean) =>
  classNames(
    `relative inline-flex flex-shrink-0`,
    `cursor-pointer transition-colors ease-in-out duration-200`,
    `border-2 border-transparent rounded-full`,
    `focus:ring-2 focus:ring-gray-400 focus:outline-none focus:ring-opacity-50`,
    active ? `bg-gray-700` : `bg-gray-300`,
  );

const toggleBackgroundClass = (size: ToggleSize) =>
  classNames(
    `rounded-full flex items-center justify-center text-gray-400 text-xs`,
    `w-8 h-4`,
    size === 'sm' && `w-6 h-3`,
    size === 'lg' && `w-12 h-6`,
  );

const toggleCircleClass = (active: boolean, size: ToggleSize) =>
  classNames(
    `bg-white absolute transition ease-in-out duration-200 rounded-full shadow flex items-center justify-center transform`,
    !active && `translate-x-0 text-gray-500 text-xs`,
    active && `translate-x-full text-gray-900 text-xs`,
    `h-3 w-3`,
    size === 'lg' && `h-6 w-6`,
    size === 'md' && `h-4 w-4`,
  );

export default function Toggle({
  active = false,
  label = 'Toggle',
  size = 'md',
  onClick,
}: ToggleProps) {
  const [activeState, setActiveState] = useState(active);

  const toggled = () => {
    setActiveState(!activeState);

    if (onClick) {
      onClick(!activeState);
    }
  };

  return (
    <>
      <div
        className={toggleButtonClass(activeState)}
        role="checkbox"
        aria-checked={activeState}
        aria-label={label}
        onClick={toggled}
      >
        <input value={activeState ? 'active' : 'inactive'} type="hidden" />
        <span className={toggleBackgroundClass(size)} />
        <span className={toggleCircleClass(activeState, size)} aria-hidden="true" />
      </div>
    </>
  );
}

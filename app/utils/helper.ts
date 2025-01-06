export function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(' ');
}

type ClassNamesModifier =
  | 'hover'
  | 'focus'
  | 'active'
  | 'group-hover'
  | 'group-focus'
  | 'group-active'
  | 'before'
  | 'after'
  | 'hover:before'
  | 'hover:after';

// prefix every class with a modifier, also the classes in the string including the first class in the string elements
export function classNamesModifier(
  modifier: ClassNamesModifier,
  ...classes: (false | null | undefined | string)[]
) {
  return classes
    .filter(Boolean)
    .map((className) => {
      if (typeof className !== 'string') {
        return className;
      }
      const classes = className.split(' ');
      return `${modifier}:${classes.join(` ${modifier}:`)}`;
      // return `${modifier}:${className}`;
    })
    .join(' ');
}

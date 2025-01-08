import { useEffect, useState } from 'react';

export default function useStickyHeader(offset: number) {
  const [sticky, setSticky] = useState(false);

  const handleScroll = () => {
    const { scrollY } = window;
    if (scrollY > offset) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return sticky;
}

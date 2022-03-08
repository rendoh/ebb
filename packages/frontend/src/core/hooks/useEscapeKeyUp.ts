import { useEffect } from 'react';

export function useEscapeKeyUp(fn?: () => void) {
  useEffect(() => {
    const handleKeyup = ({ key }: KeyboardEvent) => {
      if (key === 'Escape') {
        fn?.();
      }
    };
    window.addEventListener('keyup', handleKeyup);
    return () => {
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [fn]);
}

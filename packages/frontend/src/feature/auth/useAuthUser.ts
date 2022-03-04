import { User, getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';

export function useAuthUser() {
  const [user, setUser] = useState<User | null | false>(false);

  useEffect(() => {
    const auth = getAuth();
    const unregisterAuthObserver = auth.onAuthStateChanged(setUser);
    return () => unregisterAuthObserver();
  }, []);

  return user;
}

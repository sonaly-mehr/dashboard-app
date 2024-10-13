'use client';

import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { useRouter } from 'next/navigation';

const withAuth = (Component) => {
  return (props) => {
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const checkSession = async () => {
        const { data: { session } } = await supabase.auth.getSession(); // Updated to getSession
        if (!session) {
          router.push('/login');
        } else {
          setAuthenticated(true);
        }
      };

      checkSession();
    }, []);

    return authenticated ? <Component {...props} /> : null;
  };
};

export default withAuth;
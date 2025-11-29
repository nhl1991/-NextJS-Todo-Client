"use client";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

interface AuthContext {
    user: User | null,
    loading: boolean,
    setUser: Dispatch<SetStateAction<User|null>>
}

interface User {
    email: string,
    username: string,
    userId: number
}

// useAuth.ts
export const AuthContext = createContext<AuthContext|null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User|null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(()=>{
    const fetchMe = async () => {
      try {
        const res = await fetch('http://localhost:3001/auth/me', {
          credentials: 'include',
          method: 'GET'
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        console.log('auth : ', data);
        setUser(data); // { id, email, username } 형태라고 가정
      } catch (e) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchMe();
  },[])



  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

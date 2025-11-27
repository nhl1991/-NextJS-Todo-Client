"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { setUser } = useAuth();
  const handleSignIn = async () => {
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "newEmail@naver.com",
        password: "mypassword",
      }),
      credentials: 'include'
    });

    if (response.ok) {
      const {username, userId, email, message} = await response.json();
        console.log('리스폰스 OK : ', userId);
        setUser({username, email, userId})
      router.push("/");
    }
  };

  return (
    <>
      <button onClick={handleSignIn}>Log IN</button>
    </>
  );
}

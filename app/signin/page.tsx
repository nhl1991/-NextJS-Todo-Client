"use client";

import Main from "@/components/ui/main";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
/**
 * 
 *  "newEmail@naver.com"
 *  "mypassword",,
 */
export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { setUser } = useAuth();
  const handleSignIn = async () => {
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: 'include'
    });

    if (response.ok) {
      const { username, userId, email, message } = await response.json();
      console.log('리스폰스 OK : ', userId);
      setUser({ username, email, userId })
      router.push("/");
    }
  };

  return (
    <Main>
      <header>
        <h1 className="text-3xl my-12">SIGN IN</h1>
      </header>
      <section className="max-w-80 w-full min-w-60 h-72 p-12 flex flex-col items-center justify-between bg-slate-200 rounded-xl mb-48">

        <div className="flex flex-col gap-4 ">
          <div>
            <label htmlFor="email" className="font-bold text-xs">EMAIL</label>
            <input className="inputField" type="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="email" />
          </div>
          <div>
            <label htmlFor="password" className="font-bold text-xs">PASSWORD</label>
            <input className="inputField" type="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="passowrd" />
          </div>
        </div>
        <div className="mt-16">
          <button className="btn-hover" onClick={handleSignIn}>Log IN</button>
        </div>
      </section>
    </Main>
  );
}

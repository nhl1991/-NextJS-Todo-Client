"use client";

import Main from "@/components/ui/main";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth()
  const handleSignUp = async () => {
    const response = await fetch("http://localhost:3001/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
      }),
    });
    if (response.ok) {
      const result = await response.json();
      console.log(result)
      // setUser(result)
      router.push("/");
    }
  };

  return (
    <Main>
      <header>
        <h1 className="text-3xl my-12">SIGN UP</h1>
      </header>
      <section className="max-w-80 w-full min-w-60 h-72 p-12 flex flex-col items-center justify-between bg-slate-200 rounded-xl mb-48">

        <div className="flex flex-col gap-4 ">
          <div>
            <label htmlFor="email" className="font-bold text-xs">EMAIL</label>
            <input className="inputField" type="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="EMAIL" />
          </div>
          <div>
            <label htmlFor="password" className="font-bold text-xs">PASSWORD</label>
            <input className="inputField" type="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="PASSWORD" />
          </div>
          <div>
            <label htmlFor="password" className="font-bold text-xs">USERNAME</label>
            <input className="inputField" type="text" id="username" onChange={(e) => setUsername(e.target.value)} placeholder="USERNAME" />
          </div>          </div>
        <div className="mt-2">
          <button className="btn-hover" onClick={handleSignUp}>SIGN UP</button>
        </div>
      </section>
      <p>{email},{password},{username}</p>
    </Main>
  );
}

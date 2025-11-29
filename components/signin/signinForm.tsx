'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { SERVER_URL } from "@/lib/server";
export default function SignInForm() {

  const router = useRouter();
      const [email, setEmail] = useState<string>();
      const [password, setPassword] = useState<string>();
      const [ error, setError ] = useState<string>('');
      const { setUser } = useAuth();
      const handleSignIn = async () => {
        if(password=='' || email == '') return;
    
        const response = await fetch(`${SERVER_URL}/auth/login`, {
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
        }else {
          const result = await response.json();
          setError(result.message);
        }
      };
  return (
    <>
      <div className="flex flex-col gap-4 ">
        <div>
          <label htmlFor="email" className="font-bold text-xs">
            EMAIL
          </label>
          <input
            className="inputField"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div>
          <label htmlFor="password" className="font-bold text-xs">
            PASSWORD
          </label>
          <input
            className="inputField"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
      </div>
      <div className="">
        <button className="btn-hover" onClick={handleSignIn}>
          SIGN IN
        </button>
      </div>
      <div className="min-h-4 text-red-500">
        <p>{error}</p>
      </div>
    </>
  );
}

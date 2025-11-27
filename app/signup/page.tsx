"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { setUser } = useAuth()
  const handleButtonSignUp = async () => {
    const response = await fetch("http://localhost:3001/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test918@naver.com",
        password: "mypassword",
        username: "dasboot",
      }),
    });
    if (response.ok) {
        const result = await response.json();
        setUser(result)
      router.push("/");
    }
  };

  return (
    <>
      <button onClick={handleButtonSignUp}>가입</button>
    </>
  );
}

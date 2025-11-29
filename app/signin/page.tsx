"use client";

import Main from "@/components/common/ui/main";
import SignInForm from "@/components/signin/signinForm";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
/**
 *
 *  "newEmail@naver.com"
 *  "mypassword",,
 */
export default function Page() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) router.push("/");
  }, []);

  return (
    <Main>
      <header>
        <h1 className="text-3xl my-12">SIGN IN</h1>
      </header>
      <section className="max-w-80 w-full min-w-60 h-80 p-12 flex flex-col items-center justify-between bg-zinc-100 shadow-2xl rounded-xl mb-48">
        <SignInForm />
      </section>
    </Main>
  );
}

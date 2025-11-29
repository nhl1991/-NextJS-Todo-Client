"use client";

import Main from "@/components/common/ui/main";
import SignUpForm from "@/components/signup/signupForm";

export default function Page() {
  return (
    <Main>
      <header>
        <h1 className="text-3xl my-12">SIGN UP</h1>
      </header>
      <section className="max-w-80 w-full min-w-60 h-96 p-12 flex flex-col items-center justify-between bg-zinc-100 shadow-2xl rounded-xl mb-48">
        <SignUpForm />
      </section>
    </Main>
  );
}

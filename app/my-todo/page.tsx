"use client";
import UserTodoList from "@/components/my-todo/userTodoList";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return router.push("/signin");
  });

  if (user)
    return (
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center  bg-white py-12 px-8 rounded-xl shadow-2xl">
        <UserTodoList user={user} />
      </main>
    );
}

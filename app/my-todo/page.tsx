"use client";
import Main from "@/components/common/ui/main";
import TodoContainer from "@/components/common/ui/todoContainer";
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
      // <main className="flex min-h-screen w-full md:max-w-3xl flex-col items-center bg-white justify-center py-32 md:px-16 px-8 shadow-2xl rounded-xl">
      <Main>
        <UserTodoList user={user} />
      </Main>
      // </main>
    );
}

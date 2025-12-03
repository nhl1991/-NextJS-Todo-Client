"use client";
import TodoItem from "@/components/common/components/todoItem";
import TodoSkeleton from "@/components/common/skeleton/todoSkeleton";
import Main from "@/components/common/ui/main";
import TodoContainer from "@/components/common/ui/todoContainer";
import { useAuth } from "@/hooks/useAuth";
import { SERVER_URL } from "@/lib/server";
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();
  useEffect(() => {
    const fetchPublicTodo = async () => {
      setLoading(true);
      const response = await fetch(`${SERVER_URL}/todo`, {
        method: "GET",
      });
      if (response.ok) {
        const result = await response.json();
        setTodos(result);
        setLoading(false);
      }
    };

    fetchPublicTodo();
  }, []);

  return (
    <Main>
      <TodoContainer>
        {loading ? (
          <>
            <article className="w-screen h-screen flex items-center justify-center p-4 fixed bg-black/50 top-0 left-0 z-10">
              <div className="md:max-w-80 w-full h-80 rounded-xl bg-white text-black p-2 flex flex-col justify-between items-center justify-center">
                <h2 className="text-xl font-extrabold py-8">ご案内</h2>
                <p className="px-4">
                  サーバーとデータベースを無料プランで運用しているため、コールドスタートに時間がかかる場合があります。
                  <br />
                  少々お待ちいただけますと幸いです。
                </p>
              </div>
            </article>
            {Array.from({ length: 10 }).map((_, idx) => (
              <TodoSkeleton key={idx} />
            ))}
          </>
        ) : todos ? (
          todos.map((item: Todo) => {
            return (
              <TodoItem
                key={item.id}
                item={item}
                userId={user ? user.userId : null}
                setTodo={setTodos}
              />
            );
          })
        ) : null}
      </TodoContainer>
    </Main>
  );
}

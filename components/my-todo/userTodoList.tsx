"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TodoContainer from "../common/ui/todoContainer";
import TodoItem from "../common/components/todoItem";
import { Todo } from "@/types/todo";
import TodoSkeleton from "../common/skeleton/todoSkeleton";
import CreateTodo from "./createTodo";
import { SERVER_URL } from "@/lib/server";

export default function UserTodoList({
  user,
}: {
  user: { email: string; username: string; userId: number };
}) {
  const params = useSearchParams().get("userId");
  const [todo, setTodo] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTodos = async () => {
      if (!params) return;

      setLoading(true);
      try {
        const response = await fetch(`${SERVER_URL}/todo/my-todo/${params}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const todos = await response.json();
          if (todos.length === 0) return;
          setTodo(todos);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return (
    <>
      <TodoContainer>
        <CreateTodo
          username={user.username}
          userId={user.userId}
          setTodo={setTodo}
        />
        {loading
          ? Array.from({ length: 10 }).map((_, idx) => (
              <TodoSkeleton key={idx} />
            ))
          : todo.length != 0
          ? todo.map((item: Todo) => {
              return (
                <TodoItem
                  key={item.id}
                  item={item}
                  userId={item.authorId}
                  setTodo={setTodo}
                />
              );
            })
          : null}
      </TodoContainer>
    </>
  );
}

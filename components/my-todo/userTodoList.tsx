"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TodoContainer from "../common/ui/todoContainer";
import TodoItem from "../common/components/todoItem_tmp";
import { Todo } from "@/types/todo";
import TodoSkeleton from "../common/skeleton/todoSkeleton";

export default function UserTodoList() {
  const params = useSearchParams().get("userId");
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchTodos = async () => {

      if (!params) return;

      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3001/todo/my-todo/${params}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

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
    <TodoContainer>
      {loading ? Array.from({length: 10}).map((_,idx)=> <TodoSkeleton key={idx} />):todo.length != 0
        ? todo.map((item: Todo) => {
            return (
              <TodoItem key={item.id} item={item} userId={item.authorId} />
            );
          })
        : null}
    </TodoContainer>
  );
}

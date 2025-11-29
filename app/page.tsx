"use client";
import TodoItem from "@/components/common/components/todoItem_tmp";
import TodoSkeleton from "@/components/common/skeleton/todoSkeleton";
import Main from "@/components/common/ui/main";
import TodoContainer from "@/components/common/ui/todoContainer";
import { useAuth } from "@/hooks/useAuth";
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();
  useEffect(() => {
    const fetchPublicTodo = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:3001/todo", {
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
          Array.from({length: 10}).map((_,idx) => <TodoSkeleton key={idx} />)
        ) : todos ? (
          todos.map((item: Todo) => {
            return (
              <TodoItem
                key={item.id}
                item={item}
                userId={user ? user.userId : null}
              />
            );
          })
        ) : null}
      </TodoContainer>
    </Main>
  );
}

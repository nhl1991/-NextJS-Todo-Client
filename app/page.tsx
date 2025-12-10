"use client";

import AlertModal from "@/components/common/components/alertModal";
import TodoItem from "@/components/common/components/todoItem";
import TodoSkeleton from "@/components/common/skeleton/todoSkeleton";
import Main from "@/components/common/ui/main";
import TodoContainer from "@/components/common/ui/todoContainer";
import TodoItemWrapper from "@/components/common/ui/todoItemWrapper";
import { useAuth } from "@/hooks/useAuth";
import { SERVER_URL } from "@/lib/serverUrl";
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(true);
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
            {modalOpen ? (
              <AlertModal setModalOpen={setModalOpen} />
            ) : null}
            {Array.from({ length: 10 }).map((_, idx) => (
              <TodoSkeleton key={idx} />
            ))}
          </>
        ) : todos ? (
          todos.map((item: Todo) => (
            <TodoItemWrapper key={item.id}>
              <TodoItem item={item} />
              <div className="h-10"></div>
            </TodoItemWrapper>
          ))
        ) : null}
      </TodoContainer>
    </Main>
  );
}

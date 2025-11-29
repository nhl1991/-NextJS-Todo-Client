"use client";

import { Dispatch, SetStateAction, useState } from "react";
import ConfirmModal from "./confirmModal";
import { SERVER_URL } from "@/lib/server";
import { Todo } from "@/types/todo";

export default function CompleteButton({
  id,
  title,
  setTodo,
}: {
  id: string;
  title: string;
  setTodo: Dispatch<SetStateAction<Todo[]>>;
}) {
  // const [_, setIsCompleted] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);

  const handleOnClick = async () => {
    setIsModal(true);
  };
  const deletePost = async () => {
    // Delete
    try {
      const response = await fetch(`${SERVER_URL}/todo/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if(response.ok){
        setTodo((prev) => prev.filter((todo) => todo.id !== id))
      }

    } catch (err) {}
  };
  const onConfirm = async () => {

    await deletePost();
    setIsModal(false);
  };
  const onCancel = () => {
    setIsModal(false);

  };

  return (
    <>
      {isModal ? (
        <ConfirmModal onConfirm={onConfirm} onCancel={onCancel} title={title} />
      ) : null}
      <button className="btn-hover" onClick={handleOnClick}>
        完了
      </button>
    </>
  );
}

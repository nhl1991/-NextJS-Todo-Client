"use client";

import { useState } from "react";
import ConfirmModal from "./confirmModal";
import { SERVER_URL } from "@/lib/server";

export default function CompleteButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);

  const handleOnClick = async () => {
    setIsModal(true);
  };
  const deletePost = async () => {
    // Delete
    await fetch(`${SERVER_URL}/todo/${id}`,{
      method: 'DELETE',
      credentials: 'include',
    })
  };
  const onConfirm = async () => {
    setIsCompleted(true);
    await deletePost();
    setIsModal(false);
  };
  const onCancel = () => {
    setIsModal(false);
    setIsCompleted(false);
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

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import InputTitle from "../common/components/inputTitle";
import InputContent from "../common/components/InputContent";


export default function CreateTodo({
  username,
  userId,
}: {
  username: string;
  userId: number;
}) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleOnCreate = async () => {
    const body = {
      userId: userId,
      title: title,
      content: content,
      published: true,
      public: isPublic,
    };

    const response = await fetch("http://localhost:3001/todo/create", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      setTitle("");
      setContent("");
      setIsPublic(false);
      router.refresh();
    } else {
      const error = await response.json();
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col bg-white shadow-2xl max-w-2xl w-full min-h-96 px-8 py-4 rounded-xl gap-4">
      <h2 className="text-xl font-bold">{username}&apos;s Todo</h2>
      <InputTitle title={title} setTitle={setTitle} />
      <InputContent content={content} setContent={setContent} />
      <div className="w-full flex justify-between p-2">
        <div
          className={`flex gap-2 font-bold text-base text-white px-3 py-1.5 cursor-pointer rounded-xl ${
            isPublic ? "bg-sky-400" : "bg-slate-400"
          }`}
        >
          <input
            id="public"
            className=""
            type="checkbox"
            defaultChecked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          <label htmlFor="public">公開</label>
        </div>
        <button className="btn-hover" onClick={handleOnCreate}>
          登録
        </button>
      </div>
    </div>
  );
}

"use client";
import { Todo } from "@/types/todo";
import CompleteButton from "./completeButton";
import { Dispatch, SetStateAction, useState } from "react";

import InputTitle from "./inputTitle";
import InputContent from "./inputContent";
import { SERVER_URL } from "@/lib/server";

export default function TodoItem({
  item,
  userId,
  setTodo,
}: {
  item: Todo;
  userId: number | null;
  setTodo: Dispatch<SetStateAction<Todo[]>>;
}) {
  const { id, authorId, User } = item;
  const [title, setTitle] = useState<string>(item.title);
  const [content, setContent] = useState<string>(item.content);
  const [mode, setMode] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(item.public);

  const handleOnSubmit = async () => {
    const body = {
      title: title,
      content: content,
      published: true,
      public: isPublic,
    };

    try {
      const response = await fetch(`${SERVER_URL}/todo/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.ok) setMode(false);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  return (
    <article
      className={`flex flex-col bg-white shadow-2xl max-w-2xl w-full px-8 py-4 rounded-xl gap-4 ${
        mode ? "h-96" : "h-72"
      } transition-all duration-100 bg-amber-200`}
      key={id}
    >
      <div className="flex justify-between px-1 overflow-scroll ">
        <header className="md:max-w-3xl w-full flex flex-col justify-between items-center">
          <div className="w-full flex gap-x-0.5 justify-end">
            {mode ? null : userId === authorId ? (
              <>
                <button className="btn-hover" onClick={() => setMode(!mode)}>
                  修正
                </button>
                <CompleteButton id={id} title={title} setTodo={setTodo} />
              </>
            ) : null}
          </div>
          <div className="w-full flex md:flex-row flex-col md:items-center">
            {mode ? null : (
              <>
                <h3 className="md:px-3 py-1.5 text-sm md:text-xl flex items-center gap-2">
                  {title}
                </h3>
                <p className="px-4 md:px-0 text-gray-500 text-sm py-4">@{User.username}</p>
              </>
            )}
          </div>
        </header>
      </div>
      {mode ? (
        <>
          <InputTitle title={title} setTitle={setTitle} />
          <InputContent content={content} setContent={setContent} />
          <footer className="w-full flex justify-between p-2">
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
            <button className="btn-hover" onClick={handleOnSubmit}>
              登録
            </button>
          </footer>
        </>
      ) : (
        <p className="px-6 py-1.5 whitespace-pre-wrap">
          {content}
        </p>
      )}
    </article>
  );
}

"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { user } = useAuth();

  if (!user)
    return (
      <div>
        <p>Login first..</p>
        <Link href="/signin">Sign In</Link>
      </div>
    );

  return (
    <main>
      <CreateTodo username={user.username} userId={user.userId} />
      <GetAllTodo />
    </main>
  );
}

function CreateTodo({ username, userId }: { username: string, userId: number}) {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const router = useRouter();
  const handleOnCreate = async () => {
    
    const body = {
        userId: userId,
        title: title,
        content: content,
        published: true,
        public: isPublic,
    }
    console.log(body)

    const response = await fetch("http://localhost:3001/todo/create", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if(response.ok){
        setTitle('');
        setContent('');
        setIsPublic(false);
        router.refresh();
    }

  };

  useEffect(()=> console.log(title))

  return (
    <div className="flex flex-col bg-green-200 h-24">
      <p>{username}'s Todo</p>
      <input
        type="text"
        id="title"
        placeholder="Title Input"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea rows={20} cols={50} id="content" onChange={(e) => setContent(e.target.value)} />
      <div>
        <input
          type="checkbox"
          defaultChecked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        Public
        <button onClick={handleOnCreate}>submit</button>
      </div>
    </div>
  );
}



function GetAllTodo(){
  const params = useSearchParams().get('userId')
  const [todo, setTodo] = useState([]);
  useEffect(()=>{
    const fetchTodos = async () => {

      const response = await fetch(`http://localhost:3001/todo/my-todo/${params}`,{
        method: 'GET',
        credentials: 'include',
      })

      if(response.ok){
        const todos = await response.json();
        setTodo(todos);
      }
    }

    fetchTodos();
  },[])

  return(
    <section>
    <p>
      {params}
    </p>
    { todo? todo.map((item, idx)=>{
      return <p key={item.id}>{item.title} / {item.content}</p>
    }) : null} 

    </section>
  )

}
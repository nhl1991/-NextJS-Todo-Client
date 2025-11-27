"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useEffect } from "react";
import Logout from "./logout-btn";

export default function Navigation() {
  const { user } = useAuth();
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <nav className="flex items-center justify-between w-full max-w-3xl rounded-xl bg-slate-300 h-16 px-8 py-4">
      <h1><Link href="/">TODOLIST</Link></h1>
      {user ? (
        <div className="bg-amber-700 flex gap-x-8">
          <div>
            <h1>
              {user.username}&apos;s Todo
            </h1>
          </div>
          <div className="flex gap-4">
            <Link className="btn-hover" href={`/my-todo?userId=${user.userId}`} >MY TODO</Link>
            <Logout />
          </div>
        </div>
      ) : (
        <div className="flex gap-x-2 p-2">
          <Link className="btn-hover" href={"/signin"}>SIGN IN</Link>
          <Link className="btn-hover" href={"/signup"}>SIGN UP</Link>
        </div>
      )}
    </nav>
  );
}

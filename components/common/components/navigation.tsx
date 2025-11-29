"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import Logout from "../../logout-btn";

export default function Navigation() {
  const { user } = useAuth();
  return (
    <nav className="flex items-center justify-between w-full max-w-3xl md:min-w-2xl rounded-xl bg-white h-16 px-8 py-4">
      <h1>
        <Link
          className="font-extrabold bg-clip-text bg-[radial-gradient(circle_at_center,#00f5ff,#6a00ff)] text-transparent text-2xl"
          href="/"
        >
          TODOLIST
        </Link>
      </h1>
      {user ? (
        <div className="flex gap-x-8">
          <div>
            <h1 className="username-display">{user.username}&apos;s Todo</h1>
          </div>
          <div className="flex gap-4">
            <Link className="btn-hover" href={`/my-todo?userId=${user.userId}`}>
              MY TODO
            </Link>
            <Logout />
          </div>
        </div>
      ) : (
        <div className="flex gap-x-2 p-2">
          <Link className="btn-hover" href={"/signin"}>
            SIGN IN
          </Link>
          <Link className="btn-hover" href={"/signup"}>
            SIGN UP
          </Link>
        </div>
      )}
    </nav>
  );
}

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
    <nav className="flex max-w-6xl w-full bg-amber-200 h-16">
      {user ? (
        <div>
          <p>
            {user.username}/{user.userId}
          </p>
          <Link href={`/my-todo?userId=${user.userId}`} >MY TODO</Link>
          <Logout />
        </div>
      ) : (
        <Link href={"/signin"}>SIGN IN</Link>
      )}
    </nav>
  );
}

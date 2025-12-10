'use client'

import { SignInResponse } from "@/types/todo";
import Form from "next/form";
import { useState } from "react";

export default function SignInForm({action} : {action: (formData:FormData)=> Promise<SignInResponse>}) {
  const [error, setError ] = useState<string>('')
  const handleOnAction = async (formData:FormData) => {

    const result = await action(formData);
    if(!result.success){
      setError("メールアドレスまたはパスワードが正しくありません。");
    }
  }

  return (
    <>
      <Form action={handleOnAction} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="font-bold text-xs block">
            EMAIL
          </label>
          <input
            className="inputField"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div>
          <label htmlFor="password" className="font-bold text-xs block">
            PASSWORD
          </label>
          <input
            className="inputField"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <div className="flex items-center justify-center">
          <input type="submit" value={"Sign In"} className="btn-hover" />
        </div>
      </Form>
        {error ? <p className="text-[0.625rem] text-red-500">{error}</p>:null}
    </>
  );
}

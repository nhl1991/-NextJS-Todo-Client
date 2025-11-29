import { useAuth } from "@/hooks/useAuth";
import { SERVER_URL } from "@/lib/server";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const handleSignUp = async () => {
    const response = await fetch(`${SERVER_URL}/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
      }),
    });
    if (response.ok) {
      const result = await response.json();
      setUser(result);
      // setUser(result)
      router.push("/");
    } else {
      const result = await response.json();
      setError(result.message);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-4 ">
        <div>
          <label htmlFor="email" className="font-bold text-xs">
            EMAIL
          </label>
          <input
            className="inputField"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EMAIL"
          />
          {email}
        </div>
        <div>
          <label htmlFor="password" className="font-bold text-xs">
            PASSWORD
          </label>
          <input
            className="inputField"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="PASSWORD"
          />
        </div>
        <div>
          <label htmlFor="password" className="font-bold text-xs">
            USERNAME
          </label>
          <input
            className="inputField"
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="USERNAME"
          />
        </div>{" "}
      </div>
      <div className="py-4">
        <button className="btn-hover" onClick={handleSignUp}>
          SIGN UP
        </button>
        <p className="min-h-4">{error}</p>
      </div>
    </>
  );
}

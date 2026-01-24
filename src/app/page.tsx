"use client"
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const onSubmit= ()=>{
    authClient.signUp.email({
      email,
      password,
      name
    },
     {
        onRequest: () => {
            //show loading
        },
        onSuccess: () => {
            window.alert("Successfully signed up");
        },
        onError: () => {
            // display the error message
            window.alert("Error signing up");
        },
  })
  }
  return (
    <div>
    <div className="text-green-400">hello</div>
    <input type="text" value={name} placeholder="name" onChange={(e) => setName(e.target.value)} />
    <input type="text" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
    <input type="text" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
    <button onClick={onSubmit}>Sign In</button>
    </div>
  );
}

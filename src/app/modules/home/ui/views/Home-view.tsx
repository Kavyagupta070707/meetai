"use client"
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { auth } from "@/lib/auth";

export default function HomeView() {
  const {data : session}= authClient.useSession();


  return (
    <div>
      Logged in as {session?.user?.name}
    </div>
  );
}

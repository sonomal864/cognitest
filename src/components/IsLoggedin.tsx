"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { LoginButton, LogoutButton } from "./AuthenticateButton";
export default function isLoggedIn() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <LoginButton />
      </>
    );
  }

  return (
    <div>
      {session.user
        ? `${session.user.email}としてログインしています。`
        : "読み込み中..."}
      <LogoutButton />
    </div>
  );
}

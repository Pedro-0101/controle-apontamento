"use client"

import { CardLogin } from "./CardLogin";
import AuthCallback from "./auth";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <CardLogin onSubmit={AuthCallback} />
    </div>
  )
}
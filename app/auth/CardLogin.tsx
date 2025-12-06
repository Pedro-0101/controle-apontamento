"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCallback from "./auth";

export default function CardLogin() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      if (await AuthCallback(code)) {
        router.push("/unidades");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>CardLogin</h1>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border border-gray-300 rounded p-2"
        disabled={isLoading}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? "Carregando..." : "Login"}
      </button>
    </div>
  )
}
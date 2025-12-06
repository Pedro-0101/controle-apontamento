"use client";

import { useState, useEffect } from 'react';
import startSession from './startSession';
import { useRouter } from 'next/navigation';

export default function StartSessionButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/auth");
    }
  }, [token, router]);

  const handleClick = async () => {
    console.log("🔵 [CLIENT] Botão clicado - iniciando processo...");
    setIsLoading(true);
    setError(null);
    setToken(null);

    try {
      console.log("🔵 [CLIENT] Chamando startSession()...");
      const data = await startSession();
      console.log("🟢 [CLIENT] startSession() retornou:", data);
      console.log("🟢 [CLIENT] sessionToken recebido:", data.sessionToken);
      setToken(data.sessionToken);
    } catch (err) {
      console.error("🔴 [CLIENT] Erro ao iniciar sessão:", err);
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      console.log("🔵 [CLIENT] Finalizando (isLoading = false)");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={isLoading}
        style={{ padding: '10px 20px', cursor: isLoading ? 'not-allowed' : 'pointer' }}
      >
        {isLoading ? 'Carregando...' : 'Iniciar Sessão'}
      </button>

      {token && <p style={{ color: 'green' }}>Sessão iniciada com sucesso!</p>}
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
    </div>
  );
}
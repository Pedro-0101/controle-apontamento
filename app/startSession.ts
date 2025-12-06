interface SessionResponse {
  sessionToken: string;
  sessionTimeout?: number;
}

async function startSession(): Promise<SessionResponse> {
  console.log("🟡 [startSession] Função iniciada");
  try {
    console.log("🟡 [startSession] Fazendo fetch para /api/auth...");
    const response: Response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(`🟡 [startSession] Response recebida - status: ${response.status}, ok: ${response.ok}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("🔴 [startSession] Response não OK:", errorData);
      throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
    }

    console.log("🟡 [startSession] Fazendo parse do JSON...");
    const data: SessionResponse = await response.json();
    console.log("🟢 [startSession] Dados recebidos:", data);
    console.log(`🟢 [startSession] Session started successfully. Token: ${data.sessionToken}`);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("🔴 [startSession] Erro:", error.message);
      throw error;
    }
    throw new Error("Erro desconhecido ao iniciar sessão");
  }
}

export default startSession;
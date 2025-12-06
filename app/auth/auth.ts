export default async function AuthCallback(targetCode: string): Promise<boolean> {
  const url = "/api/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: targetCode }),
    });

    if (!response.ok) {
      console.log("Login falhou:", response.status);
      return false; 
    }

    const data = await response.json();
    return data.success;

  } catch (error) {
    console.error("Erro de rede ou fetch:", error);
    return false;
  }
}
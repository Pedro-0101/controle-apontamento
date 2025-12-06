import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {

    if ((await cookies()).get("valid")?.value === "true") {
      return Response.json({ success: true, message: "Já autenticado." });
    }

    const { code } = await request.json(); 
    
    const accessCode = process.env.DNP_ACCESS_CODE;
    const foundCode = (accessCode === code);
    const isValid = !!foundCode;

    if (isValid) {
      (await cookies()).set("valid", "true");
      return Response.json({ success: true, message: "Login bem-sucedido." });
    } else {
      return Response.json({ success: false, message: "Código de acesso inválido." }, { status: 401 });
    }

  } catch (error) {
    console.error("Erro no processamento do login:", error);
    return Response.json({ success: false, message: "Erro interno do servidor." }, { status: 500 });
  }
}

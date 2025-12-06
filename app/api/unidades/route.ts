import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { UnidadeAdm } from "../models/unidadeAdm";

export async function GET() {

  const cookiesObj = await cookies();
  const sessionToken = cookiesObj.get("sessionToken")?.value;
  const apiUrl = "https://integrar.pontocertificado.com.br/Api.svc/ListarUnidadeAdministrativa";

  if (!sessionToken) {
    return NextResponse.json(
      { error: "Token de sessão não encontrado." }, 
      { status: 401 }
    );
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tokenAcesso: sessionToken
      })
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao buscar unidades administrativas." },
        { status: response.status }
      );
    }

    const unidadesJson: UnidadeAdm[] = await response.json();

    return NextResponse.json(unidadesJson);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao processar requisição." },
      { status: 500 }
    );
  }
}
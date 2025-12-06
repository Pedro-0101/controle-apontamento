import { cookies } from "next/headers";

export async function POST(request: Request): Promise<Response> {
  const chaveEmpresa = process.env.CHAVE_EMPRESA;
  const usuario = process.env.USUARIO;
  const senha = process.env.SENHA;

  console.log(`[${Date.now()}] 🔍 Verificando variáveis de ambiente:`);
  console.log(`  - CHAVE_EMPRESA: ${chaveEmpresa ? '✅ definida' : '❌ não definida'}`);
  console.log(`  - USUARIO: ${usuario ? '✅ definido' : '❌ não definido'}`);
  console.log(`  - SENHA: ${senha ? '✅ definida' : '❌ não definida'}`);

  if (!chaveEmpresa || !usuario || !senha) {
    return Response.json(
      { error: "Variáveis de ambiente de autenticação não configuradas." }, 
      { status: 500 }
    );
  }

  const jsonAuth = { chaveEmpresa, usuario, senha };

  try {
    console.log(`[${Date.now()}] Iniciando requisição para API externa...`);
    
    const apiResponse = await fetch("https://integrar.pontocertificado.com.br/Api.svc/StartSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonAuth),
    });
    
    console.log(`[${Date.now()}] Response status: ${apiResponse.status} ${apiResponse.statusText}`);

    // Verificar se a resposta foi bem-sucedida ANTES de fazer parse
    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error(`[${Date.now()}] Erro da API externa (${apiResponse.status}):`, errorText);
      return Response.json(
        { error: "Falha na sessão com API externa." }, 
        { status: apiResponse.status }
      );
    }

    const data = await apiResponse.json();
    console.log(`[${Date.now()}] Dados recebidos da API:`, JSON.stringify(data, null, 2));
    
    // A API retorna os dados dentro de uma propriedade "d" (padrão .NET/WCF)
    let sessionToken: string;
    
    if (data.d) {
      // O valor em "d" é o sessionToken diretamente
      sessionToken = data.d;
      console.log(`[${Date.now()}] sessionToken extraído de 'd': "${sessionToken.substring(0, 50)}..." (length: ${sessionToken.length})`);
    } else if (data.sessionToken) {
      // Fallback: se vier direto
      sessionToken = data.sessionToken;
      console.log(`[${Date.now()}] sessionToken extraído diretamente: "${sessionToken}"`);
    } else {
      console.error(`[${Date.now()}] ERRO: sessionToken não encontrado na resposta!`);
      console.error(`[${Date.now()}] Estrutura da resposta:`, Object.keys(data));
      return Response.json(
        { error: "sessionToken não retornado pela API externa." }, 
        { status: 500 }
      );
    }

    console.log(`[${Date.now()}] sessionToken extraído com sucesso (tipo: ${typeof sessionToken}, length: ${sessionToken.length})`);
    
    const cookiesObj = await cookies();
    console.log(`[${Date.now()}] Objeto cookies obtido, setando cookie...`);

    cookiesObj.set("sessionToken", sessionToken);
    cookiesObj.set("sessionTimeout", (Date.now() + 60 * 60 * 1000).toString());

    console.log(`[${Date.now()}] ✅ Cookie sessionToken setado com sucesso!`);
    
    // Retornar no formato esperado pelo cliente
    return Response.json({ sessionToken, sessionTimeout: Date.now() + 60 * 60 * 1000 }, { status: 200 });

  } catch (error) {
    console.error(`[${Date.now()}] ❌ Erro ao processar requisição:`, error);
    return Response.json(
        { error: "Erro interno no servidor." }, 
        { status: 500 }
    );
  }
}
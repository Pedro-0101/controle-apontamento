import { UnidadeAdm } from "../api/models/unidadeAdm";

export async function getUnidades(): Promise<UnidadeAdm[]> {
  try {

    console.log(Date.now() + "Solicitando unidades administrativas...");

    const response = await fetch("http://localhost:3000/api/unidades", {
      cache: "no-store", 
    });

    console.log(Date.now() + "Unidades administrativas solicitadas com sucesso.");

    if (!response.ok) {
      console.log(Date.now() + "Failed to fetch unidades:", response);
      return [];
    }

    const data: UnidadeAdm[] = await response.json();
    return data;
  } catch (error) {
    console.log(Date.now() + "Error fetching unidades:", error);
    return [];
  }
}

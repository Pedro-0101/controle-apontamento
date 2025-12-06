import Line from "./Line";

interface unidadeTable {
  id: number;
  hierarquia: string;
  descricao: string;
  descricaoEmpresa: string;
  cpfCnpj: string;
  usuarioEmail: string;
}

export default function Table({ unidades }: { unidades: unidadeTable[] }) {
  return (
    <ul>
      {unidades.map((unidade) => (
        <Line key={unidade.id} {...unidade} />
      ))}
    </ul>
  )
}
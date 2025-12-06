interface unidadeLine {
  id: number;
  hierarquia: string;
  descricao: string;
  descricaoEmpresa: string;
  cpfCnpj: string;
  usuarioEmail: string;
}

export default function Line({ id, hierarquia, descricao, descricaoEmpresa, cpfCnpj, usuarioEmail }: unidadeLine) {
  return (
    <li>
      <p>{id}</p>
      <p>{hierarquia}</p>
      <p>{descricao}</p>
      <p>{descricaoEmpresa}</p>
      <p>{cpfCnpj}</p>
      <p>{usuarioEmail}</p>
    </li>
  )
}
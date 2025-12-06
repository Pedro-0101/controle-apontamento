import Table from "./Table";
import { getUnidades } from "./getUnidades";

export default async function UnidadePage() {
  const unidades = await getUnidades();
  return (
    <>
      <h1>Unidades</h1>
      <Table unidades={unidades} />
    </>
  )
}
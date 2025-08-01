import { useConfig } from "../hooks/use-config";

export default function StartPage() {
  const { Emisor, loading } = useConfig();

  if (loading) return <h1>Loading in this bih</h1>;

  return (
    <>
      <h1 className="font-semibold text-lg">{Emisor.RazonSocial}</h1>
      <p className="pt-2">
        <span className="font-semibold">RNC</span>: {Emisor.RNC}
      </p>
      <p className="pt-2">
        <span className="font-semibold">Correo</span>: {Emisor.Correo}
      </p>
      <p className="pt-2">
        <span className="font-semibold">Direccion</span>: {Emisor.Direccion}
      </p>
      <p className="pt-2">
        <span className="font-semibold">Telefono</span>: {Emisor.Telefono}
      </p>
    </>
  );
}

import { useConfig } from "../hooks/use-config";
import StartSkeleton from "../components/Skeleton/StartSkeleton";
import { ErrorMessage } from "../components/Error";

export default function StartPage() {
  const { Emisor, loading } = useConfig();

  if (loading) return <StartSkeleton />;

  if (!Emisor) {
    return <ErrorMessage message="No se pudo cargar la configuracion" />;
  }

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
        <span className="font-semibold">Dirección</span>: {Emisor.Direccion}
      </p>
      <p className="pt-2">
        <span className="font-semibold">Teléfono</span>: {Emisor.Telefono}
      </p>
    </>
  );
}

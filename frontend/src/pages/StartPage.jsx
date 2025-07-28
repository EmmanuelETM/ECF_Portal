import { useEffect, useState } from "react";
import { useFetch } from "../hooks/use-fetch";
import { useAuth } from "../hooks/use-auth";

export default function StartPage() {
  const [data, setData] = useState({
    Correo: "",
    Direccion: "",
    RNC: "",
    RazonSocial: "",
    Telefono: "",
  });

  const authFetch = useFetch();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    async function fetchConfiguracion() {
      try {
        const response = await authFetch("configuracion");
        const data = await response.json();
        setData({ ...(data?.EMISOR || {}) });
      } catch (err) {
        console.error("Error al obtener configuración:", err);
      }
    }

    fetchConfiguracion();
  }, [authFetch, token]);

  return (
    <>
      <h1 className="font-semibold text-lg">{data.RazonSocial}</h1>
      <p className="pt-2">
        <span className="font-semibold">RNC</span>: {data.RNC}
      </p>
      <p className="pt-2">
        <span className="font-semibold">Correo</span>: {data.Correo}
      </p>
      <p className="pt-2">
        <span className="font-semibold">Direccion</span>: {data.Direccion}
      </p>
      <p className="pt-2">
        <span className="font-semibold">Telefono</span>: {data.Telefono}
      </p>
    </>
  );
}

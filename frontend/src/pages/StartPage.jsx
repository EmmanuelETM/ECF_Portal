import { Title } from "../components/Title";
import { useEffect, useState } from "react";
import { getConfiguracion } from "../api/configuracion";

export default function StartPage() {
  const [data, setData] = useState({
    Correo: "",
    Direccion: "",
    RNC: "",
    RazonSocial: "",
    Telefono: "",
  });

  useEffect(() => {
    getConfiguracion()
      .then((response) => response.json())
      .then((data) => {
        setData({
          ...data.EMISOR,
        });
      })
      .catch((err) => console.error("Error: ", err));
  }, []);

  return (
    <>
      <Title text={"Inicio"} />
      <p>{data.Correo}</p>
      <p>{data.Direccion}</p>
    </>
  );
}

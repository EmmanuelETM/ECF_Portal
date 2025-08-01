import { Title } from "../components/Title";
import { Setting } from "../components/Setting";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/use-fetch";

export default function ConfigPage() {
  const [settings, setSettings] = useState({
    EMISION: { DGII: "", Cliente: "", Notificar: "" },
    RECEPCION: { Notificar: "", Tipos: "" },
  });

  const authFetch = useFetch();

  async function patchConfiguracion(section, key, value) {
    return await authFetch("/configuracion", {
      method: "POST",
      body: JSON.stringify({
        [section]: {
          [key]: value,
        },
      }),
    });
  }

  useEffect(() => {
    async function fetchConfiguracion() {
      try {
        const response = await authFetch("/configuracion");
        const data = await response.json();

        const EMISION = data?.EMISION || {};
        const RECEPCION = data?.RECEPCION || {};

        const normalizeBoolean = (value) => {
          if (typeof value === "string") {
            return value.toLowerCase() === "true";
          }
          return Boolean(value);
        };

        setSettings({
          EMISION: {
            DGII: normalizeBoolean(EMISION.DGII),
            Cliente: normalizeBoolean(EMISION.Cliente),
            Notificar: normalizeBoolean(EMISION.Notificar),
          },
          RECEPCION: {
            Notificar: normalizeBoolean(RECEPCION.Notificar),
            Tipos: RECEPCION.TIPOS || RECEPCION.Tipos || "",
          },
        });
      } catch (error) {
        console.error("Error al obtener la configuración:", error);
      }
    }

    fetchConfiguracion();
  }, [authFetch]);

  const toggleSettings = async (section, key) => {
    setSettings((prev) => {
      if (!prev[section] || !(key in prev[section])) return prev;

      const newValue = !prev[section][key];

      const updated = {
        ...prev,
        [section]: {
          ...prev[section],
          [key]: newValue,
        },
      };

      // patch settings
      patchConfiguracion(section, key, newValue === true ? true : false);
      return updated;
    });
  };

  return (
    <>
      <div>
        <Title text={"Configuracion"} />
        <Setting
          title={"Enviar a DGII automaticamente"}
          description={
            "Si el comprobante es valido, enviarlo inmediatamente a DGII"
          }
          enabled={settings.EMISION.DGII}
          onToggle={() => toggleSettings("EMISION", "DGII")}
        />
        <Setting
          title={"Enviar al Cliente automaticamente"}
          description={
            "Si el comprobante es aceptado por DGII, reenviar inmediatamente al Cliente."
          }
          enabled={settings.EMISION.Cliente}
          onToggle={() => toggleSettings("EMISION", "Cliente")}
        />
        <Setting
          title={"Notificarme cuando reciba comprobante"}
          description={
            "Recibir un correo cuando se reciba un comprobante por parte de algun Cliente."
          }
          enabled={settings.EMISION.Notificar}
          onToggle={() => toggleSettings("EMISION", "Notificar")}
        />
      </div>
    </>
  );
}

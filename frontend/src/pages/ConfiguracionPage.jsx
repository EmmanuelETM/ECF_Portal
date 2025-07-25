import { Title } from "../components/Title";
import { Setting } from "../components/Setting";
import { useEffect, useState } from "react";
import { getConfiguracion, patchConfiguracion } from "../api/configuracion";

export default function ConfigPage() {
  const [settings, setSettings] = useState({
    Emision: { DGII: false, Cliente: false, Notificar: false },
    Recepcion: { Notificar: false, Tipos: "" },
  });

  console.log(settings);

  useEffect(() => {
    getConfiguracion()
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const emision = data?.EMISION || {};
        const recepcion = data?.RECEPCION || {};

        // Normalizamos booleanos
        const normalizeBoolean = (value) =>
          typeof value === "string"
            ? value.toLowerCase() === "True"
            : !!value.toLowerCase();

        setSettings({
          Emision: {
            DGII: normalizeBoolean(emision.DGII),
            Cliente: normalizeBoolean(emision.Cliente),
            Notificar: normalizeBoolean(emision.Notificar),
          },
          Recepcion: {
            Notificar: normalizeBoolean(recepcion.Notificar),
            Tipos: recepcion.TIPOS || "",
          },
        });
      })
      .catch((error) => {
        console.error("Error al obtener la configuración:", error);
      });
  }, []);

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
      patchConfiguracion(section, key, newValue === true ? "True" : "False");

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
          enabled={settings.Emision.DGII}
          onToggle={() => toggleSettings("Emision", "DGII")}
        />
        <Setting
          title={"Enviar al Cliente automaticamente"}
          description={
            "Si el comprobante es aceptado por DGII, reenviar inmediatamente al Cliente."
          }
          enabled={settings.Emision.Cliente}
          onToggle={() => toggleSettings("Emision", "Cliente")}
        />
        <Setting
          title={"Notificarme cuando reciba comprobante"}
          description={
            "Recibir un correo cuando se reciba un comprobante por parte de algun Cliente."
          }
          enabled={settings.Emision.Notificar}
          onToggle={() => toggleSettings("Emision", "Notificar")}
        />
      </div>
    </>
  );
}

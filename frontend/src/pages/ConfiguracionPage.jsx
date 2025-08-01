import { Title } from "../components/Title";
import { Setting } from "../components/Setting";
import { useFetch } from "../hooks/use-fetch";
import { useConfig } from "../hooks/use-config";
import ConfigSkeleton from "../components/Skeleton/ConfigSkeleton";
import { ErrorMessage } from "../components/Error";

export default function ConfigPage() {
  const { EMISION, RECEPCION, updateConfig, loading } = useConfig();
  const authFetch = useFetch();

  const isEmpty = (obj) => {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
    return true;
  };

  const patchConfiguracion = async (section, key, value) => {
    return await authFetch("/configuracion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [section]: {
          [key]: value,
        },
      }),
    });
  };

  const toggleSettings = async (section, key) => {
    const currentValue = EMISION?.[key];
    if (typeof currentValue !== "boolean") return;

    const optimisticValue = !currentValue;

    updateConfig(section, key, optimisticValue);

    try {
      const response = await patchConfiguracion(section, key, optimisticValue);
      if (!response.ok) {
        throw new Error(`Server rejected update: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to update setting:", error);
      updateConfig(section, key, currentValue); // rollback
    }
  };

  return (
    <div>
      <Title text="Configuración" />

      {loading ? (
        <ConfigSkeleton />
      ) : isEmpty(EMISION) && isEmpty(RECEPCION) ? (
        <ErrorMessage />
      ) : (
        <>
          <Setting
            title="Enviar a DGII automáticamente"
            description="Si el comprobante es válido, enviarlo inmediatamente a DGII"
            enabled={EMISION.DGII}
            onToggle={() => toggleSettings("EMISION", "DGII")}
          />
          <Setting
            title="Enviar al Cliente automáticamente"
            description="Si el comprobante es aceptado por DGII, reenviar inmediatamente al Cliente."
            enabled={EMISION.Cliente}
            onToggle={() => toggleSettings("EMISION", "Cliente")}
          />
          <Setting
            title="Notificarme cuando reciba comprobante"
            description="Recibir un correo cuando se reciba un comprobante por parte de algún Cliente."
            enabled={EMISION.Notificar}
            onToggle={() => toggleSettings("EMISION", "Notificar")}
          />
        </>
      )}
    </div>
  );
}

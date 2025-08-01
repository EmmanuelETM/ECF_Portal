import { useEffect, useState } from "react";
import { ConfigContext } from "./ConfigContext";
import { useFetch } from "../../hooks/use-fetch";
import { useAuth } from "../../hooks/use-auth";
import { normalizeBoolean } from "../../lib/normalizeBoolean";

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  const authFetch = useFetch();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    const fetchConfig = async () => {
      setLoading(true);
      try {
        const response = await authFetch("/configuracion");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const EMISION = data?.EMISION || {};
        const RECEPCION = data?.RECEPCION || {};

        const normalizedConfig = {
          ...data,
          EMISION: {
            DGII: normalizeBoolean(EMISION.DGII),
            Cliente: normalizeBoolean(EMISION.Cliente),
            Notificar: normalizeBoolean(EMISION.Notificar),
          },
          RECEPCION: {
            Notificar: normalizeBoolean(RECEPCION.Notificar),
            Tipos: RECEPCION.TIPOS || RECEPCION.Tipos || "",
          },
        };

        setConfig(normalizedConfig);
      } catch (error) {
        console.error("Error fetching config:", error);
        setConfig(null);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [authFetch, token]);

  const updateConfig = (section, key, value) => {
    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [key]: value,
      },
    }));
  };

  const value = {
    Ambiente: config?.WEBSERVICE?.Ambiente ?? null,
    Emisor: config?.EMISOR ?? null,
    EMISION: config?.EMISION ?? {},
    RECEPCION: config?.RECEPCION ?? {},
    updateConfig,
    loading,
  };

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}

import { useEffect, useState, useCallback } from "react";
import { useFetch } from "../../hooks/use-fetch";
import { Indicator } from "../../components/Indicator";

import {
  Calculator,
  CircleDot,
  Ban,
  DollarSign,
  CircleDollarSign,
} from "lucide-react";

import { DropdownButton } from "../../components/DropDown";

import {
  getToday,
  LastYear,
  ThisMonth,
  ThisWeek,
  ThisYear,
  Today,
  Yesterday,
} from "../../lib/date-helpers";

import { formatMonto } from "../../lib/utils";

import SkeletonPage from "../../components/Skeleton/IndicadoresSkeleton";
import { Title } from "../../components/Title";

export default function IndicadoresEmitidosPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { resumen, porTipoDeComprobante } = data;

  const authFetch = useFetch();

  // Memoize getIndicadoresEmitidos so useEffect won't re-run unnecessarily
  const getIndicadoresEmitidos = useCallback(
    async (desde, hasta) => {
      const params = new URLSearchParams();

      if (desde) params.append("FechaEmisionDesde", desde);
      if (hasta) params.append("FechaEmisionHasta", hasta);

      const query = params.toString();
      const url = `/emitidos/indicadores${query ? `?${query}` : ""}`;

      const response = await authFetch(url);
      return response.json();
    },
    [authFetch]
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { from, to } = Today();
        const data = await getIndicadoresEmitidos(from, to);
        setData(data);
      } catch (err) {
        console.error("Error fetching:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getIndicadoresEmitidos]);

  const handleSelect = async (fn) => {
    const { from, to } = fn();
    setLoading(true);

    try {
      const result =
        from && to
          ? await getIndicadoresEmitidos(from, to)
          : await getIndicadoresEmitidos();

      setData(result);
    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <Title text={"Documentos Emitidos"} />
        <DropdownButton
          options={[
            { label: "Hoy", fn: Today },
            { label: "Ayer", fn: Yesterday },
            { label: "Esta Semana", fn: ThisWeek },
            { label: "Este Mes", fn: ThisMonth },
            { label: "Este Año", fn: ThisYear },
            { label: "Año Pasado", fn: LastYear },
            {
              label: "Todos",
              fn: () => ({ from: "2000-01-01", to: getToday() }),
            },
          ]}
          onSelect={handleSelect}
        />
      </div>
      {loading ? (
        <SkeletonPage />
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {resumen && (
              <div className="grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-1 gap-4">
                <Indicator
                  value={resumen.Conteo}
                  title={"Total"}
                  Icon={Calculator}
                />
                <Indicator
                  value={resumen.Pendientes}
                  title={"Pendientes"}
                  Icon={CircleDot}
                />
                <Indicator
                  value={resumen.Rechazados}
                  title={"Rechazados"}
                  Icon={Ban}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 mt-4">
            {resumen && (
              <div className="grid md:grid-cols-2 gap-4">
                <Indicator
                  value={formatMonto(resumen.Monto)}
                  title={"Monto Total"}
                  Icon={DollarSign}
                />
                <Indicator
                  value={formatMonto(resumen.ITBIS)}
                  title={"ITBIS"}
                  Icon={CircleDollarSign}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 mt-8">
            <Title text={"Por Tipo de Comprobantes"} />
            {porTipoDeComprobante && (
              <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
                {porTipoDeComprobante.map((item, index) => (
                  <Indicator
                    key={index}
                    value={formatMonto(item.valor)}
                    title={item.tipo}
                    subtitle={formatMonto(item.itbis)}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

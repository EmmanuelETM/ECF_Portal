import { useEffect, useState } from "react";
import { Indicator } from "../../components/Indicator";

import {
  Calculator,
  CircleDot,
  Ban,
  DollarSign,
  CircleDollarSign,
} from "lucide-react";

import { DropdownButton } from "../../components/Dropdown/DropDown";

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

import SkeletonPage from "../SkeletonPage";
import { Title } from "../../components/Title";
import { getIndicadoresEmitidos } from "../../api/emitidos";

export default function IndicadoresEmitidosPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { resumen, porTipoDeComprobante } = data;

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      getIndicadoresEmitidos("2000-01-01", getToday())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((err) => console.log("Error fetching: ", err));
    };
    fetchData();
  }, []);

  const handleSelect = async (fn) => {
    const { from, to } = fn();
    let result;
    setLoading(true);

    if (from && to) result = await getIndicadoresEmitidos(from, to);
    else result = await getIndicadoresEmitidos();

    setData(result);
    setLoading(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Title text={"Documentos Recibidos"} />
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

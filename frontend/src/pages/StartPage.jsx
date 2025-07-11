import { useEffect, useState } from "react";
import { Indicator } from "../components/Indicator";

import {
  Send,
  CheckCheck,
  CircleDot,
  Ban,
  DollarSign,
  CircleDollarSign,
} from "lucide-react";

import { DropdownButton } from "../components/Dropdown/DropDown";

import {
  LastYear,
  ThisMonth,
  ThisWeek,
  ThisYear,
  Today,
  Yesterday,
} from "../lib/date-helpers";

import { getIndicadores } from "../data/query";
import SkeletonPage from "./SkeletonPage";

export default function StartPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { montos, documentos, PorTipoDeComprobante } = data;

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      getIndicadores()
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  const handleSelect = async (fn) => {
    const { from, to } = await fn();
    let result;
    setLoading(true);
    if (from && to) result = await getIndicadores(from, to);
    else result = await getIndicadores();

    setData(result);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <SkeletonPage handleSelect={handleSelect} />
      ) : (
        <div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-2xl font-semibold">Documentos procesados</h4>
              <DropdownButton
                options={[
                  { label: "Hoy", fn: Today },
                  { label: "Ayer", fn: Yesterday },
                  { label: "Esta Semana", fn: ThisWeek },
                  { label: "Este Mes", fn: ThisMonth },
                  { label: "Este Año", fn: ThisYear },
                  { label: "Año Pasado", fn: LastYear },
                  { label: "Todos", fn: () => {} },
                ]}
                onSelect={handleSelect}
              />
            </div>
            {documentos && (
              <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 sm:grid-rows-1 gap-4">
                <Indicator
                  value={documentos.Emitidos}
                  title={"Emitidos"}
                  Icon={Send}
                />
                <Indicator
                  value={documentos.Recibidos}
                  title={"Recibidos"}
                  Icon={CheckCheck}
                />
                <Indicator
                  value={documentos.Pendientes}
                  title={"Pendientes"}
                  Icon={CircleDot}
                />
                <Indicator
                  value={documentos.Rechazados}
                  title={"Rechazados"}
                  Icon={Ban}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 mt-8">
            <h4 className="text-2xl font-semibold mb-2">Montos procesados</h4>
            {montos && (
              <div className="grid md:grid-cols-2 gap-4">
                <Indicator
                  value={montos.MontoTotal}
                  title={"Monto Total"}
                  Icon={DollarSign}
                />
                <Indicator
                  value={montos.ITBIS}
                  title={"ITBIS"}
                  Icon={CircleDollarSign}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 mt-8">
            <h4 className="text-2xl font-semibold mb-2">
              Por Tipo de Comprobante
            </h4>
            {PorTipoDeComprobante && (
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {PorTipoDeComprobante.map((item, index) => (
                  <Indicator
                    key={index}
                    value={item.valor}
                    title={item.tipo}
                    subtitle={item.itbis}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

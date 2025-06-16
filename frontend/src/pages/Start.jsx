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

import axios from "axios";

const getData = async () => {
  try {
    const response = await axios.get("http://localhost:5174/indicadores");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default function StartPage() {
  const [data, setData] = useState([]);
  const { montos, documentos, PorTipoDeComprobante } = data;

  useEffect(() => {
    const fetchData = () => {
      getData()
        .then((data) => setData(data))
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  const handleSelect = (value) => {
    console.log("Selected:", value);
  };

  return (
    <div>
      {documentos && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-semibold mb-2">
              Documentos procesados
            </h4>
            <DropdownButton
              options={[
                { label: "Hoy", value: "Hoy", fn: "" },
                { label: "Ayer", value: "Ayer", fn: "" },
                { label: "Esta Semana", value: "Esta Semana", fn: "" },
                { label: "Este Mes", value: "Este Mes", fn: "" },
                { label: "Este Año", value: "Este Año", fn: "" },
                { label: "Todos", value: "Todos", fn: "" },
              ]}
              onSelect={handleSelect}
            />
          </div>

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
        </div>
      )}

      {montos && (
        <div className="flex flex-col gap-3 mt-8">
          <h4 className="text-2xl font-semibold mb-2">Montos procesados</h4>
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
        </div>
      )}

      {PorTipoDeComprobante && (
        <div className="flex flex-col gap-3 mt-8">
          <h4 className="text-2xl font-semibold mb-2">
            Por Tipo de Comprobante
          </h4>
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
        </div>
      )}
    </div>
  );
}

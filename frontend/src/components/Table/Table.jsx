import { ArrowUp, ArrowDown } from "lucide-react";
import { Actions } from "./Actions";
import { Loading } from "../Loading";
import { formatMonto } from "../../lib/utils";

export function Table({ data, sortOrder, setSortOrder, loading, view }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-spacing-0 rounded-xl overflow-hidden text-center">
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="p-3 font-semibold">eNCF</th>
            <th className="p-3 font-semibold">Nombre del Archivo</th>
            <th
              className="py-3 px-5 font-semibold cursor-pointer"
              onClick={() => {
                if (sortOrder === "asc") setSortOrder("desc");
                else setSortOrder("asc");
              }}
            >
              <div className="flex gap-2 justify-center items-center">
                Fecha {sortOrder === "asc" ? <ArrowUp /> : <ArrowDown />}
              </div>
            </th>
            <th className="p-3 font-semibold text-right">Monto Total</th>
            <th className="p-3 font-semibold hidden">Tipo</th>
            <th className="p-3 font-semibold">
              {view === "emision" ? "RNC Comprador" : "RNC Emisor"}
            </th>
            <th className="p-3 font-semibold">
              {view === "emision"
                ? "Razon Social Comprador"
                : "Razon Social Emisor"}
            </th>
            <th className="p-3 font-semibold">Acciones</th>
          </tr>
        </thead>

        {loading ? (
          <tbody>
            <tr>
              <td colSpan={8} className="bg-gray-100">
                <Loading text={"data"} />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => {
                return (
                  <tr key={index} className="odd:bg-gray-200 even:bg-gray-50">
                    <td className="p-3">{row.eNCF}</td>
                    <td className="p-3">{row.Archivo}</td>
                    <td className="p-3">{row.FechaEmision}</td>
                    <td className="p-3 text-right">
                      {formatMonto(row.MontoTotal)}
                    </td>
                    <td className="p-3 hidden">{row.Tipo}</td>
                    <td className="p-3">{row.RNC}</td>
                    <td className="p-3">{row.RazonSocial}</td>
                    <td className="p-3">
                      <Actions archivo={row.Archivo} view={view} />
                    </td>
                  </tr>
                );
              })
            ) : (
              <></>
            )}
          </tbody>
        )}
      </table>
    </div>
  );
}

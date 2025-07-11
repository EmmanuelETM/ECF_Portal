import { ArrowUp, ArrowDown } from "lucide-react";
import { Actions } from "./Actions";
import { Loading } from "../Loading";

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
            <th className="p-3 font-semibold">Monto Total</th>
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
          <>
            <tr>
              <td colSpan={8}>
                <Loading />
              </td>
            </tr>
          </>
        ) : (
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => {
                return (
                  <tr key={index} className="odd:bg-gray-200 even:bg-gray-50">
                    <td className="p-3">{row.eNCF}</td>
                    <td className="p-3">{row.Archivo}</td>
                    <td className="p-3">{row.FechaEmision}</td>
                    <td className="p-3">${row.MontoTotal}</td>
                    <td className="p-3 hidden">{row.Tipo}</td>
                    <td className="p-3">
                      {view === "emision" ? row.RNCComprador : row.RNCEmisor}
                    </td>
                    <td className="p-3">
                      {view === "emision"
                        ? row.RazonSocialComprador
                        : row.RazonSocialEmisor}
                    </td>
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

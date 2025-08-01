import { ArrowUp, ArrowDown } from "lucide-react";
import { Actions } from "./Actions";
import { Loading } from "../Loading";
import { formatMonto } from "../../lib/utils";
import { Pagination } from "./Pagination";

import { useMemo } from "react";

export function Table({
  data,
  sortOrder,
  setSortOrder,
  currentPage,
  setCurrentPage,
  loading,
  view,
}) {
  const pageSize = 10;
  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [data, currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="mb-10">
      <div className="overflow-x-auto rounded-xl border-spacing-0">
        <table className="w-full text-center min-w-max">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-3 font-semibold">eNCF</th>
              <th className="p-3 font-semibold">Nombre del Archivo</th>
              <th
                className="py-3 px-5 font-semibold cursor-pointer"
                onClick={() => {
                  if (sortOrder === "asc") setSortOrder("desc");
                  else setSortOrder("asc");
                  setCurrentPage(1); // reiniciar al cambiar orden
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
              {paginatedData.length > 0 ? (
                paginatedData.map((row, index) => {
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
                <tr>
                  <td
                    colSpan={8}
                    className="text-center text-lg font-semibold py-4 bg-gray-200"
                  >
                    No hay datos para mostrar
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>

      {!loading && totalPages > 1 && (
        <Pagination
          goToPage={goToPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

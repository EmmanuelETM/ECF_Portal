import { ArrowUpDown } from "lucide-react";

export default function Table({ data, handleSort, sorts }) {
  return (
    <table className="w-full border-spacing-0 rounded-xl overflow-hidden">
      <thead>
        <tr className="bg-green-600 text-white">
          <th
            className="p-3 text-left font-semibold cursor-pointer"
            onClick={() => handleSort("nombre")}
          >
            <div className="flex gap-2">
              Nombre{" "}
              {sorts.find((s) => s.key === "nombre") &&
                (sorts.find((s) => s.key === "nombre").direction === "asc"
                  ? "↑"
                  : "↓")}
            </div>
          </th>
          <th
            className="py-3 px-5 text-left font-semibold cursor-pointer"
            onClick={() => handleSort("fecha")}
          >
            <div className="flex gap-2">
              Fecha{" "}
              {sorts.find((s) => s.key === "fecha") &&
                (sorts.find((s) => s.key === "fecha").direction === "asc"
                  ? "↑"
                  : "↓")}
            </div>
          </th>
          <th className="p-3 text-left font-semibold">Monto Total</th>
          <th className="p-3 text-left font-semibold">Tipo</th>
          <th className="p-3 text-left font-semibold">Tipo eCF</th>
          <th className="p-3 text-left font-semibold">RNC</th>
          <th className="p-3 text-left font-semibold">Razon Social</th>
          <th className="p-3 text-left font-semibold">Acciones</th>
        </tr>
      </thead>
      <tbody className="bg-gray-100">
        {data.length > 0 ? (
          data.map((row, index) => {
            return (
              <tr key={index}>
                <td className="p-3">{row.nombre}</td>
                <td className="p-3">{row.fecha}</td>
                <td className="p-3">${row.monto}</td>
                <td className="p-3">{row.tipo}</td>
                <td className="p-3">{row.tipo_ecf}</td>
                <td className="p-3">{row.rnc}</td>
                <td className="p-3">{row.razon}</td>
                <td className="p-3">
                  <button className="cursor-pointer hover:text-blue-600 hover:underline">
                    Action
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <></>
        )}
      </tbody>
    </table>
  );
}

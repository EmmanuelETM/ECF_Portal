import { ArrowUp, ArrowDown } from "lucide-react";

export default function Table({ data, sortOrder, setSortOrder }) {
  return (
    <table className="w-full border-spacing-0 rounded-xl overflow-hidden text-center">
      <thead>
        <tr className="bg-green-600 text-white">
          <th className="p-3 font-semibold">Nombre</th>
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
          <th className="p-3 font-semibold hidden">Tipo eCF</th>
          <th className="p-3 font-semibold">RNC</th>
          <th className="p-3 font-semibold">Razon Social</th>
          <th className="p-3 font-semibold">Acciones</th>
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
                <td className="p-3 hidden">{row.tipo}</td>
                <td className="p-3 hidden">{row.tipo_ecf}</td>
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

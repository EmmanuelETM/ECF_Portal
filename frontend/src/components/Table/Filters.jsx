import { tipos_ecf } from "../../lib/tipos_ecf";

export function Filters({ filters, setFilters }) {
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <p className="text-xl font-semibold mb-2">Filtros</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          name="eNCF"
          className="w-full border border-gray-400 focus:border-green-600 rounded-lg p-2"
          placeholder="eNCF"
          type="text"
          value={filters.eNCF}
          onChange={handleFilterChange}
        />
        <input
          name="RNC"
          className="w-full border border-gray-400 rounded-lg p-2"
          placeholder="RNC"
          type="text"
          value={filters.RNC}
          onChange={handleFilterChange}
        />
        <input
          name="Razon"
          className="w-full border border-gray-400 rounded-lg p-2"
          placeholder="Razón Social"
          type="text"
          value={filters.Razon}
          onChange={handleFilterChange}
        />
        <select
          className="w-full border border-gray-400 p-2 rounded-lg"
          name="Tipo"
          value={filters.Tipo}
          onChange={handleFilterChange}
        >
          <option value="Todos">Todos</option>
          {tipos_ecf.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.nombre}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

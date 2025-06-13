import { Button } from "../components/Button";
import Table from "../components/Table";
import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import { tipos_ecf } from "../lib/tipos_ecf";
import { filterData } from "../lib/processData";

const getRecibidos = async () => {
  const response = await axios.get("http://localhost:5174");
  return response.data;
};

export default function RecepcionPage() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    ecf: "",
    rnc: "",
    razon: "",
    tipo_ecf: "Todos",
  });

  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchData = () => {
      getRecibidos()
        .then((data) => setData(data))
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, []);

  const handleRefreshClick = async () => {
    const data = await getRecibidos();
    setData(data);
  };

  const handleLimpiarClick = () => {
    setFilters({
      ecf: "",
      rnc: "",
      razon: "",
      tipo_ecf: "Todos",
    });
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = useMemo(() => {
    return filterData(data, sortOrder, filters);
  }, [data, sortOrder, filters]);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-semibold">Recepcion de Documentos</p>
      <p className="text-xl font-semibold">Filtros</p>
      <div className="max-w-4xl">
        <div className="flex flex-row flex-wrap gap-2 items-baseline">
          <input
            name="ecf"
            className="flex-1 min-w-[150px] border border-gray-400 rounded-xl p-2"
            placeholder="eCF"
            type="text"
            data-col={0}
            value={filters.ecf}
            onChange={handleFilterChange}
          />
          <input
            name="rnc"
            className="flex-1 min-w-[150px] border border-gray-400 rounded-lg p-2"
            placeholder="RNC"
            type="text"
            data-col={5}
            value={filters.rnc}
            onChange={handleFilterChange}
          />
          <input
            name="razon"
            className="flex-1 min-w-[150px] border border-gray-400 rounded-lg p-2"
            placeholder="Razon Social"
            type="text"
            data-col={6}
            value={filters.razon}
            onChange={handleFilterChange}
          />
          <select
            className="border border-gray-400 p-2 rounded-lg"
            name="tipo_ecf"
            value={filters.tipo_ecf}
            data-col={3}
            onChange={handleFilterChange}
          >
            <option>Todos</option>
            {tipos_ecf.map((tipo) => (
              <option key={tipo.id}>{tipo.nombre}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-4 mt-4">
          <Button text="Refresh" onClick={handleRefreshClick} />
          <Button text="Limpiar" onClick={handleLimpiarClick} />
        </div>
      </div>
      <Table
        data={filteredData}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
    </div>
  );
}

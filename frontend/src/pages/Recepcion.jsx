import { Button } from "../components/Button";
import Table from "../components/Table/Table";
import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import { filterData } from "../lib/processData";
import { Filters } from "../components/Table/Filters";
import { DateRange } from "../components/Table/DateRange";

const getRecibidos = async () => {
  try {
    const response = await axios.get("http://localhost:5174/recepcion");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default function RecepcionPage() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    eNCF: "",
    RNC: "",
    Razon: "",
    Tipo: "Todos",
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
      eNCF: "",
      RNC: "",
      Razon: "",
      Tipo: "Todos",
    });
  };

  const filteredData = useMemo(() => {
    return filterData(data, sortOrder, filters, {
      RNC: "RNCEmisor",
      Razon: "RazonSocialEmisor",
    });
  }, [data, sortOrder, filters]);

  return (
    <div className="flex flex-col gap-6 px-4">
      <p className="text-2xl font-semibold">Recepción de Documentos</p>
      <DateRange />
      <div className="max-w-6xl w-full">
        <Filters filters={filters} setFilters={setFilters} />

        <div className="flex items-center gap-4 mt-4">
          <Button text="Refresh" onClick={handleRefreshClick} />
          <Button text="Limpiar" onClick={handleLimpiarClick} />
        </div>
      </div>

      <Table
        data={filteredData}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        view="recepcion"
      />
    </div>
  );
}

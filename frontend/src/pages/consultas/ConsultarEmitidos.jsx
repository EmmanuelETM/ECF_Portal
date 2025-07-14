import { TableControls } from "../../components/Table/TableControls";
import { Table } from "../../components/Table/Table";
import { useState, useMemo } from "react";
import { filterData } from "../../lib/processData";
import { getEmitidos } from "../../data/query";
import { getToday } from "../../lib/date-helpers";
import { Title } from "../../components/Title";

export default function ConsultarEmitidosPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    eNCF: "",
    RNC: "",
    Razon: "",
    Tipo: "Todos",
  });

  const [date, setDate] = useState({
    from: getToday(),
    to: getToday(),
  });

  const [sortOrder, setSortOrder] = useState("desc");

  const handleSearchClick = async () => {
    setLoading(true);
    const data = await getEmitidos(date.from, date.to);
    setData(data);
    setLoading(false);
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
      RNC: "RNCComprador",
      Razon: "RazonSocialComprador",
    });
  }, [data, sortOrder, filters]);

  return (
    <div className="flex flex-col gap-6">
      <Title text={"Consultar Emitidos"} />

      <TableControls
        date={date}
        setDate={setDate}
        filters={filters}
        setFilters={setFilters}
        handleSearchClick={handleSearchClick}
        handleLimpiarClick={handleLimpiarClick}
      />

      <Table
        data={filteredData}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        loading={loading}
        view="emision"
      />
    </div>
  );
}

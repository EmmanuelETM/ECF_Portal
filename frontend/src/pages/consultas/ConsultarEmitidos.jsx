import { TableControls } from "../../components/Table/TableControls";
import { Table } from "../../components/Table/Table";
import { useState, useMemo, useEffect } from "react";
import { filterData } from "../../lib/processData";
import { getListaECFEmitidos } from "../../api/emitidos";
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

  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return filterData(data, sortOrder, filters);
  }, [data, sortOrder, filters]);

  //Set page back to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortOrder]);

  const handleSearchClick = async () => {
    setLoading(true);
    const data = await getListaECFEmitidos(date.from, date.to);
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
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-6">
      <Title text={"Consultar Emitidos"} />

      <TableControls
        date={date}
        setDate={setDate}
        filters={filters}
        setFilters={setFilters}
        setCurrentPage={setCurrentPage}
        handleSearchClick={handleSearchClick}
        handleLimpiarClick={handleLimpiarClick}
      />

      <Table
        data={filteredData}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        loading={loading}
        view="emision"
      />
    </div>
  );
}

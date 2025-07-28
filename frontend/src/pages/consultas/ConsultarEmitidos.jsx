import { TableControls } from "../../components/Table/TableControls";
import { Table } from "../../components/Table/Table";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useFetch } from "../../hooks/use-fetch";
import { filterData } from "../../lib/processData";
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

  const authFetch = useFetch();

  const [date, setDate] = useState({
    from: getToday(),
    to: getToday(),
  });

  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return filterData(data, sortOrder, filters);
  }, [data, sortOrder, filters]);

  const getListaECFEmitidos = useCallback(
    async (desde, hasta) => {
      const params = new URLSearchParams();
      if (desde) params.append("FechaEmisionDesde", desde);
      if (hasta) params.append("FechaEmisionHasta", hasta);

      const query = params.toString();

      const url = `/emitidos/consulta${query ? `?${query}` : ""}`;

      const response = await authFetch(url);
      return response.json();
    },
    [authFetch]
  );

  // Reset to page 1 when filters or sort order change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortOrder]);

  const handleSearchClick = async () => {
    setLoading(true);
    try {
      const data = await getListaECFEmitidos(date.from, date.to);
      setData(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
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

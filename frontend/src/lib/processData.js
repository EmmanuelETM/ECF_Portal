const sortData = (sortOrder, data) => {
  return [...data].sort((a, b) => {
    const aFecha = a["fecha"];
    const bFecha = b["fecha"];

    if (sortOrder === "asc") {
      return aFecha < bFecha ? -1 : aFecha > bFecha ? 1 : 0;
    } else {
      return bFecha < aFecha ? -1 : bFecha > aFecha ? 1 : 0;
    }
  });
};

export const filterData = (data, sortOrder, filters) => {
  const sortedData = sortData(sortOrder, data);

  return sortedData.filter((item) => {
    const matchEcf =
      !filters.ecf ||
      item.nombre.toLowerCase().includes(filters.ecf.toLowerCase());
    const matchRnc = !filters.rnc || item.rnc.toString().includes(filters.rnc);
    const matchRazon =
      !filters.razon ||
      item.razon.toLowerCase().includes(filters.razon.toLowerCase());
    const matchTipoEcf =
      !filters.tipo_ecf || filters.tipo_ecf === "Todos"
        ? true
        : item.tipo_ecf.toLowerCase() === filters.tipo_ecf.toLowerCase();
    return matchEcf && matchRnc && matchRazon && matchTipoEcf;
  });
};

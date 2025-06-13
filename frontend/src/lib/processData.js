const sortData = (data, sortOrder) => {
  return [...data].sort((a, b) => {
    const aFecha = a["FechaEmision"];
    const bFecha = b["FechaEmision"];

    if (sortOrder === "asc") {
      return aFecha < bFecha ? -1 : aFecha > bFecha ? 1 : 0;
    } else {
      return bFecha < aFecha ? -1 : bFecha > aFecha ? 1 : 0;
    }
  });
};

export const filterData = (data, sortOrder, filters, { RNC, Razon }) => {
  const sortedData = sortData(data, sortOrder);

  return sortedData.filter((item) => {
    const matcheNCF =
      !filters.eNCF ||
      item.eNCF.toLowerCase().includes(filters.eNCF.toLowerCase());
    const matchRNC = !filters.RNC || item[RNC].toString().includes(filters.RNC);
    const matchRazon =
      !filters.Razon ||
      item[Razon].toLowerCase().includes(filters.Razon.toLowerCase());
    const matchTipo =
      !filters.Tipo || filters.Tipo === "Todos"
        ? true
        : item.Tipo.toString() === filters.Tipo.toString();
    return matcheNCF && matchRNC && matchRazon && matchTipo;
  });
};

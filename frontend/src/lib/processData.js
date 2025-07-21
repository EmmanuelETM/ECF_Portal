const sortData = (data, sortOrder) => {
  return [...data].sort((a, b) => {
    const parseDate = (str) => {
      const [day, month, year] = str.split("-");
      return new Date(`${year}-${month}-${day}`);
    };

    const dateA = parseDate(a["FechaEmision"]);
    const dateB = parseDate(b["FechaEmision"]);

    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });
};

export const filterData = (data, sortOrder, filters) => {
  const sortedData = sortData(data, sortOrder);

  return sortedData.filter((item) => {
    const matcheNCF =
      !filters.eNCF ||
      item.eNCF.toLowerCase().includes(filters.eNCF.toLowerCase());
    const matchRNC = !filters.RNC || item.RNC.toString().includes(filters.RNC);
    const matchRazon =
      !filters.Razon ||
      item.RazonSocial.toLowerCase().includes(filters.Razon.toLowerCase());
    const matchTipo =
      !filters.Tipo || filters.Tipo === "Todos"
        ? true
        : item.TipoeCF.toString() === filters.Tipo.toString();
    return matcheNCF && matchRNC && matchRazon && matchTipo;
  });
};

export const filterData = (data, filters) => {
  return data.filter((item) => {
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

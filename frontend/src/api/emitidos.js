const API_SERVER = import.meta.env.VITE_API_SERVER;

// INDICADORES
export async function getIndicadoresEmitidos(desde, hasta) {
  const endpoint = new URL(`${API_SERVER}/emitidos/indicadores`);
  if (desde) endpoint.searchParams.append("FechaEmisionDesde", desde);
  if (hasta) endpoint.searchParams.append("FechaEmisionHasta", hasta);
  return fetch(endpoint);
}

// EMITIDOS
export async function getListaECFEmitidos(desde, hasta) {
  const endpoint = new URL(`${API_SERVER}/emitidos/consulta`);
  if (desde) endpoint.searchParams.append("FechaEmisionDesde", desde);
  if (hasta) endpoint.searchParams.append("FechaEmisionHasta", hasta);
  return fetch(endpoint);
}

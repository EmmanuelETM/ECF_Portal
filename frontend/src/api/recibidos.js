const API_SERVER = import.meta.env.VITE_API_SERVER;

export async function getIndicadoresRecibidos(desde, hasta) {
  const endpoint = new URL(`${API_SERVER}/recibidos/indicadores`);
  if (desde) endpoint.searchParams.append("FechaEmisionDesde", desde);
  if (hasta) endpoint.searchParams.append("FechaEmisionHasta", hasta);
  return fetch(endpoint);
}

// ECF RECIBIDOS
export async function getListaECFRecibidos(desde, hasta) {
  const endpoint = new URL(`${API_SERVER}/recibidos/consulta`);
  if (desde) endpoint.searchParams.append("FechaEmisionDesde", desde);
  if (hasta) endpoint.searchParams.append("FechaEmisionHasta", hasta);
  return fetch(endpoint);
}

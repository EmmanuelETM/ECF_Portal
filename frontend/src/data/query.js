import axios from "axios";

export async function getRecibidos(from, to) {
  const endpoint = new URL("http://localhost:5174/recepcion");
  if (from) endpoint.searchParams.append("FechaEmisionDesde", from);
  if (to) endpoint.searchParams.append("FechaEmisionHasta", to);

  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getEmitidos(from, to) {
  const endpoint = new URL("http://localhost:5174/emision");
  if (from) endpoint.searchParams.append("FechaEmisionDesde", from);
  if (to) endpoint.searchParams.append("FechaEmisionHasta", to);

  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getIndicadores(from, to) {
  const endpoint = new URL("http://localhost:5174/indicadores");
  if (from) endpoint.searchParams.append("FechaEmisionDesde", from);
  if (to) endpoint.searchParams.append("FechaEmisionHasta", to);

  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

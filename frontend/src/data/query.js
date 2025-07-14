import axios from "axios";

export const API_SERVER = "http://localhost:5174";

//Recepcion

//Emision

export async function getRecibidos(from, to) {
  const endpoint = new URL(`${API_SERVER}/recepcion`);
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
  const endpoint = new URL(`${API_SERVER}/emision`);
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
  const endpoint = new URL(`${API_SERVER}/indicadores`);
  if (from) endpoint.searchParams.append("FechaEmisionDesde", from);
  if (to) endpoint.searchParams.append("FechaEmisionHasta", to);

  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getIndicadoresEmitidos(desde, hasta) {
  const endpoint = new URL(`${API_SERVER}/emitidos/indicadores`);
  if (desde) endpoint.searchParams.append("FechaEmisionDesde", desde);
  if (hasta) endpoint.searchParams.append("FechaEmisionHasta", hasta);
  return fetch(endpoint);
}

export async function getIndicadoresRecibidos(desde, hasta) {
  const endpoint = new URL(`${API_SERVER}/recibidos/indicadores`);
  if (desde) endpoint.searchParams.append("FechaEmisionDesde", desde);
  if (hasta) endpoint.searchParams.append("FechaEmisionHasta", hasta);
  return fetch(endpoint);
}

export async function getXml(path, xml) {
  const endpoint = new URL(`${API_SERVER}/${path}/101234567E310000000035.xml`);
  console.log(xml);
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function configuracion() {
  const endpoint = new URL(`${API_SERVER}/configuracion`);
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

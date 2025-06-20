import axios from "axios";

export const API_PATH = "http://localhost:5174";

export async function getRecibidos(from, to) {
  const endpoint = new URL(`${API_PATH}/recepcion`);
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
  const endpoint = new URL(`${API_PATH}/emision`);
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
  const endpoint = new URL(`${API_PATH}/indicadores`);
  if (from) endpoint.searchParams.append("FechaEmisionDesde", from);
  if (to) endpoint.searchParams.append("FechaEmisionHasta", to);

  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getXml(path, xml) {
  const endpoint = new URL(`${API_PATH}/${path}/101234567E310000000035.xml`);
  console.log(xml);
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

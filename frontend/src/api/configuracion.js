const API_SERVER = import.meta.env.VITE_API_SERVER;

export async function configuracion() {
  const endpoint = new URL(`${API_SERVER}/configuracion`);
  return fetch(endpoint);
}

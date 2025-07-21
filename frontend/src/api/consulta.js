const API_SERVER = import.meta.env.VITE_API_SERVER;

export async function consultarDGII(ecf, tipo) {
  const endpoint = `${API_SERVER}/${tipo}/consulta/qr/${ecf}`;

  const response = await fetch(endpoint);
  const text = await response.text();
  if (!response.ok) {
    return false;
  }
  window.open(text, "_blank", "noopener,noreferrer");
  return true;
}

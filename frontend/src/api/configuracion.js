const API_SERVER = import.meta.env.VITE_API_SERVER;

export async function getConfiguracion() {
  const endpoint = new URL(`${API_SERVER}/configuracion`);
  return fetch(endpoint);
}

export async function patchConfiguracion(section, key, value) {
  const endpoint = new URL(`${API_SERVER}/configuracion`);

  return fetch(endpoint, {
    method: "POST",
    redirect: "follow",
    body: JSON.stringify({
      [section]: {
        [key]: value,
      },
    }),
  });
}

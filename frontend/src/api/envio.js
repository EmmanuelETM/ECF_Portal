const API_SERVER = import.meta.env.VITE_API_SERVER;

/* DGII */

export async function enviarDGIIECF(ecf) {
  await fetch(`${API_SERVER}/envio/dgii/ecf/${ecf}`, {
    method: "POST",
  });
}

export async function enviarDGIIAC_Aceptacion(ecf) {
  await fetch(`${API_SERVER}/envio/dgii/ac/${ecf}`, {
    method: "POST",
    body: JSON.stringify({
      Estado: 1,
      MotivoRechazo: "",
    }),
  });
}

export async function enviarDGIIAC_Rechazo(ecf, MotivoRechazo) {
  await fetch(`${API_SERVER}/envio/dgii/ac/${ecf}`, {
    method: "POST",
    body: JSON.stringify({
      Estado: 2,
      MotivoRechazo: MotivoRechazo,
    }),
  });
}

/* CLIENTE */

export async function enviarClienteECF(ecf) {
  await fetch(`${API_SERVER}/envio/cliente/ecf/${ecf}`, {
    method: "POST",
  });
}

export async function enviarClienteAC_Aceptacion(ecf) {
  await fetch(`${API_SERVER}/envio/cliente/ac/${ecf}`, {
    method: "POST",
    body: JSON.stringify({
      Estado: 1,
      MotivoRechazo: "",
    }),
  });
}

export async function enviarClienteAC_Rechazo(ecf, MotivoRechazo) {
  await fetch(`${API_SERVER}/envio/cliente/ac/${ecf}`, {
    method: "POST",
    body: JSON.stringify({
      Estado: 2,
      MotivoRechazo: MotivoRechazo,
    }),
  });
}

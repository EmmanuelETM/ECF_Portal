const API_SERVER = import.meta.env.VITE_API_SERVER;

export const showXml = async (doc, folder) => {
  const file = `${API_SERVER}/${folder}/ecf/${doc}`;
  const response = await fetch(file);
  if (!response.ok) throw new Error("Archivo no Encontrado");

  const txt = await response.text();
  return txt;
};

export const showLogs = async (doc) => {
  const name = doc.replace(/\.xml$/, ".log");
  const file = `${API_SERVER}/respuestas/ecf/${name}`;
  const response = await fetch(file);
  if (!response.ok) throw new Error("Archivo no Encontrado");

  const txt = await response.text();
  return txt;
};

export const showPDF = async (doc, folder) => {
  const file = `${API_SERVER}/${folder}/ecf/${doc}?ContentType=application/pdf`;
  const response = await fetch(file);
  if (!response.ok) throw new Error("Error al obtener PDF");

  const blob = await response.blob();
  const pdfUrl = URL.createObjectURL(blob);
  window.open(pdfUrl);
  URL.revokeObjectURL(pdfUrl);
};

export const showPOS = async (doc, folder) => {
  return "";
};

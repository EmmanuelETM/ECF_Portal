// Fecha de hoy
export function getToday() {
  const today = new Date();
  const parts = today
    .toLocaleDateString("es-DO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .split("/");

  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

// Format Monto
export function formatMonto(valor) {
  return new Intl.NumberFormat("es-DO", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
}

// Format Date
export function formatDate(fechaString, formato) {
  const [year, month, day] = fechaString.split("-").map(Number);
  const d = new Date(year, month - 1, day);

  if (isNaN(d)) return "";

  const map = {
    dd: String(d.getDate()).padStart(2, "0"),
    d: d.getDate(),
    mm: String(d.getMonth() + 1).padStart(2, "0"),
    m: d.getMonth() + 1,
    yyyy: d.getFullYear(),
    yy: String(d.getFullYear()).slice(-2),
  };

  return formato.replace(
    /dd|d|mm|m|yyyy|yy/gi,
    (matched) => map[matched.toLowerCase()] ?? matched
  );
}

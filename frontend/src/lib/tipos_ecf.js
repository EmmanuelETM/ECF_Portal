export const tipos_ecf = [
  { id: 31, nombre: "Factura de Crédito Fiscal Electrónico" },
  { id: 32, nombre: "Factura de Consumo Electrónica" },
  { id: 33, nombre: "Nota de Débito Electrónica" },
  { id: 34, nombre: "Nota de Crédito Electrónico" },
  { id: 41, nombre: "Compras Electrónicas" },
  { id: 43, nombre: "Gastos Menores Electrónicos" },
  { id: 44, nombre: "Regímenes Especiales Electrónicos" },
  { id: 45, nombre: "Gubernamental Electrónico" },
];

export function getTipoDocumentoById(tipoId) {
  const tipo = tipos_ecf.find((t) => t.id === tipoId);
  return tipo ? tipo.nombre : "Desconocido";
}

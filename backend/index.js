const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const data = [
  {
    nombre: "Deacting",
    fecha: "2025-06-06",
    monto: 1500,
    tipo: 31,
    tipo_ecf: "Regímenes Especiales Electrónicos",
    rnc: 195862719296021,
    razon: "idk i just got here",
  },
  {
    nombre: "Comprobante",
    fecha: "2025-06-06",
    monto: 1500,
    tipo: 31,
    tipo_ecf: "Factura de Crédito Fiscal Electrónico",
    rnc: 987416234912342,
    razon: "this is the reason",
  },
  {
    nombre: "Comprueba",
    fecha: "2025-06-10",
    monto: 1500,
    tipo: 31,
    tipo_ecf: "Factura de Consumo Electrónica",
    rnc: 123401234012348,
    razon: "waos",
  },
  {
    nombre: "Prueba",
    fecha: "2025-06-11",
    monto: 1500,
    tipo: 31,
    tipo_ecf: "Nota de Débito Electrónica",
    rnc: 798760918761216,
    razon: "thermostat",
  },
  {
    nombre: "Test",
    fecha: "2024-08-07",
    monto: 1500,
    tipo: 31,
    tipo_ecf: "Compras Electrónicas",
    rnc: 581298102938117,
    razon: "action",
  },
  {
    nombre: "Jest",
    fecha: "2025-07-08",
    monto: 1500,
    tipo: 31,
    tipo_ecf: "Gastos Menores Electrónicos",
    rnc: 189868928106868,
    razon: "im just a dud",
  },
];

app.get("/", (req, res) => {
  res.send(JSON.stringify(data));
});

app.listen(5174, () => {
  console.log(`server listening on http://localhost:${5174}`);
});

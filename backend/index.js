const express = require("express");
const cors = require("cors");

const indicadores = require("./mock/indicadores.json");
const emitidos = require("./mock/emitidos.json");
const recibidos = require("./mock/recibidos.json");

const PORT = process.env.PORT ?? 5174;

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request Received on ${req.url}`);
  next();
});

app.get("/indicadores", (req, res) => {
  res.json(indicadores);
});

app.get("/emision", (req, res) => {
  res.json(emitidos);
});

app.get("/recepcion", (req, res) => {
  res.json(recibidos);
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${5174}`);
});

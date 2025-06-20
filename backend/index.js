const express = require("express");
const cors = require("cors");
const fs = require("node:fs");
const path = require("node:path");

const indicadores = require("./mock/indicadores.json");
const emitidos = require("./mock/emitidos.json");
const recibidos = require("./mock/recibidos.json");

const PORT = process.env.PORT ?? 5174;

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, _, next) => {
  console.log(`Request Received on ${req.url}`);
  next();
});

app.get("/indicadores", (req, res) => {
  res.json(indicadores);
});

app.get("/emision", (req, res) => {
  res.json(emitidos);
});

app.get("/emision/:doc", async (req, res) => {
  const { doc } = req.params;

  const exists = fs.existsSync(`./mock/xml/${doc}`);

  if (!exists)
    return res.status(404).json({ message: "XML document not found" });

  fs.readFile(`./mock/xml/${doc}`, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    if (data) {
      return res.end(data);
    }
  });
});

app.get("/recepcion", (req, res) => {
  res.json(recibidos);
});

app.get("/recepcion/:doc", (req, res) => {
  const { doc } = req.params;
  res.json(recibidos);
});

app.use((req, res) => {
  return res.status(404).json({ message: "Not found" });
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${5174}`);
});

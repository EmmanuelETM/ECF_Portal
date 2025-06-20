import express from "express";
import corsMiddleware from "./middlewares/cors.js";

import IndicadoresRouter from "./routes/indicadores.js";
import EmisionRouter from "./routes/emision.js";
import RecepcionRouter from "./routes/recepcion.js";

const PORT = process.env.PORT ?? 5174;

const app = express();
app.disable("x-powered-by");
app.use(corsMiddleware());
app.use(express.json());

app.use((req, _, next) => {
  console.log(`Request Received on ${req.url}`);
  next();
});

app.use("/indicadores", IndicadoresRouter);
app.use("/emision", EmisionRouter);
app.use("/recepcion", RecepcionRouter);

app.use((_, res) => {
  return res.status(404).json({ message: "Not found" });
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${5174}`);
});

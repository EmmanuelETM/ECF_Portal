import { Router } from "express";
import IndicadoresController from "../controllers/indicadores.js";

const IndicadoresRouter = Router();

IndicadoresRouter.get("/", IndicadoresController.getAll);

export default IndicadoresRouter;

import { Router } from "express";
import RecepcionController from "../controllers/recepcion.js";

const RecepcionRouter = Router();

RecepcionRouter.get("/", RecepcionController.getAll);
RecepcionRouter.get("/:doc", RecepcionController.getXml);

export default RecepcionRouter;

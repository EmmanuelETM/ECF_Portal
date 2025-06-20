import { Router } from "express";
import EmisionController from "../controllers/emision.js";

const EmisionRouter = Router();

EmisionRouter.get("/", EmisionController.getAll);
EmisionRouter.get("/:doc", EmisionController.getXml);

export default EmisionRouter;

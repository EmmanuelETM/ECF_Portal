import EmisionModel from "../models/emision.js";

class EmisionController {
  static async getAll(req, res) {
    const { FechaEmisionDesde, FechaEmisionHasta } = req.query;

    if (FechaEmisionDesde && FechaEmisionHasta)
      console.log(FechaEmisionDesde, FechaEmisionHasta);

    const emitidos = await EmisionModel.getAll();
    return res.json(emitidos);
  }

  static async getXml(req, res) {
    const { doc } = req.params;
    const response = await EmisionModel.getXml({ doc });

    if (response.error) {
      return res.status(response.status).json({ message: response.error });
    }

    res.setHeader("Content-Type", "application/xml");
    return res.end(response.data);
  }
}

export default EmisionController;

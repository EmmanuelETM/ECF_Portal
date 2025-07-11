import RecepcionModel from "../models/recepcion.js";

class RecepcionController {
  static async getAll(req, res) {
    const { FechaEmisionDesde, FechaEmisionHasta } = req.query;

    if (FechaEmisionDesde && FechaEmisionHasta)
      console.log(FechaEmisionDesde, FechaEmisionHasta);

    const recibidos = await RecepcionModel.getAll();
    return res.json(recibidos);
  }

  static async getXml(req, res) {
    const { doc } = req.params;

    const response = await RecepcionModel.getXml({ doc });

    if (response.error) {
      return res.status(response.status).json({ message: response.error });
    }

    res.setHeader("Content-Type", "application/xml");
    return res.send(response.data);
  }
}

export default RecepcionController;

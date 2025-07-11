import IndicadoresModel from "../models/indicadores.js";

class IndicadoresController {
  static async getAll(req, res) {
    const { FechaEmisionDesde, FechaEmisionHasta } = req.query;

    if (FechaEmisionDesde && FechaEmisionHasta)
      console.log(FechaEmisionDesde, FechaEmisionHasta);

    const indicadores = await IndicadoresModel.getAll();
    return res.json(indicadores);
  }
}

export default IndicadoresController;

import IndicadoresModel from "../models/indicadores.js";

class IndicadoresController {
  static async getAll(req, res) {
    const indicadores = await IndicadoresModel.getAll();
    return res.json(indicadores);
  }
}

export default IndicadoresController;

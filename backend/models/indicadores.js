import { readJson } from "../readJson.js";

const indicadores = readJson("./models/mock/indicadores.json");

class IndicadoresModel {
  static async getAll() {
    return indicadores;
  }
}

export default IndicadoresModel;

import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { readJson } from "../readJson.js";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const _dirname = dirname(fileURLToPath(import.meta.url));

const recibidos = readJson(join(_dirname, "mock/recibidos.json"));

class RecepcionModel {
  static async getAll() {
    return recibidos;
  }

  static async getXml({ doc }) {
    const path = join(_dirname, "mock", "xml", doc);
    const exists = existsSync(path);

    if (!exists) {
      return { error: "File not found", status: 404 };
    }

    try {
      const data = await readFile(path);
      return { data, status: 200 };
    } catch (err) {
      return { error: "Something went wrong", status: 500 };
    }
  }
}

export default RecepcionModel;

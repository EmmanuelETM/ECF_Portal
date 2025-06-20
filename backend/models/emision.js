import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { readJson } from "../readJson.js";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const _dirname = dirname(fileURLToPath(import.meta.url));

const emitidos = readJson(join(_dirname, "mock/emitidos.json"));

class EmisionModel {
  static async getAll() {
    return emitidos;
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

export default EmisionModel;

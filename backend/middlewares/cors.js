import cors from "cors";

const ALLOWED_ORIGINS = ["http://localhost:5173", "http://localhost:5174"];

const corsMiddleware = ({ options = ALLOWED_ORIGINS } = {}) =>
  cors({
    methods: "GET, POST, PATCH, DELETE, HEAD, OPTIONS",
    origin: (origin, callback) => {
      if (options.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("CORS error: origin not allowed"));
    },
  });

export default corsMiddleware;

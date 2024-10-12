import * as http from "http";
import express from "express";
import * as config from "./core/config/index";
import { Routes } from "./routes/index";
import { dbConnection } from "./core/db/connect";

const app = express();
Routes.init(app);

const server: http.Server = http.createServer(app);

server.listen(config.PORT, "0.0.0.0", async () => {
  await dbConnection();
});

export { server };

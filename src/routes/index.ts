import * as express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import { AdsRouter } from "./adsRouter";
import { CategoryRouter } from "./categoryRouter";
import { PrivateChannelRouter } from "./privateChannelRouter";
import { VideoRouter } from "./videoRouter";
import handleError from "../controllers/errorController";
import { AppError } from "../utils/appError";
import { ALLOWED_ORIGINS } from "../core/config";

class Routes {
  static init(app: express.Application): void {
    app.enable("trust proxy");

    // Implement CORS
    app.use(cors());
    app.options("*", cors());

    app.use((req, res, next) => {
      const origin = req.headers.origin;
      if (origin && ALLOWED_ORIGINS.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      } else {
        res.setHeader("Access-Control-Allow-Origin", "*");
      }
      next();
    });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(mongoSanitize());

    // Configure routes
    app.use("/ads", new AdsRouter().router);
    app.use("/categories", new CategoryRouter().router);
    app.use("/videos", new VideoRouter().router);
    app.use("/private", new PrivateChannelRouter().router);

    app.get("/", (req, res) => {
      res.send("Tv2Namibia");
    });

    app.all("*", (req, res, next) => {
      next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    });

    app.use(handleError);
  }
}

export { Routes };

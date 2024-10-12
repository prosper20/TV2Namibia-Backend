import { Router } from "express";
import { AdsController } from "../controllers/adsController";


class AdsRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes(): void {
    this.router
      .route("/")
      .post(AdsController.create)
      .get(AdsController.all);

    this.router
      .route("/:id")
      .get(AdsController.one)
      .put(AdsController.update)
      .delete( AdsController.delete);
  }
}

export { AdsRouter };

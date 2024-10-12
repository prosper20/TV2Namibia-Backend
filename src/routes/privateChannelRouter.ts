import { Router } from "express";
import { PrivateChannelController } from "../controllers/privateChannelController";


class PrivateChannelRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes(): void {
    this.router
      .route("/")
      .post(PrivateChannelController.create)
      .get(PrivateChannelController.all);

    this.router
      .route("/:id")
      .get(PrivateChannelController.one)
      .put(PrivateChannelController.update)
      .delete( PrivateChannelController.delete);
  }
}

export { PrivateChannelRouter };

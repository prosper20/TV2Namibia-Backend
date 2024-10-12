import { Router } from "express";
import { VideoController } from "../controllers/videoController";


class VideoRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes(): void {
    this.router
      .route("/")
      .post(VideoController.create)
      .get(VideoController.all);

    this.router
      .route("/:id")
      .get(VideoController.one)
      .put(VideoController.update)
      .delete( VideoController.delete);
  }
}

export { VideoRouter };

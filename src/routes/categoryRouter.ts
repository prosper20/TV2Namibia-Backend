import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";


class CategoryRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes(): void {
    this.router
      .route("/")
      .post(CategoryController.create)
      .get(CategoryController.all);

    this.router
      .route("/:id")
      .get(CategoryController.one)
      .put(CategoryController.update)
      .delete( CategoryController.delete);
  }
}

export { CategoryRouter };

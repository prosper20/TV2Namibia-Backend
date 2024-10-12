import {
  CategoryModel,
} from "../models/categoryModel";

import * as factory from "./factory";


class CategoryController {
  public static create = factory.createOne(CategoryModel);
  public static one = factory.getOne(CategoryModel);
  public static all = factory.getAll(CategoryModel);
  public static update = factory.updateOne(CategoryModel);
  public static delete = factory.deleteOne(CategoryModel);
  public static search = factory.search(CategoryModel);
}

export { CategoryController };

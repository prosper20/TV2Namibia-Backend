import { Schema, model } from "mongoose";
import { ICategory } from "../core/types/models";

const categorySchema = new Schema<ICategory>({
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  id: {
    type: String,
    required: [true, "ID is required"],
  },
  subCategories: {
    type: [String],
    default: [],
  },
});

export const CategoryModel = model("Category", categorySchema);

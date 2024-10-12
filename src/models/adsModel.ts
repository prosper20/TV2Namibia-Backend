import { Schema, model } from "mongoose";
import { IAds } from "../core/types/models";

const adsSchema = new Schema<IAds>({
  id: {
    type: String,
    required: [true, "ID is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  isUpload: {
    type: Boolean,
    default: false,
  },
  path: {
    type: String,
    required: [true, "Path is required"],
  },
  space: {
    type: Number,
    required: [true, "Space is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  url: {
    type: String,
    required: [true, "URL is required"],
  },
});

export const AdsModel = model("Ads", adsSchema);

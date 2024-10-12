import { Schema, model } from "mongoose";
import { PreviewDetail, Source, IVideo } from "../core/types/models";

const previewDetailSchema = new Schema<PreviewDetail>({
  previewDate: {
    type: String,
    required: [true, "Preview date is required"],
  },
  previewTime: {
    type: String,
    required: [true, "Preview time is required"],
  },
});

const sourceSchema = new Schema<Source>({
  quality: {
    type: Number,
    required: [true, "Quality is required"],
  },
  src: {
    type: String,
    required: [true, "Source is required"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],
  },
});

const videoSchema = new Schema<IVideo>({
  active: {
    type: Boolean,
    required: [true, "Active status is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  datePosted: {
    type: String,
    required: [true, "Date posted is required"],
  },
  docID: {
    type: String,
    required: [true, "Document ID is required"],
  },
  id: {
    type: String,
    required: [true, "ID is required"],
  },
  isLive: {
    type: Boolean,
    required: [true, "Live status is required"],
  },
  preview: {
    type: Boolean,
    required: [true, "Preview status is required"],
  },
  previewDetails: {
    type: previewDetailSchema,
    required: [true, "Preview details are required"],
  },
  restream: {
    type: Boolean,
    required: [true, "Restream status is required"],
  },
  sources: {
    type: [sourceSchema],
    required: [true, "Sources are required"],
  },
  subCategory: {
    type: String,
    required: [true, "Subcategory is required"],
  },
  thumbnail: {
    type: String,
    required: [true, "Thumbnail is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  type: {
    type: String,
    enum: ["on-demand", "live"],
    required: [true, "Type is required"],
  },
});

const VideoModel = model("Video", videoSchema);
export {VideoModel};

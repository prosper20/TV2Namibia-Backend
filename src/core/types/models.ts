import { Schema, Document, ObjectId } from "mongoose";

export interface IModel extends Document {
  _id: Schema.Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAds extends Document {
  id: string;
  image: string;
  isUpload: boolean;
  path: string;
  space: number;
  title: string;
  url: string;
}

export interface ICategory extends Document {
  category: string;
  id: string;
  subCategories: string[];
}

export type Info = {
  id: string;
  text: string;
}

export type InfoBlock = {
  info: Info[];
  title: string;
  role: string;
}

export type Social = {
  username: string;
}

export type Source = {
  quality: number;
  src: string;
  type: string;
}

export type PreviewDetail = {
  previewDate?: string;
  previewTime?: string;
}

export interface IVideo extends Document {
  active: boolean;
  category: string;
  datePosted: string;
  docID: string;
  id: string;
  isLive: boolean;
  preview: boolean;
  previewDetails?: PreviewDetail;
  restream: boolean;
  sources: Source[];
  subCategory: string;
  thumbnail: string;
  title: string;
  type: "on-demand" | "live";
}

export interface IPrivateChannel extends Document {
  active: boolean;
  email: string;
  infoBlock: InfoBlock[];
  socialArr: Social[];
  videos: ObjectId[];
}

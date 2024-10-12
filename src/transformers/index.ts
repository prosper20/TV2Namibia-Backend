import { Transformer } from "./transformer";
import { Model } from "mongoose";

export class AdsTransformer extends Transformer {
  constructor(data: any) {
    const properties: string[] = [
      "_id",
      "id",
      "image",
      "isUpload",
      "path",
      "space",
      "title",
      "url",
      "createdAt",
      "updatedAt"
    ];

    super(data, properties);
  }
}

export class CategoryTransformer extends Transformer {
  constructor(data: any) {
    const properties: string[] = [
      "_id",
      "category",
      "id",
      "subCategories",
      "createdAt",
      "updatedAt"
    ];

    super(data, properties);
  }
}

export class InfoTransformer extends Transformer {
  constructor(data: any) {
    const properties: string[] = [
      "_id",
      "id",
      "text",
      "createdAt",
      "updatedAt"
    ];

    super(data, properties);
  }
}

export class InfoBlockTransformer extends Transformer {
  constructor(data: any) {
    const properties: string[] = [
      "_id",
      "info",
      "title",
      "role",
      "createdAt",
      "updatedAt"
    ];

    super(data, properties);
  }
}

export class SocialArrTransformer extends Transformer {
  constructor(data: any) {
    const properties: string[] = [
      "_id",
      "username",
      "createdAt",
      "updatedAt"
    ];

    super(data, properties);
  }
}

export class SourcesTransformer extends Transformer {
  constructor(data: any) {
    const properties: string[] = [
      "_id",
      "quality",
      "src",
      "type",
      "createdAt",
      "updatedAt"
    ];

    super(data, properties);
  }
}

export class PreviewDetailsTransformer extends Transformer {
  constructor(data: any) {
    const properties: string[] = [
      "previewDate",
      "previewTime"
    ];

    super(data, properties);
  }
}

export class VideoTransformer extends Transformer {
  constructor(data: any) {
    const properties: string[] = [
      "_id",
      "active",
      "category",
      "datePosted",
      "docID",
      "id",
      "isLive",
      "preview",
      "previewDetails",
      "restream",
      "sources",
      "subCategory",
      "thumbnail",
      "title",
      "type",
      "createdAt",
      "updatedAt"
    ];

    super(data, properties);
  }
}

export class PrivateChannelTransformer extends Transformer {
  constructor(data: any) {
    const properties: string[] = [
      "_id",
      "active",
      "email",
      "infoBlock",
      "socialArr",
      "videos",
      "createdAt",
      "updatedAt"
    ];

    super(data, properties);
  }
}

export const outputTransformer = (Model: Model<any>, data: any) => {
  switch (Model.modelName) {
    case "Ads":
      return new AdsTransformer(data);
    case "Category":
      return new CategoryTransformer(data);
    case "Info":
      return new InfoTransformer(data);
    case "InfoBlock":
      return new InfoBlockTransformer(data);
    case "SocialArr":
      return new SocialArrTransformer(data);
    case "Sources":
      return new SourcesTransformer(data);
    case "Video":
      return new VideoTransformer(data);
    case "PrivateChannel":
      return new PrivateChannelTransformer(data);
    default:
      throw new Error(`No transformer for model: ${Model.modelName}`);
  }
};

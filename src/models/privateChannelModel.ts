import { Schema, model, Types } from "mongoose";
import { Info, InfoBlock, Social,IPrivateChannel } from "../core/types/models";

const infoSchema = new Schema<Info>({
  id: {
    type: String,
    required: [true, "ID is required"],
  },
  text: {
    type: String,
    required: [true, "Text is required"],
  },
});

const infoBlockSchema = new Schema<InfoBlock>({
  info: {
    type: [infoSchema],
    required: [true, "Info is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
  },
});

const socialSchema = new Schema<Social>({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
});

const privateChannelSchema = new Schema<IPrivateChannel>({
  active: {
    type: Boolean,
    required: [true, "Active status is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  infoBlock: {
    type: [infoBlockSchema],
    required: [true, "InfoBlock is required"],
  },
  socialArr: {
    type: [socialSchema],
    default: [],
  },
  videos: {
    type: [Types.ObjectId],
    ref: "VideoModel",
    default: [],
  },
});

export const PrivateChannelModel = model("PrivateChannel", privateChannelSchema);

import {
  VideoModel,
} from "../models/videoModel";

import * as factory from "./factory";


class VideoController {
  public static create = factory.createOne(VideoModel);
  public static one = factory.getOne(VideoModel);
  public static all = factory.getAll(VideoModel);
  public static update = factory.updateOne(VideoModel);
  public static delete = factory.deleteOne(VideoModel);
  public static search = factory.search(VideoModel);
}

export { VideoController };


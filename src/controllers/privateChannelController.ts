import {
  PrivateChannelModel,
} from "../models/privateChannelModel";

import * as factory from "./factory";


class PrivateChannelController {
  public static create = factory.createOne(PrivateChannelModel);
  public static one = factory.getOne(PrivateChannelModel);
  public static all = factory.getAll(PrivateChannelModel);
  public static update = factory.updateOne(PrivateChannelModel);
  public static delete = factory.deleteOne(PrivateChannelModel);
  public static search = factory.search(PrivateChannelModel);
}

export { PrivateChannelController };

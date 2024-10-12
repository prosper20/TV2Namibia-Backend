import {
  AdsModel,
} from "../models/adsModel";

import * as factory from "./factory";


class AdsController {
  public static create = factory.createOne(AdsModel);
  public static one = factory.getOne(AdsModel);
  public static all = factory.getAll(AdsModel);
  public static update = factory.updateOne(AdsModel);
  public static delete = factory.deleteOne(AdsModel);
  public static search = factory.search(AdsModel);
}

export { AdsController };

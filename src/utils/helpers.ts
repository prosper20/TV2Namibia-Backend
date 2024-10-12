import { Aggregate, Model } from "mongoose";

export const paginate: Function = async (
  Model: Model<any> | any[],
  queryString: any
) => {
  //const totalItems = await Model.countDocuments();
  let totalItems;
  if (Array.isArray(Model)) {
    totalItems = Model.length;
  } else if (Model instanceof Aggregate) {
    totalItems = Model.length;
  } else {
    totalItems = await Model.countDocuments();
  }
  const limit = queryString.limit * 1 || 10;
  const page = queryString.page ? +queryString.page : 1;
  const hasNextPage = limit * page < totalItems;
  const hasPreviousPage = page > 1;
  const nextPage = hasNextPage ? page + 1 : null;
  const previousPage = hasPreviousPage ? page - 1 : null;
  const lastPage = Math.ceil(totalItems / limit);

  return {
    page,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    lastPage,
  };
};

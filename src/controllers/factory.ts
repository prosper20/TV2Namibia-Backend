import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { outputTransformer } from "../transformers/index";
import { Model } from "mongoose";
import { paginate } from "../utils/helpers";
import { AppError } from "../utils/appError";
import { APIFeatures } from "../utils/apiFeatures";

interface Result {
  [key: string]: object | object[];
}

export const deleteOne = (Model: any) =>
  asyncHandler(async (req, res, next) => {
    Model.findOne();
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

export const updateOne = (Model: any) =>
  asyncHandler(async (req, res, next) => {

    const initialDoc = await Model.findByIdAndUpdate(req.params.id);
    if (!initialDoc) {
      return next(new AppError("No document found with that ID", 404));
    }
    initialDoc.set(req.body);
    const doc = await initialDoc.save();

    let cleanDoc;

    try {
      // Remove sensitive data from output
      const result = outputTransformer(Model, doc);
      if (!result) {
        return next(new AppError("No document found with that ID", 404));
      }
      cleanDoc = await result.transform();
    } catch (Error) {
      console.log(Error);
    }
    let data: Result = {};
    data[Model.modelName] = cleanDoc;

    res.status(200).json({
      status: "success",
      data,
    });
  });


export const createOne = (Model: any) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body);

    let cleanDoc;

    try {
      // Remove sensitive data from output
      const result = outputTransformer(Model, doc);
      if (!result) {
        return next(new AppError("No document found with that ID", 404));
      }
      cleanDoc = await result.transform();
    } catch (Error) {
      console.log(Error);
    }
    let data: Result = {};
    data[Model.modelName] = cleanDoc;

    res.status(201).json({
      status: "success",
      data,
    });
  });


export const getOne = (Model: any, popOptions?: object) =>
  asyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    let cleanDoc;

    try {
      // Remove sensitive data from output
      const result = outputTransformer(Model, doc);
      if (!result) {
        return next(new AppError("No document found with that ID", 404));
      }
      cleanDoc = await result.transform();
    } catch (Error) {
      console.log(Error);
    }
    let data: Result = {};
    data[Model.modelName] = cleanDoc;

    res.status(200).json({
      status: "success",
      data,
    });
  });


export const getAll = (Model: Model<any>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let filter = {};
    if (req.params.id) filter = { receivers: { $in: [req.params.id] } };
    if (req.params.customerId) filter = { customer: req.params.customerId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .search()
      .filter()
      .sort()
      .limitFields()
      .paginate();

    //const explanation = await features.query.explain();
    const docs = await features.query;
    const pagination = await paginate(
      new APIFeatures(Model.find(filter), req.query)
        .search()
        .filter()
        .sort()
        .limitFields().query,
      req.query
    );
    let cleanDocs;

    try {
      // Remove sensitive data from output
      const result = outputTransformer(Model, docs);
      if (!result) {
        return next(new AppError("No document found", 404));
      }
      cleanDocs = await result.transform();
    } catch (Error) {
      console.log(Error);
    }

    let data: Result = {};
    data[`${Model.modelName}s`] = cleanDocs;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: cleanDocs.length,
      ...pagination,
      data,
    });
  });

export const search = (Model: Model<any>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let docs, pagination;

      const features = new APIFeatures(Model.find(), req.query)
        .search()
        .filter()
        .sort()
        .paginate();
      docs = await features.query;
      pagination = await paginate(
        new APIFeatures(Model.find(), req.query)
          .search()
          .filter()
          .sort()
          .limitFields().query,
        req.query
      );
    let cleanDocs;

    try {
      // Remove sensitive data from output
      const result = outputTransformer(Model, docs);
      if (!result) {
        return next(new AppError("No document found", 404));
      }
      cleanDocs = await result.transform();
    } catch (Error) {
      console.log(Error);
    }

    let data: Result = {};
    data[`${Model.modelName}s`] = cleanDocs;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: cleanDocs.length,
      ...pagination,
      data,
    });
  });

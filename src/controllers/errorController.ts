import { Request, Response, NextFunction } from "express";
import { CastError } from "mongoose";
import { AppError } from "../utils/appError";

const castErrorHandlerDB = (err: CastError) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const duplicateFieldsHandlerDB = (err: Error | any) => {
  const fields = Object.keys(err.keyValue).join(", ");
  const message = `The ${fields} you provided already exist. Please use another ${fields}`;
  return new AppError(message, 400);
};
const validationErrorHandlerDB = (err: Error | any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const sendError = (err: any, res: Response) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error("ERROR 💥", err);
    console.error("Stack Trace:", err.stack);

    // 2) Send generic message
    res.status(500).json(err);
  }
};

function handleError(
  err: Error | AppError | TypeError | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err };
  error.message = err.message;
  //console.log(error);
  if (error.name === "CastError" || error.kind === "ObjectId") {
    error = castErrorHandlerDB(error);
  } else if (error.code === 11000) {
    error = duplicateFieldsHandlerDB(error);
  } else if (
    error.name === "ValidationError" ||
    (error.errors
      ? error.errors[Object.keys(error.errors)[0]].name === "ValidatorError"
      : false)
  )
    error = validationErrorHandlerDB(error);

  sendError(error, res);
}

export default handleError;

import mongoose from "mongoose";

import * as config from "../config/index";

mongoose.Promise = global.Promise;

const dbConnection = async (): Promise<void> => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(config.DB_URL);
    console.log("Database connection successful!!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export { dbConnection };

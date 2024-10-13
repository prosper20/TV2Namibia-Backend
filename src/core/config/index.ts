import * as dotenv from "dotenv";

dotenv.config();

const e: any = process.env;

const ENV: string = e.NODE_ENV || "";
const PORT: number = parseInt(e.PORT || "3000", 10);

const ALLOWED_ORIGINS = [
        "http://localhost:3000",
        "http://localhost:5000",
      ];
const DB_URL: string = e.DB_URL || "";
const DB_NAME: string = e.DB_NAME || "";
const DB_USER: string = e.DB_USER || "";
const DB_PASSWORD: string = e.DB_PASSWORD || "";

export {
  ENV,
  PORT,
  ALLOWED_ORIGINS,
  DB_URL,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
}

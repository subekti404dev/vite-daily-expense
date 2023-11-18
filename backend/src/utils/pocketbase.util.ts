import dotenv from "dotenv";
dotenv.config();
const PocketBase = require("pocketbase/cjs");

const pb = new PocketBase(process.env.POCKET_BASE_URL);
pb.autoCancellation(false);
pb.beforeSend = (url: string, options: any) => {
  options.headers = Object.assign({}, options.headers, {
    "x-token": process.env.POCKET_BASE_TOKEN,
  });

  return { url, options };
};

export default pb;

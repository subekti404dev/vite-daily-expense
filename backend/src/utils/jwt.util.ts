import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export interface IUser {
  collectionId: string;
  collectionName: string;
  created: string;
  deleted: boolean;
  email: string;
  hash_password: string;
  id: string;
  name: string;
  updated: string;
  workspace_id: string;
}

export const generateJwt = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET || "");
};

export const decodeJwt = (token: any) => {
  return jwt.verify(token, process.env.JWT_SECRET || "") as IUser;
};

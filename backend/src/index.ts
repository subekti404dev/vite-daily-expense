import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import v1Routes from "./routes/v1";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
require("cross-fetch/polyfill");

const app: Express = express();
const port = process.env.PORT || 7000;

app.use(cors());
app.use(bodyParser.json());

app.get("/ping", (req: Request, res: Response) => {
  res.send("OK");
});

app.use("/v1", v1Routes);

app.use(express.static("web"));
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "web", "index.html"));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

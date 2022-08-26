import { middleware } from "@my-org/express-api/middleware";
import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.json());
app.use(middleware({}));

export default app;

import * as express from "express";
import { router } from "./controllers/ping";
import * as cors from "cors";

const app = express();

app.use(cors());
app.use(router);

export default app;

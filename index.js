import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import allRoutes from "./routers/router.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = "mongodb://localhost/mail_system";
const PORT = 4000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Connection Established With MongoDB on port ${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));

app.use("/mail-system", allRoutes);


mongoose.set("useFindAndModify", false);

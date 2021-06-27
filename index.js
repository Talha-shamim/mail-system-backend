import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import allRoutes from "./routers/router.js";


// import from server config
dotenv.config({ path: './config.env' })

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT

mongoose
  .connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Connection Established With MongoDB on port ${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));

app.use("/mail-system", allRoutes);


mongoose.set("useFindAndModify", false);

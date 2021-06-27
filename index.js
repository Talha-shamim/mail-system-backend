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

mongoose.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	const connection = mongoose.connection
	connection.once('open', () => {
		console.log('atlas connection established successfully')
	})

app.use("/mail-system", allRoutes);


mongoose.set("useFindAndModify", false);

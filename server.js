const express = require("express");
const app = express();
const movieRouter = require("./Routes/movieRoutes.js");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());

const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: CORS_ORIGIN }));

app.use("/movies", movieRouter);

app.use("/public/images",express.static("./public/images"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));



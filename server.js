const express = require("express");
const app = express();
const movieRouter = require("./Routes/movieRoutes.js");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/movies", movieRouter);

app.use("/public/images",express.static("./public/images"));

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})



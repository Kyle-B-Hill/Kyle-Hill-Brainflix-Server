const express = require("express");
const app = express();
const movieRouter = require("./Routes/movieRoutes.js");

// app.use(express.json());

app.use("/movies", movieRouter);

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})



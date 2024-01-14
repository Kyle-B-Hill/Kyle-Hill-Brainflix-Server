const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.get("/",(request, response)=>{
    const moviesJSON = fs.readFileSync("./Data/movies.json");
    const movies = JSON.parse(moviesJSON);
    const moviesFormatted = movies.map((movie) => {
        return {id:movie.id, title:movie.title, channel: movie.title, image: movie.image}
    });

    response.json(moviesFormatted);
});



// router.get("/",(request, response)=>{
//     response.set({
//         'Content-Type': 'application/json'
//      }); 
//     response.send(fs.readFileSync("./Data/movies.json"));
// });

router.get("/:movieId",(request, response)=>{
    const id = request.params.movieId;
    const moviesJSON = fs.readFileSync("./Data/movies.json");
    const movies = JSON.parse(moviesJSON);
    const movie = movies.find((movie)=>movie.id===id);
    if(!movie) {
        return response.status(404).send("Movie not found.");
    } else {
        return response.json(movie);
    }
    
});

const movieDefaults = {
    id: "This is a movie Id",
    title: "This is a movie title",
    channel: "User Upload",
    image: "/static/StaticImage.jpg",
    description: "This is a movie description",
    views: "0",
    likes: "0",
    duration: "9:00",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: "This is a movie timestamp",
    comments: [],
}

    // title, description, we add timestamp, id 

router.post("/",(request, response)=>{
    const movie = { ...movieDefaults, ...request.body, timestamp:Date.now(), id:uuidv4()}
    // console.log(request.body);
    const moviesJSON = fs.readFileSync("./data/movies.json");
    const movies = JSON.parse(moviesJSON);
    movies.push(movie);
    fs.writeFileSync("./data/movies.json", JSON.stringify(movies));
    response.status(201).json(movie);

})



module.exports = router;
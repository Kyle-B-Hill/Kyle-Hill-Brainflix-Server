const express = require("express");
const router = express.Router();
const fs = require("fs");

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



module.exports = router;
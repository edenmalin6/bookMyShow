import express from "express";
import {
  createMovie,
  getAllMovies,
  updateMovieTitleAndDescription,
  deleteMovie,
  InvalidMovie,
} from "./modules/moviesModule.js";
const app = express();

const PORT = 8000;
app.use(express.json());

//get all movies
app.get("/api/movies", async (req, res) => {
  let movies;
  try {
    movies = await getAllMovies();
  } catch (error) {
    // console.log(movies);
    console.error(error.message);
    return res.status(500).send(error.message);
  }
  // console.log(movies);
  return res.send(movies);
});
// //create a new movie
app.post("/api/movies", async (req, res) => {
  // const { title, description, duration, rating, showtimes } = req.body; is the same as
  let newMovie;
  try {
    newMovie = await createMovie(req.body); //same as this
  } catch (error) {
    if (error instanceof InvalidMovie) {
      console.log(error.message);
      return res.status(400).send(error.message);
    }
    console.error(error.message);
    return res.status(500).send(error.message);
  }
  return res.send(newMovie);
});
// //update movie's title/description or both
app.put("/api/movies/:movieId", async (req, res) => {
  // const { title, description } = req.body;
  // const objForUpdate = {}

  // if(title.length!== 0){
  //   objForUpdate.title = title
  // }
  // if (description.length !== 0) {
  //   objForUpdate.description = description;
  // }
  // if (Object.keys(objForUpdate).length === 0) {
  //   // No valid fields to update
  //   // throw new InvalidMovie("No valid fields provided for update.");
  // }
  let updatedMovieData;
  try {
    updatedMovieData = await updateMovieTitleAndDescription(
      req.params.movieId,
      req.body,
    );

  } catch (error) {
    if (error instanceof InvalidMovie) {
      console.log(error.message);
      return res.status(400).send(error.message);
    }
    console.error(error.message);
    return res.status(500).send(error.message);
  }
  return res.send(updatedMovieData);
});
// //delete a movie by name
app.delete("/api/movies/:movieId", async (req, res) => {
  let deletedMovie;
  try {
    deletedMovie = await deleteMovie(req.params.movieId);
  } catch (error) {
    if (error instanceof InvalidMovie) {
      console.log(error.message);
      return res.status(400).send(error.message);
    }
    console.error(error.message);
    return res.status(500).send(error.message);
  }
  return res.send(deletedMovie);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

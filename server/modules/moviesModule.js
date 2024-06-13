import { getCollection, toObjectId } from "./dbModule.js";
const collectionName = "movies";

export const getAllMovies = async () => {
  const collection = await getCollection(collectionName);
  return await collection.find().toArray();
};
export const createMovie = async ({title,
  description,
  duration,
  rating,
  showtimes,}
) => {
  const collection = await getCollection(collectionName);
  const verifiedMovie = await collection.findOne({title})
   //find - returns a cursor when element isn't found - so ill get an error when condition is falsy. findOne tho returns null so its better to use it.
  if(verifiedMovie) throw new InvalidMovie ("This movie is already on screens.")
  await collection.insertOne({
    title,
    description,
    duration,
    rating,
    showtimes
  });
  return { success: true, message: "Movie created successfully!" };
};
export const updateMovieTitleAndDescription = async (movieId, {title, description}) =>{ 
  //this way only the title and description are inside the obj body. therefore they are one object 
    const collection = await getCollection(collectionName);
    const verifiedMovie = await collection.findOne({_id: toObjectId(movieId)})
    if(!verifiedMovie) throw new InvalidMovie ("No such movie with that id.")

    await collection.updateOne(
      {_id: toObjectId(movieId)},
     { $set: {title,  description} })
    return { success: true, message: "Movie updated successfully!" };
}
export const deleteMovie = async (movieId) =>{
  const collection = await getCollection(collectionName);
  const existingMovie = await collection.findOne({_id: toObjectId(movieId)})
  if(!existingMovie) throw new InvalidMovie ("No such movie with that id.")

  await collection.deleteOne({_id: toObjectId(movieId)})
  return { success: true, message: "Movie deleted successfully!" };

}
export class InvalidMovie extends Error {}

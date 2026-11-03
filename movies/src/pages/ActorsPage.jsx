import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist"; 

const ActorsPage = () => {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${"e3d9284a561b7f945705a307f184e541"}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((json) => {
        
        const formattedActors = json.results.map((actor) => ({
          ...actor,
          title: actor.name, // Map 'name' to 'title' for the search/filter component
          poster_path: actor.profile_path, // Map 'profile_path' to 'poster_path'
        }));
        setActors(formattedActors);
      });
  }, []);

  return (
    <PageTemplate
      title="Popular Actors"
      movies={actors}
      action={(actor) => {
        return <AddToPlaylistIcon movie={actor} />;
      }}
    />
  );
};

export default ActorsPage;
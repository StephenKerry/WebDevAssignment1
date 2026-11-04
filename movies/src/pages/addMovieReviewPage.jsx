import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Header from "../components/headerMovieList";
import ActorCard from "../components/actorCard";
import Spinner from "../components/spinner";
import { getPopularActors } from "../api/tmdb-api";

const ActorsPage = () => {
  const [nameFilter, setNameFilter] = useState("");

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["popularActors"],
    queryFn: getPopularActors,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const displayedActors = data.results.filter((a) =>
    a.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <Grid container>
      <Grid size={12}>
        <Header title="Popular Actors" />
      </Grid>
      <Grid size={12} sx={{ padding: "20px" }}>
        <TextField
          label="Search actors by name"
          variant="outlined"
          fullWidth
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </Grid>
      <Grid container sx={{ padding: "20px" }} spacing={2}>
        {displayedActors.map((actor) => (
          <Grid key={actor.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
            <ActorCard actor={actor} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ActorsPage;
import { useQuery } from "@tanstack/react-query";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CakeIcon from "@mui/icons-material/Cake";
import PlaceIcon from "@mui/icons-material/Place";
import StarRate from "@mui/icons-material/StarRate";
import MovieCard from "../movieCard";
import Spinner from "../spinner";
import { getActorMovieCredits } from "../../api/tmdb-api";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};

const ActorDetails = ({ actor }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["actorCredits", { id: actor.id }],
    queryFn: getActorMovieCredits,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  
  const movies = [...data.cast]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 12);

  return (
    <>
      <Typography variant="h5" component="h3">
        Biography
      </Typography>

      <Typography variant="h6" component="p">
        {actor.biography || "No biography available."}
      </Typography>

      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<CakeIcon />} label={`Born: ${actor.birthday || "Unknown"}`} />
        <Chip icon={<PlaceIcon />} label={actor.place_of_birth || "Unknown"} />
        <Chip icon={<StarRate />} label={`Popularity: ${actor.popularity}`} />
        <Chip label={actor.known_for_department} />
      </Paper>

      <Typography variant="h5" component="h3" sx={{ marginTop: 2, marginBottom: 2 }}>
        Known for
      </Typography>

      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid key={movie.id} size={{ xs: 12, sm: 6, lg: 4 }}>
            <MovieCard movie={movie} action={() => null} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ActorDetails;
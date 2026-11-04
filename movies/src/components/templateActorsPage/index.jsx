import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Spinner from "../spinner";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getActorImages } from "../../api/tmdb-api";

const TemplateActorPage = ({ actor, children }) => {
  const navigate = useNavigate();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["actorImages", { id: actor.id }],
    queryFn: getActorImages,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const images = data.profiles;

  return (
    <>
      <Paper
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          padding: 1.5,
          margin: 0,
        }}
      >
        <IconButton aria-label="go back" onClick={() => navigate(-1)}>
          <ArrowBackIcon color="primary" fontSize="large" />
        </IconButton>
        <Typography variant="h4" component="h3">
          {actor.name}
        </Typography>
        <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
          <ArrowBackIcon
            color="primary"
            fontSize="large"
            sx={{ transform: "scaleX(-1)" }}
          />
        </IconButton>
      </Paper>

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid size={{ xs: 3 }}>
          <ImageList sx={{ height: "100vh" }} cols={1}>
            {images.map((image) => (
              <ImageListItem key={image.file_path} cols={1}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                  alt={actor.name}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>

        <Grid size={{ xs: 9 }}>{children}</Grid>
      </Grid>
    </>
  );
};

export default TemplateActorPage;
import { useState } from "react";
import { getTrendingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import PaginationBar from "../components/paginationBar";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";

const TrendingMoviesPage = () => {
  const [timeWindow, setTimeWindow] = useState("day");
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["trending", { timeWindow, page }],
    queryFn: getTrendingMovies,
    placeholderData: keepPreviousData,
  });

  const handleChange = (event, newWindow) => {
    // newWindow is null if the user clicks the already-selected button
    if (newWindow !== null) {
      setTimeWindow(newWindow);
      setPage(1);
    }
  };

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <ToggleButtonGroup
          color="primary"
          value={timeWindow}
          exclusive
          onChange={handleChange}
          aria-label="trending time window"
          sx={{ backgroundColor: "white" }}
        >
          <ToggleButton value="day">Today</ToggleButton>
          <ToggleButton value="week">This Week</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <PageTemplate
        title={timeWindow === "day" ? "Trending Today" : "Trending This Week"}
        movies={data.results}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
      />

      <PaginationBar
        page={page}
        totalPages={data.total_pages}
        onChange={setPage}
      />
    </>
  );
};

export default TrendingMoviesPage;
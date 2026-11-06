import { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import PaginationBar from "../components/paginationBar";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import { getUpcoming } from "../api/tmdb-api";

const UpcomingMoviesPage = () => {
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["upcoming", { page }],
    queryFn: getUpcoming,
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <PageTemplate
        title="Upcoming Movies"
        movies={data.results}
        action={(movie) => <AddToPlaylistIcon movie={movie} />}
      />
      <PaginationBar
        page={page}
        totalPages={data.total_pages}
        onChange={setPage}
      />
    </>
  );
};

export default UpcomingMoviesPage;
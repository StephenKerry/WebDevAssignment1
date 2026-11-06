import { useState } from "react";
import { getDiscoverMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import PaginationBar from "../components/paginationBar";
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'


const HomePage = (props) => {
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['discover', { page }],
    queryFn: getDiscoverMovies,
    placeholderData: keepPreviousData,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;

  
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 

     return (
      <>
        <PageTemplate
          title="Discover Movies"
          movies={movies}
          action={(movie) => {
            return <AddToFavoritesIcon movie={movie} />
          }}
        />
        <PaginationBar
          page={page}
          totalPages={data.total_pages}
          onChange={setPage}
        />
      </>
  );

};
export default HomePage;
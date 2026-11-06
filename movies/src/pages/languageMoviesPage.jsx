import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getLanguages, getMoviesByLanguage } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import PaginationBar from "../components/paginationBar";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const LanguageMoviesPage = () => {
  const [languageCode, setLanguageCode] = useState("fr");
  const [page, setPage] = useState(1);

  const languagesQuery = useQuery({
    queryKey: ["languages"],
    queryFn: getLanguages,
  });

  const moviesQuery = useQuery({
    queryKey: ["moviesByLanguage", { languageCode, page }],
    queryFn: getMoviesByLanguage,
    placeholderData: keepPreviousData,
  });

  if (languagesQuery.isPending) {
    return <Spinner />;
  }

  if (languagesQuery.isError) {
    return <h1>{languagesQuery.error.message}</h1>;
  }

  
  const languages = languagesQuery.data
    .filter((l) => l.english_name && l.english_name !== "No Language")
    .sort((a, b) => a.english_name.localeCompare(b.english_name));

  const selected = languages.find((l) => l.iso_639_1 === languageCode) || null;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <Autocomplete
          options={languages}
          value={selected}
          getOptionLabel={(option) => option.english_name}
          isOptionEqualToValue={(option, value) =>
            option.iso_639_1 === value.iso_639_1
          }
          onChange={(event, newValue) => {
            if (newValue) {
              setLanguageCode(newValue.iso_639_1);
              setPage(1);
            }
          }}
          sx={{ width: 300, backgroundColor: "white", borderRadius: 1 }}
          renderInput={(params) => (
            <TextField {...params} label="Choose a language" />
          )}
        />
      </Box>

      {moviesQuery.isPending ? (
        <Spinner />
      ) : moviesQuery.isError ? (
        <h1>{moviesQuery.error.message}</h1>
      ) : (
        <>
          <PageTemplate
            title={`Movies in ${selected ? selected.english_name : languageCode}`}
            movies={moviesQuery.data.results}
            action={(movie) => <AddToFavoritesIcon movie={movie} />}
          />
          <PaginationBar
            page={page}
            totalPages={moviesQuery.data.total_pages}
            onChange={setPage}
          />
        </>
      )}
    </>
  );
};

export default LanguageMoviesPage;
export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};


export const getMovie = (args) => {
  //console.log(args)
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};


  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        import.meta.env.VITE_TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };


  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };


  export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

const tmdbGet = (path, params = "") => {
  return fetch(
    `https://api.themoviedb.org/3/${path}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US${params}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something has went wrong");
      });
    }
    return response.json();
  });
};

export const getPopularActors = ({ queryKey }) => {
  const [, { page }] = queryKey;
  return tmdbGet("person/popular", `&page=${page}`);
};

export const getActorImages = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return tmdbGet(`person/${id}/images`);
};

export const getActor = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return tmdbGet(`person/${id}`);
};

export const getActorMovieCredits = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return tmdbGet(`person/${id}/movie_credits`);
};

export const getTopRated = () => tmdbGet("movie/top_rated", "&page=1");

export const getTrendingMovies = ({ queryKey }) => {
  const [, { timeWindow, page }] = queryKey;
  return tmdbGet(`trending/movie/${timeWindow}`, `&page=${page}`);
};

export const getMovieCredits = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return tmdbGet(`movie/${id}/credits`);
};

export const getLanguages = () => tmdbGet("configuration/languages");

export const getMoviesByLanguage = ({ queryKey }) => {
  const [, { languageCode, page }] = queryKey;
  return tmdbGet(
    "discover/movie",
    `&with_original_language=${languageCode}&sort_by=popularity.desc&page=${page}`
  );
};

export const getUpcoming = ({ queryKey }) => {
  const [, { page }] = queryKey;
  return tmdbGet("movie/upcoming", `&page=${page}`);
};

export const getDiscoverMovies = ({ queryKey }) => {
  const [, { page }] = queryKey;
  return tmdbGet(
    "discover/movie",
    `&include_adult=false&include_video=false&sort_by=popularity.desc&page=${page}`
  );
};
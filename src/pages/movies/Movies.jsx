import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";
const Movies = ({latLong}) => {
  const [theatres, setTheatres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState("Movies");
  const [list, setList] = useState([]);

  const fetchNearbyTheatres = async () => {
    setLoading(true);
    const API_URL = "https://api.foursquare.com/v3/places/search";
    const LAT_LONG = `${(latLong.split("-")[0], latLong.split("-")[1])}`; // Replace with your latitude, longitude
    const RADIUS = 50000; // Search radius in meters
    const QUERY = "movie theaters"; // Search query
    const API_KEY = `${import.meta.env.VITE_FSAPIKEY}`; // Replace with your Foursquare API Key

    try {
      const response = await fetch(
        `${API_URL}?ll=${LAT_LONG}&radius=${RADIUS}&query=${QUERY}`,
        {
          method: "GET",
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setTheatres(data.results || []);
      setList(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api-gate2.movieglu.com/filmsNowShowing/",
        {
          method: "GET",
          headers: {
            "api-version": "v200", // Replace with the correct version
            Authorization: `Basic ${import.meta.env.VITE_MGAUTH}`, // Replace with your base64 encoded `username:password`
            "x-api-key": `${import.meta.env.VITE_MGAPIKEY}`,
            territory: "IN", // Territory for India
            client: "DEVT",
            "device-datetime": new Date().toISOString(),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      setMovies(data.films || []);
      setList(data.films || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    let list = [];
    if (viewType === "Movies") {
      list = movies.filter((activity) =>
        activity.film_name.toLowerCase().includes(query)
      );
    } else {
      list = theatres.filter((activity) =>
        activity.name.toLowerCase().includes(query)
      );
    }
    setList(list);
  };

  useEffect(() => {
    if (viewType === "Theatre") {
      fetchNearbyTheatres();
    } else if (viewType === "Movies") {
      fetchMovies();
    }
  }, [viewType]);

    if (loading) {
      return <Loader />;
    }

  return (
    <div className="bg-purple-50 dark:bg-neutral-900/40 w-full lg:px-24 md:px-16 sm:px-7 px-4 mt-[8ch] pb-[8ch] space-y-14">
      {/* Search and Filter */}
      <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-4 mb-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8 lg:gap-10 bg-neutral-200/60 dark:bg-neutral-900/40 rounded-md px-6 py-5 items-center">
          {/* Input and Search Button */}
          <div className="flex items-center gap-3 col-span-4 md:col-span-2">
            <input
              type="text"
              onChange={handleSearch}
              name="date"
              placeholder="Search Buses..."
              className="flex-1 appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 bg-neutral-200/60 dark:bg-neutral-900/60 px-4 h-12 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button className="bg-violet-600 h-12 px-4 rounded-md text-base text-neutral-50 font-medium flex items-center justify-center">
              <FaSearch />
            </button>
          </div>

          {/* Empty Space */}
          <div className="hidden md:block col-span-2"></div>

          {/* Select Dropdown */}
          <div className="col-span-4 md:col-span-2">
            <select
              className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-4 h-12 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              defaultValue="Select Bus Type"
              onChange={(e) => setViewType(e.target.value)}>
              <option disabled value="Select Bus Type">
                Select View
              </option>
              <option value="Movies">Movies</option>
              <option value="Theatre">Theatre</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Display */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {error && <p className="text-red-500">{error}</p>}
        {viewType === "Theatre" &&
          list.map((theatre) => (
            <div
              key={theatre.fsq_id}
              onClick={setViewType("Movies")}
              className="w-full bg-neutral-200/60 block dark:bg-neutral-900/40 rounded-xl p-4">
              <img
                src={
                  theatre?.categories?.[0]?.icon
                    ? `${theatre.categories[0].icon.prefix}120${theatre.categories[0].icon.suffix}`
                    : "fallback-image-url" // Replace with a valid fallback image URL
                }
                alt="Theatre Icon"
                className="w-full aspect-video object-contain object-center"
              />

              <div className="px-3 py-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50">
                    {theatre.name}
                  </h1>
                  <p className="text-sm font-normal text-neutral-800 dark:text-neutral-50 ">
                    {Math.round(theatre.distance / 1000)} km
                  </p>
                  {/* <p>{theatre.location.address}</p> */}
                </div>
              </div>
            </div>
          ))}
        {viewType === "Movies" &&
          list.map((movie) => (
            <Link
              to={`/movies/${movie.imdb_id}`}
              key={movie.film_id}
              className="w-full bg-neutral-200/60 block dark:bg-neutral-900/40 rounded-md  ">
              {(movie.images?.still?.["1"]?.medium?.film_image ||
                movie.images?.poster?.["1"]?.medium?.film_image) && (
                <img
                  src={
                    movie.images?.still?.["1"]?.medium?.film_image ||
                    movie.images?.poster?.["1"]?.medium?.film_image
                  }
                  alt={`${movie.film_name} Poster`}
                  className={`w-full aspect-video object-center rounded-t-md ${
                    !movie.images?.still?.["1"]?.medium?.film_image &&
                    "object-contain"
                  }`}
                />
              )}

              <div className="px-3 py-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50">
                    {movie.film_name}
                  </h1>
                </div>
                <p className="text-sm font-normal text-neutral-800 dark:text-neutral-50">
                  Release Date:{" "}
                  {movie.release_dates?.[0]?.release_date || "Unknown"}
                </p>
                {movie.age_rating?.[0]?.rating && (
                  <p className="text-sm font-normal text-neutral-800 dark:text-neutral-50">
                    Age Rating: {movie.age_rating[0].rating}
                  </p>
                )}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Movies;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Empty from "../../components/empty/Empty";
import Loader from "../../components/loader/Loader";

const Sport = ({ latLong }) => {
  const [venues, setVenues] = useState([]);
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = venues.filter((activity) =>
      activity.name.toLowerCase().includes(query)
    );
    setList(filtered);
  };

  useEffect(() => {
    const fetchSportsVenues = async () => {
      const API_URL = "https://api.foursquare.com/v3/places/search";
      const params = new URLSearchParams({
        categories: "13029,18022,18024,18025,18027", // Sport-related categories
        ll: `${latLong.split("-")[0]},${latLong.split("-")[1]}`,
        limit: "50",
      }).toString();

      try {
        setLoading(true);
        const response = await fetch(`${API_URL}?${params}`, {
          headers: {
            Authorization: "fsq3EpglePzlNCcpQqBv6AsDScthamChqWWZ1nI2Uy6YufE=",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch sports venues.");
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
          setError("No sports venues found.");
          setVenues([]);
          setList([]);
        } else {
          setError("");
          setVenues(data.results);
          setList(data.results);
        }
      } catch (err) {
        setError(err.message || "Error fetching sports venues.");
      } finally {
        setLoading(false);
      }
    };

    fetchSportsVenues();
  }, [latLong]);

  if (error) return <Empty message={error} />;

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full lg:px-24 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[8ch] space-y-14">
      {/* Search and Filters */}
      <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mb-8">
        <div className="search-bar grid grid-cols-1 md:grid-cols-6 gap-6 bg-neutral-200/60 dark:bg-neutral-900/40 rounded-md px-6 py-5 items-center">
          {/* Search Input */}
          <div className="flex items-center gap-3 col-span-1 md:col-span-4">
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Search Sports..."
              className="max-w-80 flex-1 appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 bg-neutral-200/60 dark:bg-neutral-900/60 px-4 h-12 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button className="bg-violet-600 h-12 px-4 rounded-md text-base text-neutral-50 font-medium flex items-center justify-center">
              <FaSearch />
            </button>
          </div>

          {/* Dropdown */}
          <div className="col-span-1 md:col-span-2">
            <select
              className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-4 h-12 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              defaultValue="Select View">
              <option disabled value="Select View">
                Select View
              </option>
              <option value="Sports">Sports</option>
              <option value="Locations">Locations</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sports Venues */}
      {list.length > 0 ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((venue) => (
            <Link
              to={`/detail/${venue.fsq_id}`}
              key={venue.fsq_id}
              className="w-full bg-neutral-200/60 block dark:bg-neutral-900/40 rounded-xl p-4">
              <img
                src={`${venue.categories[0].icon.prefix}120${venue.categories[0].icon.suffix}`}
                alt="Venue Icon"
                className="w-full aspect-video object-contain object-center"
              />
              <div className="px-3 py-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50">
                    {venue.name}
                  </h1>
                  <p className="text-sm font-normal text-neutral-800 dark:text-neutral-50">
                    {Math.round(venue.distance / 1000)} km
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <Empty message="No sports venues available." />
      )}
    </div>
  );
};

export default Sport;

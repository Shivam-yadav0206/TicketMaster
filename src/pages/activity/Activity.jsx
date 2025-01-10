import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Activity = ({ latLong }) => {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState("");
  const [list, setList] = useState([]);


  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();

    const list = venues.filter((activity) =>
      activity.name.toLowerCase().includes(query)
    );
    setList(list);

  };


  
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        // Update the API URL to fetch different activities
            const response = await fetch(
              `https://api.foursquare.com/v3/places/search?categories=18000,13000,19000,19030,13002,13065,10000&ll=${
                latLong.split("-")[0]
              },${latLong.split("-")[1]}&limit=50`,
              {
                headers: {
                  Authorization: `${`${import.meta.env.VITE_FSAPIKEY}`}`,
                },
              }
            );

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const data = await response.json();
        setVenues(data.results);
        setList(data.results);
      } catch (err) {
        setError(err.message || "Error fetching venues.");
      }
    };

    fetchVenues();
  }, []);

  return (
    <div className="">
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-purple-50 dark:bg-neutral-900/40 w-full lg:px-24 md:px-16 sm:px-7 px-4 pt-[13ch] pb-[8ch] space-y-14">
        {/* Search and Filter Section */}
        <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mb-8">
          <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8 lg:gap-10 bg-neutral-200/60 dark:bg-neutral-900/40 rounded-md px-6 py-5 items-center">
            <div className="flex items-center gap-3 col-span-4 md:col-span-2">
              <input
                onChange={handleSearch}
                type="text"
                placeholder="Search Activities..."
                className="flex-1 appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 bg-neutral-200/60 dark:bg-neutral-900/60 px-4 h-12 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button className="bg-violet-600 h-12 px-4 rounded-md text-base text-neutral-50 font-medium flex items-center justify-center">
                <FaSearch />
              </button>
            </div>

            <div className="hidden md:block col-span-2"></div>

            <div className="col-span-4 md:col-span-2">
              <select
                className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-4 h-12 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                defaultValue="Select View">
                <option disabled value="Select View">
                  Select View
                </option>
                <option value="Events">Events</option>
                <option value="Locations">Locations</option>
              </select>
            </div>
          </div>
        </div>

        {/* Venues Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((venue) => (
            <Link
              to={`/detail/${venue.fsq_id}`}
              key={venue.fsq_id}
              className="w-full bg-neutral-200/60 block dark:bg-neutral-900/40 rounded-xl p-4">
              <img
                src={`${venue.categories[0]?.icon.prefix}120${venue.categories[0]?.icon.suffix}`}
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
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {venue.location.formatted_address}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activity;

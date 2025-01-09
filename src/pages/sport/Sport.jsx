import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const Sport = ({ latLong }) => {
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
    const fetchSportsVenues = async () => {
      try {
        const response = await fetch(
          `https://api.foursquare.com/v3/places/search?categories=13029,18022,18024,18025,18027&ll=${
            latLong.split("-")[0]
          },${latLong.split("-")[1]}&limit=50`,
          {
            headers: {
              Authorization: "fsq3EpglePzlNCcpQqBv6AsDScthamChqWWZ1nI2Uy6YufE=",
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
        setError(err.message || "Error fetching sports venues.");
      }
    };

    fetchSportsVenues();
  }, []);

  return (
    <div className="">
      {/* <h1 className="text-xl font-bold mt-40">Nearby Sports Venues</h1> */}
      {/* {error && <p className="text-red-500">{error}</p>} */}
      <div>
        <div className="">
          {/* <h1 className="text-xl font-bold mt-24">Nearby Event Venues</h1> */}

          {error && <p className="text-red-500">{error}</p>}

          <div className="w-full lg:px-24 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[8ch] space-y-14">
            <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mb-8">
              <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8 lg:gap-10 bg-neutral-200/60 dark:bg-neutral-900/40 rounded-md px-6 py-5 items-center">
                {/* Input and Search Button */}
                <div className="flex items-center gap-3 col-span-4 md:col-span-2">
                  <input
                    type="text"
                   onChange={handleSearch}
                    name="date"
                    placeholder="Search Sportss..."
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
                    // onChange={(e) => setViewType(e.target.value)}
                  >
                    <option disabled value="Select Bus Type">
                      Select View
                    </option>
                    <option value="Movies">Sports</option>
                    <option value="Theatre">Locations</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((venue) => (
                // <li key={venue.fsq_id} className="mt-4">
                //   <h2 className="text-lg font-semibold">{venue.name}</h2>
                //   <p>{venue.location?.formatted_address}</p>
                //   <p>{venue.distance} meters away</p>
                // </li>

                <Link
                  to={`/detail/${venue.fsq_id}`}
                  key={venue.fsq_id}
                  className="w-full bg-neutral-200/60 block dark:bg-neutral-900/40 rounded-xl p-4">
                  <img
                    src={`${venue.categories[0].icon.prefix}120${venue.categories[0].icon.suffix}`}
                    alt="Theatre Icon"
                    className="w-full aspect-video object-contain object-center"
                  />

                  <div className="px-3 py-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50">
                        {venue.name}
                      </h1>
                      <p className="text-sm font-normal text-neutral-800 dark:text-neutral-50 ">
                        {Math.round(venue.distance / 1000)} km
                      </p>
                      {/* <p>{theatre.location.address}</p> */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sport;

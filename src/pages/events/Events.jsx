import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Events = ({ latLong }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [list, setList] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const list = events.filter((activity) =>
      activity.name.toLowerCase().includes(query)
    );
    setList(list);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const API_URL = "https://api.foursquare.com/v3/places/search";
      const params = new URLSearchParams({
        categories: "10021,10031,10029", // Event-related categories
        ll: `${latLong.split("-")[0]},${latLong.split("-")[1]}`, // Replace with desired location
        limit: "50",
      }).toString();

      try {
        const response = await fetch(`${API_URL}?${params}`, {
          headers: {
            Authorization: `${import.meta.env.VITE_FSAPIKEY}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch event venues");
        }

        const data = await response.json();
        setEvents(data.results);
        setList(data.results);
      } catch (err) {
        setError("Error fetching event venues.");
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="">
      {/* <h1 className="text-xl font-bold mt-24">Nearby Event Venues</h1> */}

      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-purple-50 dark:bg-neutral-900/40 w-full lg:px-24 md:px-16 sm:px-7 px-4 pt-[13ch] pb-[8ch] space-y-14">
        <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mb-8">
          <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8 lg:gap-10 bg-neutral-200/60 dark:bg-neutral-900/40 rounded-md px-6 py-5 items-center">
            {/* Input and Search Button */}
            <div className="flex items-center gap-3 col-span-4 md:col-span-2">
              <input
                type="text"
                name="date"
                onChange={handleSearch}
                placeholder="Search Events..."
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
                <option value="Movies">Events</option>
                <option value="Theatre">Locations</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((event) => (
            // <li key={event.fsq_id} className="mt-4">
            //   <h2 className="text-lg font-semibold">{event.name}</h2>
            //   <p>{event.location.formatted_address}</p>
            //   <p>{event.distance} meters away</p>
            // </li>
            <Link
              to={`/detail/${event.fsq_id}`}
              key={event.fsq_id}
              className="w-full bg-neutral-200/60 block dark:bg-neutral-900/40 rounded-xl p-4">
              <img
                src={`${event.categories[0].icon.prefix}120${event.categories[0].icon.suffix}`}
                alt="Theatre Icon"
                className="w-full aspect-video object-contain object-center"
              />

              <div className="px-3 py-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50">
                    {event.name}
                  </h1>
                  <p className="text-sm font-normal text-neutral-800 dark:text-neutral-50 ">
                    {Math.round(event.distance / 1000)} km
                  </p>
                  {/* <p>{theatre.location.address}</p> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;

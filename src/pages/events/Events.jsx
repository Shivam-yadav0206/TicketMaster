import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Loader from "../../components/loader/Loader";
import Empty from "../../components/empty/Empty"; // Import your Empty component

const Events = ({ latLong }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(query)
    );
    setFilteredEvents(filtered);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const API_URL = "https://api.foursquare.com/v3/places/search";
      const params = new URLSearchParams({
        categories: "10021,10031,10029", // Event-related categories
        ll: `${latLong.split("-")[0]},${latLong.split("-")[1]}`,
        limit: "50",
      }).toString();

      try {
        setLoading(true);
        const response = await fetch(`${API_URL}?${params}`, {
          headers: {
            Authorization: `${import.meta.env.VITE_FSAPIKEY}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch event venues.");
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
          setError("No results found.");
          setEvents([]);
          setFilteredEvents([]);
        } else {
          setError("");
          setEvents(data.results);
          setFilteredEvents(data.results);
        }
      } catch (err) {
        setError(err.message || "Error fetching event venues.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [latLong]);

  if (loading) return <Loader />;
  if (error) return <Empty message={error} />;

  return loading ? (
    <Loader />
  ) : (
    <div className="bg-purple-50 dark:bg-neutral-900/40 w-full lg:px-24 md:px-16 sm:px-7 px-4 pt-[13ch] pb-[8ch] space-y-14">
      {/* Search and Filters */}
      <div className="search-filter w-full lg:px-28 md:px-16 sm:px-7 px-4 mb-8">
        <div className="search-bar grid grid-cols-1 md:grid-cols-6 gap-6 bg-neutral-200/60 dark:bg-neutral-900/40 rounded-md px-6 py-5 items-center">
          <div className="flex items-center gap-3 col-span-4 md:col-span-2">
            <input
              type="text"
              placeholder="Search Events..."
              onChange={handleSearch}
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

      {/* Event List */}
      {filteredEvents.length > 0 ? (
        <div className="event-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Link
              to={`/detail/${event.fsq_id}`}
              key={event.fsq_id}
              className="event-card w-full bg-neutral-200/60 block dark:bg-neutral-900/40 rounded-xl p-4">
              <img
                src={`${event.categories[0].icon.prefix}120${event.categories[0].icon.suffix}`}
                alt="Event Icon"
                className="w-full aspect-video object-contain object-center"
              />
              <div className="px-3 py-4 space-y-2">
                <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50">
                  {event.name}
                </h1>
                <p className="text-sm font-normal text-neutral-800 dark:text-neutral-50">
                  {Math.round(event.distance / 1000)} km
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <Empty message="No events found. Try adjusting your search criteria." />
      )}
    </div>
  );
};

export default Events;

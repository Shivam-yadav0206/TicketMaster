import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactModal from "react-modal";
import addDays from "date-fns/addDays";
import { FaHeart } from "react-icons/fa"; // Font Awesome Heart
import { FaWheelchair } from "react-icons/fa";
import { FaPlus } from "react-icons/fa"; // Font Awesome Plus
import { FaLocationArrow } from "react-icons/fa"; // Font Awesome Location Arrow
import { format } from "date-fns";
// OR
import { resp } from "../../constants";
import { AiOutlinePlus } from "react-icons/ai"; // Ant Design Plus
import { MdNavigation } from "react-icons/md"; // Material Design Navigation
import socketIOClient from "socket.io-client";

const socket = socketIOClient(`${import.meta.env.VITE_BACKEND_URL}`);
const Details = ({ latLong }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCard, setActiveCard] = useState(null);
  const [theatres, setTheatres] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [finalId, setFinalId] = useState("");
  const [seatingData, setSeatingData] = useState(null);
  const [heldSeats, setHeldSeats] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!finalId) return;
    // Join the room for the selected movie and showtime
    socket.emit("joinRoom", finalId);

    socket.on("ticket:release", (holdData) => {
      console.log("Hold data received in client:", holdData);
      console.log("Current Seating data:", seatingData);
      setSeatingData((prev) => ({
        ...prev,
        hold: holdData,
      }));
    });
    socket.on("ticket:hold", (holdData) => {
      console.log("Hold data received in client:", holdData);
      console.log("Current Seating data:", seatingData);
      setSeatingData((prev) => ({
        ...prev,
        hold: holdData,
      }));
    });

    // Listen for seat hold success or error
    socket.on("holdSuccess", (msg) => {
      setMessage(msg); // Display success message
    });
    socket.on("holdError", (msg) => {
      setMessage(msg); // Display error message
    });
    socket.on("releaseSuccess", (msg) => {
      setMessage(msg); // Display success message
    });
    socket.on("releaseError", (msg) => {
      setMessage(msg); // Display error message
    });

    return () => {
      socket.off("ticket:hold");
      socket.off("holdSuccess");
      socket.off("holdError");
      socket.off("ticket:release");
      socket.off("releaseSuccess");
      socket.off("releaseError");
    };
  }, [finalId]);

  const handleHoldSeat = (seat) => {
    // Emit the hold event to the server
    socket.emit("holdSeat", seat, finalId);
  };

  const getDayName = (date) =>
    date.toLocaleDateString("en-US", { weekday: "long" });
  // Array of days to display

  const days = [
    {
      id: "today",
      label: getDayName(new Date()),
      times: ["09:30", "13:00", "16:30", "21:30"],
    },
    {
      id: "tomorrow",
      label: getDayName(new Date(Date.now() + 24 * 60 * 60 * 1000)),
      times: ["09:30", "13:00", "16:30", "21:30"],
    },
    {
      id: "dayAfter",
      label: getDayName(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)),
      times: ["09:30", "13:00", "16:30", "21:30"],
    },
  ];

  const dates = [
    {
      id: "today",
      label: getDayName(new Date()),
      date: new Date(),
    },
    {
      id: "tomorrow",
      label: getDayName(addDays(new Date(), 1)),
      date: addDays(new Date(), 1),
    },
    {
      id: "dayAfter",
      label: getDayName(addDays(new Date(), 2)),
      date: addDays(new Date(), 2),
    },
  ];

  const openModal = () => setIsModalOpen(true);
  const onClose = () => {
    selectedSeats.map(seat => {
      socket.emit("releaseSeat", seat?.id, finalId);
    })
    setSelectedSeats([])
    setIsModalOpen(false)
  };

  const handleSeatClick = (seatId) => {
    if (!selectedSeats.includes(seatId)) {
      handleHoldSeat(seatId?.id);
    } else {
      socket.emit("releaseSeat", seatId, finalId);
    }
    setSelectedSeats((prev) => {
      const seatExists = prev.some((seat) => seat.id === seatId.id);

      return seatExists
        ? prev.filter((seat) => seat.id !== seatId.id) // Deselect the seat by matching the `id`
        : [...prev, seatId]; // Add the new seat object
    });
    console.log("Selected seats:", selectedSeats);
  };
  const { id } = useParams();
  const getPriceBySeatType = (seatLabel, totalRows) => {
    // Get the row label by extracting the first character of the seat label
    const rowLabel = seatLabel.charAt(0);

    // Check conditions for price assignment
    if (rowLabel === "A" || rowLabel === "B") {
      return 200; // Price for rows starting with A or B
    } else if (rowLabel === String.fromCharCode(64 + totalRows)) {
      return 550; // Price for the last row
    } else {
      return 350; // Default price for other rows
    }
  };
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const fetchNearbyTheatres = async () => {
    setLoading(true);
    const API_URL = "https://api.foursquare.com/v3/places/search";
    const LAT_LONG = `${ Number(latLong.split("-")[0]).toFixed(2)},${Number( latLong
      .split("-")[1])
      .toFixed(2)}`; // Replace with your latitude, longitude
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
      setTheatres(data.results.slice(0, 4) || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // const movieId = "tt13186482"; // Example IMDb movie ID

  useEffect(() => {
    fetchNearbyTheatres();
    const url = `https://film-show-ratings.p.rapidapi.com/item/?id=${`tt${id}`}`;
    //console.log(id);
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": `${import.meta.env.VITE_RAPIKEY}`, // Replace with a valid API key
        "x-rapidapi-host": "film-show-ratings.p.rapidapi.com",
      },
    };

    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const result = await response.json();
        setMovie(result.result);
        //console.log(result.result);
      } catch (error) {
        setError(error.message);
        //setMovie(resp?.result);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    // Fetch seating data
    const fetchSeatingData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/seating/${finalId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setSeatingData(data?.data);
        // const { configuration, reservedSeats, hold } = data?.data;
        console.log("Seating data:", data?.data);
      } catch (err) {
        console.error("Error fetching seating data:", err);
        setError("Failed to fetch seating data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (finalId) {
      fetchSeatingData();
    }
  }, [finalId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const screenNo = Math.floor(Math.random() * 4) + 1;

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  const toggleCard = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  const handlePayment = () => {
    try {
      fetch("https://zwiggy-backend-tau.vercel.app/stripe-checkout", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          items: selectedSeats,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // Check if the response contains a URL property
          if (data && data.url) {
            // Redirect to the URL returned by the server
            // dispatch(clearCart());
            window.location.href = data.url;
          } else {
            console.error("Invalid response from server:", data);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error parsing cartItems:", error);
    }
  };

  return (
    <div className="bg-purple-50 mt-20 dark:bg-neutral-900/70">
      <ReactModal
        ariaHideApp={false}
        isOpen={isModalOpen}
        onRequestClose={onClose}
        className="modal p-2 overflow-y-scroll lg:h-[80vh]"
        overlayClassName="overlay w-full flex items-center justify-center">
        <div className="p-6 bg-white rounded-lg shadow-lg md:w-[40rem] overflow-y-scroll overflow-x-scroll">
          {/* Screen Label */}
          <div className="text-center mb-4">
            <div className="bg-gray-800 text-white py-2 px-6 rounded-lg text-sm font-medium">
              SCREEN
            </div>
          </div>

          {/* Modal Title */}
          <h2 className="text-lg font-semibold mb-6 text-center">
            Select Your Seats
          </h2>

          {/* Seats Layout */}
          <div className="overflow-auto">
            {/* Seat Type Labels Above Seating Layout */}

            {/* Seating Layout */}
            <div className="space-y-1">
              {seatingData?.configuration.layout.map((rowLayout, rowIndex) => {
                const totalRows = seatingData?.configuration.layout.length || 0;

                return (
                  <>
                    <div
                      key={rowIndex}
                      className="flex items-center space-x-1 justify-center">
                      {/* Row Label */}
                      <div className="text-sm font-medium w-6 text-right">
                        {String.fromCharCode(65 + rowIndex)}
                      </div>

                      {/* Seats in Row */}
                      <div className="flex space-x-1 text-[8px]">
                        {rowLayout?.split("-").map((seat, colIndex) => {
                          const seatLabel = seat;

                          // Check if it’s a valid seat (e.g., A1, B2, etc.)
                          const isValidSeat = /^[A-Z][1-9][0-9]*$/.test(
                            seatLabel
                          );

                          // Check for Seat Availability
                          const isReserved =
                            seatingData?.reservedSeats.includes(seatLabel);
                          const isHold = seatingData?.hold.includes(seatLabel);
                          const isSelected = selectedSeats?.some(
                            (seat) => seat.id === seatLabel
                          );

                          return (
                            <>
                              <div
                                key={colIndex}
                                onClick={() =>
                                  isValidSeat &&
                                  !isHold &&
                                  handleSeatClick({
                                    id: seatLabel,
                                    image:
                                      "https://png.pngtree.com/png-clipart/20210318/ourlarge/pngtree-cartoon-movie-drink-megaphone-movie-ticket-png-image_3083644.jpg",
                                    name: `Screen ${screenNo} Seat ${seatLabel}`,
                                    price: getPriceBySeatType(
                                      seatLabel,
                                      totalRows
                                    ),
                                    quantity: 1,
                                  })
                                }
                                className={`w-4 h-4 flex items-center justify-center rounded-md ${
                                  !isValidSeat
                                    ? "bg-white cursor-default"
                                    : isSelected
                                    ? "bg-blue-500 text-white"
                                    : isReserved
                                    ? "bg-gray-500"
                                    : isHold && !isSelected
                                    ? "bg-gray-500 blink cursor-not-allowed"
                                    : "bg-gray-200 hover:bg-blue-300"
                                }`}
                                style={
                                  isHold && !isSelected
                                    ? { animation: "blink 1s infinite" }
                                    : {}
                                }>
                                {/* Display the seat label only if it's valid */}
                                {isValidSeat ? seatLabel : ""}
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>

                    {rowIndex === 1 && (
                      <div className="my-1 text-center">
                        <div className="flex justify-center space-x-6 mt-2">
                          <div className="text-sm font-medium">
                            Classic (Rs 200)
                          </div>
                        </div>
                      </div>
                    )}
                    {rowIndex === totalRows - 2 && (
                      <div className="my-1 text-center">
                        <div className="flex justify-center space-x-6 mt-2">
                          <div className="text-sm font-medium">
                            Prime (Rs 350)
                          </div>
                        </div>
                      </div>
                    )}
                    {rowIndex === totalRows - 1 && (
                      <div className="my-1 text-center">
                        <div className="flex justify-center space-x-6 mt-2">
                          <div className="text-sm font-medium">
                            Recliner (Rs 550)
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>

          {/* Selected Seats Display */}
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="text-sm font-semibold mb-2">Selected Seats:</h3>
            {selectedSeats.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedSeats.map((seat) => (
                  <span
                    key={seat?.id}
                    className="px-2 py-1 bg-blue-500 text-white text-xs rounded-md">
                    {seat?.id}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500">No seats selected.</p>
            )}
          </div>
          <p>{message}</p>
          {/* Buttons */}
          <div className="flex gap-1">
            <button
              onClick={onClose}
              className="mt-6 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 w-full">
              Close
            </button>
            <button
              onClick={handlePayment}
              disabled={selectedSeats.length === 0}
              className={`mt-6 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 w-full disabled:bg-gray-400`}>
              Proceed to Pay (Rs{" "}
              {selectedSeats.reduce((sum, seat) => sum + seat.price, 0)})
            </button>
          </div>
        </div>
      </ReactModal>

      {/* Movie Details */}
      <div
        className="flex items-center justify-center w-screen "
        style={{ fontFamily: "Montserrat, sans-serif" }}>
        <div className="container flex justify-center">
          <div className="w-full sm:w-9/12 ml-auto mr-auto ">
            <div className="flex flex-wrap  ">
              <div className="w-full sm:w-3/12 bg-red-200 p-5 sm:pb-20  rounded-s-lg">
                <h1 className="font-bold text-lg text-black">{movie?.title}</h1>
                <div className="w-10 h-1 bg-red-600"></div>
                <ul className="space-y-2 mt-2 sm:mb-8">
                  <li>
                    <span className="text-xs text-gray-700">Genres</span>
                    <strong className="block text-sm text-gray-700">
                      {movie?.genres.map((genre) => genre + " ")}
                    </strong>
                  </li>
                  <li>
                    <span className="text-xs text-gray-700">Rating</span>
                    <strong className="block text-sm text-gray-700">
                      {movie?.ratings?.IMDb?.audience?.rating}
                    </strong>
                  </li>
                  <li>
                    <span className="text-xs text-gray-700">Screenplay</span>
                    <strong className="block text-sm text-gray-700">
                      {movie?.type}
                    </strong>
                  </li>

                  <li>
                    <span className="text-xs text-gray-700">Release Date</span>
                    <strong className="block text-sm text-gray-700">
                      {new Date(movie?.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </strong>
                  </li>
                  <li>
                    <span className="text-xs text-gray-700">Budget</span>
                    <strong className="block text-sm text-gray-700">
                      $22,500,000
                    </strong>
                  </li>
                </ul>
              </div>
              <div className="w-full sm:w-9/12 h-64 sm:h-auto rounded-e-lg bg-indigo-300 bg-cover relative flex items-center justify-center">
                <iframe
                  width="870"
                  height="345"
                  src={`https://www.youtube.com/embed/${movie?.ids["YouTube"]}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theatre Details */}
      <div className="flex justify-center items-center flex-col space-y-4 p-4 w-full">
        {theatres?.map((theatre, index) => (
          <div
            key={index}
            className={`w-3/4 flex flex-col bg-gray-100 dark:bg-neutral-900/70 shadow-md border rounded-md transition-all duration-300 ${
              activeCard === index ? "h-auto" : "h-24"
            }`}>
            {/* Cinema Header */}
            <div
              className="flex items-center justify-between p-4 cursor-pointer bg-violet-600 text-white rounded-t-md"
              onClick={() => toggleCard(index)}>
              <div>
                <h3 className="text-lg font-semibold">{theatre.name}</h3>
                <p className="text-sm">{theatre.location.address}</p>
              </div>
              <div className="flex space-x-2">
                <FaLocationArrow className="text-gray-300 text-xl" />
                <FaPlus className="text-green-300 text-xl" />
                <FaWheelchair className="text-blue-300 text-xl" />
                <FaHeart className="text-red-300 text-xl" />
              </div>
            </div>

            {/* Expanded Content */}
            {activeCard === index && (
              <div>
                {/* Full Address and Distance */}
                <div className="p-4 bg-gray-100 dark:bg-neutral-900/70">
                  <div className="flex justify-between items-center w-full">
                    <p className="text-gray-700 text-sm dark:text-white">
                      {theatre.location.formatted_address}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {Math.round(theatre.distance / 1000)} km away
                    </p>
                  </div>
                </div>

                {/* Show Timings */}
                <div className="flex justify-between">
                  <div className="flex flex-wrap gap-4 p-6">
                    {["10:30 AM", "1:15 PM", "4:45 PM", "8:00 PM"].map(
                      (time) => (
                        <button
                          key={time}
                          className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 active:bg-gray-600 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition">
                          {time}
                        </button>
                      )
                    )}
                  </div>
                  <div className="mt-6 mr-6">
                    <button
                      className="px-4 py-3  bg-red-500 text-white rounded hover:bg-red-600 transition"
                      onClick={toggleDrawer}>
                      Select Date
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Date/Time Selection for seat booking */}
      <div
        id="drawer-timepicker"
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-96 dark:bg-gray-800 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-timepicker-label">
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
          Time schedule
        </h5>
        <button
          type="button"
          data-drawer-hide="drawer-timepicker"
          aria-controls="drawer-timepicker"
          onClick={toggleDrawer}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only" onClick={toggleDrawer}>
            Close menu
          </span>
        </button>
        <div>
          {days.map((day, index) => (
            <div key={day.id} className="mb-6">
              <h3 className="text-lg font-bold mb-4">{day.label}</h3>
              <div className="flex gap-4 mb-4">
                {day.times.map((time) => (
                  <button
                    key={time}
                    // onClick={() => handleTimeChange(day.id, time)}
                    onClick={() => {
                      console.log(
                        `${id}_${format(
                          new Date(dates[index]?.date),
                          "ddMMyyyy"
                        )}_${time.replace(":", "")}`
                      );
                      setFinalId(
                        `${id}_${format(
                          new Date(dates[index]?.date),
                          "ddMMyyyy"
                        )}_${time.replace(":", "")}`
                      );
                    }}
                    className={`w-full p-2 text-sm rounded-lg border ${
                      time ===
                        finalId?.split("_")[2]?.slice(0, 2) +
                          ":" +
                          finalId?.split("_")[2]?.slice(2) &&
                      finalId?.split("_")[1] ===
                        format(new Date(dates[index]?.date), "ddMMyyyy")
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-gray-200 text-gray-800 border-gray-300"
                    }`}>
                    {time}
                  </button>
                ))}
              </div>

              {/* Seat Select Button */}

              <div className="grid grid-cols-2 gap-4 bottom-4 left-0 w-full md:px-4 md:absolute">
                <button
                  type="button"
                  onClick={toggleDrawer}
                  data-drawer-hide="drawer-timepicker"
                  className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  Close
                </button>
                <button
                  onClick={openModal}
                  type="submit"
                  className={`w-full inline-flex items-center justify-center rounded-lg text-sm px-5 py-2.5 text-center focus:outline-none font-medium ${
                    finalId
                      ? "bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 text-white"
                      : "bg-gray-400 cursor-not-allowed text-white"
                  }`}
                  disabled={!finalId}>
                  Seat Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;

// id: "80240204";
image: "https://t4.ftcdn.net/jpg/02/51/95/53/240_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg";
name: "1 Pineapple Pastry(big)+1 Blackforest Pastry(big)";
price: 210;
quantity: 4;

{
  /* <div className="flex flex-wrap">
  <div className="w-full sm:w-3/12 bg-white flex">
    <figure className="mt-5 mb-4 ml-auto mr-auto sm:-mt-16 sm:mr-0 sm:ml-8 sm:mb-0 w-full relative">
      <div className="absolute w-10 h-12 -mt-3 -ml-3 bg-gray-100 z-0 hidden sm:block"></div>
      <img
        src="https://m.media-amazon.com/images/M/MV5BMTYwMzMwMzgxNl5BMl5BanBnXkFtZTgwMTA0MTUzMDI@._V1_UX182_CR0,0,182,268_AL_.jpg"
        alt=""
        className="relative z-10 w-1/2 h-auto block ml-auto mr-auto sm:ml-0 sm:mr-0 sm:w-full sm:h-64 object-cover"
      />
    </figure>
  </div>
  <div className="w-full sm:w-9/12 bg-gray-100 flex">
    <div className="bg-white sm:-mt-16 sm:mr-8 w-full h-64 relative rounded-tr-lg">
      <ul className="flex flex-wrap pl-2 pr-2 mb-2 sm:pt-5 sm:pb-5 sm:pl-8 sm:pr-8 sm:space-x-6 text-sm font-light">
        <li className="cursor-pointer font-semibold border-b-2 border-red-600 leading-loose pr-3">
          Stars
        </li>
        <li className="cursor-pointer hover:font-semibold border-b-2 border-transparent hover:border-red-600 leading-loose pr-3">
          Gallery
        </li>
        <li className="cursor-pointer hover:font-semibold border-b-2 border-transparent hover:border-red-600 leading-loose pr-3">
          Languages
        </li>
        <li className="cursor-pointer hover:font-semibold border-b-2 border-transparent hover:border-red-600 leading-loose pr-3">
          Locations
        </li>
      </ul>
      <div className="flex flex-wrap sm:divide-x divide-gray-400 pl-2 pr-2 sm:pl-8 sm:pr-8">
        <div className="space-y-4 w-full mb-4 sm:mb-auto sm:w-auto sm:pr-16">
          <div className="flex items-center">
            <img
              src="https://m.media-amazon.com/images/M/MV5BNjA0MTU2NDY3MF5BMl5BanBnXkFtZTgwNDU4ODkzMzE@._V1_UX32_CR0,0,32,44_AL_.jpg"
              alt=""
              className="w-10 h-10 rounded-full object-cover mr-2"
            />
            <span className="text-sm font-bold text-gray-800">
              Jake Gyllenhaal
            </span>
          </div>
          <div className="flex items-center">
            <img
              src="https://m.media-amazon.com/images/M/MV5BMTg2NTk2MTgxMV5BMl5BanBnXkFtZTgwNjcxMjAzMTI@._V1_UX32_CR0,0,32,44_AL_.jpg"
              alt=""
              className="w-10 h-10 rounded-full object-cover mr-2"
            />
            <span className="text-sm font-bold text-gray-800">Amy Adams</span>
          </div>
          <div className="flex items-center">
            <img
              src="https://m.media-amazon.com/images/M/MV5BMjE0NzM5MTc5OF5BMl5BanBnXkFtZTgwMjc3ODYxODE@._V1_UX32_CR0,0,32,44_AL_.jpg"
              alt=""
              className="w-10 h-10 rounded-full object-cover mr-2"
            />
            <span className="text-sm font-bold text-gray-800">
              Michael Shannon
            </span>
          </div>
        </div>
        <div className="mg-2 sm:mb-0 space-y-4 w-full sm:w-auto sm:pl-16">
          <div className="flex items-center">
            <img
              src="https://m.media-amazon.com/images/M/MV5BMzE5MzI0MzY2OF5BMl5BanBnXkFtZTgwODE3MTk4MTE@._V1_UY44_CR1,0,32,44_AL_.jpg"
              alt=""
              className="w-10 h-10 rounded-full object-cover mr-2"
            />
            <span className="text-sm font-bold text-gray-800">
              Aaron Johnson
            </span>
          </div>
          <div className="flex items-center">
            <img
              src="https://m.media-amazon.com/images/M/MV5BODY3MDQ4MTQ4Nl5BMl5BanBnXkFtZTgwNDU2NzU1MDE@._V1_UY44_CR1,0,32,44_AL_.jpg"
              alt=""
              className="w-10 h-10 rounded-full object-cover mr-2"
            />
            <span className="text-sm font-bold text-gray-800">Isla Fisher</span>
          </div>
          <div className="flex items-center">
            <img
              src="https://m.media-amazon.com/images/M/MV5BZmE0YWNjNzYtMDE1OS00OTMzLTlkYTMtNWFjMzVkODZlOGE3XkEyXkFqcGdeQXVyMzUxMzIxMDA@._V1_UY44_CR7,0,32,44_AL_.jpg"
              alt=""
              className="w-10 h-10 rounded-full object-cover mr-2"
            />
            <span className="text-sm font-bold text-gray-800">
              Ellie Bamber
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>; */
}

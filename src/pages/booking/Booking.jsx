import React, { useEffect, useState } from "react";
import Bus1 from "../../assets/bus1.png";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import Destination from "../../components/destination/Destination";
import DepartTime from "../../components/departtime/DepartTime";
import Seat from "../../components/seat/Seat";
const Booking = () => {
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [imageAdd, setImageAdd] = useState([]);
  const [detail, setDetail] = useState(null);
  const url1 = `https://api.foursquare.com/v3/places/${id}/photos`;
  const url2 = `https://api.foursquare.com/v3/places/${id}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "fsq3ysVhJO/1UlA01Dk22NY+mKxGkopyCqKXy55ZB7S+JNs=",
    },
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageAdd?.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageAdd?.length - 1 ? 0 : prevIndex + 1
    );
  };
  useEffect(() => {
    const getAllDetails = async () => {
      const response1 = await fetch(url1, options);
      const response2 = await fetch(url2, options);
      const data = await response1.json();
      console.log(data);
      setDetail(await response2.json());
      setImageAdd(data);
    };

    getAllDetails();
  }, []);
  return (
    <div className="bg-purple-50 w-full lg:px-28 md:px-16 sm:px-7 px-4 pb-[10ch] pt-[13ch]">
      <div className="w-full grid grid-cols-2 gap-16 items-center">
        <div className="col-span-1 space-y-8">
          <div className="relative">
            <img
              className="w-full aspect-[3/2] rounded-md object-contain"
              src={
                imageAdd?.[currentIndex]?.prefix +
                "400x400" +
                imageAdd?.[currentIndex]?.suffix
              }
              alt="bus Img"
            />
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow-md hover:bg-gray-300">
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow-md hover:bg-gray-300">
              <FaChevronRight />
            </button>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 ">
              Luxury Bus{" "}
              <span className="text-base font-normal text-neutral-400 dark:text-neutral-50">
                (
                {imageAdd?.[currentIndex]?.prefix +
                  "400x400" +
                  imageAdd?.[currentIndex]?.suffix}
                )
              </span>
            </h1>

            <div className="fle items-center gap-x-2">
              <div className="flex items-center gap-x-1 text-sm text-yellow-500 dark:text-">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
                4.5/5
              </p>
            </div>
            <p className="text-neutral-900 dark:text-neutral-200 text-sm ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
              laborum dolore quasi nemo minus co.
            </p>
          </div>
        </div>

        <div className="col-span-1 space-y-10">
          {/* Destination Card */}

          <div className="">
            <label htmlFor="date" className="block mb-2 font-medium">
              Choose Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900 "
            />
          </div>
          <div className="">
            <label htmlFor="time" className="block mb-2 font-medium">
              Choose Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900 "
            />
          </div>
          <div className="">
            <label htmlFor="date" className="block mb-2 font-medium">
              Choose Seat
            </label>
            <input
              type="number"
              id="seat"
              name="date"
              placeholder="Enter seat"
              className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900 "
            />
          </div>

          {/* Checkout Btn */}
          <div className="flex">
            <Link
              to={"/"}
              className="bg-violet-600 text-neutral-50 font-medium text-base px-6 py-2 rounded-md hover:bg-violet-700 ease-in-out duration-300">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;

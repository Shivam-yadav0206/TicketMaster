import React from 'react'
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Bus1 from '../../assets/bus1.png';
const Bus = () => {
    return (
      <div className="w-full  lg:px-24 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[8ch] space-y-14">
        {/* Search and Filter */}
        <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mb-8">
          <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8 lg:gap-10 bg-neutral-200/60 dark:bg-neutral-900/40 rounded-md px-6 py-5 items-center">
            {/* Input and Search Button */}
            <div className="flex items-center gap-3 col-span-4 md:col-span-2">
              <input
                type="text"
                id="seat"
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
                defaultValue="Select Bus Type">
                <option disabled value="Select Bus Type">
                  Select Bus Type
                </option>
                <option value="Location2">Location2</option>
                <option value="Location3">Location3</option>
                <option value="Location4">Location4</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bus Cards */}

        <div className="w-full grid grid-cols-3 gap-10">
          <Link
            to={"/bus/bus-details"}
            className="w-full bg-neutral-200/60 block dark:bg-neutral-900/40 rounded-xl p-4">
            <img
              src={Bus1}
              alt="bus Img"
              className="w-full aspect-video object-contain object-center"
            />
            <div className="px-3 py-4 space-y-2">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50">
                  Tourist Bus
                </h1>
                <p className="text-sm font-normal text-neutral-800 dark:text-neutral-50 ">
                  60 Passamgers
                </p>
              </div>
            </div>
          </Link>
          <Link
            to={"/bus/bus-details"}
            className="w-full bg-neutral-200/60 block dark:bg-neutral-900/40 rounded-xl p-4">
            <img
              src={Bus1}
              alt="bus Img"
              className="w-full aspect-video object-contain object-center"
            />
            <div className="px-3 py-4 space-y-2">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50">
                  Tourist Bus
                </h1>
                <p className="text-sm font-normal text-neutral-800 dark:text-neutral-50 ">
                  60 Passamgers
                </p>
              </div>
            </div>
          </Link>
          <Link
            to={"/bus/bus-details"}
            className="w-full bg-neutral-200/60 block dark:bg-neutral-900/40 rounded-xl p-4">
            <img
              src={Bus1}
              alt="bus Img"
              className="w-full aspect-video object-contain object-center"
            />
            <div className="px-3 py-4 space-y-2">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50">
                  Tourist Bus
                </h1>
                <p className="text-sm font-normal text-neutral-800 dark:text-neutral-50 ">
                  60 Passamgers
                </p>
              </div>
            </div>
          </Link>
          <Link
            to={"/bus/bus-details"}
            className="w-full bg-neutral-200/60 block dark:bg-neutral-900/40 rounded-xl p-4">
            <img
              src={Bus1}
              alt="bus Img"
              className="w-full aspect-video object-contain object-center"
            />
            <div className="px-3 py-4 space-y-2">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50">
                  Tourist Bus
                </h1>
                <p className="text-sm font-normal text-neutral-800 dark:text-neutral-50 ">
                  60 Passamgers
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
}

export default Bus
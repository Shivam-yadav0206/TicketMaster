import React, { useState } from "react";
import { Link } from "react-router-dom";
import Save from "../../../assets/save.png";
import { FaCopy } from "react-icons/fa6";
const Offer = () => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard
      .writeText("GTECH08")
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(true);
        }, 2000);
      })
      .catch((err) => {
        console.log("Failed to copy", err);
      });
  };

  return (
    <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 my-[4ch]">
      <div className="w-full items-center flex justify-between">
        <h1 className="text-2xl font-medium mb-6">Offers</h1>
        <Link to={"/offer"} className="text-violet-600">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {/* Card 1 */}
        <div className="w-full h-auto rounded-xl bg-zinc-200/30 dark:bg-zinc-800/20 p-6 md:p-8 flex flex-col md:flex-row items-center md:gap-x-3 shadow-md">
          <img
            src={Save}
            alt="Save Img"
            className="w-32 md:w-52 aspect-[2/1] object-contain object-center"
          />
          <div className="flex flex-1 flex-col space-y-3 md:space-y-5 mt-4 md:mt-0">
            <h1 className="text-lg md:text-xl font-semibold text-neutral-800 dark:text-neutral-50">
              Get 40% off on your first booking
            </h1>
            <div className="flex items-center gap-x-3 md:gap-x-5">
              <div className="w-fit border border-dashed px-4 py-1 border-neutral-300 dark:border-neutral-800 bg-violet-500/10 dark:bg-violet-800/50 rounded-md p-3">
                {copied ? (
                  <span className="text-green-600">Copied</span>
                ) : (
                  <span className="text-green-600">DISC10</span>
                )}
              </div>
              <button
                onClick={handleCopy}
                className="text-lg md:text-xl text-violet-600">
                <FaCopy />
              </button>
            </div>
            <p className="text-xs md:text-sm text-neutral-400 dark:text-neutral-600 font-normal">
              Valid Till: 26th Jan
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-full h-auto rounded-xl bg-zinc-200/30 dark:bg-zinc-800/20 p-6 md:p-8 flex flex-col md:flex-row items-center md:gap-x-3 shadow-md">
          <img
            src={Save}
            alt="Save Img"
            className="w-32 md:w-52 aspect-[2/1] object-contain object-center"
          />
          <div className="flex flex-1 flex-col space-y-3 md:space-y-5 mt-4 md:mt-0">
            <h1 className="text-lg md:text-xl font-semibold text-neutral-800 dark:text-neutral-50">
              Get 40% off on your first booking
            </h1>
            <div className="flex items-center gap-x-3 md:gap-x-5">
              <div className="w-fit border border-dashed px-4 py-1 border-neutral-300 dark:border-neutral-800 bg-violet-500/10 dark:bg-violet-800/50 rounded-md p-3">
                {copied ? (
                  <span className="text-green-600">Copied</span>
                ) : (
                  <span className="text-green-600">DISC10</span>
                )}
              </div>
              <button
                onClick={handleCopy}
                className="text-lg md:text-xl text-violet-600">
                <FaCopy />
              </button>
            </div>
            <p className="text-xs md:text-sm text-neutral-400 dark:text-neutral-600 font-normal">
              Valid Till: 26th Jan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;

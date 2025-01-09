import React, { useState } from 'react'

const Destination = () => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const isDestinationSelected = from && to;

    return (
      <div className="w-full space-y-4">
        {!isDestinationSelected ? (
          <>
            <div className="w-full grid grid-cols-2 gap-10">
              <div className="">
                <label htmlFor="from" className="block mb-2 font-medium">
                  From
                </label>
                <select
                  name="from"
                  onChange={(e) => setFrom(e.target.value)}
                  id="from"
                  className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900 ">
                  <option value="Location1">Location1</option>
                  <option value="Location2">Location2</option>
                  <option value="Location3">Location3</option>
                  <option value="Location4">Location4</option>
                </select>
              </div>

              <div className="">
                <label htmlFor="to" className="block mb-2 font-medium">
                  To
                </label>
                <select
                  name="to"
                  onChange={(e) => setTo(e.target.value)}
                  id="to"
                  className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900 ">
                  <option value="Location1">Location1</option>
                  <option value="Location2">Location2</option>
                  <option value="Location3">Location3</option>
                  <option value="Location4">Location4</option>
                </select>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-5">
            <h1 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">
              Your Destination
            </h1>
            <div className="w-full flex items-center gap-x-3">
              <div className="w-fit text-base font-semibold">
                From :- <span className="ml-1.5 font-medium">{from}</span>
              </div>
              <div className="flex-1">
                <div className="w-full h-[1px] border border-dashed border-neutral-200 dark:border-neutral-800/80 "></div>
              </div>
              <div className="w-fit text-base font-semibold">
                To :- <span className="ml-1.5 font-medium">{to}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default Destination
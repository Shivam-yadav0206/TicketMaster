import React, { useState } from "react";

const DepartTime = () => {
  const [departBus, setDepartBus] = useState("");

  return (
    <div className="w-full space-y-4">
      {!departBus ? (
        <>
          <div className="w-full grid grid-cols-2 gap-10">
            <div className="">
              <label htmlFor="depart" className="block mb-2 font-medium">
                Depart Time
              </label>
              <select
                name="from"
                onChange={(e) => setDepartBus(e.target.value)}
                id="from"
                className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900 ">
                <option value="Select Time">Select Time</option>
                <option value="06: 00 AM">06: 00 AM</option>
                <option value="09: 00 AM">09: 00 AM</option>
                <option value="11: 00 AM">11: 00 AM</option>
              </select>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-5">
          <div className="w-full flex items-center gap-x-3">
            <div className="w-fit text-base font-semibold">
              Bus Departurn @ :- <span className="ml-1.5 font-medium">{departBus}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartTime;

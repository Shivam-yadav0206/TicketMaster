import React from "react";
import { Link } from "react-router-dom";
import Bus1 from "../../../../assets/bus1.png";
import { categories } from "../../../../constants";

const data1 = {
  resources: [
    {
      imageUrl:
        "https://www.shutterstock.com/shutterstock/photos/513094831/display_1500/stock-vector-cartoon-megaphone-cinema-movie-icon-vector-illustration-eps-513094831.jpg",
    },
    {
      imageUrl:
        "https://png.pngtree.com/png-clipart/20201208/original/pngtree-creative-design-cartoon-emoji-package-event-png-image_5509393.jpg",
    },
    {
      imageUrl: "https://cdn-icons-png.flaticon.com/512/2247/2247664.png",
    },
    {
      imageUrl:
        "https://st3.depositphotos.com/4216129/18286/v/450/depositphotos_182864654-stock-illustration-hobby-logo-template-with-sports.jpg",
    },
  ],
};
const Category = () => {
  return (
    <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[4ch] ">
      <div className="w-full items-center flex justify-between">
        <h1 className="text-3xl font-medium ">Category</h1>
        <Link to={"/bus"} className="text-violet-600">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {/* <Link
          to={"/bus"}
          className="bg-neutral-200/60 dark:bg-neutral-900/40 block rounded-xl px-4 py-5 relative group ease-in-out duration-300 overflow-hidden">
          <img
            src={Bus1}
            alt="Bus img"
            className="w-full aspect-video object-contain"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr dark:from-neutral-950/80 dark:to-neutral-950/60 from-neutral-400/80 to-neutral-400/60 group-hover:flex hidden items-center justify-center ease-in-out duration-300">
            <h2 className="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-50 ">
              Private Bus
            </h2>
          </div>
        </Link>
        <Link
          to={"/bus"}
          className="bg-neutral-200/60 dark:bg-neutral-900/40 block rounded-xl px-4 py-5 relative group ease-in-out duration-300 overflow-hidden">
          <img
            src={Bus1}
            alt="Bus img"
            className="w-full aspect-video object-contain"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr dark:from-neutral-950/80 dark:to-neutral-950/60 from-neutral-400/80 to-neutral-400/60 group-hover:flex hidden items-center justify-center ease-in-out duration-300">
            <h2 className="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-50 ">
              Private Bus
            </h2>
          </div>
        </Link>
        <Link
          to={"/bus"}
          className="bg-neutral-200/60 dark:bg-neutral-900/40 block rounded-xl px-4 py-5 relative group ease-in-out duration-300 overflow-hidden">
          <img
            src={Bus1}
            alt="Bus img"
            className="w-full aspect-video object-contain"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr dark:from-neutral-950/80 dark:to-neutral-950/60 from-neutral-400/80 to-neutral-400/60 group-hover:flex hidden items-center justify-center ease-in-out duration-300">
            <h2 className="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-50 ">
              Private Bus
            </h2>
          </div>
        </Link> */}
        <div className="relative flex overflow-hidden">
          <div className="flex space-x-4 py-12 animate-marquee">
            {categories?.resources.map((data, index) => (
              <Link
                to={data.url}
                className="h-48 w-72 bg-neutral-200/60 dark:bg-neutral-900/40 block rounded-xl px-4 py-5 relative group ease-in-out duration-300 overflow-hidden">
                <img
                  key={index}
                  src={data?.imageUrl}
                  alt="carousel"
                  // className="h-40 w-64 object-cover"
                  className=" aspect-video  h-40 w-64 object-cover rounded-md"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr dark:from-neutral-950/80 dark:to-neutral-950/60 from-neutral-400/80 to-neutral-400/60 group-hover:flex hidden items-center justify-center ease-in-out duration-300">
                  <h2 className="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-50 ">
                    {data?.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
          <div className="absolute top-0 flex space-x-4 py-12 animate-marquee2">
            {categories?.resources.map((data, index) => (
              <Link
                to={data.url}
                className="h-48 w-72 bg-neutral-200/60 dark:bg-neutral-900/40 block rounded-xl px-4 py-5 relative group ease-in-out duration-300 overflow-hidden">
                <img
                  key={index}
                  src={data.imageUrl}
                  alt="carousel"
                  // className="h-40 w-64 object-cover"
                  className=" aspect-video  h-40 w-64 object-cover rounded-md"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr dark:from-neutral-950/80 dark:to-neutral-950/60 from-neutral-400/80 to-neutral-400/60 group-hover:flex hidden items-center justify-center ease-in-out duration-300">
                  <h2 className="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-50 ">
                    {data?.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;




// import React from "react";



// const Carousel = () => {
//   return (
    // <div className="relative flex overflow-hidden">
    //   <div className="flex space-x-4 py-12 animate-marquee">
    //     {data1.resources.map((d, index) => (
    //       <img
    //         key={index}
    //         src={d.imageUrl}
    //         alt="carousel"
    //         className="h-40 w-64 object-cover"
    //       />
    //     ))}
    //   </div>

    //   <div className="absolute top-0 flex space-x-4 py-12 animate-marquee2">
    //     {data1.resources.map((d, index) => (
    //       <img
    //         key={index}
    //         src={d.imageUrl}
    //         alt="carousel"
    //         className="h-40 w-64 object-cover"
    //       />
    //     ))}
    //   </div>
    // </div>
//   );
// };

// export default Carousel;

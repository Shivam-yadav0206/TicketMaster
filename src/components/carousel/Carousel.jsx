import { useState, useRef, useEffect } from "react";

// Data
const data = {
  resources: [
    {
      title: "Find me on Mastodon",
      link: "https://indieweb.social/@kendalmintcode",
      imageUrl:
        "https://www.shutterstock.com/shutterstock/photos/513094831/display_1500/stock-vector-cartoon-megaphone-cinema-movie-icon-vector-illustration-eps-513094831.jpg",
    },
    {
      title: "Welcome to K-Tech",
      link: "https://k-tech.systems",
      imageUrl:
        "https://www.shutterstock.com/shutterstock/photos/513094831/display_1500/stock-vector-cartoon-megaphone-cinema-movie-icon-vector-illustration-eps-513094831.jpg",
    },
    {
      title: "Some sort of third title",
      link: "https://indieweb.social/@kendalmintcode",
      imageUrl:
        "https://www.shutterstock.com/shutterstock/photos/513094831/display_1500/stock-vector-cartoon-megaphone-cinema-movie-icon-vector-illustration-eps-513094831.jpg",
    },

    // {
    //   title: "Super item number the last",
    //   link: "https://indieweb.social/@kendalmintcode",
    //   imageUrl:
    //     "https://www.shutterstock.com/shutterstock/photos/513094831/display_1500/stock-vector-cartoon-megaphone-cinema-movie-icon-vector-illustration-eps-513094831.jpg",
    // },
    // {
    //   title: "Some sort of third title",
    //   link: "https://indieweb.social/@kendalmintcode",
    //   imageUrl:
    //     "https://www.shutterstock.com/shutterstock/photos/513094831/display_1500/stock-vector-cartoon-megaphone-cinema-movie-icon-vector-illustration-eps-513094831.jpg",
    // },

    // {
    //   title: "Super item number the last",
    //   link: "https://indieweb.social/@kendalmintcode",
    //   imageUrl:
    //     "https://www.shutterstock.com/shutterstock/photos/513094831/display_1500/stock-vector-cartoon-megaphone-cinema-movie-icon-vector-illustration-eps-513094831.jpg",
    // },
    // {
    //   title: "Some sort of third title",
    //   link: "https://indieweb.social/@kendalmintcode",
    //   imageUrl:
    //     "https://www.shutterstock.com/shutterstock/photos/513094831/display_1500/stock-vector-cartoon-megaphone-cinema-movie-icon-vector-illustration-eps-513094831.jpg",
    // },

    // {
    //   title: "Super item number the last",
    //   link: "https://indieweb.social/@kendalmintcode",
    //   imageUrl:
    //     "https://www.shutterstock.com/shutterstock/photos/513094831/display_1500/stock-vector-cartoon-megaphone-cinema-movie-icon-vector-illustration-eps-513094831.jpg",
    // },
    // {
    //   title: "Find me on Mastodon",
    //   link: "https://indieweb.social/@kendalmintcode",
    //   imageUrl:
    //     "https://www.shutterstock.com/shutterstock/photos/513094831/display_1500/stock-vector-cartoon-megaphone-cinema-movie-icon-vector-illustration-eps-513094831.jpg",
    // },
    // {
    //   title: "Welcome to K-Tech",
    //   link: "https://k-tech.systems",
    //   imageUrl:
    //     "https://www.shutterstock.com/shutterstock/photos/513094831/display_1500/stock-vector-cartoon-megaphone-cinema-movie-icon-vector-illustration-eps-513094831.jpg",
    // },
  ],
};

// const Carousel = () => {
//   const maxScrollWidth = useRef(0);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const carousel = useRef(null);

//   const movePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((prevState) => prevState - 1);
//     }
//   };

// const moveNext = () => {
//   if (
//     carousel.current !== null &&
//     carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
//   ) {
//     setCurrentIndex(0); // Restart the carousel
//   } else if (
//     carousel.current !== null &&
//     carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
//   ) {
//     setCurrentIndex((prevState) => prevState + 1);
//   }
// };


//   const isDisabled = (direction) => {
//     if (direction === "prev") {
//       return currentIndex <= 0;
//     }

//     if (direction === "next" && carousel.current !== null) {
//       return (
//         carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
//       );
//     }

//     return false;
//   };

//   useEffect(() => {
//     if (carousel !== null && carousel.current !== null) {
//       carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
//     }
//   }, [currentIndex]);

//   useEffect(() => {
//     maxScrollWidth.current = carousel.current
//       ? carousel.current.scrollWidth - carousel.current.offsetWidth
//       : 0;
//   }, []);
    
//       useEffect(() => {
//         const interval = setInterval(() => {
//           moveNext();
//         }, 3000); // Adjust the interval time as needed

//         return () => clearInterval(interval); // Clear interval on component unmount
//       }, [currentIndex]);

//   return (
//     <div className="carousel my-12 mx-auto">
//       {/* <h2 className="text-4xl leading-8 font-semibold mb-12 text-slate-700">
//         Our epic carousel
//       </h2> */}
//       <div className="relative overflow-hidden">
//         <div className="flex justify-between absolute top left w-full h-full">
//           <button
//             onClick={movePrev}
//             className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
//             disabled={isDisabled("prev")}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-12 w-20 -ml-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}>
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//             <span className="sr-only">Prev</span>
//           </button>
//           <button
//             onClick={moveNext}
//             className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
//             disabled={isDisabled("next")}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-12 w-20 -ml-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}>
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//             <span className="sr-only">Next</span>
//           </button>
//         </div>
//         <div
//           ref={carousel}
//           className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0">
//           {data.resources.map((resource, index) => {
//             return (
//               <div
//                 key={index}
//                 className="carousel-item text-center relative w-64 h-64 snap-start">
//                 <a
//                   href={resource.link}
//                   className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
//                   style={{
//                     backgroundImage: `url(${resource.imageUrl || ""})`,
//                   }}>
//                   <img
//                     src={resource.imageUrl || ""}
//                     alt={resource.title}
//                     className="w-full aspect-square hidden"
//                   />
//                 </a>
//                 <a
//                   href={resource.link}
//                   className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-blue-800/75 z-10">
//                   <h3 className="text-white py-6 px-3 mx-auto text-xl">
//                     {resource.title}
//                   </h3>
//                 </a>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Carousel;


import React from "react";

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

const Carousel = () => {
  return (
    <div className="relative flex overflow-hidden">
      <div className="flex space-x-4 py-12 animate-marquee">
        {data1.resources.map((d, index) => (
          <img
            key={index}
            src={d.imageUrl}
            alt="carousel"
            className="h-40 w-64 object-cover"
          />
        ))}
      </div>

      <div className="absolute top-0 flex space-x-4 py-12 animate-marquee2">
        {data1.resources.map((d, index) => (
          <img
            key={index}
            src={d.imageUrl}
            alt="carousel"
            className="h-40 w-64 object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

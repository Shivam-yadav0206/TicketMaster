import React, { useState, useEffect } from "react";
import Hero from "./hero/Hero";
import Search from "../search/Search";
import Category from "./hero/category/Category";
import Offer from "./offer/Offer";
import Deco from "../../assets/deco1.png";
import Timer from "../../assets/fs.jpg";
import Timer2 from "../../assets/timer.jpg";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { features } from "../../constants";
import Mov from "../../assets/movie.png";
import Spo from "../../assets/sport.png";
import Eve from "../../assets/event.png";
import Act from "../../assets/act.png";

//import Carousel from "../../components/carousel/Carousel";
const Home = ({ setLatLong }) => {
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude.toFixed(6);
        const longitude = position.coords.longitude.toFixed(6);
        setLatLong(`${latitude}-${longitude}`);
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      (error) => {
        console.error("Error getting location:", error.message);
        alert("Unable to retrieve your location.");
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="bg-purple-50 dark:bg-neutral-900/40">
      <Hero />
      <Category />
      {/* <div className="2xl:container 2xl:mx-auto 2xl:px-0 py-3 px-10">
        <Carousel />
      </div> */}

      <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[4ch]">
        <div className="w-full">
          <div class="services section" id="services">
            <div className="w-full items-center flex justify-between my-8">
              <h1 className="text-3xl font-medium ">Services </h1>
              <Link to={"/bus"} className="text-violet-600">
                View All
              </Link>
            </div>
            <div class="container">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="service-item relative mt-24">
                  <div class="icon  absolute top-[-95px] right-0 w-[190px] h-[190px] flex items-center justify-center bg-[#7a6ad8] rounded-full">
                    <img
                      src={Mov}
                      alt="online degrees"
                      class="max-w-[86px] transition-all duration-200 ease-in-out"
                    />
                  </div>
                  <div class="main-content dark:bg-neutral-900 bg-[#f1f0fe] p-8 pb-6 rounded-xl mb-8 mr-20 transition-all duration-400 ease-in-out">
                    <h4 class="text-lg font-semibold mb-4 leading-7 transition-all duration-400 ease-in-out">
                      Movies
                    </h4>
                    <p class="text-[#4a4a4a] mb-6">
                      Watch Latest Movies by booking tickets with Us from nearby
                      Theatres.
                    </p>
                    <div class="main-button">
                      <a href="/services" class="text-[#7a6ad8]">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>

                <div class="service-item relative mt-24">
                  <div class="icon absolute top-[-95px] right-0 w-[190px] h-[190px] flex items-center justify-center bg-[#7a6ad8] rounded-full">
                    <img
                      src={Spo}
                      alt="web experts"
                      class="max-w-[86px] transition-all duration-200 ease-in-out"
                    />
                  </div>
                  <div class="main-content dark:bg-neutral-900 bg-[#f1f0fe] p-8 pb-6 rounded-xl mb-8 mr-20 transition-all duration-400 ease-in-out">
                    <h4 class="text-lg font-semibold mb-4 leading-7 transition-all duration-400 ease-in-out">
                      Sports
                    </h4>
                    <p class="text-[#4a4a4a] mb-6">
                      Fuel your passion for sports! Book tickets now for
                      thrilling matches and events.
                    </p>
                    <div class="main-button">
                      <a href="/services" class="text-[#7a6ad8]">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>

                <div class="service-item relative mt-24">
                  <div class="icon absolute top-[-95px] right-0 w-[190px] h-[190px] flex items-center justify-center bg-[#7a6ad8] rounded-full">
                    <img
                      src={Eve}
                      alt="web experts"
                      class="max-w-[86px] transition-all duration-200 ease-in-out"
                    />
                  </div>
                  <div class="main-content dark:bg-neutral-900 bg-[#f1f0fe] p-8 pb-6 rounded-xl mb-8 mr-20 transition-all duration-400 ease-in-out">
                    <h4 class="text-lg font-semibold mb-4 leading-7 transition-all duration-400 ease-in-out">
                      Events
                    </h4>
                    <p class="text-[#4a4a4a] mb-6">
                      Don't miss out on the excitement! Book tickets for your
                      favorite events now.
                    </p>
                    <div class="main-button">
                      <a href="/services" class="text-[#7a6ad8]">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="events" className="event">
            <div className="container">
              <div className="text-center mb-24">
                <div className="w-full items-center flex justify-between">
                  <h1 className="text-3xl font-medium">Features</h1>
                  <Link to={"/bus"} className="text-violet-600">
                    View All
                  </Link>
                </div>
              </div>

              {/* Feature Items */}
              {features?.map((feature, index) => (
                <div
                  key={index}
                  className="item bg-[#f1f0fe] dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 lg:p-10 mb-16 relative">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image Section */}
                    <div className="w-full -mt-16 lg:w-1/4 mb-8 lg:mb-0 flex justify-center lg:justify-start">
                      <div className="image relative">
                        <img
                          src={Timer}
                          alt={`${feature.category} image`}
                          className="rounded-2xl max-w-[180px] sm:max-w-[200px] lg:max-w-[240px] mx-auto lg:mx-0"
                        />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full lg:w-3/4 lg:pl-8">
                      <ul className="flex flex-col  flex-wrap gap-4">
                        <li className="w-full md:w-auto">
                          <span className="category inline-block text-xs uppercase text-[#7a6ad8] bg-white py-2 px-4 sm:px-5 rounded-full font-medium mb-3">
                            {feature.category}
                          </span>
                          <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                            {feature.title}
                          </h4>
                        </li>
                        <li className="w-full md:w-auto">

                        </li>

                        <li className="w-full md:w-auto">
                          <span className="inline-block text-sm text-gray-700 dark:text-gray-400 mb-1">
                            Provider:
                          </span>
                          <h6 className="text-base sm:text-lg text-[#7a6ad8] font-semibold">
                            {feature.provider}
                          </h6>
                        </li>
                        <li className="w-full md:w-auto">
                          <span className="inline-block text-sm text-gray-700 dark:text-gray-400 mb-1">
                            Details:
                          </span>
                          <h6 className="text-base sm:text-lg text-[#7a6ad8] font-semibold">
                            {feature.details}
                          </h6>
                        </li>
                      </ul>
                      <a
                        href={feature.link || "#"}
                        className="absolute top-4 sm:top-6 right-4 lg:right-0 bg-[#7a6ad8] w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-l-full text-white text-lg sm:text-xl"
                        aria-label={`View details of ${feature.title}`}>
                        <FaAngleRight />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <Search /> */}
      <Offer />
    </div>
  );
};

export default Home;

{
  /* <div className="w-full items-center flex justify-between">
            <h1 className="text-3xl font-medium ">Category</h1>
            <Link to={"/bus"} className="text-violet-600">
              View All
            </Link>
          </div>
          <div class="services section" id="services">
            <div class="container">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="service-item relative mt-24">
                  <div class="icon absolute top-[-95px] right-0 w-[190px] h-[190px] flex items-center justify-center bg-[#7a6ad8] rounded-full">
                    <img
                      src={Timer2}
                      alt="online degrees"
                      class="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  <div class="main-content bg-[#f1f0fe] dark:bg-neutral-900 p-8 pb-6 rounded-xl mb-8 mr-20 transition-all duration-400 ease-in-out">
                    <h4 class="text-lg font-semibold mb-4 leading-7 transition-all duration-400 ease-in-out">
                      Online Degrees
                    </h4>
                    <p class="text-[#4a4a4a] mb-6">Coming Soon.</p>
                    <div class="main-button">
                      <a href="#" class="text-[#7a6ad8]">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>

                <div class="service-item relative mt-24">
                  <div class="icon absolute top-[-95px] right-0 w-[190px] h-[190px] flex items-center justify-center bg-[#7a6ad8] rounded-full">
                    <img
                      src="../assests/images/service-02.png"
                      alt="short courses"
                      class="max-w-[86px] transition-all duration-200 ease-in-out"
                    />
                  </div>
                  <div class="main-content bg-[#f1f0fe] dark:bg-neutral-900 p-8 pb-6 rounded-xl mb-8 mr-20 transition-all duration-400 ease-in-out">
                    <h4 class="text-lg font-semibold mb-4 leading-7 transition-all duration-400 ease-in-out">
                      Short Courses
                    </h4>
                    <p class="text-[#4a4a4a] mb-6">Coming Soon</p>
                    <div class="main-button">
                      <a href="#" class="text-[#7a6ad8]">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>

                <div class="service-item relative mt-24">
                  <div class="icon absolute top-[-95px] right-0 w-[190px] h-[190px] flex items-center justify-center bg-[#7a6ad8] rounded-full">
                    <img
                      src="../assests/images/service-03.png"
                      alt="web experts"
                      class="max-w-[86px] transition-all duration-200 ease-in-out"
                    />
                  </div>
                  <div class="main-content bg-[#f1f0fe] dark:bg-neutral-900 p-8 pb-6 rounded-xl mb-8 mr-20 transition-all duration-400 ease-in-out">
                    <h4 class="text-lg font-semibold mb-4 leading-7 transition-all duration-400 ease-in-out">
                      Web Experts
                    </h4>
                    <p class="text-[#4a4a4a] mb-6">Coming Soon</p>
                    <div class="main-button">
                      <a href="#" class="text-[#7a6ad8]">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */
}

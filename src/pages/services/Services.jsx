import React from "react";
import Services1 from "../../assets/logo2.png"
import Mov from "../../assets/movie.png";
import Spo from "../../assets/sport.png";
import Eve from "../../assets/event.png";
import Act from "../../assets/act.png";
import { Link } from "react-router-dom";
const Services = () => {
  return (
    <div className="bg-purple-50 w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[8ch] ">
      <div className="w-full ">
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
                    src={Act}
                    alt="short courses"
                    class="max-w-[86px] transition-all duration-200 ease-in-out"
                  />
                </div>
                <div class="main-content dark:bg-neutral-900 bg-[#f1f0fe] p-8 pb-6 rounded-xl mb-8 mr-20 transition-all duration-400 ease-in-out">
                  <h4 class="text-lg font-semibold mb-4 leading-7 transition-all duration-400 ease-in-out">
                    Activities
                  </h4>
                  <p class="text-[#4a4a4a] mb-6">
                    Make your Outing plans with various available options and
                    make your weekend plans now.
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
                    Fuel your passion for sports! Book tickets now for thrilling
                    matches and events.
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
      </div>
    </div>
  );
};

export default Services;

import React from "react";
import Logo from "../../assets/logo2.png";

const About = () => {
  return (
    <div className="w-full ml-16">
      <div className="relative py-20 mt-40 bg-purple-200 rounded-l-full">
        <div className="flex justify-cente">
          <div className="w-full max-w-2xl ">
            <div
              id="carouselExampleInterval"
              className="carousel slide relative"
              data-bs-ride="carousel">
              <div className="carousel-inner ml-12">
                <div className="carousel-item active" data-bs-interval="10000">
                  <div className="bg-purple-600 rounded-[80px] px-24 py-16">
                    <p className="text-white text-lg italic leading-8 font-light mb-10">
                      “Please tell your friends or colleagues about Quizzy
                      website. Anyone can access the website to start his/her
                      learning journey. Thank you for visiting.”
                    </p>
                    <div className="flex items-center">
                      <img
                        src={Logo}
                        alt=""
                        className="w-24 h-24 rounded-full mr-6"
                      />
                      <div>
                        <span className="block text-white text-sm">
                          Full Stack Developer
                        </span>
                        <h4 className="text-white text-2xl font-semibold mt-1">
                          Shivam Yadav
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center hover:shadow-lg"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="prev">
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </button>
              <button
                className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center hover:shadow-lg"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="next">
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </button>
            </div>
          </div>
          <div className="absolute left-20 mt-4 ml-[48%]">
            <div className="space-y-6">
              <h6 className="text-sm font-semibold text-gray-500">
                TESTIMONIALS
              </h6>
              <h2 className="text-3xl font-bold text-gray-800">
                What they say about us?
              </h2>
              <p className="text-gray-600 text-base">
                The online quiz portal is an exceptional platform that offers
                engaging quizzes across various subjects. The user interface is
                intuitive and visually appealing, enhancing the overall
                experience. Highly recommended!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

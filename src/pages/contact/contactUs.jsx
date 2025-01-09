import React from "react";

const contactUs = () => {
  return (
    <div className="bg-purple-100 w-full mt-8">
      <div className="w-full">
        <div className="mt-16 mb-4">
          <div className="container flex flex-col lg:flex-row items-center">
            {/* Left Section (Text) */}
            <div className="w-full lg:w-8/12 dark:bg-neutral-900 bg-slate-200 rounded-r-full">
              <div className="lg:mx-16 md:mx-8 sm:px-7 lg:my-28 px-6">
                <h6 className="text-lg lg:text-3xl font-semibold text-gray-700 dark:text-gray-300">
                  Contact Us
                </h6>
                <h2 className="text-2xl lg:text-3xl dark:text-gray-300 font-bold text-gray-900 mt-4">
                  Feel free to contact us anytime
                </h2>
                <p className="mt-6 lg:pr-16 text-gray-600 text-sm lg:text-base mr-16">
                  Have a question or need assistance? We're here to help! Our
                  dedicated support team is ready to provide you with prompt and
                  reliable assistance. Whether you need help with our courses,
                  have inquiries about enrollment, or want to provide feedback,
                  feel free to reach out to us. We value your input and strive
                  to deliver an exceptional learning experience. Contact us
                  today through the provided channels, and we'll get back to you
                  as soon as possible. Let's embark on your learning journey
                  together!
                </p>
              </div>
            </div>

            {/* Right Section (Form) */}
            <div className="mt-8 lg:mt-0 lg:ml-[-12rem] w-full lg:w-5/12 bg-[#7a6ad8] text-white rounded-xl p-8 lg:p-12">
              <form id="contact-form" action="" method="post">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your Name..."
                      className="w-full h-12 px-4 rounded-full bg-[#8D7DDE] text-gray-700 text-sm placeholder-white focus:outline-none focus:ring-2 focus:ring-[#7a6ad8]"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Your E-mail..."
                      className="w-full h-12 px-4 rounded-full bg-[#8D7DDE] text-gray-700 text-sm placeholder-white focus:outline-none focus:ring-2 focus:ring-[#7a6ad8]"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      id="message"
                      placeholder="Your Message"
                      className="w-full h-24 px-4 py-2 rounded-lg bg-[#8D7DDE] text-gray-700 text-sm placeholder-white focus:outline-none focus:ring-2 focus:ring-[#7a6ad8]"
                      required></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      id="form-submit"
                      className="w-full h-12 bg-white text-[#7a6ad8] font-semibold rounded-full hover:opacity-80 transition-all">
                      Send Message Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Background Decoration */}
          <div className="absolute top-0 bottom-0 left-0 w-full lg:w-2/3 bg-[#f1f0fe] rounded-r-[500px] z-[-1]"></div>
        </div>
      </div>
    </div>
  );
};

export default contactUs;

import React from "react";

function ContactUs() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {/* Title Section */}
        <h2 className="text-4xl font-bold text-blue-800 text-center mb-8">
          Contact Us
        </h2>
        <p className="text-lg text-gray-700 text-center mb-8">
          Have any questions or feedback? Get in touch with us using the form
          below.
        </p>

        {/* Form Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6" >
          {/* Left Side: Image */}
          <div
            className="w-full md:w-1/2 h-80 rounded-lg bg-cover bg-center mb-8 md:mb-0"
            style={{
              backgroundImage: "url('https://via.placeholder.com/600x400')",
            }}
          ></div>

          {/* Right Side: Form */}
          <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
            <form action="#" method="POST" className="space-y-6">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              {/* Message Input */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Write your message here"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;

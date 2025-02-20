import React, { useState } from "react";
import axios from "axios"; // Import Axios
import ContactUsImage from "../../assets/contactUs.jpg";
import { useSelector } from 'react-redux';
import { useToast } from '@/hooks/use-toast';

function ContactUs() {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const {user} = useSelector((state)=> state.auth);
  const { toast } = useToast();

  // State for errors
  const [errors, setErrors] = useState({});

  // State for submission success or failure
  const [submissionMessage, setSubmissionMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on input change
    setSubmissionMessage(""); // Clear submission message
  };

  // Validate inputs
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required.";

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user){
      toast({
        title : "Please Login First.",
        variant : "destructive",
      });

      return;
    }
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        // Send POST request with Axios
        const response = await axios.post("http://localhost:5000/api/shop/contact/send-email", formData);

        // Handle success
        if (response.status === 200) {
          setSubmissionMessage("Thank you for your message! We'll get back to you shortly.");
          setFormData({ name: "", email: "", message: "" }); // Clear the form
        }
      } catch (error) {
        // Handle error
        console.error("Error submitting the form:", error);
        setSubmissionMessage(
          "Something went wrong while submitting your message. Please try again later."
        );
      }
    }
  };

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
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Side: Image */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <img
              src={ContactUsImage}
              alt="Contact Us"
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>

          {/* Right Side: Form */}
          <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-600`}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
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
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-600`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
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
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-600`}
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submission Feedback */}
              {submissionMessage && (
                <p className="text-center text-blue-600 font-semibold mt-4">
                  {submissionMessage}
                </p>
              )}

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

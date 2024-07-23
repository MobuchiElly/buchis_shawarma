import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaMailBulk,
  FaMailchimp,
  FaAmilia,
} from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";
import MessageModal from "@/components/MessageModal";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleModal = () => {
    setIsSubmitted(!isSubmitted);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.ENDPOINT_URL}/api/contact`,
        formData
      );
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      handleModal();
    } catch (err) {
      console.error(err);
    }
  };
  const content = (
    <div>
      Thank you for contacting us.
      <br /> We would respond to your message shortly.
    </div>
  );

  return (
    <div className="w-screen" style={{ height: "calc(100vh-100px)" }}>
      <Head>
        <title>Contact Us - Buchis Shawarma</title>
        <meta
          name="description"
          content="Contact us for orders and enquiries"
        />
      </Head>
      {isSubmitted && (
        <MessageModal content={content} handleModal={handleModal} />
      )}
      <div className="text-center p-2 mt-3">
        <p className="text-gray-800 font-bold text-3xl mb-2">
          Support and Enquiries
        </p>
        <div className="bg-gray-400 h-1.7px w-64 mx-auto"></div>
      </div>

      <div className="flex flex-col lg:px-6 py-2 lg:flex-row w-full mb-1">
        <div className="flex lg:justify-center lg:py-8 lg:w-1/2 ">
          <div className="">
            {/* location */}
            <div className="flex mb-6 pb-2">
              <div className="h-auto flex justify-center items-center px-4">
                <span className="bg-gray-300 w-10 h-10 rounded-full">
                  <FaMapMarkerAlt className="h-10 w-10 mr-2 p-2.5" />
                </span>
              </div>
              <div className="h-auto pr-3 lg:pr-0">
                <h4 className="font-medium">Location:</h4>
                <p>24 Wisdom central, Dukeles way, Ikeja Lagos, Nigeria</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex mb-6 pb-2">
              <div className="h-auto flex justify-center items-center px-4">
                <span className="bg-gray-300 w-10 h-10 rounded-full">
                  <FiMail className="h-10 w-10 mr-2 p-2.5" />
                </span>
              </div>
              <div>
                <h4 className="font-medium">Email:</h4>
                <p>buchidevv@gmail.com</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex">
              <div className="h-auto flex justify-center items-center px-4">
                <span className="bg-gray-300 w-10 h-10 rounded-full">
                  <FiPhone className="h-10 w-10 mr-2 p-2.5" />
                </span>
              </div>
              <div>
                <h4 className="font-medium">Call:</h4>
                <p>+234 813 492 3317</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white px-4 lg:pr-6 lg:mr-6 py-8 rounded-lg lg:w-2/3">
          <form onSubmit={handleSubmit}>
            <div className="gap-4 lg:flex mb-4 pb-2">
              <div className="mb-4 pb-2 lg:mb-0 lg:pb-0 lg:inline-flex lg:flex-col lg:w-1/2">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="lg:inline-flex lg:flex-col lg:w-1/2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            <div className="mb-4 pb-2">
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              ></input>
            </div>
            <div className="mb-4 pb-2">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                placeholder="Message..."
                onChange={handleChange}
                rows={4}
                className="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              ></textarea>
            </div>
            <div className="text-center lg:py-2">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white w-full py-4 font-semibold hover:font-bold text-lg rounded-md hover:bg-green-600focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="w-full bg-slate-300 p-1 lg:py-6 flex justify-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7926.782639306252!2d3.3396342587388412!3d6.598193023472163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9222065553c3%3A0xf717a80339708d59!2sComputer%20Village%20Ikeja%2C%20Lagos!5e0!3m2!1sen!2sng!4v1708456176492!5m2!1sen!2sng"
          width="600"
          height="450"
          style={{ border: "0" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="w-90%"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
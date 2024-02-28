import Head from "next/head";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import {redirect} from 'next/navigation';

const About = () => {
  return (
    <div className="w-screen border-2 border-green-400 px-10 py-2">
      <Head>
        <title>About Us - Buchis Shawarma</title>
        <meta name="description" content="Learn about Buchis Shawarma" />
      </Head>

      <div className="border-2">
        <div className="flex flex-col md:flex-row items-center justify-center border-2 border-pink-400">
          <div className="md:w-1/3 bg-slate-50 h-auto border-2 border-black">
            <Image
              src="/img/about-us.png"
              alt="About Us"
              width={280}
              height={100}
              className="mx-auto border-none"
            />
          </div>
          <div className="w-full md:w-1/2 md:ml-8 border-2 border-black">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Who we are</h1>
            <p className="text-lg mb-6">
              Buchis Shawarma is a family-owned business dedicated to serving
              delicious shawarma made with the finest ingredients.
            </p>
            <p className="text-lg mb-6">
              Our mission is to provide a memorable dining experience for our
              customers, offering a wide range of flavors and options to suit
              every palate.
            </p>
            <p className="text-lg mb-6">
              At Buchis Shawarma, we believe in quality, consistency, and
              exceptional customer service. Join us today and taste the
              difference!
            </p>
            <div className="flex items-center mb-4">
              <FaStar className="text-yellow-500 mr-2" />
              <p className="text-lg">Rated 5 Stars by Our Customers</p>
            </div>
            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
              Learn More
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center border-2 border-green-500">
          <div className="border border-black">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h1>
            <p className="text-lg mb-6">
              Buchis Shawarma is a family-owned business dedicated to serving
              delicious shawarma made with the finest ingredients.
            </p>
            <p className="text-lg mb-6">
              Our mission is to provide a memorable dining experience for our
              customers, offering a wide range of flavors and options to suit
              every palate.
            </p>
            <p className="text-lg mb-6">
              At Buchis Shawarma, we believe in quality, consistency, and
              exceptional customer service. Join us today and taste the
              difference!
            </p>
          </div>
          <div className="border border-black">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Goals</h1>
            <p className="text-lg mb-6">
              Buchis Shawarma is a family-owned business dedicated to serving
              delicious shawarma made with the finest ingredients.
            </p>
            <p className="text-lg mb-6">
              Our mission is to provide a memorable dining experience for our
              customers, offering a wide range of flavors and options to suit
              every palate.
            </p>
            <p className="text-lg mb-6">
              At Buchis Shawarma, we believe in quality, consistency, and
              exceptional customer service. Join us today and taste the
              difference!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

export const getServerSideProps = () => {
  return {
    redirect: {
      destination: "/about/upgrade",
      permanent: false,
    },
  };
};
import { FaCheckCircle } from "react-icons/fa";

export default function AboutUs() {
  return (
    <>
      <section id="aboutUs" className="flex p-10 items-center min-h-screen bg-base-200">
        <div className="justify-center flex-1 max-w-6xl mt-5 mx-auto md:px-6">
          <div className="px-4 text-center mb-16">
            <p className="text-lg font-semibold text-center">
              About Us
            </p>
            <h2 className="text-2xl font-bold md:text-4xl font-serif">
              Welcome to Laptop Room
            </h2>
          </div>
          <div className="flex flex-wrap items-center mb-5">
            <div className="w-full px-4 md:w-1/2 lg:mb-0">
              <h2 className="mb-4 text-2xl font-bold">
                Elevating Your Laptop Experience
              </h2>
              <p className="mb-4 text-base text-justify">
                At Laptop Room, we go beyond providing laptops. We curate an unparalleled experience for tech enthusiasts and professionals alike. Our commitment to excellence is reflected in everything we do.
              </p>
              <ul className="mb-10">
                <li className="flex items-center mb-4 text-base">
                  <div className="flex items-center">
                    <FaCheckCircle className="text-xl mr-2" />
                    Innovative Art and Programs
                  </div>
                </li>
                <li className="flex items-center mb-4 text-base">
                  <div className="flex items-center">
                    <FaCheckCircle className="text-xl mr-2" />
                    Unmatched Value for Your Money
                  </div>
                </li>
                <li className="flex items-center mb-4 text-base">
                  <div className="flex items-center">
                    <FaCheckCircle className="text-xl mr-2" />
                    Dedicated Support Team for Your Queries
                  </div>
                </li>
                <li className="flex items-center mb-4 text-base">
                  <div className="flex items-center">
                    <FaCheckCircle className="text-xl mr-2" />
                    Facilitating Successful Growth for Your Business
                  </div>
                </li>
              </ul>
              <a href="#products"
                className="px-4 py-2 btn rounded-lg bg-base-100 hover:bg-base-300">
                Explore Our Products
              </a>
            </div>
            <div className="relative w-full px-4 md:w-1/2 lg:mb-0">
              <img src="about-us-photo.jpg" alt="about-us"
                className="relative z-40 object-cover w-full rounded-md md:h-96 h-44 xl:mt-0 lg:mt-0 md:mt-5 mt-5" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
import React from "react";

export default function HeroSection({ onScroll }) {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-6" // Added flex-col to stack items vertically
      style={{
        background: "linear-gradient(to bottom right, #1a202c, #220123)", // gray-900 to #220123
      }}
    >
      <div className=" text-center text-white space-y-8 mt-20 "> {/* Added mb-12 for spacing from the button */}
        <h1 data-aos="fade-down" className="md:text-7xl text-3xl font-extrabold tracking-tight">
          Rate Your Favorite Store
        </h1>
        <p  data-aos="fade-left" className="text-gray-300 text-lg md:text-[34px]">
          Help others by submitting your rating for the stores registered on
          our platform.
        </p>

        <div data-aos="fade-right" className="flex justify-center space-x-3 text-yellow-400 text-4xl">
          {/* Static 5 stars */}
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="none"
              width={36}
              height={36}
              aria-hidden="true"
            >
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.165c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.922-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.196-1.539-1.118l1.285-3.957a1 1 0 00-.364-1.118L2.034 9.385c-.783-.57-.38-1.81.588-1.81h4.165a1 1 0 00.95-.69l1.286-3.958z" />
            </svg>
          ))}
        </div>

        <p data-aos="fade-up" className="text-gray-400 text-md max-w-xl mx-auto">
          Beyond mere numbers, your rating is a testament to your genuine encounter – a vital contribution that illuminates the path for fellow users seeking authentic quality and unparalleled service.
        </p>
      </div>

      {/* Animated Arrow Button */}
      {/* Positioned at the bottom using absolute positioning relative to the section,
          or simply allowed to flow after the content block */}
      <div  className="mt-8"> 
        <button
        data-aos="zoom-in"
      onClick={onScroll}  
          className="
            flex items-center justify-center p-3 rounded-full
            bg-purple-600 text-white text-md font-semibold
            hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75
            transition-colors duration-300 ease-in-out
            shadow-lg hover:shadow-xl md:mt-10 cursor-pointer
          "
          aria-label="Scroll down or explore"
        >
          <svg
            className={`
              w-7 h-7 transform
              animate-bounce-custom /* Apply the custom bounce animation */
            `}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* --- CSS for the custom animation --- */}
      <style jsx>{`
        @keyframes bounce-custom {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px); /* Adjust bounce height */
          }
        }
        .animate-bounce-custom {
          animation: bounce-custom 1.8s infinite; /* Adjust speed and repeat */
        }
      `}</style>
    </section>
  );
}
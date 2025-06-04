import React, { useEffect, useRef, useState } from "react";
import Hero from "./Hero";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Footer from "./Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const cardRef = useRef(null);

  const scrollToCard = () => {
    cardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar onSearchChange={setSearchQuery} />
      {searchQuery.trim() ? (
        <div className="text-center py-10 mt-20">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-400">
            Showing results for:{" "}
            <span className="text-white">"{searchQuery}"</span>
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Filtered by store name, email, or address.
          </p>
        </div>
      ) : (
        <HeroSection onScroll={scrollToCard} />
      )}
      <Hero ref={cardRef} searchQuery={searchQuery} />
      <Footer />
      {/* </div> */}
    </>
  );
};

export default home;

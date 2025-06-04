import React, { useEffect, useRef } from 'react'
import Hero from './Hero'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import Footer from './Footer'
import AOS from 'aos';
import 'aos/dist/aos.css'; 


const home = () => {
    useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true,     // whether animation should happen only once
    });
  }, []);

   const cardRef = useRef(null);

  const scrollToCard = () => {
    cardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <Navbar />
    <HeroSection onScroll={scrollToCard}/>
    {/* <div className='mt-15'> */}

    <Hero  ref={cardRef} />
    <Footer/>
    {/* </div> */}
    
    </>
  )
}

export default home
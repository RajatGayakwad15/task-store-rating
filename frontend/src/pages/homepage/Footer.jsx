import React from "react";
import { Github, Twitter, Code, Twitch, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1a1423] text-white py-10">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 text-center md:text-left">

          <div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="bg-purple-600 text-white font-bold text-lg w-10 h-10 flex items-center justify-center rounded-full">
                SR
              </div>
              <h4 className="text-2xl font-bold">STORE RATING</h4>
            </div>
            <p className="text-gray-300 mt-3 text-sm">
              Your rating is more than a number — it's a guide for others
              seeking real quality and service.
            </p>
          </div>
          <div></div>
          <div className="flex flex-col md:flex-row md:justify-between w-full">
      
            <div className="md:w-1/2 mt-6 md:mt-0">
              <h5 className="text-xl font-semibold border-b-2 border-purple-500 inline-block pb-1">
                Contact
              </h5>
              <p className="mt-4">
                <a
                  href="mailto:store@rating.com"
                  className="text-gray-300 hover:text-purple-400"
                >
                  <span className="font-semibold text-white">Email:</span>{" "}
                  store@rating.com
                </a>
              </p>
              
              <p className="mt-4">
                <a
                  href="tel:1234567890"
                  className="text-gray-300 hover:text-purple-400"
                >
                  <span className="font-semibold text-white">Phone:</span>{" "}
                  1234567890
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-600 pt-5 text-center text-gray-400 text-sm">
          <p>© 2025 Store Rating. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

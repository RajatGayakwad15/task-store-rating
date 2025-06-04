import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 pt-16 pb-8 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-semibold mb-4">
            Be the First to Experience <br /> What’s Next in Innovation
          </h1>
        </div>

        <div>
          <h2 className="text-sm font-bold mb-2">JoinTheWaitlist</h2>
          <ul className="space-y-1 text-sm text-gray-400">
            
           
            <li>
              <Link to="/contact" className="hover:text-white">
                Give Feedback 
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold mb-2">Product</h2>
          <ul className="space-y-1 text-sm text-gray-400">
            {["Pricing", "Download", "AI"].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="hover:text-white"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold mb-2">Support</h2>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>
              <Link to="/help" className="hover:text-white">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>
          </ul>

          <h2 className="text-sm font-bold mt-6 mb-2">Legal</h2>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>
              <Link to="/privacy" className="hover:text-white">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-white">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} JoinTheWaitlist
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0 text-white text-xl">
          {/* Replace with real icons later */}
          <a href="#" className="hover:text-purple-500">
            X
          </a>
          <a href="#" className="hover:text-purple-500">
            LinkedIn
          </a>
          <a href="#" className="hover:text-purple-500">
            TikTok
          </a>
          <a href="#" className="hover:text-purple-500">
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

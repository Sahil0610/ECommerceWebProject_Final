import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaPaperPlane } from "react-icons/fa";
import Envelope from "./assets/envelope-outline.svg"; // Adjust path if needed
import Sofa from "./assets/sofa.png"; // Adjust path if needed

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-20 relative">
      {/* Sofa image */}
      <div className="absolute top-0 left-0 w-full flex justify-center -translate-y-1/2">
        {/* <img src={Sofa} alt="Sofa" className="w-80 h-auto object-contain" /> */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter subscription */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <img src={Envelope} alt="Envelope" className="w-7 h-7" />
            <span>Subscribe to Newsletter</span>
          </h3>
          <form className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Enter your name"
              className="px-4 py-2 border rounded-md w-full sm:w-auto flex-1"
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border rounded-md w-full sm:w-auto flex-1"
            />
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md">
              <FaPaperPlane />
            </button>
          </form>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and social */}
          <div className="col-span-1">
            <h2 className="text-3xl font-bold mb-4">Furni<span className="text-yellow-500">.</span></h2>
            <p className="text-gray-600 mb-4">
              Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada.
            </p>
            <div className="flex gap-4 text-gray-600 text-xl">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 col-span-1 md:col-span-1 lg:col-span-4 gap-6">
            <div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="#">About us</Link></li>
                <li><Link to="#">Services</Link></li>
                <li><Link to="#">Blog</Link></li>
                <li><Link to="#">Contact us</Link></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="#">Support</Link></li>
                <li><Link to="#">Knowledge base</Link></li>
                <li><Link to="#">Live chat</Link></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="#">Jobs</Link></li>
                <li><Link to="#">Our team</Link></li>
                <li><Link to="#">Leadership</Link></li>
                <li><Link to="#">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="#">Nordic Chair</Link></li>
                <li><Link to="#">Kruzo Aero</Link></li>
                <li><Link to="#">Ergonomic Chair</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t pt-6 mb-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p className="text-center md:text-left mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} All Rights Reserved. Designed with Love by <a className="underline" href="https://untree.co">Untree.co</a>. Distributed by <a className="underline" href="https://themewagon.com">ThemeWagon</a>
        </p>
        <ul className="flex gap-4">
            <li><Link to="#">Terms & Conditions</Link></li>
            <li><Link to="#">Privacy Policy</Link></li>
        </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, {useState} from 'react'
import { Link , useLocation} from 'react-router-dom';

import Logo from "../../assets/logo3.png"
import { LiaTimesSolid } from 'react-icons/lia';
import { FaBars, FaPhone } from 'react-icons/fa6';
import Theme from '../theme/Theme';

const Navbar = () => {

  const [open, setOpen] = useState(false);
    const location = useLocation();
    const address = location.pathname;

    const navLinks = [
      { href: "/", label: "Home" },
      { href: "/movies", label: "Movies" },
      { href: "/services", label: "Services" },

      { href: "/contact", label: "Contact Us" },
    //   { href: "/services", label: "Services" },
    ];

    const handleClick = () => {
        setOpen(!open);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
      <div className="w-full justify-between h-[8ch] bg-purple-200 dark:bg-neutral-900 flex items-center lg:px-28 md:px-16 sm:px-7 px-4 fixed top-0 z-30">
        {/* Logo section */}
        <Link to="/" className="mr-4">
          <img src={Logo} alt="logo" className="w-28 h-auto object-contain" />
        </Link>

        {/* Navigation links */}
        <div
          className={`${
            open ? "flex" : "hidden"
          } lg:flex flex-col lg:flex-row absolute lg:relative top-14 lg:top-0 left-0 lg:left-auto w-full lg:w-auto h-auto bg-neutral-100 dark:bg-neutral-900 lg:bg-transparent shadow-md lg:shadow-none rounded-md lg:rounded-none lg:ml-auto lg:gap-x-5 gap-y-3 lg:gap-y-0 p-4 lg:p-0`}>
          <ul className="list-none flex lg:items-center items-start flex-col lg:flex-row gap-x-5 gap-y-2 text-base text-neutral-600 dark:text-neutral-500 font-medium">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.href}
                  onClick={handleClose}
                  className={`hover:text-violet-600 ease-in-out duration-300 ${
                    address === link.href ? "text-purple-500": ""
                  }`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex lg:items-center items-start flex-col lg:flex-row gap-x-5 gap-y-2 text-base font-medium text-neutral-800">
            {/* Theme */}
            <Theme />
          </div>
        </div>
        {/* Toggle button */}
        <button
          onClick={handleClick}
          className="lg:hidden text-neutral-600 dark:text-neutral-300 ease-in-out duration-300 flex items-end justify-end">
          {open ? (
            <LiaTimesSolid className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </button>
      </div>
    );
}

export default Navbar
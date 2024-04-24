"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import menuData from "./menuData";
import Headroom from "react-headroom";
import { SiWalletconnect } from "react-icons/si";
import { MdArrowOutward } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";


import ThemeToggler from "../ThemeToggler/ThemeToggler";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };
  
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleStickyNavbar = () => {
      if (window.scrollY >= 80) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleStickyNavbar);

    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, []);

  const [openIndex, setOpenIndex] = useState(-1); 

  const handleSubmenu = (index: number) => { 
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const usePathName = usePathname();

  const renderIcon = (title: string) => {
    switch (title) {
      case "Home":
        return <MdArrowOutward className="w-4 h-4 ml-1 mt-[2px]" />;
      case "About":
        return <MdArrowOutward className="w-4 h-4 ml-1 mt-[2px]" />;
      case "Features":
        return <MdArrowOutward className="w-4 h-4 ml-1 mt-[2px]" />;
      case "Faq":
        return <MdArrowOutward className="w-4 h-4 ml-1 mt-[2px]" />;
      case "Services":
        return <MdArrowOutward className="w-4 h-4 ml-1 mt-[2px]" />;
      case "Contact Us":
        return <MdArrowOutward className="w-4 h-4 ml-1 mt-[2px]" />;
      default:
        return null;
    }
  };

  return (
    <> 
      <Headroom>
        <header
          className={`header !z-[99999] sticky h-[70px] pt-2 pb-2 !border-b left-0 top-0 button-0 flex w-full items-center ${
            sticky
              ? "dark:bg-dark dark:shadow-sticky-dark fixed !z-[99999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
              : "absolute dark:bg-dark dark:shadow-sticky-dark fixed !z-[99999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
          }`}
        >
          <div className="container">
            <div className="flex justify-between inline-block items-center h-full w-full px-4 2xl:px-16 ">
              <a
                className={`!ml-[-19px] mx-1 my-1 flex items-center lg:mb-0 lg:mt-0 header-logo text-dark py-3`}
                href="/"
              >
                <Image
                  src="/tracker-b.png"
                  alt="logo"
                  width={30}
                  height={30}
                  className="mr-2 ml-5 !w-7 !h-7 w-full dark:hidden"
                />
                <Image
                  src="/tracker.png"
                  alt="logo"
                  width={30}
                  height={30}
                  className="mr-2 ml-5 !w-7 !h-7 hidden w-full dark:block"
                />
                <span className="flex w-full mt-0 font-medium text-sm text-black dark:hidden">
                Crypto <p className="ml-1 font-medium">Tracker</p>
                </span>
                <span className="flex w-full mt-0 font-medium text-sm text-white">
                Crypto<p className="ml-1 font-medium">Tracker</p>
                </span>
              </a>

              <div className="flex w-full items-center justify-end px-4">
                <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
  id="navbarCollapse"
  className={`navbar text-[14px] mt-0 font-normal absolute right-0 z-30 w-[250px] rounded border-[.5px] border bg-white px-6 py-4 duration-300 dark:border dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
    navbarOpen ? "visibility top-full opacity-100" : "invisible top-[120%] opacity-0"
  }`}
>
  {/* Button container */}
  <div className="lg:hidden lg:flex justify-center items-center mb-4"> 
  <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-white bg-black hover:bg-[#161b22] backdrop-blur-lg hover:border-gray-300 transition-colors ease-linear p-3 rounded-lg flex justify-center items-center w-full">
  Connect Wallet
  <SiWalletconnect className="w-4 h-4 ml-0" />
</button>
  </div>
  {/* Navigation items */}
  <ul className="block lg:flex lg:space-x-8 mt-0">
    {menuData.map((menuItem, index) => (
      <li key={index} className="group relative">
        {menuItem.path ? (
          <Link
            href={menuItem.path}
            className={`flex py-2 text-[14px] lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
              usePathName === menuItem.path
                ? "transition-colors duration-300 text-black/70 dark:text-white"
                : "transition-colors duration-300 text-dark hover:text-black dark:text-white/70 dark:hover:text-white"
            }`}
          >
            <span>{menuItem.title}</span>
            {renderIcon(menuItem.title)}
          </Link>
        ) : (
          <>
            <p
              onClick={() => handleSubmenu(index)}
              className="flex cursor-pointer mt-[-1px] items-center py-2 text-[14px] group-hover:text-primary transition-colors duration-100 text-dark hover:text-black dark:text-white/70 dark:hover:text-white dark:group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
            >
              {menuItem.title}
              <span className="pl-1">
                <MdKeyboardArrowDown className="w-5 h-5 ml-1 mt-[2px] transition-colors duration-100 text-dark hover:text-black dark:text-white/70 dark:hover:text-white" />
              </span>
            </p>
            <div
              className={`submenu relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                openIndex === index ? "block" : "hidden"
              }`}
            >
              {menuItem.submenu &&
                menuItem.submenu.map((submenuItem, index) => (
                  <Link
                    href={submenuItem.path || "/"}
                    key={index}
                    className="block rounded py-2.5 text-sm text-dark transition-colors duration-300  hover:text-primary dark:text-white/70 dark:hover:text-white lg:px-3"
                  >
                    {submenuItem.title}
                  </Link>
                ))}
            </div>
          </>
        )}
      </li>
    ))}
  </ul>
</nav>

                </div>
                <div className="flex items-center justify-end ml-10 lg:visible invisible">
                <ThemeToggler />
                  <div>
                  </div>
                </div>
                <div className="vertical lg:visible invisible"></div>
                <div className="flex items-center justify-end ml-10 lg:visible invisible">
                  <button className="px-4 py-2 m-1 border border-gray-200 rounded-lg text-sm backdrop-blur-lg hover:border-gray-300 transition-colors ease-linear p-3 rounded-lg flex flex flex-row justify-center items-center" data-primary="indigo-700" data-rounded="rounded-2xl" data-primary-reset="{}"><a href="#">Connect Wallet</a>
                    <SiWalletconnect className="w-4 h-4 ml-auto !ml-2 mt-[0px] mr-[-6px]" />
                  </button>
                  <div>
                    {/* Add your additional content here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </Headroom>
    </>
  );
};

export default Header;



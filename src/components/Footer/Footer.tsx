"use client";
import Image from "next/image";
import moment from "moment";
import Social from "@/components/Social/Social";
import Gototop from "@/components/Gototop/Gototop";

export const Footer = () => {
    return (

<footer className="w-full py-14">
  <div className="mx-auto max-w-20xl px-4 sm:px-6 lg:px-8">
  <hr className="my-12 h-[1px] border-t-0 bg-gray-light dark:bg-gray-dark" />
    <div className="mx-auto">
      <a href="#" className="mx-1 my-1 flex justify-center items-center lg:mb-0 lg:mt-0 header-logo text-dark py-3">

                <Image
                  src="/tracker-b.png"
                  alt="logo"
                  width={30}
                  height={30}
                  className="mr-2 ml-0 !w-7 !h-7 w-full dark:hidden"
                />
                <Image
                  src="/tracker.png"
                  alt="logo"
                  width={30}
                  height={30}
                  className="mr-2 ml-0 !w-7 !h-7 hidden w-full dark:block"
                />
                <span className="flex mt-0 font-medium text-sm text-black dark:hidden">
                  Crypto <p className="ml-1 font-medium">Tracker</p>
                </span>
                <span className="flex mt-0 font-medium text-sm text-white">
                Crypto <p className="ml-1 font-medium">Tracker</p>
                </span>
              </a>
              <hr className="my-12 h-[1px] border-t-0 bg-gray-light dark:bg-gray-dark" />
 
      <div className="flex space-x-10 justify-center items-center mb-8">
        <Social />
        <Gototop />
      </div>
      <span className="text-sm transition-colors duration-300 text-dark hover:text-black dark:text-white/70 dark:hover:text-white text-center block">
        © <a href="#">Crypto Tracker</a> {moment().format("YYYY")}, All rights reserved.
      </span>
    </div>
  </div>
</footer>

    );
  };

export default Footer;
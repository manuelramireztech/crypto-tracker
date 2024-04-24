"use client";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { SiLinktree } from "react-icons/si";
import Link from "next/link";

// Define SocialIconProps type
type SocialIconProps = {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
};

// Define social data
const social: { social: SocialIconProps[] } = {
  social: [
    {
      name: "Telegram",
      href: "#",
      icon: (props: any) => (
        <FaTelegramPlane className="h-8 w-8 p-2 border-[1px] transition-colors duration-300 text-dark hover:text-black dark:text-white/70 dark:hover:text-white rounded-lg" />
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (props: any) => (
        <FaXTwitter className="h-8 w-8 p-2 border-[1px] transition-colors duration-300 text-dark hover:text-black dark:text-white/70 dark:hover:text-white rounded-lg" />
      ),
    },
    {
        name: "Linktree",
        href: "#",
        icon: (props: any) => (
          <SiLinktree className="h-8 w-8 p-2 border-[1px] transition-colors duration-300 text-dark hover:text-black dark:text-white/70 dark:hover:text-white rounded-lg" />
        ),
      },
  ],
};

// SocialIcons component
const SocialIcons: React.FC = () => {
  return (

          <div className="flex items-center justify-start">
            <div className="flex space-x-3">
            {social.social.map((item) => (
                <Link key={item.name} className="text-default-400" href={item.href}>
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" className="w-6" />
                </Link>
              ))}
            </div>
          </div>
   
  );
};

export default SocialIcons;
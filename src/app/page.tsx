// app/page.tsx
import { Metadata } from "next";
import HomePage from "./HomePage";

export const metadata: Metadata = {
  title: "Crypto Tracker",
  description: "Made with Next. ",
  // other 
  icons: {
		icon: "/favicon.png",
		shortcut: "/favicon.png",
		apple: "/favicon.png",
	},
};

export default function Page() {
  return <HomePage />;
}
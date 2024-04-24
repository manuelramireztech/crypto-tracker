"use client";

import React, { useState } from "react";
import CurrencyData from "../components/CurrencyData";
import Capitalization from "../components/Capitalization";
import { AppContext } from "./AppContext";

function HomePage() {
  const [currency, setCurrency] = useState("bitcoin");
  const [vsCurrency, setVsCurrency] = useState("usd");
  const [showCapSide, setShowCapSide] = useState(false);

  return (
    <AppContext.Provider value={{ currency, setCurrency, vsCurrency, setVsCurrency, showCapSide, setShowCapSide }}>
      <div className="container min-h-screen w-full relative mt-3 z-4">
        <div className="grid grid-cols-12 gap-0">
          <div className="col-span-12 lg:col-span-9">
            <CurrencyData />
          </div>
          <div className="hidden lg:block lg:col-span-3 mt-3 z-4">
            <Capitalization />
          </div>
        </div>
        <div />
        <div />
      </div>
    </AppContext.Provider>
  );
}

export default HomePage;
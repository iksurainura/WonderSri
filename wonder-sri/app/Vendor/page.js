import React from "react";
import FeaturesShowcase from "./FeaturesShowcase";
import Intro from "./Intro";
import HeroSection from "../components/HeroSection";
import VendorPage from "./Vendorhero";


function page() {
  return (
    <React.StrictMode>
     <VendorPage/>
     <FeaturesShowcase/>
    </React.StrictMode>
  );
}

export default page;

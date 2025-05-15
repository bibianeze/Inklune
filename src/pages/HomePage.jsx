import React from "react";
import Navbar from "../components/Navbar";
import heroImg from "../assets/Hero Image.png"
import Hero from "../components/Hero";
import Features from "../components/Features";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero/>
      <Features/>
    </div>
  );
};

export default HomePage;

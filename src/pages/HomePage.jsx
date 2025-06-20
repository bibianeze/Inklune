import React from "react";
import Navbar from "../components/Navbar";
import heroImg from "../assets/Hero Image.png"
import Hero from "../components/Hero";
import Features from "../components/Features";
import Explore from "../components/Explore";
import CreateAccount from "../components/CreateAccount";
import SubscribeFormSec from "../components/SubscribeFormSec";
import Footer from "../components/Footer";
import Community from "../components/Community";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero/>
      <Features/>
      <Explore/>
      <Community/>
      <CreateAccount/>
      <SubscribeFormSec/>
      <Footer/>
    </div>
  );
};

export default HomePage;

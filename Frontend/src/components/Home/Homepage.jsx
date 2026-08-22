import React from "react";
import Hero from "./Hero";
import About from "./About";
import { useEffect } from "react";
import "./Homepage.css";
import AnimationOne from "./AnimationOne";
import CLI from "./CLI";
import Features from "./Features";
import AnimationTwo from "./AnimationTwo";
import AnimationThree from "./AnimationThree";
import Documentation from "./Documentation";
import Footer from "../Commons/Footer";

function Homepage() {
  useEffect(() => {
    document.documentElement.classList.add("landing-page");

    return () => {
      document.documentElement.classList.remove("landing-page");
    };
  }, []);

  return (
    <>
      <Hero />
      <About />
      <AnimationOne />
      <CLI />
      <AnimationTwo />
      <Features />
      <Documentation />
      <Footer />
    </>
  );
}

export default Homepage;

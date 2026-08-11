import React from "react";
import Hero from "./Hero";
import Feature from "./Feature";
import { useEffect } from "react";
import "./Homepage.css";
import AnimationOne from "./AnimationOne";

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
      <AnimationOne />
      {/* <Feature /> */}
    </>
  );
}

export default Homepage;

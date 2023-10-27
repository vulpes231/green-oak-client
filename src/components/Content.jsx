import React from "react";
import WithStyles from "../hoc/WithStyles";
import Hero from "./Hero";
import Slider from "./Slider";
import Why from "./Why";
import Footer from "./Footer";
import Header from "./Header";

const Content = () => {
  return (
    <>
      <Header />
      <main className="mt-[80px] w-full min-h-screen">
        <Hero />
        <Slider />
        <Why />
        <Footer />
      </main>
    </>
  );
};

export default WithStyles(Content);

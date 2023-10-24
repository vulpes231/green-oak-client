import React from "react";
import WithStyles from "../hoc/WithStyles";
import Hero from "./Hero";
import Slider from "./Slider";
import Why from "./Why";

const Content = () => {
  return (
    <main className="mt-[80px] w-full">
      <Hero />
      <Slider />
      <Why />
    </main>
  );
};

export default WithStyles(Content);

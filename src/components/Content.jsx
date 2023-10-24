import React from "react";
import WithStyles from "../hoc/WithStyles";
import Hero from "./Hero";
import Slider from "./Slider";

const Content = () => {
  return (
    <main className="mt-[80px] w-full">
      <Hero />
      <Slider />
    </main>
  );
};

export default WithStyles(Content);

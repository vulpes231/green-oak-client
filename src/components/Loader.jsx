import { motion } from "framer-motion";
import React from "react";

const Loader = ({ text }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[rgba(52,115,56,0.07)] bg-opacity-90 flex justify-center text-center items-center">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-[50px] h-[50px] rounded-full border-4 border-t-[#347338] border-b-[#347338] border-r-orange-500 border-l-yellow-500 "
      ></motion.div>
      <p>{text}</p>
    </div>
  );
};

export default Loader;

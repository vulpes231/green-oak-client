import { motion } from "framer-motion";
import React from "react";

const Loader = () => {
  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-[rgba(52,115,56,0.07)] bg-opacity-90 flex justify-center text-center items-center">
      <motion.div
        initial={{ rotate: 0 }} // Initial rotation
        animate={{ rotate: 360 }} // Target rotation (e.g., 360 degrees for a full spin)
        transition={{ duration: 2, repeat: Infinity }} // Animation
        className="w-[100px] h-[100px] rounded-full border-4 border-t-[#347338] border-b-[#347338] border-r-orange-500 border-l-yellow-500 "
      ></motion.div>
    </div>
  );
};

export default Loader;

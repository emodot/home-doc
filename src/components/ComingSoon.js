import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "variants.js";

const ComingSoon = () => {
  return (
    <div className="max-w-[1300px] m-auto flex flex-col items-center justify-center min-h-[80vh]">
      <motion.h1
        className="text-[40px] font-redhawk mb-4 text-brand_primary"
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        Coming Soon
      </motion.h1>
      <motion.p
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-[14px] leading-[24px] text-gray-600 mx-auto text-center"
      >
        We're working hard to bring you this page. Stay tuned!
      </motion.p>
    </div>
  );
};

export default ComingSoon;

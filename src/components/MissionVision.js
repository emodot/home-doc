import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "variants.js";

const MissionVision = () => {

  return (
    <div className="max-w-[1300px] lg:w-[95%] w-[90%] mx-auto grid grid-cols-2 gap-[2rem] lg:py-[6rem] py-[4rem]">
      <motion.div
        variants={fadeIn("", 0.4)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="rounded-[30px] bg-brand_secondary p-[4rem]"
      >
        <p className="font-publica_sans_r text-[30px] leading-[20px] text-white">
          Our Mission
        </p>
        <p className="font-publica_sans_l text-[16px] text-white mt-[30px]">
          To provide compassionate, reliable, and personalized elderly care
          services that promote comfort, independence, and peace of mind — for
          both care recipients and their families.
        </p>
      </motion.div>
      <motion.div
        variants={fadeIn("", 0.6)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="rounded-[30px] bg-[#F8F8F0] p-[4rem]"
      >
        <p className="font-publica_sans_r text-[30px] leading-[20px] text-brand_secondary ">
          Our Vision
        </p>
        <p className="font-publica_sans_l text-[16px] text-brand_secondary mt-[30px]">
          To provide compassionate, reliable, and personalized elderly care
          services that promote comfort, independence, and peace of mind — for
          both care recipients and their families.
        </p>
      </motion.div>
    </div>
  );
};

export default MissionVision;

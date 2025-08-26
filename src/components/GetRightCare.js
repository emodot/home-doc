import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "variants.js";
import Button from "components/Inputs/Button";
import { useNavigate } from "react-router-dom";

const GetRightCare = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-[1300px]">
      <div className="mt-[4rem] rounded-[20px] bg-brand_secondary px-[2rem] py-[2rem] grid lg:grid-cols-4 grid-cols-1">
        <p className="font-publica_sans_r text-[20px] text-white col-span-3">
          Give your parents the care they need to live well and age gracefully.
        </p>
        <motion.div
          className="xs:flex sm:gap-4 gap-2"
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Button
            name={"Get Started"}
            theme={"white"}
            textClassName="sm:text-14 !text-12"
            className="!w-[130px] xs:w-auto"
            onClick={() => navigate("/about-us")}
          />
          <Button
            name={"View Pricing"}
            theme={"invert_transparent"}
            arrowIcon={true}
            textClassName="sm:text-14 !text-12"
            className="4xs:w-auto"
            onClick={() => navigate("/contact-us")}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default GetRightCare;

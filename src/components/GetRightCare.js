import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "variants.js";
import Button from "components/Inputs/Button";
import { useNavigate } from "react-router-dom";

const GetRightCare = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-[1300px] mx-auto">
      <div className="mt-[4rem] rounded-[20px] bg-brand_secondary px-[3rem] py-[5rem] grid lg:grid-cols-4 grid-cols-1 items-center">
        <div className="col-span-3">
          <p className="font-publica_sans_r text-[30px] leading-10 text-white">
            Get the Right Care, Right Now
          </p>
          <p className="font-publica_sans_r text-[30px] text-white">
            Don’t wait for things to get overwhelming.
          </p>
          <p className="font-publica_sans_l text-[16px] text-[#FFFFFFB2] mt-[20px] w-[50%]">
            Book a consultation today and take the first step toward
            compassionate, stress-free eldercare.
          </p>
        </div>
        <motion.div
          className="xs:flex sm:gap-4 gap-2"
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Button
            name={"Get Started"}
            theme={"primary"}
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

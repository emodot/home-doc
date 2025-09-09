import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "variants.js";
import Button from "components/Inputs/Button";
import { useNavigate } from "react-router-dom";

const GetRightCare = ({
  header1,
  header2,
  subText,
  btnText1,
  btn1Link,
  btnText2,
  btn2Link,
}) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1300px] mx-auto">
      <div className="mt-[4rem] lg:rounded-[20px] bg-brand_secondary px-[3rem] py-[5rem] grid lg:grid-cols-4 grid-cols-1 items-center">
        <div className="col-span-3">
          <p className="font-publica_sans_r lg:text-[30px] text-[24px] leading-10 text-white">
            {header1}
          </p>
          <p className="font-publica_sans_r lg:text-[30px] text-[24px] text-white">
            {header2}
          </p>
          <p className="font-publica_sans_l text-[16px] text-[#FFFFFFB2] mt-[20px] lg:w-[50%]">
            {subText}
          </p>
        </div>
        <motion.div
          className="xs:flex sm:gap-4 gap-2 mt-[30px] lg:mt-0"
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Button
            name={btnText1}
            theme={"primary"}
            textClassName="sm:text-14 !text-12"
            className="!w-[130px] xs:w-auto"
            onClick={() => navigate(btn1Link)}
          />
          <Button
            name={btnText2}
            theme={"invert_transparent"}
            arrowIcon={true}
            textClassName="sm:text-14 !text-12"
            className="4xs:w-auto"
            onClick={() => navigate(btn2Link)}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default GetRightCare;

import Section3AImg from "assets/images/home-sec-3a.jpg";
import Section3BImg from "assets/images/home-sec-3b.jpg";
import Button from "components/Inputs/Button";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { fadeIn } from "variants.js";

const Section3 = () => {
  const navigate = useNavigate();
  // const isMobile = window.innerWidth < 768;

  return (
    <div className="bg-brand_secondary">
      <div className="max-w-[1300px] lg:w-[95%] w-[90%] m-auto pt-[5rem] pb-[20rem]">
        <div className="lg:w-[60%]">
          <motion.h1
            className="font-publica_sans_r text-[14px] lg:text-[16px] lg:leading-[18px] leading-[16px] text-[#539E9C] mb-4"
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            What we do
          </motion.h1>
          <motion.p
            className="font-publica_sans_r lg:text-[32px] text-[28px] leading-[34px] mb-[4rem] text-white"
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            From doctor visits to lab tests and medicine delivery, we bring
            healthcare home.
          </motion.p>
        </div>
        <div className="lg:grid grid-cols-3 gap-[3rem]">
          <motion.div
            className="rounded-[20px] bg-[#F0F2F3] lg:px-[50px] px-[20px] py-[40px] col-span-1 mb-[20px] lg:mb-0"
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <img
              src={Section3AImg}
              alt="doctor"
              className="rounded-[10px] mb-[30px]"
            />
            <div className="">
              <p className="font-publica_sans_r text-[20px] mb-[15px]">
                Elderly Care Service
              </p>
              <p className="font-publica_sans_l text-[16px]">
                We’ll provide access to In-home care, companionship, and 24/7
                live-in services for your elderly loved ones.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="rounded-[20px] bg-[#F8F8F0] lg:px-[50px] px-[20px] py-[40px] col-span-2 lg:grid grid-cols-2 items-center"
            variants={fadeIn("up", 0.8)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <img
              src={Section3BImg}
              alt="doctor"
              className="rounded-[20px] lg:h-[17.5rem]"
            />
            <div className="lg:px-[45px] mt-[20px] lg:mt-0">
              <p className="font-publica_sans_r text-[20px] mb-[15px]">
                Health Monitoring & Preliminary Checks
              </p>
              <p className="font-publica_sans_l text-[16px]">
                We offer routine vitals checks, early detection screenings, and
                physical assessments — right from home.
              </p>
              <Button
                name={"See More"}
                theme={"secondary"}
                textClassName="sm:text-14 !text-12"
                className="!w-[130px] xs:w-auto sm:mb-6 mt-[2rem]"
                onClick={() => navigate("/about-us")}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Section3;

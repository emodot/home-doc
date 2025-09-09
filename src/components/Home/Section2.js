import Section2AImg from "assets/images/home-sec-2a.jpg";
import Section2BImg from "assets/images/home-sec-2b.jpg";
import Button from "components/Inputs/Button";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { fadeIn } from "variants.js";

const Section2 = () => {
  const navigate = useNavigate();
  // const isMobile = window.innerWidth < 768;

  return (
    <div className="">
      <div className="max-w-[1300px] lg:w-[95%] w-[90%] m-auto pt-[5rem] pb-[6rem]">
        <div className="lg:w-[42%]">
          <motion.h1
            className="font-publica_sans_r text-[28px] lg:text-[32px] lg:leading-[40px] leading-[30px] mb-4"
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Care, your way — home or virtual.
          </motion.h1>
          <motion.p
            className="font-publica_sans_l text-14 leading-[24px] mb-6"
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Our dual service delivery model allows us to provide flexible,
            personalized care — whether you prefer in-home support or a virtual
            consultation from anywhere.
          </motion.p>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-[5rem]">
          <motion.div
            className="rounded-[20px] bg-[#F0F2F3]"
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div
              className="lg:h-[25rem] h-[20rem] rounded-t-[20px]"
              style={{
                // height: "100%",
                width: "100%",
                backgroundImage: `url(${Section2AImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="lg:px-[45px] px-[30px] lg:py-[50px] py-[40px]">
              <p className="font-publica_sans_r text-[20px] mb-[15px]">
                At Home Care
              </p>
              <p className="font-publica_sans_l text-[16px]">
                Our professional caregivers provide personalized in-home
                support—whether for daily needs, recovery, companionship, or
                elder care—ensuring comfort, dignity, and safety in a familiar
                setting.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="rounded-[20px] bg-[#F8F8F0]"
            variants={fadeIn("up", 0.8)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div
              className="lg:h-[25rem] h-[20rem] rounded-t-[20px]"
              style={{
                // height: "100%",
                width: "100%",
                backgroundImage: `url(${Section2BImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="lg:px-[45px] px-[30px] lg:py-[50px] py-[40px]">
              <p className="font-publica_sans_r text-[20px] mb-[15px]">
                Virtual Consultation
              </p>
              <p className="font-publica_sans_l text-[16px]">
                Connect with a licensed care advisor or medical professional
                from home—perfect for checkups, follow-ups, or when a clinic
                visit isn’t needed. Just a smartphone or computer, no travel
                required.
              </p>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="mt-[4rem] rounded-[20px] bg-brand_secondary px-[2rem] py-[3rem] grid lg:grid-cols-4 grid-cols-1"
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.p
            className="font-publica_sans_r text-[20px] text-white col-span-3"
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Give your parents the care they need to live well and age
            gracefully.
          </motion.p>
          <motion.div
            className="xs:flex sm:gap-4 gap-2 mt-[30px] lg:mt-0"
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
        </motion.div>
      </div>
    </div>
  );
};

export default Section2;

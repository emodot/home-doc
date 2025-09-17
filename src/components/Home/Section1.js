import Section1Img from "assets/images/home-sec-1.png";
import Section1BG from "assets/images/home-sec-1-bg.jpg";
import { ReactComponent as CertifiedIcon } from "assets/icons/certified-tag.svg";
import { ReactComponent as Shield } from "assets/icons/shield-settings.svg";
import Button from "components/Inputs/Button";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { fadeIn } from "variants.js";

const Section1 = () => {
  const navigate = useNavigate();
  // const isMobile = window.innerWidth < 768;

  return (
    <div
      className=""
      style={{
        width: "100%",
        backgroundImage: `url(${Section1BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-[1300px] lg:w-[95%] w-[90%] m-auto lg:pt-[13rem] pt-[9rem] pb-[6rem] grid md:grid-cols-2 grid-cols-1 items-center">
        <div className="md:w-[90%] lg:w-[80%]">
          <motion.h1
            className="font-publica_sans_r text-[40px] md:text-[32px] lg:text-[40px] lgm:text-[50px] md:leading-[40px] lg:leading-[50px] lgm:leading-[60px] leading-[54px] mb-4"
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Home-Based Elderly Care, Delivered with Compassion.
          </motion.h1>
          <motion.p
            className="font-publica_sans_l text-14 leading-[24px] mb-6 lg:w-[80%]"
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Help your parents enjoy a longer, healthier life — with care that
            truly matters. HomeDoc connects your loved ones with trusted
            caregivers right at home.
          </motion.p>
          <motion.div
            className="xs:flex sm:gap-4 gap-2"
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Button
              name={"Get Started"}
              theme={"secondary"}
              textClassName="sm:text-14 !text-12"
              className="!w-[130px] xs:w-auto sm:mb-6 mb-2"
              onClick={() => navigate("/about-us")}
            />
            <Button
              name={"View Pricing"}
              theme={"transparent"}
              arrowIcon={true}
              textClassName="sm:text-14 !text-12"
              className="4xs:w-auto"
              onClick={() => navigate("/contact-us")}
            />
          </motion.div>
          <motion.div
            variants={fadeIn("up", 0.8)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex items-center"
          >
            <Shield />
            <p className="font-publica_sans_l text-14 ml-3">
              Personalized Care Plans | Available in Major Cities
            </p>
          </motion.div>
        </div>
        <div className="lg:pl-[4rem] relative mt-[40px] md:mt-0">
          <motion.img
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            src={Section1Img}
            alt=""
          />
          <motion.div
            className="absolute bottom-[10%] right-[5%] w-fit bg-[#FFFFFFCC] rounded-[20px] p-[20px]"
            animate={{
              y: [0, -15, 0], // Move up 20px, then back to original
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <CertifiedIcon />
            <p className="font-publica_sans_l text-12 leading-[14px] mt-[10px]">
              Backed by certified <br />
              caregivers with <br />
              experience
            </p>
          </motion.div>
        </div>
      </div>
      {/* <motion.div
        className="lg:h-[35rem] h-[20rem]"
        style={{
          // height: "100%",
          width: "100%",
          backgroundImage: `url(${isMobile ? Section1MobileBG : Section1BG})`,
          backgroundSize: "cover",
          backgroundPosition: `center ${isMobile ? "right 85%" : "center"}`,
          backgroundRepeat: "no-repeat",
        }}
        variants={fadeIn("", 0.8)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      ></motion.div> */}
    </div>
  );
};

export default Section1;

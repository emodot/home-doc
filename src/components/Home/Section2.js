import Section2Img from "assets/images/home-sec-1.png";
import Section2BG from "assets/images/home-sec-1-bg.jpg";
import { ReactComponent as CertifiedIcon } from "assets/icons/certified-tag.svg";
import { ReactComponent as Shield } from "assets/icons/shield-settings.svg";
import Button from "components/Inputs/Button";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { fadeIn } from "variants.js";

const Section2 = () => {
  const navigate = useNavigate();
  // const isMobile = window.innerWidth < 768;

  return (
    <div className="">
      <div className="max-w-[1300px] lg:w-[95%] w-[90%] m-auto pt-[5rem] pb-[6rem] grid lg:grid-cols-2 grid-cols-1 items-center">
        <div className="w-[80%]">
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
            className="font-publica_sans_l text-14 leading-[24px] mb-6 w-[80%]"
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
      </div>
      {/* <motion.div
        className="lg:h-[35rem] h-[20rem]"
        style={{
          // height: "100%",
          width: "100%",
          backgroundImage: `url(${isMobile ? Section2MobileBG : Section2BG})`,
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

export default Section2;

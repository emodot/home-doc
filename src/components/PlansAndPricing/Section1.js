// import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "variants.js";

const Section1 = () => {
  // const navigate = useNavigate();
  // const isMobile = window.innerWidth < 768;

  return (
    <div>
      <div className="pt-[9rem] pb-[1rem]">
        <div className="max-w-[1300px] lg:w-[95%] w-[90%] m-auto">
          <motion.p
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-[32px] leading-[34px] lg:w-[43%] mx-auto text-center font-publica_sans_r mb-3"
          >
            Plans and pricing
          </motion.p>
          <motion.p
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-[16px] text-center font-publica_sans_l md:w-[65%] lg:w-[45%] mx-auto"
          >
            Care, your way — home or virtual. Personalized, flexible, and
            compassionate.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Section1;

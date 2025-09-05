import Section1BG from "assets/images/faq-sec-1-bg.png";
import { motion } from "framer-motion";
import { fadeIn } from "variants.js";

const Section1 = () => {
  // const navigate = useNavigate();
  // const isMobile = window.innerWidth < 768;

  return (
    <div className="pt-[7rem]">
      <div
        className="bg-brand_secondary"
        style={{
          width: "100%",
          backgroundImage: `url(${Section1BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="py-[9rem]">
          <div className="max-w-[1300px] lg:w-[95%] w-[90%] m-auto">
            <motion.p
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-[44px] leading-[34px] font-publica_sans_r mb-3 text-white"
            >
              Frequently Asked Questions
            </motion.p>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-[16px] font-publica_sans_l text-[#FFFFFF99] w-[35%]"
            >
              Browse through our FAQs to find quick answers to common queries or
              reach out for more information.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;

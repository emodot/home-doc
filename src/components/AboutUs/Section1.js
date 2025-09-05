import Section1BG from "assets/images/about-sec-1-bg.jpg";
import { motion } from "framer-motion";
import { fadeIn } from "variants.js";

const Section1 = () => {
  const isMobile = window.innerWidth < 768;
  return (
    <div className="">
      <div className="max-w-[1300px] lg:w-[95%] w-[90%] m-auto lg:pt-[13rem] pt-[11rem]">
        <motion.p
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-[16px] font-publica_sans_l text-brand_primary mb-4"
        >
          About Us
        </motion.p>
        <div className="grid grid-cols-2 gap-[1rem] mb-[2rem]">
          <motion.h1
            className="font-publica_sans_r lg:text-[45px] text-[32px] lg:leading-[52px] leading-[40px] lg:w-[90%] w-full lg:mb-6 mb-4"
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Caring for the Ones Who Once Cared for Us
          </motion.h1>
          <motion.p
            className="font-publica_sans_l lg:text-16 text-[14px] lg:leading-[24px] leading-[20px] mb-6 lg:w-[80%] w-full"
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            At HomeDoc, we believe that aging should come with dignity, not
            difficulty. Our mission is simple: to make high-quality elderly care
            accessible, personalized, and delivered right where it matters most
            — at home.
          </motion.p>
        </div>
        <motion.div
          variants={fadeIn("", 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="lg:h-[30rem] h-[15rem] rounded-[20px]"
          style={{
            // height: "100%",
            width: "100%",
            backgroundImage: `url(${isMobile ? Section1BG : Section1BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></motion.div>
        <div className="mt-[4rem]">
          <motion.h1
            className="font-publica_sans_r lg:text-[32px] text-[24px] lg:leading-[36px] leading-[28px] lg:w-[80%] w-full lg:mb-6 mb-4"
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Founded by a team of healthcare professionals and caregivers who
            witnessed the gaps in eldercare firsthand, HomeDoc was created to
            offer families a better way to support their aging loved ones.
          </motion.h1>
          <motion.p
            className="font-publica_sans_l lg:text-16 text-[14px] lg:leading-[24px] leading-[20px] lg:w-[67%] w-full"
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            We bring together medical expertise, compassion, and technology to
            make home-based healthcare seamless and stress-free. We understand
            the trust it takes to invite someone into your home. That’s why
            every HomeDoc professional is selected with care, trained to high
            standards, and supported by a strong clinical governance framework.
            We don’t just meet expectations — we aim to exceed them.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Section1;

import Section4BG from "assets/images/home-sec-4-bg.png";
import { ReactComponent as Benefit1 } from "assets/icons/benefit-1.svg";
import { ReactComponent as Benefit2 } from "assets/icons/benefit-2.svg";
import { ReactComponent as Benefit3 } from "assets/icons/benefit-3.svg";
import { ReactComponent as Benefit4 } from "assets/icons/benefit-4.svg";
import Button from "components/Inputs/Button";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { fadeIn } from "variants.js";
import GetRightCare from "components/GetRightCare";

const Section4 = () => {
  const navigate = useNavigate();
  // const isMobile = window.innerWidth < 768;

  const howItWorks = [
    {
      no: "1",
      title: "Place a Request",
      text: "Tell us about your loved one’s needs — whether it’s companionship, post-hospital care, or daily support.",
    },
    {
      no: "2",
      title: "Choose a Care Plan",
      text: "Select a flexible plan that fits your schedule and budget. All payments are secure and transparent.",
    },
    {
      no: "3",
      title: "Choose a Care Plan",
      text: "Our care team will contact you to confirm details, answer questions, and match you with the right caregiver.",
    },
  ];

  const benefits = [
    {
      icon: <Benefit1 />,
      text: "Families caring for aging parents or grandparents",
    },
    {
      icon: <Benefit2 />,
      text: "Adults planning ahead for eldercare needs",
    },
    {
      icon: <Benefit3 />,
      text: "Seniors living alone who need extra support",
    },
    {
      icon: <Benefit4 />,
      text: "Patients needing post-hospital recovery at home",
    },
  ];

  return (
    <div
      className="pb-[5rem]"
      style={{
        width: "100%",
        backgroundImage: `url(${Section4BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-[1300px] lg:w-[95%] w-[90%] m-auto pt-[5rem] pb-[3rem]">
        <div className="mt-[-20rem] bg-white rounded-[20px] p-[70px] mb-[3rem] shadow-lg">
          <div className="lg:flex justify-between items-center">
            <div className="w-[60%]">
              <motion.h1
                className="font-publica_sans_r text-[14px] lg:text-[16px] lg:leading-[18px] leading-[16px] text-[#539E9C] mb-4"
                variants={fadeIn("up", 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                How it works
              </motion.h1>
              <motion.p
                className="font-publica_sans_r text-[32px] leading-[34px] mb-[4rem]"
                variants={fadeIn("up", 0.4)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                Getting started is easy. Just three steps to trusted care for
                your loved one.
              </motion.p>
            </div>
            <motion.div
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
            </motion.div>
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-[5rem]">
            {howItWorks.map((item, index) => (
              <motion.div
                variants={fadeIn("", 0.8 + index * 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                key={index}
              >
                <p className="text-[100px] font-publica_sans_m bg-gradient-to-b from-[#539E9C] to-[#539E9C00] text-transparent bg-clip-text">
                  {item.no}
                </p>
                <p className="text-[20px] font-publica_sans_m mb-3">
                  {item.title}
                </p>
                <p className="text-[16px] font-publica_sans_l">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-[8rem] mb-[4rem]">
          <p className="text-[32px] text-center font-publica_sans_r mb-1">
            Who can benefit from HomeDoc.
          </p>
          <p className="text-[16px] text-center font-publica_sans_l w-[47%] mx-auto">
            Growing old should come with dignity and support — not loneliness or
            stress. HomeDoc connects your loved ones with trusted caregivers
            right at home.
          </p>
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-[5rem] mt-[5rem]">
            {benefits.map((item, index) => (
              <motion.div
                variants={fadeIn("", 0.2 + index * 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col items-center"
                key={index}
              >
                {item.icon}
                <p className="text-[16px] text-center font-publica_sans_l mt-3 w-[80%] mx-auto">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <GetRightCare />
    </div>
  );
};

export default Section4;

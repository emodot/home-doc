import Section1A from "assets/images/wwd-sec-1a.jpg";
import Section1B from "assets/images/wwd-sec-1b.jpg";
import Section1C from "assets/images/wwd-sec-1c.jpg";
import Section1D from "assets/images/wwd-sec-1d.jpg";
import Section1E from "assets/images/wwd-sec-1e.jpg";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { fadeIn } from "variants.js";
import GetRightCare from "components/GetRightCare";

const Section1 = () => {
  const navigate = useNavigate();
  // const isMobile = window.innerWidth < 768;

const whatWeDo = [
  {
    image: Section1A,
    title: "In-Home Elderly Care",
    subTitle:
      "Hands-on support from certified caregivers in the comfort of your home.",
    text: "We help with daily activities, recovery after hospital stays, companionship, and specialized eldercare — all designed to keep your loved one safe, well, and independent at home.",
    listTitle: "Services include:",
    list: [
      "Daily assistance & hygiene support",
      "Companionship and cognitive care",
      "Live-in or part-time caregiver options",
      "Medication reminders and wellness monitoring",
    ],
  },
  {
    image: Section1B,
    title: "Virtual Consultations",
    subTitle: "Expert advice without the travel.",
    text: "Connect with licensed care advisors or health professionals online — perfect for follow-ups, assessments, or urgent questions. All you need is a smartphone or computer.",
    listTitle: "Ideal For:",
    list: [
      "First-time care planning",
      "Post-discharge check-ins",
      "Health concerns that don’t require in-person visits",
      "Managing prescriptions or follow-up plans",
    ],
  },
  {
    image: Section1C,
    title: "Medication Drop-Off",
    subTitle: "Right meds, right time — delivered with care.",
    text: "We handle the hassle of refills and ensure your loved one never misses a dose. Medication is picked up and delivered directly to their door, on schedule.",
    listTitle: "Medication Drop-Off Options:",
    list: [
      "Monthly (Basic Plan)",
      "Bi-monthly (Standard Plan)",
      "Weekly (Premium Plan)",
    ],
  },
  {
    image: Section1D,
    title: "Health Monitoring & Preliminary Checks",
    subTitle: "Health Monitoring & Preliminary Checks",
    text: "We offer routine vitals checks, early detection screenings, and physical assessments — right from home.",
    listTitle: "Services include:",
    list: [
      "Blood pressure, sugar, and vitals tracking",
      "Mobility & mental alertness reviews",
      "Onboarding full-body checks",
      "Periodic wellness reports",
    ],
  },
  {
    image: Section1E,
    title: "Companionship Services",
    subTitle: "Emotional wellness matters, too.",
    text: "Our caregivers are more than helpers — they’re trained companions who engage, listen, and provide the presence your loved one needs.",
    listTitle: "Great for:",
    list: [
      "Seniors living alone",
      "Those recovering from loss or illness",
      "Families abroad who want peace of mind",
    ],
  },
];

  return (
    <div
      className="pb-[5rem]"
      // style={{
      //   width: "100%",
      //   backgroundImage: `url(${Section1BG})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      <div className="pt-[13rem] pb-[3rem]">
        <div className="max-w-[1300px] lg:w-[95%] w-[90%] m-auto">
          <motion.p
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-[16px] text-center font-publica_sans_l text-brand_primary mb-2 mx-auto"
          >
            What We Do.
          </motion.p>
          <motion.p
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-[32px] leading-[34px] w-[43%] mx-auto text-center font-publica_sans_r mb-3"
          >
            Healthcare that meets you where you are — at home or online.
          </motion.p>
          <motion.p
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-[16px] text-center font-publica_sans_l w-[45%] mx-auto mb-[5rem]"
          >
            At HomeDoc, we bring compassionate, professional care directly to
            your doorstep or screen. Whether you’re planning ahead or need
            support now, we make eldercare simple, personal, and dignified.
          </motion.p>
        </div>
        {whatWeDo.map((item, index) => (
          <div
            className={`px-[50px] py-[7rem] ${
              index % 2 !== 0 ? "bg-[#F8F8F0]" : ""
            }`}
            key={index}
          >
            <div
              className={`max-w-[1300px] lg:w-[95%] w-[90%] m-auto flex justify-between items-center ${
                index % 2 !== 0 ? "flex-row-reverse" : ""
              }`}
              // dir="rtl"
            >
              <motion.div
                variants={fadeIn("", 0.4)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="basis-[45%]"
              >
                <img
                  src={item.image}
                  alt="doctor"
                  className="h-[30rem] rounded-[20px] "
                />
              </motion.div>
              <motion.div
                variants={fadeIn("", 0.6)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="px-[45px] basis-[50%]"
              >
                <p className="font-publica_sans_r text-[24px] mb-[15px]">
                  {item.title}
                </p>
                <p className="font-publica_sans_r text-[16px] mb-[5px] leading-[18px]">
                  {item.subTitle}
                </p>
                <p className="font-publica_sans_l text-[16px]">{item.text}</p>
                <p className="font-publica_sans_r text-[16px] mb-[10px] mt-[25px]">
                  {item.listTitle}
                </p>
                {item.list &&
                  Array.isArray(item.list) &&
                  item.list.length > 0 && (
                    <ul className="list-disc pl-6 mt-2">
                      {item.list.map((listItem, idx) => (
                        <li
                          key={idx}
                          className="font-publica_sans_l text-[16px] mb-1 leading-[18px]"
                        >
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  )}
              </motion.div>
            </div>
          </div>
        ))}
      </div>
      <GetRightCare />
    </div>
  );
};

export default Section1;

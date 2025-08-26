import { ReactComponent as Twitter } from "assets/icons/twitter.svg";
import { ReactComponent as Instagram } from "assets/icons/instagram.svg";
import { ReactComponent as LinkedIn } from "assets/icons/linkedin.svg";
import Logo from "assets/images/logo-main.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "variants.js";

const Footer = ({ submitEmail }) => {
  const navigate = useNavigate();



    const quickLink = [
      {
        name: "Plans and Pricing",
        link: "/solutions",
      },
      {
        name: "About us",
        link: "/about-us",
      },
      {
        name: "Contact us",
        link: "/contact-us",
      },
    ];

    const getInTouch = [
      {
        name: "FAQs",
        link: "/faqs",
      },
      {
        name: "Contact us",
        link: "/contact-us",
      },
    ];

  return (
    <div className="bg-[#F0F0F0]">
      <div className="max-w-[1300px] lg:w-[95%] w-[90%] m-auto">
        <div className="lg:pt-[7rem] pt-[4rem] pb-[3rem] lg:grid block grid-cols-2">
          <div>
            <img
              src={Logo}
              alt="logo"
              className="w-[9rem] lg:w-[10.5rem] cursor-pointer mb-6"
              onClick={() => {
                navigate("/");
              }}
            />
            <p className="font-publica_sans_l text-[12px] text-[#001B2BB2] leading-[16px] mb-6 md:w-[80%]">
              Growing old should come with dignity and support — not loneliness
              or stress. HomeDoc connects your loved ones with trusted
              caregivers right at home.
            </p>
          </div>
          <hr className="lg:hidden block border-b border-b-[#a0a0a01b] my-[3rem]" />

          <div className="w-full flex justify-between flex-wrap">
            <motion.div
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              className="mb-[3rem]"
            >
              <h6 className="text-[14px] font-publica_sans_m mb-[15px]">
                Quick Link
              </h6>
              {quickLink.map((item, index) => (
                <p
                  key={index}
                  className="text-[14px] font-publica_sans_l mb-[15px] cursor-pointer"
                  onClick={() => {
                    navigate(item.link);
                  }}
                >
                  {item.name}
                </p>
              ))}
            </motion.div>
            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              className="mb-[3rem]"
            >
              <h6 className="text-[14px] font-publica_sans_m mb-[15px]">
                Get in Touch
              </h6>
              {getInTouch.map((item, index) => (
                <p
                  key={index}
                  className="text-[14px] font-publica_sans_l mb-[15px] cursor-pointer"
                  onClick={() => {
                    navigate(item.link);
                  }}
                >
                  {item.name}
                </p>
              ))}
            </motion.div>
            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true }}
              className="basis-[47%] md:basis-[30%] lg:basis-[20%] mb-[3rem]"
            >
              <h6 className="text-[14px] font-publica_sans_m mb-[15px]">
                Follow us on
              </h6>
              <div className="flex items-center gap-4">
                <Twitter />
                <Instagram />
                <LinkedIn />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

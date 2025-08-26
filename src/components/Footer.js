// import { ReactComponent as Twitter } from "assets/icons/twitter.svg";
// import { ReactComponent as Instagram } from "assets/icons/instagram.svg";
// import { ReactComponent as LinkedIn } from "assets/icons/linkedin.svg";
import Button from "components/Inputs/Button";
import Logo from "assets/images/logo-main.png";
import { useNavigate } from "react-router-dom";
import Input from "./Inputs/Input";
import { useState } from "react";
// import { motion } from "framer-motion";
// import { fadeIn } from "variants.js";

const Footer = ({ submitEmail }) => {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");

  const handleChange = (e) => {
    setEmailAddress(e.target.value);
  };

  const menuOptions = [
    {
      name: "Projects",
      link: "/projects",
    },
    {
      name: "Services",
      link: "/services",
    },
    {
      name: "About us",
      link: "/about-us",
    },
    // {
    //   name: "Blog",
    //   link: "/blog",
    // },
  ];

  return (
    <div className="bg-[#F0F0F0]">
      <div className="max-w-[1300px] lg:w-[95%] w-[90%] m-auto">
        <div className="lg:pt-[7rem] pt-[4rem] pb-[6rem] lg:grid block grid-cols-2">
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
          <div className="lg:pl-[6rem]">
            <p className="font-obviously_m lg:text-[18px] text-[14px] leading-[24px] lg:mb-6 mb-2 text-brand_primary">
              Want to stay updated with what’s happening at Compass Survey?
            </p>
            <p className="font-publica_sans_r text-[12px] leading-[24px] mb-4">
              Join our newsletter and be the first to know about our upcoming
              updates.
            </p>
            <Input
              placeholder="Email Address"
              type="email"
              id="emailAddress"
              name="emailAddress"
              // readOnly={loading}
              value={emailAddress}
              onChange={handleChange}
              showError={false}
            />
            <div className="flex gap-4">
              <Button
                name={"Subscribe"}
                theme={"secondary"}
                arrowIcon={true}
                onClick={submitEmail}
              />
            </div>
          </div>
        </div>
        <div className="border-t border-brand_primary py-[2rem] flex flex-col lg:flex-row justify-between items-center">
          <div className="flex justify-between items-center gap-4 mb-2 lg:mb-0">
            {menuOptions.map((item, index) => (
              <>
                <p
                  className="font-publica_sans_r text-[12px] leading-[24px] text-brand_primary cursor-pointer"
                  onClick={() => {
                    navigate(item.link);
                  }}
                >
                  {item.name}
                </p>
                {index !== menuOptions.length - 1 && (
                  <div className="rounded-full bg-[#6E6E6E] w-[6px] h-[6px]"></div>
                )}
              </>
            ))}
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-4 justify-between lg:justify-start">
            <p className="font-publica_sans_r text-[12px] leading-[24px] text-brand_primary">
              All rights reserved &copy; 2025
            </p>
            {/* <div className="flex items-center gap-4">
              <Twitter />
              <Instagram />
              <LinkedIn />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

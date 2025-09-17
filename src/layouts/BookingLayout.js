import Section1BG from "assets/images/booking-layout-bg.jpg";
import Spinner from "../components/Spinner";
import Logo from "assets/images/logo-main.png";
import { Suspense, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

export default function BookingLayout() {
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const menuOptions = [
    {
      name: "Terms and Conditions Applied",
      link: "/terms-and-conditions",
    },
    {
      name: "FAQs",
      link: "/faq",
    },
    {
      name: "Need Help?",
      link: "/contact-us",
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }
  }, [isSuccess]);

  return (
    <div className="relative bg-[#FFFFFF] h-[100vh]">
      <Suspense fallback={<Spinner />}>
        <div className="flex w-full h-full fixed">
          <div
            className="basis-[60%] relative hidden lg:block"
            style={{
              width: "100%",
              backgroundImage: `url(${Section1BG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <p className="absolute bottom-[5rem] left-[7rem] text-white text-[32px] leading-[36px] font-publica_sans_r">
              Bringing Quality Elderly <br />
              Care to Your Doorstep
            </p>
          </div>
          <div className="lg:basis-[40%] basis-[100%] lgm:px-[4rem] px-[2rem] lg:pt-[5rem] pt-[3rem] overflow-auto">
            <div className="pb-[2rem]">
              <img
                src={Logo}
                alt="logo"
                className="w-[9rem] lg:w-[9.5rem] cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>
            <div className="mb-[4rem]">
              <Outlet />
            </div>
            <div className="absolute bottom-0 w-full bg-white py-4 flex items-center gap-4 lg:mb-0">
              {menuOptions.map((item, index) => (
                <div key={index}>
                  <p
                    className="font-publica_sans_l lg:text-[14px] text-[12px] leading-[24px] text-[#000000B2] cursor-pointer"
                    onClick={() => {
                      navigate(item.link);
                    }}
                  >
                    {item.name}
                  </p>
                  {index !== menuOptions.length - 1 && (
                    <div className="rounded-full bg-[#6E6E6E] w-[6px] h-[6px]"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

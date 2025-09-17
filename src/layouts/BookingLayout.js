import Section1BG from "assets/images/booking-layout-bg.jpg";
import Spinner from "../components/Spinner";
import Logo from "assets/images/logo-main.png";
import {
  // useState,
  createContext,
  Suspense,
  useContext,
  useEffect,
  useState,
  // useEffect,
} from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export default function BookingLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }
  }, [isSuccess]);

  return (
    <ModalContext.Provider
      value={{
        toggleMenu,
        closeMenu,
      }}
    >
      <div className="relative bg-[#FFFFFF] h-[100vh]">
        <Suspense fallback={<Spinner />}>
          <div className="flex w-full h-full fixed">
            <div
              className="basis-[60%] relative"
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
            <div className="basis-[40%] px-[4rem] pt-[5rem] overflow-auto">
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
              <div className="">
                <Outlet />
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </ModalContext.Provider>
  );
}

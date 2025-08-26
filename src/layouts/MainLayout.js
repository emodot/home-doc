import Footer from "components/Footer";
import Header from "../components/Header";
import SuccessComponent from "components/SuccessComponent";
import MobileMenu from "components/MobileMenu";
import Spinner from "../components/Spinner";
import {
  // useState,
  createContext,
  Suspense,
  useContext,
  useEffect,
  useState,
  // useEffect,
} from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";


const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export default function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
  }, [ isMenuOpen]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }
  }, [isSuccess]);

  return (
    <ModalContext.Provider
      value={
        {
          toggleMenu,
          closeMenu,
        }
      }
    >
      <div className="relative bg-[#FFFFFF] h-[100vh]">
        <Suspense fallback={<Spinner />}>
          <Header />
          {isSuccess ? <SuccessComponent /> : <Outlet />}
          <Footer
            submitEmail={() => {
              setIsSuccess(true);
              window.scrollTo(0, 0);
            }}
          />
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.4 }}
                style={{
                  position: "fixed",
                  top: 0,
                  right: 0,
                  width: "100vw",
                  height: "100vh",
                  zIndex: 50,
                }}
              >
                <MobileMenu />
              </motion.div>
            )}
          </AnimatePresence>
        </Suspense>
      </div>
    </ModalContext.Provider>
  );
}

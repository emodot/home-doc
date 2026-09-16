import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactComponent as CloseMenu } from "assets/icons/close-menu.svg";

const SideModal = ({ open, title, subtitle, onClose, children, footer }) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[520px] bg-white z-50 flex flex-col"
          >
            <div className="flex justify-between items-start px-6 py-5 border-b border-neutral_stroke_1">
              <div>
                <p className="font-publica_sans_m text-18 text-brand_secondary">{title}</p>
                {subtitle && (
                  <p className="font-publica_sans_l text-12 text-border_stroke_2 mt-1">{subtitle}</p>
                )}
              </div>
              <button onClick={onClose} className="w-[18px] mt-1" aria-label="Close">
                <CloseMenu />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

            {footer && (
              <div className="border-t border-neutral_stroke_1 px-6 py-4">{footer}</div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideModal;

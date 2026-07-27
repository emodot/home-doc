import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ReactComponent as CloseMenu } from "assets/icons/close-menu.svg";
import { ReactComponent as Check1 } from "assets/icons/pricing-check-1.svg";

export default function PlanFeaturesModal({ plan, onClose }) {
  useEffect(() => {
    if (plan) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [plan]);

  return (
    <AnimatePresence>
      {plan && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-[16px] font-publica_sans_r text-black flex items-center gap-2">
                  {plan.planIcon}
                  {plan.name}
                </h3>
                <p className="mt-2 text-[30px] font-publica_sans_m text-black">
                  {plan.price}
                  <span className="ml-[10px] text-[16px] font-publica_sans_l text-[#000000B2]">
                    {plan.period}
                  </span>
                </p>
              </div>
              <div className="w-[20px] cursor-pointer shrink-0">
                <CloseMenu onClick={onClose} />
              </div>
            </div>
            <ul className="space-y-5">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-[1.5rem]">
                    <Check1 />
                  </div>
                  <span className="text-[16px] font-publica_sans_l text-black">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

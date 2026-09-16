
import { ReactComponent as Arrow } from "assets/icons/services-arrow-right.svg";
import { ReactComponent as OtherPlan } from "assets/icons/other-plan.svg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "variants.js";
import { usePricing } from "store/PricingProvider";
import { formatNaira } from "utils/formatMoney";

export default function OneTimeServices() {
  const navigate = useNavigate();
  const { services } = usePricing();

  if (!services || services.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#F9F9F8] py-[6rem]">
      <div className="max-w-[1300px] lg:w-[95%] w-[90%] m-auto">
        <motion.p
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-[24px] leading-[34px] font-publica_sans_r mb-3"
        >
          One-Time Services
        </motion.p>
        <motion.p
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-[16px] font-publica_sans_l"
        >
          On-demand care for check-ups, visits, or medication drop-offs — no
          plan needed.
        </motion.p>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mt-[3rem]">
          {services.map((item, index) => (
            <motion.div
              variants={fadeIn("", 0.2 + index * 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-white p-5 rounded-[20px]"
              key={item.id}
            >
              <p
                className={`text-[16px] leading-[18px] font-publica_sans_l flex items-center gap-2`}
              >
                <OtherPlan />
                {item.name}
              </p>
              <div className="flex justify-between items-center mt-6">
                <p className="text-[24px] font-publica_sans_r">
                  {formatNaira(item.priceKobo)}
                </p>
                <Arrow onClick={() => navigate("/request")} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { ReactComponent as Check1 } from "assets/icons/pricing-check-1.svg";
import { ReactComponent as Check2 } from "assets/icons/pricing-check-2.svg";
import { ReactComponent as OtherPlan } from "assets/icons/other-plan.svg";
import { ReactComponent as PremiumPlan } from "assets/icons/premium-plan.svg";
import Button from "components/Inputs/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "variants.js";

const plans = [
  {
    name: "Starter Plan",
    planIcon: <OtherPlan />,
    price: "₦45,000",
    period: "/month",
    bestFor: "Light support and check-ins",
    features: [
      "1 home visit/week (2 hours per visit)",
      "2 virtual consultations/month",
      "Preliminary full-body check (first month only)",
      "Medication drop-off (1x/month, within major cities)",
      "Prescription coordination",
    ],
    button: "Get Started",
    highlight: false,
  },
  {
    name: "Premium Plan",
    planIcon: <PremiumPlan />,
    price: "₦195,000",
    period: "/month",
    bestFor: "Full-time elderly care or live-in support",
    features: [
      "Daily home visits or 24/7 live-in care (based on preference)",
      "Unlimited virtual consultations",
      "Bi-weekly vitals & wellness checks",
      "Specialized elder care (dementia, stroke recovery, etc.)",
      "Nutrition & lifestyle advisory",
      "Dedicated care manager & support line",
      "Medication drop-off (Weekly, with refill tracking)",
      "Emergency care coordination",
    ],
    button: "Get Started",
    highlight: true, // This one is the "Best Plan"
  },
  {
    name: "Standard Plan",
    planIcon: <OtherPlan />,
    price: "₦95,000",
    period: "/month",
    bestFor: "Frequent care or post-surgery recovery",
    features: [
      "3 home visits/week (3-hour sessions)",
      "4 virtual consultations/month",
      "Monthly vitals & health monitoring",
      "Light companionship & daily living assistance",
      "Medication drop-off (2x/month, scheduled)",
      "Priority caregiver matching",
    ],
    button: "Get Started",
    highlight: false,
  },
];

export default function PricingPlans() {
  const navigate = useNavigate();
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid gap-6 lg:grid-cols-3">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            className={`rounded-2xl shadow-sm p-[35px] flex flex-col h-fit ${
              plan.highlight
                ? "bg-brand_secondary text-white relative"
                : "bg-[#F9F9F8] text-neutral-900"
            }`}
            variants={fadeIn("up", 0.2 + idx * 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div>
              <div className="border-b-[0.5px] border-b-[#DFE2E2] pb-[20px] mb-[10px]">
                <div className="flex justify-between items-center">
                  <h3
                    className={`text-[16px] font-publica_sans_r ${
                      plan.highlight ? "text-white" : "text-black"
                    } flex items-center gap-2`}
                  >
                    {plan.planIcon}
                    {plan.name}
                  </h3>
                  {plan.highlight && (
                    <span className="bg-[#DAFFDD] text-[#3AD848] text-[12px] font-publica_sans_r px-3 py-1 rounded-full">
                      Best Plan
                    </span>
                  )}
                </div>
                <p
                  className={`mt-2 text-[36px] md:text-[30px] lgm:text-[36px] font-publica_sans_m ${
                    plan.highlight ? "text-white" : "text-black"
                  }`}
                >
                  {plan.price}
                  <span
                    className={`ml-[10px] text-[16px] font-publica_sans_l ${
                      plan.highlight ? "text-[#FFFFFFB2]" : "text-[#000000B2]"
                    }`}
                  >
                    {plan.period}
                  </span>
                </p>
                <p
                  className={`mt-1 lgm:text-[16px] text-[14px] font-publica_sans_l ${
                    plan.highlight ? "text-[#FFFFFFB2]" : "text-[#000000B2]"
                  } w-[80%]`}
                >
                  Best for: {plan.bestFor}
                </p>
              </div>
              <ul className="mt-6 space-y-5">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-[1.5rem]">
                      {plan.highlight ? (
                        <Check2 />
                      ) : (
                        <Check1 />
                      )}
                    </div>
                    <span
                      className={`text-[16px] font-publica_sans_l ${
                        plan.highlight ? "text-white" : "text-black"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Button
              name={"Get Started"}
              theme={"primary"}
              className={"w-full mt-[40px]"}
              onClick={() => {
                navigate("/contact-us");
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

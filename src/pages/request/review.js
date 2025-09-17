import SEO from "../../components/SEO";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "variants.js";
import { ReactComponent as Edit } from "assets/icons/edit-icon-orange.svg";
import Button from "components/Inputs/Button";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Check1 } from "assets/icons/pricing-check-1.svg";
import { ReactComponent as Check2 } from "assets/icons/pricing-check-2.svg";
import { pricingPlans } from "mocks/options";
import { get4rmLocal } from "store/localStore";
import ProfileInfo from "components/Request/ProfileInfo";

// Paystack inline script loader
const loadPaystackScript = () => {
  return new Promise((resolve) => {
    if (window.PaystackPop) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const Review = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const fromStore = get4rmLocal("requestData");
  const [loading, setLoading] = useState(false);
  const [payError, setPayError] = useState(null);

  // Find selected plan details
  const selectedPlan = pricingPlans.find((plan) => plan.name === fromStore?.plan);

  // Helper to extract price as number (assuming price is like "₦20,000")
  const getPlanAmount = (plan) => {
    if (!plan) return 0;
    // Remove non-numeric except dot and comma, then parse
    const num = plan.price.replace(/[^\d.,]/g, "").replace(/,/g, "");
    return parseInt(num, 10) * 100; // Paystack expects kobo
  };

  // Get user email for payment
  const getUserEmail = () => {
    // Try to get from personalDetails or personalInfo
    return (
      fromStore?.personalDetails?.email ||
      fromStore?.personalInfo?.email ||
      fromStore?.email ||
      ""
    );
  };

  // Paystack public key (replace with your real key in production)
  const PAYSTACK_KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || "pk_test_5056062a30c031642ab5c1bce2c9b3879c1953ea";
  console.log("PAYSTACK_KEY", PAYSTACK_KEY);
  

  const handlePaystackPayment = async () => {
    setPayError(null);
    setLoading(true);
    const loaded = await loadPaystackScript();
    if (!loaded) {
      setPayError("Unable to load payment gateway. Please try again.");
      setLoading(false);
      return;
    }

    const amount = getPlanAmount(selectedPlan);
    const email = getUserEmail();

    if (!email) {
      setPayError("No email found for payment. Please update your details.");
      setLoading(false);
      return;
    }

    if (!amount || isNaN(amount)) {
      setPayError("Invalid plan amount. Please select a valid plan.");
      setLoading(false);
      return;
    }

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_KEY,
      email: email,
      amount: amount,
      currency: "NGN",
      ref: "HDOC_" + Math.floor(Math.random() * 1000000000 + 1),
      metadata: {
        custom_fields: [
          {
            display_name: "Plan",
            variable_name: "plan",
            value: selectedPlan?.name || "",
          },
        ],
      },
      callback: function (response) {
        setLoading(false);
        // Payment successful, you can send response.reference to your backend for verification
        // For now, just navigate to a success page or show a message
        navigate("/request/payment-success", { state: { reference: response.reference } });
      },
      onClose: function () {
        setLoading(false);
        // Optionally show a message or do nothing
      },
    });

    handler.openIframe();
  };

  return (
    <>
      <SEO
        title="Request Caregiver - Home Doc"
        description="Home Doc provides compassionate, reliable, and personalized elderly care services that promote comfort, independence, and peace of mind"
        name="Home Doc - Caring for the Ones Who Once Cared for Us"
        type="website"
      />
      <motion.div
        variants={fadeIn("", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="lgm:w-[90%] w-full"
      >
        <div>
          <div>
            <p className="text-[24px] leading-[24px] font-publica_sans_r mb-4">
              Review your request
            </p>
          </div>
          <div className="mt-[4rem]">
            <div className="flex justify-between items-center">
              <p
                variants={fadeIn("up", 0.6)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-[16px] leading-[20px] font-publica_sans_l"
              >
                Selected Plan
              </p>
              <div
                className="flex space-x-3 items-center cursor-pointer"
                onClick={() => {
                  fromStore.requestFor === "For myself"
                    ? navigate("/request/personal?selectPlan=true")
                    : navigate("/request/elderly-one?selectPlan=true");
                }}
              >
                <p className="font-publica_sans_r text-[14px] text-brand_primary">
                  Change Plan
                </p>
                <Edit />
              </div>
            </div>
            <div className="mt-8 mb-[4rem]">
              {pricingPlans
                .filter((plan) => plan.name === fromStore?.plan)
                .map((plan, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl shadow-sm p-[35px] flex flex-col h-fit ${
                      plan.highlight
                        ? "bg-brand_secondary text-white relative"
                        : "bg-[#F9F9F8] text-neutral-900"
                    }`}
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
                              plan.highlight
                                ? "text-[#FFFFFFB2]"
                                : "text-[#000000B2]"
                            }`}
                          >
                            {plan.period}
                          </span>
                        </p>
                        <p
                          className={`mt-1 lgm:text-[16px] text-[14px] font-publica_sans_l ${
                            plan.highlight
                              ? "text-[#FFFFFFB2]"
                              : "text-[#000000B2]"
                          } w-[80%]`}
                        >
                          Best for: {plan.bestFor}
                        </p>
                      </div>
                      <ul className="mt-6 space-y-5">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-4">
                            <div className="w-[1.5rem]">
                              {plan.highlight ? <Check2 /> : <Check1 />}
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
                  </div>
                ))}
            </div>
            <ProfileInfo data={fromStore} />

            <div className="mt-[5rem] w-full flex space-x-4 mb-[2rem]">
              <div>
                <Button
                  name={"Back"}
                  theme={"transparent"}
                  textClassName="sm:text-14 !text-12"
                  className="!w-[100px] xs:w-auto sm:mb-6 mb-2"
                  onClick={() => window.history.back()}
                />
              </div>
              <div className="w-full">
                <Button
                  name={loading ? "Processing..." : "Proceed to Payment"}
                  theme={"primary"}
                  textClassName="sm:text-14 !text-12"
                  className="!w-full xs:w-auto sm:mb-6 mb-2"
                  onClick={handlePaystackPayment}
                  disabled={loading}
                />
                {payError && (
                  <div className="text-red-500 text-[14px] mt-2">{payError}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Review;

import { useState } from "react";
import { ReactComponent as Plus } from "assets/icons/plus-sign.svg";
import { ReactComponent as Minus } from "assets/icons/minus-sign.svg";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "variants.js";

const faqData = [
  {
    section: "About HomeDoc Services",
    description:
      "Learn what HomeDoc offers, how it works, and the kind of care you can expect for yourself or a loved one.",
    items: [
      {
        question: "What is HomeDoc?",
        answer:
          "HomeDoc is a home-based and virtual healthcare service designed to support the health and well-being of elderly individuals. We offer in-home caregiving, doctor visits, teleconsultations, medication delivery, and lab investigations — all coordinated for your convenience.",
      },
      {
        question: "What types of care do you offer?",
        answer:
          "We provide in-home caregiving, teleconsultations, doctor visits, medication delivery, and lab tests.",
      },
      {
        question: "Do you offer emergency services?",
        answer:
          "At the moment, we do not handle emergencies. Please contact local emergency services if urgent care is required.",
      },
    ],
  },
  {
    section: "Getting Started",
    description:
      "Everything you need to know about placing a caregiver request and how we guide you through the process.",
    items: [
      {
        question: "How do I request a caregiver?",
        answer:
          "You can fill out a simple form on our website — either for yourself or for a loved one. We’ll review your needs, help you choose the right care plan, and match you with a suitable caregiver.",
      },
      {
        question: "Can I request care for someone else?",
        answer:
          "Yes, you can request care on behalf of a family member or loved one.",
      },
      {
        question: "What happens after I submit a request?",
        answer:
          "Our team will review your submission and contact you to finalize your care plan and caregiver assignment.",
      },
    ],
  },
  {
    section: "Plans & Payment",
    description:
      "Find details about our care plans, pricing, payment methods, and cancellation or refund policies.",
    items: [
      {
        question: "What care plans do you offer?",
        answer:
          "We offer flexible subscription plans — Basic, Standard, and Premium — each with different levels of support, visit frequency, and services included.",
      },
      {
        question: "How do I pay for services?",
        answer:
          "We accept debit/credit cards, bank transfers, and mobile payment options.",
      },
      {
        question: "Can I cancel or get a refund?",
        answer:
          "Yes, cancellations and refunds depend on the plan terms. Please contact support for assistance.",
      },
    ],
  },
  {
    section: "Caregiver Quality & Safety",
    description:
      "Understand how we select, train, and assign our caregivers — and what to expect in terms of consistency and quality.",
    items: [
      {
        question: "Are your caregivers trained and verified?",
        answer:
          "Yes. All HomeDoc caregivers are background-checked, professionally trained, and matched based on the care recipient's needs.",
      },
      {
        question: "Will I get the same caregiver every time?",
        answer:
          "We do our best to assign consistent caregivers for continuity, but changes may occur based on availability.",
      },
      {
        question: "Can I request a different caregiver if needed?",
        answer:
          "Yes, you can request a change if you're not satisfied with your caregiver.",
      },
    ],
  },
  {
    section: "Availability & Access",
    description:
      "Check where HomeDoc services are available and when you can access support or care.",
    items: [
      {
        question: "Where is HomeDoc currently available?",
        answer:
          "We are currently serving Lagos State. More locations are being added — please contact us to confirm availability in your area.",
      },
      {
        question: "What are your service hours?",
        answer:
          "Our caregivers are available from 8am – 8pm daily, with flexible scheduling options.",
      },
    ],
  },
  {
    section: "Privacy & Support",
    description:
      "See how we protect your personal information and how to contact us for help or further questions.",
    items: [
      {
        question: "Is my personal information safe?",
        answer:
          "Yes. We take data privacy seriously and follow strict protocols to protect your information.",
      },
      {
        question: "How can I contact HomeDoc?",
        answer:
          "You can reach us through our website, support email, or customer helpline.",
      },
    ],
  },
];

const answerVariants = {
  hidden: { opacity: 0, height: 0, marginTop: 0, transition: { duration: 0.2 } },
  visible: {
    opacity: 1,
    height: "auto",
    marginTop: "0.5rem",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: { opacity: 0, height: 0, marginTop: 0, transition: { duration: 0.2 } },
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState('0-0');

  const toggle = (index) => {
    console.log(index);
    
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-[1300px] lg:w-[95%] w-[90%] m-auto py-[3rem] sm:py-[4rem] lg:py-[6rem]">
      {faqData.map((section, secIndex) => (
        <motion.div
          key={secIndex}
          className="mb-10 grid grid-cols-5 gap-8"
          variants={fadeIn("up", 0.1 * secIndex)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="col-span-2">
            <h2 className="text-[20px] sm:text-[24px] font-publica_sans_r text-black mb-2">
              {section.section}
            </h2>
            <p className="text-[#00000099] font-publica_sans_l mb-6 w-[85%]">{section.description}</p>
          </div>

          <div className="space-y-4 col-span-3 pl-[20px]">
            {section.items.map((item, qIndex) => {
              const index = `${secIndex}-${qIndex}`;
              const isOpen = openIndex === index;

              return (
                <div key={index} className="border-b border-[#092F6333] pb-4">
                  <button
                    className="flex justify-between items-center w-full text-left py-4"
                    onClick={() => toggle(index)}
                  >
                    <span
                      className={`text-[14px] sm:text-[15px] ${
                        isOpen
                          ? "font-publica_sans_m text-brand_primary"
                          : "font-publica_sans_r text-black"
                      } `}
                    >
                      {item.question}
                    </span>
                    {isOpen ? <Minus /> : <Plus />}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.p
                        key="answer"
                        className="mt-2 text-[14px] sm:text-[15px] font-publica_sans_l text-[#110000] overflow-hidden"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={answerVariants}
                      >
                        {item.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

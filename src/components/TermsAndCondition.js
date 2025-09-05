import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "variants.js";

const sections = [
  { id: "definitions", title: "1. Definitions" },
  { id: "eligibility", title: "2. Eligibility for Use" },
  { id: "nature", title: "3. Nature of Services" },
  { id: "registration", title: "4. Request & Registration Process" },
  { id: "payments", title: "5. Payments, Billing, and Subscription Plans" },
  { id: "cancellations", title: "6. Cancellations, Refunds & Rescheduling" },
  { id: "responsibilities", title: "7. User Responsibilities" },
  { id: "privacy", title: "8. Privacy & Data Protection" },
  { id: "disclaimer", title: "9. Medical Disclaimer" },
  { id: "liability", title: "10. Limitation of Liability" },
  { id: "termination", title: "11. Termination of Use" },
  { id: "modifications", title: "12. Modifications to Terms" },
  { id: "law", title: "13. Governing Law" },
];

export default function TermsAndCondition() {
  return (
    <div className="pt-[3rem]">
      <div className="max-w-[1300px] lg:w-[95%] w-[90%] m-auto py-[3rem] sm:py-[4rem] lg:py-[6rem]">
        <div className="max-w-[1300px] lg:w-[95%] w-[90%] mx-auto mt-[3rem] mb-[5rem]">
          <motion.p
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-[44px] leading-[34px] w-[43%] mx-auto text-center font-publica_sans_r mb-3 text-brand_secondary"
          >
            Terms & Conditions
          </motion.p>
          <motion.p
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-[16px] text-center font-publica_sans_l w-[45%] mx-auto text-brand_secondary"
          >
            Effective Date: 15th July 2025
          </motion.p>
        </div>

        <div className="grid grid-cols-3 gap-[4rem]">
          <aside className="col-span-1 bg-[#F8F8F0] rounded-[20px] p-[2rem] h-fit sticky top-4">
            <h2 className="font-publica_sans_m text-brand_secondary text-[14px] mb-3">
              Contents
            </h2>
            <ul className="space-y-2 text-sm">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="font-publica_sans_l text-brand_secondary text-[14px] hover:text-brand_primary transition"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Content */}
          <main className="col-span-2 space-y-8 text-gray-700 leading-relaxed">
            <section id="definitions">
              <h2 className="text-[16px] font-publica_sans_m text-black mb-2">
                1. Definitions
              </h2>
              <p className="text-[16px] font-publica_sans_l text-black">
                “HomeDoc” refers to the company and all its affiliated
                caregivers, employees, and representatives. “User” refers to any
                individual or entity accessing our services on behalf of
                themselves or someone else. “Care Recipient” refers to the
                individual receiving healthcare or support services. “Services”
                include but are not limited to caregiver assignments, medical
                home visits, virtual consultations, medication delivery, and lab
                investigations.
              </p>
            </section>

            <section id="eligibility">
              <h2 className="text-[16px] font-publica_sans_m text-black mb-2">
                2. Eligibility for Use
              </h2>
              <p className="mb-2 text-[16px] font-publica_sans_l text-black">
                To use HomeDoc’s services, you must:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-[16px] font-publica_sans_l text-black">
                  Be at least 18 years of age; or
                </li>
                <li className="text-[16px] font-publica_sans_l text-black">
                  Be acting with appropriate legal authority on behalf of a care
                  recipient
                </li>
                <li className="text-[16px] font-publica_sans_l text-black">
                  Provide accurate, current, and complete information during
                  registration and request processes
                </li>
              </ul>
              <p className="mt-2 text-[16px] font-publica_sans_l text-black">
                HomeDoc reserves the right to deny services if eligibility is
                not met or if misuse of the platform is suspected.
              </p>
            </section>

            <section id="nature">
              <h2 className="text-[16px] font-publica_sans_m text-black mb-2">
                3. Nature of Services
              </h2>
              <p className="mb-2 text-[16px] font-publica_sans_l text-black">
                HomeDoc’s provides:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-[16px] font-publica_sans_l text-black">
                  Home-based elderly care services by trained caregivers and
                  nurses
                </li>
                <li className="text-[16px] font-publica_sans_l text-black">
                  Periodic home visits from doctors as per selected care plans
                </li>
                <li className="text-[16px] font-publica_sans_l text-black">
                  Telehealth (virtual) consultations with licensed professionals
                </li>
                <li className="text-[16px] font-publica_sans_l text-black">
                  Medicine delivery and lab test facilitation
                </li>
              </ul>
              <p className="mt-2 text-[16px] font-publica_sans_l text-black">
                Important: HomeDoc does not provide emergency or life-critical
                care services. In the case of a medical emergency, call your
                local emergency service provider immediately.
              </p>
            </section>

            <section id="registration">
              <h2 className="text-[16px] font-publica_sans_m text-black mb-2">
                4. Request & Registration Process
              </h2>
              <p className="mb-2 text-[16px] font-publica_sans_l text-black">
                To initiate care services, you must:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-[16px] font-publica_sans_l text-black">
                  Submit a caregiver request form via our platform
                </li>
                <li className="text-[16px] font-publica_sans_l text-black">
                  Provide accurate health and contact information for the care
                  recipient
                </li>
                <li className="text-[16px] font-publica_sans_l text-black">
                  Select a care plan with payment completed through our secure
                  portal
                </li>
              </ul>
              <p className="mt-2 text-[16px] font-publica_sans_l text-black">
                Once your request is submitted, a member of our care
                coordination team will reach out to confirm details, suggest a
                personalized care plan (if applicable), and initiate service
                delivery.
              </p>
            </section>

            <section id="payments">
              <h2 className="text-[16px] font-publica_sans_m text-black mb-2">
                5. Payments, Billing, and Subscription Plans
              </h2>
              <p className="text-[16px] font-publica_sans_l text-black">
                Payments are required to initiate services. You must select a
                care plan, provide health and contact details, and complete
                payment via our secure portal. Services commence after
                confirmation by our coordination team.
              </p>
            </section>

            <section id="cancellations">
              <h2 className="text-[16px] font-publica_sans_m text-black mb-2">
                6. Cancellations, Refunds & Rescheduling
              </h2>
              <p className="mt-2 text-[16px] font-publica_sans_l text-black">
                Service requests may be canceled or rescheduled up to 24 hours
                in advance.
                <br />
                Refunds, if applicable, will be processed based on the unused
                portion of the service plan, minus administrative fees.
                <br />
                Missed appointments without prior notice are non-refundable.
              </p>
            </section>

            <section id="responsibilities">
              <h2 className="text-[16px] font-publica_sans_m text-black mb-2">
                7. User Responsibilities
              </h2>
              <p className="mb-2 text-[16px] font-publica_sans_l text-black">
                As a user, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-[16px] font-publica_sans_l text-black">
                  Provide honest, updated, and complete information
                </li>
                <li className="text-[16px] font-publica_sans_l text-black">
                  Use the services for lawful, personal, or caregiving purposes
                </li>
                <li className="text-[16px] font-publica_sans_l text-black">
                  Not impersonate another person or submit false information
                </li>
                <li className="text-[16px] font-publica_sans_l text-black">
                  Cooperate with assigned caregivers and health professionals
                </li>
              </ul>
              <p className="mt-2 text-[16px] font-publica_sans_l text-black">
                Failure to comply may result in suspension or termination of
                service.
              </p>
            </section>

            <section id="privacy">
              <h2 className="text-[16px] font-publica_sans_m text-black mb-2">
                8. Privacy & Data Protection
              </h2>
              <p className="text-[16px] font-publica_sans_l text-black">
                HomeDoc collects and uses personal and medical information in
                accordance with our [Privacy Policy]. All information provided
                is stored securely and used solely for the purpose of delivering
                and improving healthcare services. <br />
                We comply with local data protection laws and never share
                personal data with third parties for marketing purposes.
              </p>
            </section>

            <section id="disclaimer">
              <h2 className="text-[16px] font-publica_sans_m text-black mb-2">
                9. Medical Disclaimer
              </h2>
              <p className="mb-2 text-[16px] font-publica_sans_l text-black">
                HomeDoc aims to provide high-quality, non-emergency care, but:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-[16px] font-publica_sans_l text-black">
                  We do not offer hospital-level treatment or emergency response
                </li>
                <li className="text-[16px] font-publica_sans_l text-black">
                  Information provided on the website does not substitute
                  medical advice
                </li>
                <li className="text-[16px] font-publica_sans_l text-black">
                  You should consult your physician before starting or stopping
                  any treatment
                </li>
              </ul>
            </section>

            <section id="liability">
              <h2 className="text-[16px] font-publica_sans_m text-black mb-2">
                10. Limitation of Liability
              </h2>
              <p className="mb-2 text-[16px] font-publica_sans_l text-black">
                HomeDoc is not responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-[16px] font-publica_sans_l text-black">
                  Any injury, harm, or medical condition resulting from
                  incomplete or inaccurate information provided by the user
                </li>
                <li className="text-[16px] font-publica_sans_l text-black">
                  Service interruptions due to events beyond our control (e.g.,
                  force majeure, internet outages)
                </li>
                <li className="text-[16px] font-publica_sans_l text-black">
                  The conduct of third-party partners (labs, pharmacies) unless
                  negligence is proven
                </li>
              </ul>
              <p className="mt-2 text-[16px] font-publica_sans_l text-black">
                To the maximum extent permitted by law, our liability is limited
                to the total fees paid by you in the 3 months prior to the
                claim.
              </p>
            </section>

            <section id="termination">
              <h2 className="text-[16px] font-publica_sans_m text-black mb-2">
                11. Termination of Use
              </h2>
              <p className="mb-2 text-[16px] font-publica_sans_l text-black">
                We may suspend or terminate access to our services at any time,
                with or without cause or notice, particularly in the case of:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-[16px] font-publica_sans_l text-black">
                  Violation of these Terms
                </li>
                <li className="text-[16px] font-publica_sans_l text-black">
                  Abuse, threats, or misconduct toward caregivers
                </li>
                <li className="text-[16px] font-publica_sans_l text-black">
                  Fraudulent or illegal activity
                </li>
              </ul>
            </section>

            <section id="modifications">
              <h2 className="text-[16px] font-publica_sans_m text-black mb-2">
                12. Modifications to Terms
              </h2>
              <p className="text-[16px] font-publica_sans_l text-black">
                HomeDoc may update these terms periodically. Updates will be
                posted here with a new effective date. Continued use of the
                service after changes are posted means you accept the revised
                terms.
              </p>
            </section>

            <section id="law">
              <h2 className="text-[16px] font-publica_sans_m text-black mb-2">
                13. Governing Law
              </h2>
              <p className="text-[16px] font-publica_sans_l text-black">
                These Terms & Conditions shall be governed and interpreted under
                the laws of the Federal Republic of Nigeria.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

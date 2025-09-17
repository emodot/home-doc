import SEO from "../../components/SEO";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "variants.js";
import RadioButtonSelect from "components/Inputs/RadioButtonSelect";
import Button from "components/Inputs/Button";
import { useNavigate } from "react-router-dom";

const Request = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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

  const [request, setRequest] = useState("");

  return (
    <>
      <SEO
        title="Request Caregiver - Home Doc"
        description="Home Doc provides compassionate, reliable, and personalized elderly care services that promote comfort, independence, and peace of mind"
        name="Home Doc - Caring for the Ones Who Once Cared for Us"
        type="website"
      />
      <div className="flex flex-col justify-center h-[75vh]">
        <div>
          <motion.p
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-[24px] leading-[24px] font-publica_sans_r mb-4"
          >
            Request a Caregiver in Minutes
          </motion.p>
          <motion.p
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-[16px] leading-[20px] font-publica_sans_l"
          >
            Tell us about your needs, and we’ll match you with the right
            caregiver — for yourself or a loved one.
          </motion.p>
        </div>
        <div className="mt-[4rem]">
          <p className="text-black text-[16px] font-publica_sans_r">
            Who is this care for?
          </p>
          <div className="">
            {["Requesting for an elderly one", "For myself"].map(
              (item, index) => (
                <RadioButtonSelect
                  key={index}
                  label={item}
                  isChecked={request === item}
                  disabled={false}
                  labelStyles={`text-black text-14`}
                  variant="mr-2 mt-4"
                  onChange={() => {
                    setRequest(item);
                  }}
                />
              )
            )}
          </div>
          <div className="mt-[5rem] flex space-x-4">
            <motion.div
              variants={fadeIn("up", 0.6)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <Button
                name={"Back"}
                theme={"transparent"}
                textClassName="sm:text-14 !text-12"
                className="!w-[100px] xs:w-auto sm:mb-6 mb-2"
                onClick={() => navigate("/")}
              />
            </motion.div>
            <motion.div
              variants={fadeIn("up", 0.6)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <Button
                name={"Continue"}
                theme={"secondary"}
                disabled={request === ""}
                textClassName="sm:text-14 !text-12"
                className="!w-[130px] xs:w-auto sm:mb-6 mb-2"
                onClick={() => {
                  request === "For myself"
                    ? navigate("/request/personal")
                    : navigate("/request");
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-2 lg:mb-0">
        {menuOptions.map((item, index) => (
          <>
            <p
              className="font-publica_sans_l text-[14px] leading-[24px] text-[#000000B2] cursor-pointer"
              onClick={() => {
                navigate(item.link);
              }}
            >
              {item.name}
            </p>
            {index !== menuOptions.length - 1 && (
              <div className="rounded-full bg-[#6E6E6E] w-[6px] h-[6px]"></div>
            )}
          </>
        ))}
      </div>
    </>
  );
};

export default Request;

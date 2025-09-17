import SEO from "../../components/SEO";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "variants.js";
import RadioButtonSelect from "components/Inputs/RadioButtonSelect";
import Button from "components/Inputs/Button";
import { useNavigate } from "react-router-dom";
import { save2Local } from "store/localStore";

const Request = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    // const getStore = get4rmLocal("requestData");
    // console.log("getStore", getStore);
    save2Local("requestData", null);
  }, []);

  const [request, setRequest] = useState("");

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
        className="flex flex-col justify-center h-[75vh]"
      >
        <div>
          <p className="text-[24px] leading-[24px] font-publica_sans_r mb-4">
            Request a Caregiver in Minutes
          </p>
          <p className="text-[16px] leading-[20px] font-publica_sans_l">
            Tell us about your needs, and we’ll match you with the right
            caregiver — for yourself or a loved one.
          </p>
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
            <div>
              <Button
                name={"Back"}
                theme={"transparent"}
                textClassName="sm:text-14 !text-12"
                className="!w-[100px] xs:w-auto sm:mb-6 mb-2"
                onClick={() => navigate("/")}
              />
            </div>
            <div>
              <Button
                name={"Continue"}
                theme={"secondary"}
                disabled={request === ""}
                textClassName="sm:text-14 !text-12"
                className="!w-[130px] xs:w-auto sm:mb-6 mb-2"
                onClick={() => {
                  save2Local("requestData", { requestFor: request });
                  request === "For myself"
                    ? navigate("/request/personal")
                    : navigate("/request/elderly-one");
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Request;

import React from "react";
import Button from "components/Inputs/Button";
import Input from "components/Inputs/Input";
import TextArea from "components/Inputs/TextArea";
import Section1BG from "assets/images/contact-sec-1-bg.jpg";
import { ReactComponent as PhoneIcon } from "assets/icons/phone.svg";
import { ReactComponent as EmailIcon } from "assets/icons/email.svg";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "variants.js";

const Section1 = () => {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      message: "",
    });
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const disabled =
      !formData.firstName ||
      !formData.lastName ||
      !formData.emailAddress ||
      !formData.phoneNumber ||
      !formData.message;

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
      if (responseMessage !== "") {
        setTimeout(() => {
          setResponseMessage("");
        }, 3000);
      }
    }, [responseMessage]);

    const submit = (e) => {
    //   e.preventDefault();
    //   console.log(formData);
      setLoading(false);
    //   fetch("https://veer-niq4.onrender.com/api/v1/landing/contact-us", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   })
    //     .then((response) => {
    //       return response.json().then((data) => {
    //         if (response.ok) {
    //           return data;
    //         } else {
    //           throw new Error(data.message || "Failed to send message.");
    //         }
    //       });
    //     })
    //     .then((data) => {
    //       if (data.code === 201) {
    //         setFormData({
    //           firstName: "",
    //           lastName: "",
    //           emailAddress: "",
    //           phoneNumber: "",
    //           companyName: "",
    //           message: "",
    //         });
    //         setShowSuccessModal(true);
    //       }
    //     })
    //     .catch((error) => {
    //       setResponseMessage(
    //         error.message || "An error occurred. Please try again later."
    //       );
    //     })
    //     .finally(() => {
    //       setLoading(false);
    //     });
    };
  return (
    <div className="pt-[6rem] lg:pt-[7rem]">
      <div
        style={{
          width: "100%",
          backgroundImage: `url(${Section1BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-[1300px] lg:w-[95%] w-[90%] m-auto min-h-[90vh] pt-10 lg:pt-0 lg:grid grid-cols-2 items-center gap-10">
          <div className="w-[90%]">
            <motion.h1
              className="text-[40px] font-publica_sans_r mb-4 text-white"
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              Contact Us
            </motion.h1>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-[16px] leading-[24px] font-publica_sans_l text-white"
            >
              Whether you have questions about our services, need help choosing
              a care plan, or you want to make other enquiries— we’re here for
              you.
            </motion.p>

            <div className="lg:mt-[5rem] mt-[3rem]">
              <motion.div
                variants={fadeIn("up", 0.4)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex items-center gap-6 mb-6"
              >
                <PhoneIcon className="" />
                <p className="font-obviously_r text-[16px] leading-[24px] text-white">
                  +234 81 023 456 7890
                </p>
              </motion.div>
              <motion.div
                variants={fadeIn("up", 0.6)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex items-center gap-6 mb-6 cursor-pointer"
                onClick={() => {
                  window.open("mailto:info@compasssurveyltd.com", "_blank");
                }}
              >
                <EmailIcon className="" />
                <p className="font-obviously_r text-[16px] leading-[24px] text-white">
                  hello@homedoc.com
                </p>
              </motion.div>
            </div>
            <div className="lg:mt-[5rem] mt-[3rem]">
              <motion.h1
                className="text-[20px] font-publica_sans_r mb-2 text-white"
                variants={fadeIn("up", 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                Let’s Stay Connected
              </motion.h1>
              <motion.p
                variants={fadeIn("up", 0.4)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-[14px] leading-[24px] font-publica_sans_l text-white"
              >
                Follow us for updates, health tips, and eldercare resources:
              </motion.p>
            </div>
          </div>

          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.7 }}
            className="basis-[60%] xl:basis-[55%] py-[3rem] lg:py-0"
          >
            <div className="bg-white py-[3rem] px-[2rem] xl:px-[4rem] rounded-[20px]">
              <div>
                <h5 className="text-black font-publica_sans_r lg:text-[24px] text-[22px] leading-[30px] mb-[2rem]">
                  Fill out the form below and we’ll get back to you within 24
                  hours.
                </h5>
                <form onSubmit={submit}>
                  <div className="lg:flex justify-between ">
                    <div className="basis-[47%]">
                      <Input
                        label="First Name"
                        type="text"
                        id="firstName"
                        name="firstName"
                        readOnly={loading}
                        value={formData?.firstName}
                        onChange={handleChange}
                        showError={false}
                      />
                    </div>
                    <div className="basis-[47%]">
                      <Input
                        label="Last Name"
                        type="text"
                        id="lastName"
                        name="lastName"
                        readOnly={loading}
                        value={formData?.lastName}
                        onChange={handleChange}
                        showError={false}
                      />
                    </div>
                  </div>
                  <div className="lg:flex justify-between ">
                    <div className="basis-[47%]">
                      <Input
                        label="Email Address"
                        type="text"
                        id="emailAddress"
                        name="emailAddress"
                        readOnly={loading}
                        value={formData?.emailAddress}
                        onChange={handleChange}
                        showError={false}
                      />
                    </div>
                    <div className="basis-[47%]">
                      <Input
                        label="Phone Number"
                        type="number"
                        id="phoneNumber"
                        name="phoneNumber"
                        readOnly={loading}
                        value={formData?.phoneNumber}
                        onChange={handleChange}
                        showError={false}
                      />
                    </div>
                  </div>
                  <div className="">
                    <TextArea
                      label={"Message"}
                      placeholder="Start writing here"
                      id="message"
                      name="message"
                      readOnly={loading}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>
                  {responseMessage && (
                    <motion.p
                      variants={fadeIn("right", 0.2)}
                      initial="hidden"
                      whileInView={"show"}
                      viewport={{ once: true, amount: 0.7 }}
                      className="py-2 px-4 text-error bg-[#fff1f1] text-14 font-publica_sans_r rounded-lg mb-6"
                    >
                      {responseMessage}
                    </motion.p>
                  )}
                  <Button
                    name={"Send Message"}
                    theme="secondary"
                    className={"w-[10rem] mt-[30px]"}
                    disabled={disabled}
                    loading={loading}
                  />
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Section1;

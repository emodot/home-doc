import SEO from "../../components/SEO";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "variants.js";
import Button from "components/Inputs/Button";
import { useNavigate } from "react-router-dom";
import Input from "components/Inputs/Input";
import Dropdown from "components/Inputs/Dropdown";
import nigerianStates from "countrycitystatejson"; // import the package

const Personal = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    age: "",
    gendar: "",
    address: "",
    state: "",
    lga: "",
  });

  // Get all states in Nigeria
  const stateOptions = useMemo(() => {
    const states = nigerianStates.getStatesByShort("NG");      
    return states.map((state) => ({
      name: state,
      value: state,
    }));
  }, []);

  // Get LGAs for selected state
  const lgaOptions = useMemo(() => {
    if (!formData.state) return [];
    const lgas = nigerianStates.getCities
      ? nigerianStates.getCities("NG", formData.state)
      : [];
    return lgas.map((lga) => ({
      name: lga,
      value: lga,
    }));
  }, [formData.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle state dropdown selection
  const handleStateSelect = (option) => {
    console.log("option", option);
    setFormData((prev) => ({
      ...prev,
      state: option.value,
      lga: "",
    }));
  };

  // Handle LGA dropdown selection
  const handleLGASelect = (option) => {
    setFormData((prev) => ({
      ...prev,
      lga: option.value,
    }));
  };

  const gendarOption = [
    {
      name: "Male",
      value: "Male",
    },
    {
      name: "Female",
      value: "Female",
    },
  ];

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

  // Check if any field is empty
  const isFormIncomplete = Object.values(formData).some(
    (val) => !val || val.trim() === ""
  );

  return (
    <>
      <SEO
        title="Request Caregiver - Home Doc"
        description="Home Doc provides compassionate, reliable, and personalized elderly care services that promote comfort, independence, and peace of mind"
        name="Home Doc - Caring for the Ones Who Once Cared for Us"
        type="website"
      />
      <div className="flex flex-col justify-center">
        <div>
          <motion.p
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-[24px] leading-[24px] font-publica_sans_r mb-3"
          >
            Request Personal Care
          </motion.p>
        </div>
        <div className="">
          <p className="text-black text-[16px] font-publica_sans_r mb-6">
            Personal Information
          </p>
          <div className="grid grid-cols-2 gap-x-6">
            <div className="col-span-1">
              <p className="text-black text-[14px] font-publica_sans_l">
                First Name
              </p>
              <Input
                placeholder="First Name"
                type="text"
                id="firstName"
                name="firstName"
                value={formData?.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1">
              <p className="text-black text-[14px] font-publica_sans_l">
                Last Name
              </p>
              <Input
                placeholder="Last Name"
                type="text"
                id="lastName"
                name="lastName"
                value={formData?.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2">
              <p className="text-black text-[14px] font-publica_sans_l">
                Phone Number
              </p>
              <Input
                placeholder="Phone Number"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData?.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1">
              <p className="text-black text-[14px] font-publica_sans_l">Age</p>
              <Input
                placeholder="Age"
                type="number"
                id="age"
                name="age"
                value={formData?.age}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1">
              <p className="text-black text-[14px] font-publica_sans_l">
                Gender
              </p>
              <Dropdown
                type="select"
                id="gendar"
                name="gendar"
                loading={false}
                selected={formData?.gendar}
                options={gendarOption}
                onSelect={(e) => {
                  handleChange({
                    target: {
                      name: "gendar",
                      value: e.value,
                    },
                  });
                }}
              />
            </div>
            <div className="col-span-2">
              <p className="text-black text-[14px] font-publica_sans_l">
                Beneficiary Full Address (House No. City,)
              </p>
              <Input
                placeholder="Address"
                type="text"
                id="address"
                name="address"
                value={formData?.address}
                onChange={handleChange}
              />
            </div>
            {/* State Dropdown */}
            <div className="col-span-1">
              <p className="text-black text-[14px] font-publica_sans_l">
                State
              </p>
              <Dropdown
                type="select"
                id="state"
                name="state"
                loading={false}
                selected={formData?.state}
                options={stateOptions}
                onSelect={handleStateSelect}
                placeholder="Select State"
              />
            </div>
            {/* LGA Dropdown */}
            <div className="col-span-1">
              <p className="text-black text-[14px] font-publica_sans_l">LGA</p>
              <Dropdown
                type="select"
                id="lga"
                name="lga"
                loading={false}
                selected={formData?.lga}
                options={lgaOptions}
                onSelect={handleLGASelect}
                placeholder={
                  formData.state ? "Select LGA" : "Select State First"
                }
                // disabled={!formData.state}
              />
            </div>
          </div>
          <div className="mt-[2rem] flex space-x-4">
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
                onClick={() => navigate("/request")}
              />
            </motion.div>
            <motion.div
              variants={fadeIn("up", 0.6)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <Button
                name={"Proceed to Plan "}
                theme={"secondary"}
                disabled={isFormIncomplete}
                textClassName="sm:text-14 !text-12"
                className="!w-[135px] xs:w-auto sm:mb-6 mb-2"
                onClick={() => navigate("/")}
              />
            </motion.div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-5 mb-5">
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
      </div>
    </>
  );
};

export default Personal;

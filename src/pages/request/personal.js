import SEO from "../../components/SEO";
import { useEffect, useState, useMemo } from "react";
import { fadeIn } from "variants.js";
import Button from "components/Inputs/Button";
import { useNavigate } from "react-router-dom";
import Input from "components/Inputs/Input";
import Dropdown from "components/Inputs/Dropdown";
import nigerianStates from "countrycitystatejson";
import ChoosePlan from "components/Request/ChoosePlan";
import { motion, AnimatePresence } from "framer-motion";
import { get4rmLocal, save2Local } from "store/localStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Personal = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const queryParams = new URLSearchParams(window.location.search);
  const selectPlanFromUrl = queryParams.get("selectPlan") === "true";
  const navigate = useNavigate();
  const [showPlan, setShowPlan] = useState(selectPlanFromUrl);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    age: "",
    gender: "",
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

  const selectPlan = (e) => {
    const fromStore = get4rmLocal("requestData");
    const requestData = {
      ...fromStore,
      personalDetails: { ...formData },
      plan: e,
    };

    save2Local("requestData", requestData);
    setShowPlan(false);
    navigate("/request/review");
    toast.success("Plan selected successfully!");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle state dropdown selection
  const handleStateSelect = (option) => {
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

  const genderOption = [
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

  useEffect(() => {
    const fromStore = get4rmLocal("requestData");
    if (fromStore?.personalDetails) {
      setFormData(fromStore?.personalDetails);
    }
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <SEO
        title="Request Caregiver - Home Doc"
        description="Home Doc provides compassionate, reliable, and personalized elderly care services that promote comfort, independence, and peace of mind"
        name="Home Doc - Caring for the Ones Who Once Cared for Us"
        type="website"
      />
      <motion.div
        variants={fadeIn("", 0.6)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className=""
      >
        <div>
          <p className="text-[24px] leading-[24px] font-publica_sans_r mb-3">
            Request Personal Care
          </p>
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
                id="gender"
                name="gender"
                loading={false}
                selected={formData?.gender}
                options={genderOption}
                onSelect={(e) => {
                  handleChange({
                    target: {
                      name: "gender",
                      value: e.value,
                    },
                  });
                }}
                placeholder="Select gender"
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
                disabled={!formData.state}
              />
            </div>
          </div>
          <div className="mt-[2rem] flex space-x-4">
            <div>
              <Button
                name={"Back"}
                theme={"transparent"}
                textClassName="sm:text-14 !text-12"
                className="!w-[100px] xs:w-auto sm:mb-6 mb-2"
                onClick={() => navigate("/request")}
              />
            </div>
            <div>
              <Button
                name={"Proceed to Plan "}
                theme={"secondary"}
                disabled={isFormIncomplete}
                textClassName="sm:text-14 !text-12"
                className="!w-[135px] xs:w-auto sm:mb-6 mb-2"
                onClick={() => {
                  if (isFormIncomplete) {
                    toast.error(
                      "Please complete all fields before selecting a plan."
                    );
                    return;
                  }
                  setShowPlan(true);
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-5 mb-5">
          {menuOptions.map((item, index) => (
            <div key={index}>
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
            </div>
          ))}
        </div>
      </motion.div>
      <AnimatePresence>
        {showPlan && (
          <div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.6 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 50,
            }}
          >
            <ChoosePlan
              closeModal={() => setShowPlan(false)}
              selectPlan={selectPlan}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Personal;

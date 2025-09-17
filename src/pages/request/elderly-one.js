import { useState, useEffect } from "react";
import SEO from "../../components/SEO";
import { fadeIn } from "variants.js";
import Button from "components/Inputs/Button";
import { useNavigate } from "react-router-dom";
import PersonalInformation from "components/Request/PersonalInformation";
import BeneficiaryInformation from "components/Request/BeneficiaryInformation";
import { ReactComponent as Plus } from "assets/icons/plus-sign.svg";
import { ReactComponent as Delete } from "assets/icons/delete-icon.svg";
import { ReactComponent as Edit } from "assets/icons/edit-icon.svg";
import ChoosePlan from "components/Request/ChoosePlan";
import { motion, AnimatePresence } from "framer-motion";
import { get4rmLocal, save2Local } from "store/localStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ElderlyOne = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const queryParams = new URLSearchParams(window.location.search);
  const selectPlanFromUrl = queryParams.get("selectPlan") === "true";
  const getStepFromUrl = queryParams.get("step");
  const navigate = useNavigate();
  const [step, setStep] = useState(getStepFromUrl || "1");
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    },
    beneficiaryInfo: [
      // {
      //   firstName: "",
      //   lastName: "",
      //   phoneNumber: "",
      //   age: "",
      //   gender: "",
      //   relationship: "",
      //   address: "",
      //   state: "",
      //   lga: "",
      // },
    ],
  });

  const [benObject, setBenObject] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    age: "",
    gender: "",
    relationship: "",
    address: "",
    state: "",
    lga: "",
  });
  const [showForm, setShowForm] = useState(true);
  const [showPlan, setShowPlan] = useState(selectPlanFromUrl);

  // Check if any field in any beneficiary is empty
  const isFormIncomplete = Object.values(benObject).some(
    (val) => !val || val.trim() === ""
  );

  const clearParam = () => {
    if (window && window.history && window.location) {
      const url =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname;
      window.history.replaceState({}, document.title, url);
    }
  };

  const selectPlan = (e) => {
    const fromStore = get4rmLocal("requestData");
    const requestData = {
      ...fromStore,
      ...formData,
      plan: e,
    };

    save2Local("requestData", requestData);
    setShowPlan(false);
    toast.success("Plan selected successfully!"); // Toast on plan selection
    setTimeout(() => {
      navigate("/request/review");
    }, 800);
  };

  const editForm = (index) => {
    setBenObject({ ...formData.beneficiaryInfo[index] });
    removeBeneficiary(index);
  };

  const removeBeneficiary = (index) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        beneficiaryInfo: prev.beneficiaryInfo.filter((_, i) => i !== index),
      };
      return updated;
    });
  };

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const newState = { ...prevState };

      const formattedName = name.replace(/\[(\d+)\]/g, ".$1");
      const keys = formattedName.split(".");

      let nestedField = newState;
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          nestedField[key] = value;
        } else {
          if (!nestedField[key]) {
            nestedField[key] = isNaN(keys[index + 1]) ? {} : [];
          }
          nestedField = nestedField[key];
        }
      });

      return newState;
    });
  };

  const handleBenChange = (e) => {
    const { name, value } = e.target;
    setBenObject((prevState) => {
      const newState = { ...prevState };

      const formattedName = name.replace(/\[(\d+)\]/g, ".$1");
      const keys = formattedName.split(".");

      let nestedField = newState;
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          nestedField[key] = value;
        } else {
          if (!nestedField[key]) {
            nestedField[key] = isNaN(keys[index + 1]) ? {} : [];
          }
          nestedField = nestedField[key];
        }
      });

      return newState;
    });
  };

  useEffect(() => {
    const fromStore = get4rmLocal("requestData");
    if (fromStore?.personalInfo && fromStore?.personalInfo) {
      setFormData({
        personalInfo: { ...fromStore?.personalInfo },
        beneficiaryInfo: [...fromStore?.beneficiaryInfo],
      });
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
        variants={fadeIn("", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col justify-center"
      >
        <div>
          <p
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-[24px] leading-[24px] font-publica_sans_r mb-3"
          >
            Request for an Elderly One
          </p>
        </div>
        {step === "1" ? (
          <PersonalInformation
            formData={formData}
            setFormData={setFormData}
            handleChange={handlePersonalChange}
            nextStep={(e) => {
              setStep(e);
              clearParam();
            }}
          />
        ) : (
          <motion.div
            variants={fadeIn("", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {formData.beneficiaryInfo
              .filter(
                (item) =>
                  item.firstName &&
                  item.firstName.trim() !== "" &&
                  item.lastName &&
                  item.lastName.trim() !== ""
              )
              .map((item, index) => (
                <motion.div
                  variants={fadeIn("", 0.2)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="p-6 rounded-[10px] bg-[#F8F8F0] mb-[1rem]"
                  key={index}
                >
                  <p className="text-black font-publica_sans_r mb-4">
                    Beneficiary {index + 1}
                  </p>
                  <div className="grid grid-cols-2">
                    <div>
                      <p className="text-[#00000099] text-[14px] font-publica_sans_l mb-1">
                        Beneficiary First Name
                      </p>
                      <p className="text-[#000000] text-[14px] font-publica_sans_l">
                        {item.firstName}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#00000099] text-[14px] font-publica_sans_l mb-1">
                        Beneficiary Last Name
                      </p>
                      <p className="text-[#000000] text-[14px] font-publica_sans_l">
                        {item.lastName}
                      </p>
                    </div>
                  </div>
                  <hr className="my-4 border-[#1834451A]" />
                  <div className="flex items-center gap-6">
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => editForm(index)}
                    >
                      <Edit />
                      <p className="font-publica_sans_r text-[14px] text-[#001B2B]">
                        Edit
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => removeBeneficiary(index)}
                    >
                      <Delete />
                      <p className="font-publica_sans_r text-[14px] text-[#001B2B]">
                        Remove
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            {showForm && (
              <BeneficiaryInformation
                loading={false}
                formData={benObject}
                beneficiaryLength={formData.beneficiaryInfo.length}
                handleChange={handleBenChange}
                removeForm={() => setShowForm(false)}
              />
            )}

            <div
              className={`mt-[2rem] flex items-center space-x-2 w-fit cursor-pointer ${
                isFormIncomplete && showForm
                  ? "opacity-[30%] !cursor-not-allowed "
                  : ""
              })}`}
              onClick={() => {
                if (isFormIncomplete && showForm) {
                  toast.error(
                    "Please complete all beneficiary fields before adding."
                  ); 
                  return;
                }
                if (!showForm) {
                  setShowForm(true);
                  return;
                }
                setFormData({
                  ...formData,
                  beneficiaryInfo: [...formData.beneficiaryInfo, benObject],
                });
                setBenObject({
                  firstName: "",
                  lastName: "",
                  phoneNumber: "",
                  age: "",
                  gender: "",
                  relationship: "",
                  address: "",
                  state: "",
                  lga: "",
                });
                clearParam();
              }}
            >
              <Plus />
              <p className="font-publica_sans_r text-[14px]">
                Add Another Beneficiary
              </p>
            </div>

            <div className="mt-[2rem] flex space-x-4">
              <div>
                <Button
                  name={"Back"}
                  theme={"transparent"}
                  textClassName="sm:text-14 !text-12"
                  className="!w-[100px] xs:w-auto sm:mb-6 mb-2"
                  onClick={() => {
                    clearParam();
                    setStep("1");
                  }}
                />
              </div>
              <div>
                <Button
                  name={"Proceed to Plan "}
                  theme={"secondary"}
                  textClassName="sm:text-14 !text-12"
                  className="!w-[135px] xs:w-auto sm:mb-6 mb-2"
                  onClick={() => {
                    if (isFormIncomplete && showForm) {
                      toast.error(
                        "Please complete all beneficiary fields or remove the form."
                      ); // Toast on incomplete
                      return;
                    }
                    if (
                      Object.values(benObject).some(
                        (val) => val && val.trim() !== ""
                      )
                    ) {
                      // If benObject is not empty, add it as a beneficiary
                      setFormData({
                        ...formData,
                        beneficiaryInfo: [
                          ...formData.beneficiaryInfo,
                          benObject,
                        ],
                      });
                      setBenObject({
                        firstName: "",
                        lastName: "",
                        phoneNumber: "",
                        age: "",
                        gender: "",
                        relationship: "",
                        address: "",
                        state: "",
                        lga: "",
                      });
                    }
                    setShowPlan(true);
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
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

export default ElderlyOne;

import { useEffect } from "react";
import Button from "components/Inputs/Button";
import { useNavigate } from "react-router-dom";
import Input from "components/Inputs/Input";

const PersonalInformation = ({
  formData,
  setFormData,
  handleChange,
  nextStep,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();

  // Check if any field is empty
  const isFormIncomplete = Object.values(formData?.personalInfo).some(
    (val) => !val || val.trim() === ""
  );

  return (
    <>
      <div className="">
        <p className="text-black text-[16px] font-publica_sans_r mb-6">
          Your Personal Information
        </p>
        <div className="grid grid-cols-2 gap-x-6">
          <div className="col-span-1">
            <p className="text-black text-[14px] font-publica_sans_l">
              Your First Name
            </p>
            <Input
              placeholder="First Name"
              type="text"
              id="personalInfo.firstName"
              name="personalInfo.firstName"
              value={formData?.personalInfo?.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <p className="text-black text-[14px] font-publica_sans_l">
              Your Last Name
            </p>
            <Input
              placeholder="Last Name"
              type="text"
              id="personalInfo.lastName"
              name="personalInfo.lastName"
              value={formData?.personalInfo?.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <p className="text-black text-[14px] font-publica_sans_l">
              Your Phone Number
            </p>
            <Input
              placeholder="Phone Number"
              type="tel"
              id="personalInfo.phoneNumber"
              name="personalInfo.phoneNumber"
              value={formData?.personalInfo?.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <p className="text-black text-[14px] font-publica_sans_l">
              Your Email Address
            </p>
            <Input
              placeholder="Email Address"
              type="text"
              id="personalInfo.email"
              name="personalInfo.email"
              value={formData?.personalInfo?.email}
              onChange={handleChange}
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
              name={"Continue"}
              theme={"secondary"}
              disabled={isFormIncomplete}
              textClassName="sm:text-14 !text-12"
              className="!w-[135px] xs:w-auto sm:mb-6 mb-2"
              onClick={() => nextStep("2")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;

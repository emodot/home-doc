import { useEffect, useMemo } from "react";
import Input from "components/Inputs/Input";
import Dropdown from "components/Inputs/Dropdown";
import nigerianStates from "countrycitystatejson";
import { ReactComponent as Delete } from "assets/icons/delete-icon-red.svg";

const BeneficiaryInformation = ({
  formData,
  beneficiaryLength,
  handleChange,
  removeForm,
  removeBeneficiary,
  addBeneficiary,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const relationshipOption = [
    {
      name: "Brother",
      value: "Brother",
    },
    {
      name: "Sister",
      value: "Sister",
    },
    {
      name: "Uncle",
      value: "Uncle",
    },
    {
      name: "Aunt",
      value: "Aunt",
    },
    {
      name: "Friend",
      value: "Friend",
    },
  ];  

  return (
    <>
      <div className="mt-4">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-black text-[16px] font-publica_sans_r">
            {beneficiaryLength === 0
              ? "Care Beneficiary Information"
              : `Beneficiary ${beneficiaryLength + 1}`}
          </p>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => removeForm()}
          >
            <Delete />
            <p className="font-publica_sans_r text-[14px] text-[#FF0004]">
              Remove
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6">
          <div className="col-span-1">
            <p className="text-black text-[14px] font-publica_sans_l">
              Beneficiary First Name
            </p>
            <Input
              placeholder="First Name"
              type="text"
              id={`firstName`}
              name={`firstName`}
              value={formData?.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <p className="text-black text-[14px] font-publica_sans_l">
              Beneficiary Last Name
            </p>
            <Input
              placeholder="Last Name"
              type="text"
              id={`lastName`}
              name={`lastName`}
              value={formData?.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <p className="text-black text-[14px] font-publica_sans_l">
              Beneficiary Phone Number
            </p>
            <Input
              placeholder="Phone Number"
              type="tel"
              id={`phoneNumber`}
              name={`phoneNumber`}
              value={formData?.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <p className="text-black text-[14px] font-publica_sans_l">
              Beneficiary Age
            </p>
            <Input
              placeholder="Age"
              type="number"
              id={`age`}
              name={`age`}
              value={formData?.age}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <p className="text-black text-[14px] font-publica_sans_l">Gender</p>
            <Dropdown
              type="select"
              id={`gender`}
              name={`gender`}
              loading={false}
              selected={formData?.gender}
              options={genderOption}
              onSelect={(e) => {
                handleChange({
                  target: {
                    name: `gender`,
                    value: e.value,
                  },
                });
              }}
              placeholder="Select Gender"
            />
          </div>
          <div className="col-span-2">
            <p className="text-black text-[14px] font-publica_sans_l">
              Relationship to the Beneficiary
            </p>
            <Dropdown
              type="select"
              id={`relationship`}
              name={`relationship`}
              loading={false}
              selected={formData?.relationship}
              options={relationshipOption}
              onSelect={(e) => {
                handleChange({
                  target: {
                    name: `relationship`,
                    value: e.value,
                  },
                });
              }}
              placeholder="Select Relationship"
            />
          </div>
          <div className="col-span-2">
            <p className="text-black text-[14px] font-publica_sans_l">
              Beneficiary Full Address (House No. City,)
            </p>
            <Input
              placeholder="Address"
              type="text"
              id={`address`}
              name={`address`}
              value={formData?.address}
              onChange={handleChange}
            />
          </div>
          {/* State Dropdown */}
          <div className="col-span-1">
            <p className="text-black text-[14px] font-publica_sans_l">State</p>
            <Dropdown
              type="select"
              id={`state`}
              name={`state`}
              loading={false}
              selected={formData?.state}
              options={stateOptions}
              onSelect={(e) => {
                handleChange({
                  target: {
                    name: `state`,
                    value: e.value,
                  },
                });
              }}
              placeholder="Select State"
            />
          </div>
          {/* LGA Dropdown */}
          <div className="col-span-1">
            <p className="text-black text-[14px] font-publica_sans_l">LGA</p>
            <Dropdown
              type="select"
              id={`lga`}
              name={`lga`}
              loading={false}
              selected={formData?.lga}
              options={lgaOptions}
              onSelect={(e) => {
                handleChange({
                  target: {
                    name: `lga`,
                    value: e.value,
                  },
                });
              }}
              placeholder={
                formData?.state ? "Select LGA" : "Select State First"
              }
              disabled={!formData?.state}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BeneficiaryInformation;

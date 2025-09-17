import React from "react";
import { ReactComponent as Edit } from "assets/icons/edit-icon-orange.svg";
import { useNavigate } from "react-router-dom";

export default function ProfileInfo({ data }) {
  const { personalDetails, personalInfo, beneficiaryInfo, requestFor } =
    data;
  const navigate = useNavigate();
  console.log("personalDetails", data);
  

  return (
    <>
      {requestFor === "For myself" ? (
        <div className="">
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-publica_sans_r text-black">
                Personal Information
              </h2>
              <div
                className="flex space-x-3 items-center cursor-pointer"
                onClick={() => {
                  requestFor === "For myself"
                    ? navigate("/request/personal")
                    : navigate("/request/elderly-one?step=1");
                }}
              >
                <p className="font-publica_sans_r text-[14px] text-brand_primary">
                  Edit Info
                </p>
                <Edit />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8">
              <div>
                <p className="text-[14px] text-[#000000B2] font-publica_sans_l mb-1 ">
                  Your First Name
                </p>
                <p className="text-[14px] text-[#000000] font-publica_sans_l">
                  {personalDetails?.firstName}
                </p>
              </div>
              <div>
                <p className="text-[14px] text-[#000000B2] font-publica_sans_l mb-1 ">
                  Your Last Name
                </p>
                <p className="text-[14px] text-[#000000] font-publica_sans_l">
                  {personalDetails?.lastName}
                </p>
              </div>
              <div>
                <p className="text-[14px] text-[#000000B2] font-publica_sans_l mb-1 ">
                  Your Phone Number
                </p>
                <p className="text-[14px] text-[#000000] font-publica_sans_l">
                  {personalDetails?.phoneNumber}
                </p>
              </div>
              <div>
                <p className="text-[14px] text-[#000000B2] font-publica_sans_l mb-1 ">
                  Your Age
                </p>
                <p className="text-[14px] text-[#000000] font-publica_sans_l">
                  {personalDetails?.age}
                </p>
              </div>
              <div>
                <p className="text-[14px] text-[#000000B2] font-publica_sans_l mb-1 ">
                  Your Gender
                </p>
                <p className="text-[14px] text-[#000000] font-publica_sans_l">
                  {personalDetails?.gender}
                </p>
              </div>
              <div>
                <p className="text-[14px] text-[#000000B2] font-publica_sans_l mb-1 ">
                  Beneficiary Full Address
                </p>
                <p className="text-[14px] text-[#000000] font-publica_sans_l">
                  {personalDetails?.address}
                </p>
              </div>
              <div>
                <p className="text-[14px] text-[#000000B2] font-publica_sans_l mb-1 ">
                  Your State
                </p>
                <p className="text-[14px] text-[#000000] font-publica_sans_l">
                  {personalDetails?.state}
                </p>
              </div>
              <div>
                <p className="text-[14px] text-[#000000B2] font-publica_sans_l mb-1 ">
                  Your LGA
                </p>
                <p className="text-[14px] text-[#000000] font-publica_sans_l">
                  {personalDetails?.lga}
                </p>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="">
          {/* Personal Information */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-publica_sans_r text-black">
                Your Personal Information
              </h2>
              <div
                className="flex space-x-3 items-center cursor-pointer"
                onClick={() => {
                  requestFor === "For myself"
                    ? navigate("/request/personal")
                    : navigate("/request/elderly-one?step=1");
                }}
              >
                <p className="font-publica_sans_r text-[14px] text-brand_primary">
                  Edit Info
                </p>
                <Edit />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8">
              <div>
                <p className="text-[14px] text-[#000000B2] font-publica_sans_l mb-1 ">
                  Your First Name
                </p>
                <p className="text-[14px] text-[#000000] font-publica_sans_l">
                  {personalInfo?.firstName}
                </p>
              </div>
              <div>
                <p className="text-[14px] text-[#000000B2] font-publica_sans_l mb-1 ">
                  Your Last Name
                </p>
                <p className="text-[14px] text-[#000000] font-publica_sans_l">
                  {personalInfo?.lastName}
                </p>
              </div>
              <div>
                <p className="text-[14px] text-[#000000B2] font-publica_sans_l mb-1 ">
                  Your Phone Number
                </p>
                <p className="text-[14px] text-[#000000] font-publica_sans_l">
                  {personalInfo?.phoneNumber}
                </p>
              </div>
              <div>
                <p className="text-[14px] text-[#000000B2] font-publica_sans_l mb-1 ">
                  Your Email Address
                </p>
                <p className="text-[14px] text-[#000000] font-publica_sans_l">
                  {personalInfo?.email}
                </p>
              </div>
            </div>
          </section>

          {/* Beneficiary Information */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className=" font-publica_sans_r text-black">
                Care Beneficiary Information
              </h2>
              <div
                className="flex space-x-3 items-center cursor-pointer"
                onClick={() => {
                  requestFor === "For myself"
                    ? navigate("/request/personal")
                    : navigate("/request/elderly-one?step=2");
                }}
              >
                <p className="font-publica_sans_r text-[14px] text-brand_primary">
                  Update Beneficiary
                </p>
                <Edit />
              </div>
            </div>
            {beneficiaryInfo.map((item, index) => (
              <>
                <p className="text-[16px] text-[#000000] font-publica_sans_m mb-3 ">
                  Beneficiary {index + 1}
                </p>
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8"
                >
                  <div>
                    <p className="text-[14px] text-[#000000B2] font-publica_sans_l mb-1 ">
                      Beneficiary First Name
                    </p>
                    <p className="text-[14px] text-[#000000] font-publica_sans_l">
                      {item?.firstName}
                    </p>
                  </div>
                  <div>
                    <p className="text-[14px] text-[#000000B2] font-publica_sans_l mb-1 ">
                      Beneficiary Last Name
                    </p>
                    <p className="text-[14px] text-[#000000] font-publica_sans_l">
                      {item?.lastName}
                    </p>
                  </div>

                  <div>
                    <p className="text-[14px] text-[#000000B2] font-publica_sans_l mb-1 ">
                      Your Phone Number
                    </p>
                    <p className="text-[14px] text-[#000000] font-publica_sans_l">
                      {item?.phoneNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-[14px] text-[#000000B2] font-publica_sans_l mb-1 ">
                      Your Email Address
                    </p>
                    <p className="text-[14px] text-[#000000] font-publica_sans_l">
                      {personalInfo.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-[14px] text-[#000000B2] font-publica_sans_l mb-1 ">
                      Beneficiary Age
                    </p>
                    <p className="text-[14px] text-[#000000] font-publica_sans_l">
                      {item?.age}
                    </p>
                  </div>
                  <div>
                    <p className="text-[14px] text-[#000000B2] font-publica_sans_l mb-1 ">
                      Relationship to the Beneficiary
                    </p>
                    <p className="text-[14px] text-[#000000] font-publica_sans_l">
                      {item?.relationship}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-[14px] text-[#000000B2] font-publica_sans_l mb-1 ">
                      Beneficiary Full Address (House No. City,)
                    </p>
                    <p className="text-[14px] text-[#000000] font-publica_sans_l">
                      {item?.address}
                    </p>
                  </div>

                  <div>
                    <p className="text-[14px] text-[#000000B2] font-publica_sans_l mb-1 ">
                      State
                    </p>
                    <p className="text-[14px] text-[#000000] font-publica_sans_l">
                      {item?.state}
                    </p>
                  </div>
                  <div>
                    <p className="text-[14px] text-[#000000B2] font-publica_sans_l mb-1 ">
                      LGA
                    </p>
                    <p className="text-[14px] text-[#000000] font-publica_sans_l">
                      {item?.lga}
                    </p>
                  </div>
                </div>
              </>
            ))}
          </section>
        </div>
      )}
    </>
  );
}

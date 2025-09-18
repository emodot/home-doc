import React from "react";
import Button from "./Inputs/Button";
import { useNavigate } from "react-router-dom";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const SuccessComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-[1300px] m-auto flex flex-col items-center justify-center min-h-[80vh]">
      {/* <div className="w-[200px] h-[200px]">
        <DotLottieReact
          src="https://lottie.host/7bed5de1-1a65-46bb-8364-7be5624a523c/ZKSjyM74F6.lottie"
          loop
          autoplay
        />
      </div> */}
      <h1 className="text-[20px] font-publica_sans_r mb-4 text-black">
        Payment Successful!
      </h1>
      <p className="text-[14px] leading-[18px] font-publica_sans_l text-[#000000B2] w-[60%] mx-auto text-center">
        Thank you! Your payment has been received, and your care plan is now
        active.
      </p>
      <div className="max-w-md mx-auto bg-[#F9F9F8] p-6 rounded-[20px] shadow mt-7 mb-9">
        <h3 className="font-publica_sans_r text-brand_secondary mb-4">
          What’s Next?
        </h3>
        <ul className="list-disc pl-5 space-y-3 leading-relaxed">
          <li className="text-[#000000B2] font-publica_sans_l">
            A care coordinator will reach out shortly to confirm your details.
          </li>
          <li className="text-[#000000B2] font-publica_sans_l">
            You’ll receive an email with your plan summary and caregiver
            schedule.
          </li>
          <li className="text-[#000000B2] font-publica_sans_l">
            For urgent questions,{" "}
            <a
              href="/"
              className="text-[#000000B2] font-publica_sans_l underline hover:text-blue-800"
            >
              Contact Support
            </a>{" "}
            or call us directly.{" "}
            <span className="text-[#000000B2] font-publica_sans_l">
              (+234 8102729112)
            </span>
          </li>
        </ul>
      </div>
      <Button
        name={"Return to Homepage"}
        theme={"primary"}
        textClassName="sm:text-14 !text-12"
        className="!w-[160px] xs:w-auto sm:mb-6 mb-2"
        onClick={() => navigate('/')}
      />
    </div>
  );
};

export default SuccessComponent;

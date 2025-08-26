import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const SuccessComponent = () => {
  return (
    <div className="max-w-[1300px] m-auto flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-[200px] h-[200px]">
        <DotLottieReact
          src="https://lottie.host/7bed5de1-1a65-46bb-8364-7be5624a523c/ZKSjyM74F6.lottie"
          loop
          autoplay
        />
      </div>
      <h1 className="text-[40px] font-redhawk mb-4 text-brand_primary">
        Thank you for subscribing.
      </h1>
      <p className="text-[14px] leading-[24px] text-gray-600 w-[40%] mx-auto text-center">
        You'll be the first to know when we share new content and key updates.
        Until then, feel free to explore more of what we’re doing.
      </p>
    </div>
  );
};

export default SuccessComponent;

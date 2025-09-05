import Section1 from "components/AboutUs/Section1";
import Section3 from "components/AboutUs/Section3";
import SEO from "../components/SEO";
import { useEffect } from "react";
import MissionVision from "components/MissionVision";
import GetRightCare from "components/GetRightCare";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <SEO
        title="About Us - Home Doc"
        description="Home Doc provides compassionate, reliable, and personalized elderly care services that promote comfort, independence, and peace of mind"
        name="Home Doc - Caring for the Ones Who Once Cared for Us"
        type="website"
      />
      <Section1 />
      <MissionVision />
      <Section3 />
      <div className="pb-[6rem] pt-[2rem]">
        <GetRightCare
          header1="Get the Right Care, Right Now"
          header2="Don’t wait for things to get overwhelming."
          subText="Book a consultation today and take the first step toward
            compassionate, stress-free eldercare."
          btnText1="Get Started"
          btn1Link="/"
          btnText2="View Pricing"
          btn2Link="/plans-and-pricing"
        />
      </div>
    </>
  );
};

export default AboutUs;

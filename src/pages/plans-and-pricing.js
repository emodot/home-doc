import Section1 from "components/PlansAndPricing/Section1";
import SEO from "../components/SEO";
import { useEffect } from "react";
import PricingPlans from "components/PlansAndPricing/PricingPlans";
import OneTimeServices from "components/PlansAndPricing/OneTimeServices";
import GetRightCare from "components/GetRightCare";

const PlansAndPricing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <SEO
        title="Plans and Pricing - Home Doc"
        description="Home Doc provides compassionate, reliable, and personalized elderly care services that promote comfort, independence, and peace of mind"
        name="Home Doc - Caring for the Ones Who Once Cared for Us"
        type="website"
      />
      <Section1 />
      <PricingPlans />
      <OneTimeServices />
      <div className="pb-[6rem] pt-[2rem]">
        <GetRightCare
          header1="Choose a plan that fits your"
          header2="loved one’s needs."
          subText="Home-based healthcare with real human touch — starting now."
          btnText1="Get Started"
          btn1Link="/"
          btnText2="Request Custom Plan"
          btn2Link="/"
        />
      </div>
    </>
  );
};

export default PlansAndPricing;

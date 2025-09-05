import SEO from "../components/SEO";
import { useEffect } from "react";
import TermsAndCondition from "components/TermsAndCondition";

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <SEO
        title="Terms & Conditions - Home Doc"
        description="Home Doc provides compassionate, reliable, and personalized elderly care services that promote comfort, independence, and peace of mind"
        name="Home Doc - Caring for the Ones Who Once Cared for Us"
        type="website"
      />
      <TermsAndCondition />
    </>
  );
};

export default TermsAndConditions;

import Section1 from "components/ContactUs/Section1";
import React, { useEffect } from "react";
import SEO from "../components/SEO";

const ContactUs = () => {
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
    </>
  );
};

export default ContactUs;

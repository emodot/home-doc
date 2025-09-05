import Section1 from "components/WhatWeDo/Section1";
import SEO from "../components/SEO";
import { useEffect } from "react";

const WhatWeDo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <SEO
        title="What We Do - Home Doc"
        description="Home Doc provides compassionate, reliable, and personalized elderly care services that promote comfort, independence, and peace of mind"
        name="Home Doc - Caring for the Ones Who Once Cared for Us"
        type="website"
      />
      <Section1 />
    </>
  );
};

export default WhatWeDo;

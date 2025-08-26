import Section1 from "components/Home/Section1";
import Section2 from "components/Home/Section2";
import Section3 from "components/Home/Section3";
import Section4 from "components/Home/Section4";
import SEO from "../components/SEO";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <SEO
        title="Compass Survey - Innovating Survey Solutions for Africa"
        description="Compass Survey Limited delivers topographic and offshore positioning services across Nigeria and Africa’s oil and gas industry. Backed by experienced personnel and advanced technology, we provide reliable, on-time solutions that consistently exceed client expectations."
        name="Compass Survey - Innovating Survey Solutions for Africa"
        type="website"
      />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </>
  );
};

export default Home;

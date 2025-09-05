import Section1 from "components/FAQs/Section1";
import FAQ from "components/FAQs/FAQ";
import SEO from "../components/SEO";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <SEO
        title="FAQs - Home Doc"
        description="Home Doc provides compassionate, reliable, and personalized elderly care services that promote comfort, independence, and peace of mind"
        name="Home Doc - Caring for the Ones Who Once Cared for Us"
        type="website"
      />
      <Section1 />
      <FAQ />
    </>
  );
};

export default Home;

import { motion } from "framer-motion";
import { fadeIn } from "../variants.js";
import Button from "./Inputs/Button";
import { useNavigate } from "react-router-dom";
import ErrorImg from "../assets/images/404-img.webp";

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-[#040F12] min-h-[100vh]">
      <div className="max-w-[1300px] md:w-[90%] 2xl:w-full m-auto pt-[5rem] xl:pt-[13rem] md:flex justify-between">
        <div className="md:pt-[3rem] mx-auto w-[90%] md:w-full mb-[4rem] md:m-0 basis-[45%]">
          <motion.h1
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.7 }}
            className="font-qanelas_b text-[36px] md:text-[46px] lg:text-[56px] leading-[44px] md:leading-[59px] lg:leading-[69px] text-white"
          >
            Oops! Looks like you've taken a wrong turn.
          </motion.h1>
          <motion.p
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.7 }}
            className="text-white font-publica_sans_m w-[80%] mt-[1rem] mb-[3rem]"
          >
            The page you are looking for does not exist. Please check the URL
            and try again.
          </motion.p>
          <motion.div
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.7 }}
          >
            <Button
              name={"Back to homepage"}
              theme={"transparent"}
              className={"border-white text-white"}
              onClick={() => navigate("/")}
            />
          </motion.div>
        </div>
        <div className="basis-[45%] pt-[3rem] md:pt-[15rem]">
          <motion.img
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            src={ErrorImg}
            className=""
            alt="404 img"
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

// import { ReactComponent as LogoWhite } from "assets/icons/logo-white.svg";
import Logo from "assets/images/logo-main.png";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CloseMenu } from "assets/icons/close-menu.svg";
import { useModal } from "layouts/MainLayout";
import Button from "./Inputs/Button";

const MobileMenu = () => {
  const navigate = useNavigate();
  const { closeMenu } = useModal();
  const menuOptions = [
    {
      name: "What we do",
      link: "/what-we-do",
    },
    {
      name: "Plans and Pricing",
      link: "/plans-and-pricing",
    },
    {
      name: "About us",
      link: "/about-us",
    },
    {
      name: "Contact Us",
      link: "/contact-us",
    },
  ];
  return (
    <div className="bg-white absolute top-0 right-0 md:w-[70%] w-full h-[100vh] py-[2rem] px-[1rem] z-20">
      <div className="flex justify-between h-[60px]">
        <img
          src={Logo}
          alt="logo"
          className="w-[11rem] lg:w-[9.5rem] cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
        <CloseMenu onClick={() => closeMenu()} />
      </div>
      <div className="mt-[5rem] pb-[1rem]">
        {menuOptions.map((item, index) => (
          <p
            key={index}
            className="font-publica_sans_r text-[20px] py-[1.5rem] text-brand_secondary cursor-pointer border-b border-b-neutral_stroke_1"
            onClick={() => {
              closeMenu();
              navigate(item.link);
            }}
          >
            {item.name}
          </p>
        ))}
      </div>
      <div className="absolute bottom-[15%] left-[2rem] w-full">
        <Button
          name={"Get Started"}
          theme={"secondary"}
          className={"w-[10rem]"}
          onClick={() => {
            navigate("/request");
          }}
        />
      </div>
    </div>
  );
};

export default MobileMenu;

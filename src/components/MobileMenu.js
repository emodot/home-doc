import { ReactComponent as LogoWhite } from "assets/icons/logo-white.svg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CloseMenu } from "assets/icons/close-menu.svg";
import { useModal } from "layouts/MainLayout";
import Button from "./Inputs/Button";

const MobileMenu = () => {
  const navigate = useNavigate();
  const { closeMenu } = useModal();
  const menuOptions = [
    {
      name: "Projects",
      link: "/projects",
    },
    {
      name: "Services",
      link: "/services",
    },
    {
      name: "About us",
      link: "/about-us",
    },
    // {
    //   name: "Blog",
    //   link: "/blog",
    // },
  ];
  return (
    <div className="bg-brand_primary absolute top-0 left-0 w-full h-[100vh] py-[2rem] px-[1rem] z-20">
      <div className="flex justify-between h-[60px]">
        <LogoWhite
          className="w-[8rem] cursor-pointer"
          onClick={() => {
            closeMenu();
            navigate("/");
          }}
        />
        <CloseMenu onClick={() => closeMenu()} />
      </div>
      <div className="mt-[5rem] pb-[1rem]">
        {menuOptions.map((item, index) => (
          <p
            key={index}
            className="font-publica_sans_r text-[20px] py-[1.5rem] text-[#ffffff] cursor-pointer border-b border-b-brand_secondary"
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
          name={"Get in Touch"}
          theme={"secondary"}
          arrowIcon={true}
          onClick={() => {
            closeMenu();
            navigate("/contact-us");
          }}
        />
      </div>
    </div>
  );
};

export default MobileMenu;

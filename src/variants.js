import { easeIn } from "framer-motion";

export const fadeIn = (direction, delay) => {
  // return {
  //   hidden: {
  //     y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
  //     x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
  //   },
  //   show: {
  //     y: 0,
  //     x: 0,
  //     opacity: 1,
  //     transition: {
  //       type: "spring",
  //       duration: 1.2,
  //       delay: delay,
  //       ease: easeIn,
  //     },
  //   },
  // };

  switch (direction) {
    case "up":
      return {
        hidden: { opacity: 0, y: 40 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            type: "tween",
            duration: 0.4,
            delay: delay,
            ease: easeIn,
          },
        },
      };
    case "down":
      return {
        hidden: { opacity: 0, y: -40 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            type: "tween",
            duration: 0.4,
            delay: delay,
            ease: easeIn,
          },
        },
      };
    case "left":
      return {
        hidden: { opacity: 0, x: 40 },
        show: {
          opacity: 1,
          x: 0,
          transition: {
            type: "tween",
            duration: 0.4,
            delay: delay,
            ease: easeIn,
          },
        },
      };
    case "right":
      return {
        hidden: { opacity: 0, x: -40 },
        show: {
          opacity: 1,
          x: 0,
          transition: {
            type: "tween",
            duration: 0.4,
            delay: delay,
            ease: easeIn,
          },
        },
      };
    default:
      return {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            type: "tween",
            duration: 0.4,
            delay: delay,
            ease: easeIn,
          },
        },
      };
  }
  // const isMobile = window.innerWidth < 768;
  // if (!isMobile) {
  // }
};

import React from "react";

const Button = ({
  onClick,
  className,
  name,
  children,
  loading = false,
  theme,
  disabled,
  arrowIcon = false,
  textClassName,
}) => {
  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className={`group transition-all duration-300
                ${
                  theme === "primary" && !disabled
                    ? "bg-brand_primary text-white hover:bg-brand_secondary"
                    : ""
                }
                ${
                  theme === "white" && !disabled
                    ? "bg-white text-[#030D10] hover:bg-brand_primary"
                    : ""
                }
                ${
                  theme === "primary" && disabled
                    ? "bg-[#ff727498] text-white cursor-not-allowed"
                    : ""
                }
                ${
                  theme === "secondary" && !disabled
                    ? "bg-brand_secondary text-[#192F36] hover:bg-brand_primary"
                    : ""
                }
                ${
                  theme === "secondary_plus" && !disabled
                    ? "bg-brand_secondary text-[#192F36] hover:bg-white"
                    : ""
                }
                ${
                  theme === "transparent" && !disabled
                    ? "border bg-[#f2f4f700] hover:bg-brand_secondary hover:border-none"
                    : ""
                }
                ${
                  theme === "invert_transparent" && !disabled
                    ? "border border-[#FFFFFF4D] bg-[#f2f4f700] hover:bg-white hover:border-none"
                    : ""
                }
                ${
                  theme === "full_transparent" && !disabled
                    ? "bg-[#f2f4f700] !p-0"
                    : ""
                }
        px-[20px] whitespace-nowrap flex justify-center items-center transition ease-in-out duration-500 rounded-[300px] h-[40px] w-fit text-14 font-obviously_m ${className}`}
    >
      {loading ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          width="24"
          height="24"
          viewBox="0 0 128 128"
        >
          <g>
            <path
              d="M75.4 126.63a11.43 11.43 0 01-2.1-22.65 40.9 40.9 0 0030.5-30.6 11.4 11.4 0 1122.27 4.87h.02a63.77 63.77 0 01-47.8 48.05v-.02a11.38 11.38 0 01-2.93.37z"
              fill={theme !== "transparent" ? "#053333" : "#053333"}
            />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 64 64"
              to="360 64 64"
              dur="1000ms"
              repeatCount="indefinite"
            />
          </g>
        </svg>
      ) : (
        <div className="flex items-center sm:gap-4 gap-3">
          <div
            className={`font-obviously_m text-14 transition-all duration-300 ${textClassName} ${
              theme === "primary"
                ? "text-white group-hover:text-white"
                : theme === "secondary"
                ? "text-white group-hover:text-white"
                : theme === "transparent"
                ? "text-brand_secondary group-hover:text-white"
                : theme === "invert_transparent"
                ? "text-white group-hover:text-brand_secondary"
                : theme === "white"
                ? "text-brand_secondary group-hover:text-white"
                : ""
            }`}
          >
            {name || children}
          </div>
          {arrowIcon && (
            <svg
              className={`transition-all duration-300 group-hover:-rotate-45`}
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.9216 12.1287L12.7509 17.2994C12.6454 17.4049 12.5023 17.4642 12.3531 17.4642C12.2039 17.4642 12.0609 17.4049 11.9554 17.2994C11.8499 17.1939 11.7906 17.0509 11.7906 16.9017C11.7906 16.7525 11.8499 16.6094 11.9554 16.5039L16.166 12.2933L4.79593 12.2938C4.64666 12.2938 4.50351 12.2345 4.39796 12.1289C4.29241 12.0234 4.23312 11.8802 4.23312 11.731C4.23312 11.5817 4.29241 11.4385 4.39796 11.333C4.50351 11.2274 4.64666 11.1682 4.79593 11.1682L16.166 11.1687L11.9554 6.958C11.8499 6.85251 11.7906 6.70943 11.7906 6.56025C11.7906 6.41106 11.8499 6.26799 11.9554 6.1625C12.0609 6.05701 12.2039 5.99775 12.3531 5.99775C12.5023 5.99775 12.6454 6.05701 12.7509 6.1625L17.9216 11.3332C18.0271 11.4387 18.0864 11.5818 18.0864 11.731C18.0864 11.8802 18.0271 12.0232 17.9216 12.1287Z"
                className={`transition-all duration-300 ${
                  theme === "primary"
                    ? "group-hover:fill-brand_secondary"
                    : theme === "secondary"
                    ? "group-hover:fill-brand_primary"
                    : theme === "transparent"
                    ? "group-hover:fill-white"
                    : theme === "invert_transparent"
                    ? "group-hover:fill-brand_secondary"
                    : theme === "white"
                    ? "group-hover:fill-brand_primary"
                    : ""
                }`}
                fill={
                  theme === "primary"
                    ? "#053333"
                    : theme === "transparent"
                    ? "#001B2B"
                    : theme === "invert_transparent"
                    ? "#ffffff"
                    : theme === "white"
                    ? "#ffffff"
                    : theme === "full_transparent"
                    ? "#053333"
                    : "#E7FF2A"
                }
              />
            </svg>
          )}
        </div>
      )}
    </button>
  );
};

export default Button;

// Button.propTypes = {
//   name: PropTypes.string,
//   onClick: PropTypes.func,
//   disabled: PropTypes.bool,
//   children: PropTypes.element,
//   theme: PropTypes.string,
//   loading: PropTypes.bool,
//   className: PropTypes.string,
// };

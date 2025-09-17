import React from 'react';
import PropTypes from 'prop-types';

const RadioButtonSelect = ({
  label,
  labelStyles,
  variant,
  onChange,
  isChecked,
  markerVariant,
  showLabel = true,
  showImage = false,
  imageSrc,
  imageAlt = '',
  imageClass,
  disabled,
}) => {
  return (
    <div
      className={`flex flex-col items-center ${
        variant || "border border-neutral_stroke_1 rounded-lg px-4 py-3 w-full"
      }`}
    >
      <label
        className={`${
          labelStyles || "text-[#183445]"
        } container font-publica_sans_l ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {showLabel ? label : ""}

        {showImage && (
          <img
            src={imageSrc}
            alt={imageAlt}
            className={`w-full ${imageClass}`}
          />
        )}

        <input
          type="checkbox"
          data-testid={label}
          onChange={onChange}
          checked={isChecked}
          disabled={disabled}
        />
        <span
          className={`${
            isChecked ? "checked-active" : "checked-inactive"
          } ${markerVariant} checkmark `}
        ></span>
      </label>
    </div>
  );
};

export default RadioButtonSelect;
RadioButtonSelect.propTypes = {
  label: PropTypes.any,
  showLabel: PropTypes.bool,
  labelStyles: PropTypes.string,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  markerVariant: PropTypes.string,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
  showImage: PropTypes.bool,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  imageClass: PropTypes.string,
};

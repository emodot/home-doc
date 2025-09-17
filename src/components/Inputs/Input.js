import useInputValidate from "hooks/useInputValidate";
import { useMemo } from "react";

const Input = ({
  label,
  id,
  disabled,
  variant,
  name,
  type,
  placeholder,
  value,
  defaultValue,
  maxLength,
  inputMode,
  max,
  pattern,
  onChange,
  readOnly,
  onKeyDown,
  showError,
  onBlur,
}) => {
  const { error, validate } = useInputValidate(showError);

  const inputError = useMemo(() => {
    return !(showError === false || !error);
  }, [error, showError]);

  const onBlurAction = () => {
    validate({ name, value });
    if (value && onBlur) {
      onBlur();
    }
  };

  return (
    <div className="mb-[1.5rem]">
      {label && (
        <label
          htmlFor={id}
          className={`
            ${disabled ? "bg-none" : "bg-white"}
            text-black mb-2 font-publica_sans_l pt-2 cursor-text ${variant}`}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder || ""}
        value={value}
        disabled={disabled}
        defaultValue={defaultValue}
        maxLength={maxLength}
        inputMode={inputMode}
        max={max}
        pattern={pattern}
        data-testid={`test-${id}`}
        aria-labelledby={id}
        onChange={onChange}
        readOnly={readOnly}
        autoComplete="off"
        onBlur={onBlurAction}
        //onKeyDown={() => setError('')}
        onKeyDown={onKeyDown}
        className={`${variant} 
            ${inputError ? "border-error" : "border-neutral_stroke_1"} 
            h-[50px] px-4 mt-2 text-brand_secondary text-14 w-full outline-0 border font-publica_sans_l hide_tap
            rounded-[10px] focus:border-brand_secondary focus:border
            ${
              disabled
                ? "bg-neutral_disabled border-neutral_stroke_2"
                : "bg-white"
            } 
          `}
      />
    </div>
  );
};

export default Input;

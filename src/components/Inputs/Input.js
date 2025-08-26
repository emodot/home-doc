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
            text-black mb-2 font-publica_sans_m pt-2 cursor-text ${variant}`}
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
        className={`border-b border-b-border_stroke_1 rounded-none ${variant} 
            ${inputError ? "border-b-error" : "border-b-border_stroke_1"} 
            h-[50px] px-4 mt-2 text-[#000000] lg:text-14 text-[12px] w-full outline-0 font-publica_sans_r hide_tap
            ${
              disabled
                ? "bg-neutral_disabled border-b-neutral_stroke_2"
                : "bg-[#00000000]"
            } 
          `}
      />
    </div>
  );
};

export default Input;

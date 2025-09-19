import React from 'react';

export default function TextArea({ id, name, placeholder, variant, label, value, onChange, readOnly, rows, maxLength, disabled, className }) {
    return (
      <div className={`mb-[3.5px]`}>
        {label && (
          <label
            htmlFor={id}
            className={`${disabled ? "bg-none" : "bg-white"}
                    text-black mb-2 font-publica_sans_l bg-white pt-2 cursor-text`}
          >
            {label}
          </label>
        )}
        <textarea
          id={id}
          name={name}
          rows={rows}
          maxLength={maxLength}
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder || ""}
          data-testid={`test-${id}`}
          aria-labelledby={id}
          readOnly={readOnly}
          value={value}
          className={`
                border-neutral_stroke_1 mt-2 p-4 text-[16px] sm:text-14 text-brand_secondary w-full outline-0 border font-publica_sans_r hide_tap
                rounded-[5px] focus:border-brand_secondary focus:border bg-white placeholder:text-14 ${className}`}
        />
      </div>
    );
}

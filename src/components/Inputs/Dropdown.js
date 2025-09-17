import React, { useEffect, useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Spinner from '../Spinner';
import { ReactComponent as ArrowDown } from 'assets/icons/arrow-down.svg';
import { ReactComponent as ArrowUp } from 'assets/icons/arrow-up.svg';

export default function Dropdown({
  label,
  id,
  options,
  onSelect,
  type,
  loading,
  optionVariant,
  variant,
  disabled,
  containerVariant,
  width,
  optionContainerVariant,
  selected,
  children,
  readOnly = true,
  placeholder,
  handleSearchChange,
  searchData,
  directSearch = true,
}) {
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState('');
  let ref = useRef();

  const listener = (e) => {
    if (!ref.current.contains(e.target)) setDisplay(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, []);

  useEffect(() => {
    setSearch(searchData);
  }, [searchData]);

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (!directSearch) handleSearchChange(e.target.value);
  };

  const searchOptions = useMemo(() => {
    return !search ? options : options?.filter((option) => option?.name?.toLowerCase().includes(search?.toLowerCase()));
  }, [options, search]);

  return (
    <section
      ref={ref}
      className={`
        mt-2 relative border cursor-pointer ${width} ${
        disabled ? "border-neutral_stroke_2" : ""
      } ${variant}
        ${
          display
            ? "border-x-brand_secondary rounded-t-[8px]"
            : "border-neutral_stroke_1 rounded-[8px]"
        }
      `}
    >
      <div
        className="relative dropdown-container"
        onClick={() => (disabled ? {} : setDisplay(!display))}
      >
        <input
          id={id}
          name={id}
          type="text"
          placeholder={placeholder || ""}
          disabled={disabled}
          label={label}
          value={selected}
          data-testid={`${id}-dropdown`}
          aria-labelledby={id}
          onChange={handleChange}
          readOnly={readOnly}
          autoComplete="off"
          className={`
            h-[50px] rounded-[8px] px-4 text-black text-14 w-full outline-0 font-publica_sans_l
            cursor-pointer font-normal hide_tap border-0 capitalize  truncate
            ${
              disabled
                ? "bg-neutral_disabled border-neutral_stroke_2"
                : "bg-white "
            }`}
        />
        {label && (
          <label
            htmlFor={id}
            className={`absolute left-[4px] text-black mb-2 block
            ${disabled ? "bg-none" : "bg-white"}
                    text-14 font-publica_sans_r px-1 pt-2 cursor-text`}
          >
            {label}
          </label>
        )}
        <div className="h-full absolute top-0 right-0 flex items-center px-[18.5px] cursor-pointer hide_tap">
          {display ? <ArrowUp fill="#205F74" /> : <ArrowDown fill="#205F74" />}
        </div>
      </div>
      {display && (
        <motion.div
          animate={{ opacity: 1, y: "0px" }}
          initial={{ opacity: 0, y: "-10px" }}
          data-testid="dropdown-modal"
          className={`${containerVariant} absolute left-[-1px] top-[100%] w-[100.3%] z-20 rounded-b-[8px] border-x border-b border-brand_secondary bg-white drop-shadow-md lg:drop-shadow-md`}
        >
          {type === "search" ? (
            <div>
              <input
                id="searh"
                name="search"
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleChange}
                className={`
                h-[40px] px-[16px] text-black text-14 w-[94%] outline-0 font-inter hide_tap
                rounded-[8px] font-publica_sans_r
              `}
              />
            </div>
          ) : (
            ""
          )}
          <div onClick={() => type !== "multi-select" && setDisplay(false)}>
            <div
              className={`${optionContainerVariant}  px-[16px] max-h-[216px] overflow-auto border-t border-t-neutral_stroke_2`}
            >
              {type === "select" &&
                options?.map((option) => (
                  <div
                    key={option?.id || option.value || option.name}
                    data-testid={option?.name}
                    onClick={() => {
                      onSelect({
                        name: option?.name,
                        value: option?.value || option.code,
                        // id: option.id,
                        // numVal: option.numVal,
                      });
                    }}
                    className={`${optionVariant} py-[11px] px-[20px] flex items-center justify-between
                    cursor-pointer hide_tap transition ease-in-out duration-500 hover:bg-[#F2F3F3]`}
                  >
                    <div className="flex items-center">
                      <p className="text-14 font-publica_sans_l capitalize ">
                        {option?.name}
                      </p>
                    </div>
                  </div>
                ))}
              {children}
            </div>
            <div
              className={`${optionContainerVariant} py-[8px] px-[16px] max-h-[216px] overflow-auto border-t-neutral_stroke_2`}
            >
              {type === "search" &&
                searchOptions?.map((option) => (
                  <div
                    key={option?.id || option?.name}
                    data-testid={option?.name}
                    onClick={() => {
                      onSelect({
                        name: option?.name,
                        value: option?.value || option.code,
                        id: option.id,
                      });
                      setSearch("");
                      setDisplay(false);
                    }}
                    className={`${optionVariant} py-[11px] px-[20px] flex items-center justify-between
                    cursor-pointer hide_tap transition ease-in-out duration-500 hover:bg-[#F2F3F3]`}
                  >
                    <div className="flex items-center">
                      <p className="text-16 font-publica_sans_r">{option?.name}</p>
                    </div>
                  </div>
                ))}
            </div>
            {loading && !options?.length && <Spinner />}
            {!loading && !options?.length && !children && (
              <p className="text-center font-publica_sans_r">No data found</p>
            )}
          </div>
        </motion.div>
      )}
    </section>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  children: PropTypes.any,
  id: PropTypes.string,
  type: PropTypes.string,
  onSelect: PropTypes.func,
  variant: PropTypes.string,
  optionVariant: PropTypes.string,
  optionContainerVariant: PropTypes.string,
  options: PropTypes.array,
  loading: PropTypes.bool,
  containerVariant: PropTypes.string,
  selected: PropTypes.any,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  width: PropTypes.string,
  handleSearchChange: PropTypes.func,
  searchData: PropTypes.string,
};

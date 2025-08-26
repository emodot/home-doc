/* eslint-disable max-len */
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from "utils/formatDate";
// import { ReactComponent as Time } from "assets/icons/time.svg";

export const DefaultDatepicker = ({
  showCalender = false,
  startDate,
  label,
  maxDate,
  minDate,
  onSelect,
  name,
  containerVariant,
  styles,
  showLabel = true,
  dateFormat,
  showTimeSelect,
  showTimeSelectOnly,
  timeCaption,
  placeholder,
  showTimeIcon = false,
  value,
  timeIntervals,
}) => {
  // const [labelStyles, setLabelStyles] = useState(false);

  const years = useMemo(() => {
    // let currentYear = new Date().getFullYear();
    let years = [];
    let startYear = 2024;
    while (startYear <= 2030) years.push(startYear++);
    return years;
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const selectedValue = value || startDate;

  return (
    <div className={`relative flex flex-col mb-[1.5rem]`}>
      {label && (
        <label
          htmlFor={name}
          className={`
            text-black bg-white mb-2 font-publica_sans_m cursor-text`}
        >
          {label}
        </label>
      )}
      <DatePicker
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex justify-between items-center px-3">
            <button
              className="cursor-pointer text-16"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              {"<"}
            </button>
            <select
              data-testid="test-year"
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
              className="text-[#000000] h-8 rounded-lg flex justify-center items-center focus:border outline-none w-16 px-0.5"
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              data-testid="test-month"
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
              className="text-[#000000] h-8 rounded-lg flex justify-center items-center focus:border outline-none"
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              className="cursor-pointer text-16"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              {">"}
            </button>
          </div>
        )}
        placeholderText={placeholder}
        selected={selectedValue}
        id={name}
        maxDate={maxDate}
        minDate={minDate}
        dateFormat={dateFormat}
        showTimeSelect={showTimeSelect}
        showTimeSelectOnly={showTimeSelectOnly}
        onChange={onSelect}
        timeIntervals={timeIntervals || 60}
        timeCaption={timeCaption}
        autoComplete="off"
        placeholder={`test-${name}`}
        // onBlur={() => {
        //   setLabelStyles(false);
        // }}
        // onFocus={() => {
        //   setLabelStyles(true);
        // }}
        data-testid={`test-${name}`}
        aria-labelledby={name}
        name={name}
        className={` ${styles} border-b-border_stroke_1 h-[50px] px-4 text-14 w-full text-[#000000] outline-0 border-b font-qanelas_r  hide_tap bg-[#00000000]`}
      />
      {showCalender && (
        <div className="absolute inset-y-0 right-4 items-center pl-3 pointer-events-none top-12">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 2H11.5V1.5C11.5 1.36739 11.4473 1.24021 11.3536 1.14645C11.2598 1.05268 11.1326 1 11 1C10.8674 1 10.7402 1.05268 10.6464 1.14645C10.5527 1.24021 10.5 1.36739 10.5 1.5V2H5.5V1.5C5.5 1.36739 5.44732 1.24021 5.35355 1.14645C5.25979 1.05268 5.13261 1 5 1C4.86739 1 4.74021 1.05268 4.64645 1.14645C4.55268 1.24021 4.5 1.36739 4.5 1.5V2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H13C13.2652 14 13.5196 13.8946 13.7071 13.7071C13.8946 13.5196 14 13.2652 14 13V3C14 2.73478 13.8946 2.48043 13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2ZM4.5 3V3.5C4.5 3.63261 4.55268 3.75979 4.64645 3.85355C4.74021 3.94732 4.86739 4 5 4C5.13261 4 5.25979 3.94732 5.35355 3.85355C5.44732 3.75979 5.5 3.63261 5.5 3.5V3H10.5V3.5C10.5 3.63261 10.5527 3.75979 10.6464 3.85355C10.7402 3.94732 10.8674 4 11 4C11.1326 4 11.2598 3.94732 11.3536 3.85355C11.4473 3.75979 11.5 3.63261 11.5 3.5V3H13V5H3V3H4.5ZM13 13H3V6H13V13Z"
              fill="#748181"
            />
          </svg>
        </div>
      )}
      {/* {showTimeIcon && <Time className="absolute right-4 top-12" />} */}
    </div>
  );
};

DefaultDatepicker.propTypes = {
  showCalender: PropTypes.bool,
  showTimeIcon: PropTypes.bool,
  label: PropTypes.string,
  styles: PropTypes.string,
  showLabel: PropTypes.bool,
  dateFormat: PropTypes.any,
  maxDate: PropTypes.any,
  minDate: PropTypes.any,
  containerVariant: PropTypes.string,
  onSelect: PropTypes.func,
  startDate: PropTypes.any,
  name: PropTypes.string,
  showTimeSelect: PropTypes.bool,
  showTimeSelectOnly: PropTypes.bool,
  timeCaption: PropTypes.string,
  value: PropTypes.any,
  timeIntervals: PropTypes.any,
};

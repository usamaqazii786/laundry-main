import React, { useState, useRef, useEffect } from "react";
import "./Customselect.css"; // Import the CSS for styles
import { Link } from "react-router-dom";

const CustomSelect = ({
  handleChange1,
  values,
  disabledfield,
  FuctionUpdatenew,
  FuctionUpdatedelivery_date,
  TimeOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(
    values !== undefined ? values : `${values?.start}-${values?.end}`
  );
  const menuRef = useRef(null);

  // Toggle the dropdown menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleTimeSelect = (time) => {
    const formattedTime = `${time?.start}-${time?.end}`;
    if (selectedTime !== formattedTime) {
      // setFuctionUpdate(true)
      setSelectedTime(formattedTime);
      handleChange1({
        target: { name: "deliveryTime", value: formattedTime }, // Pass formattedTime as a string
      });
    }
    setIsOpen(false);
    // setTimeout(() => {
    //   setFuctionUpdate(false);
    // }, 1000);
  };
  console.log(selectedTime, TimeOptions, "FuctionUpdatedelivery_date--->");
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (disabledfield) {
      setSelectedTime("Select...");
    }
  }, [disabledfield]);
  useEffect(() => {
    if (FuctionUpdatenew) {
      setSelectedTime("Select...");
    }
  }, [FuctionUpdatenew]);
  useEffect(() => {
    if (FuctionUpdatedelivery_date) {
      setSelectedTime("Select...");
    }
  }, [FuctionUpdatedelivery_date]);
  const selectedSlots = TimeOptions?.eco_friendly_routes?.map(
    (e) => `${e?.start}-${e?.end}`
  );

  // Check if selectedTime exists in selectedSlots
  const eco_friendlySelected = selectedSlots?.includes(selectedTime);

  return (
    <div className="timeslot-picker--slot">
      <p className="font-14-21 text-white mb-0 timeslot-label">Select time</p>
      <div className="menu" id="pickup-time" ref={menuRef}>
        <div
          className="menu-header2 font-16-24 deep-black fw-bold d-flex flex-row align-items-center flex-grow-1"
          onClick={toggleMenu}
        >
          <img
            alt="Select a timeslot"
            src="https://app.laundryheap.com/images/icons/clock_black.svg"
            height="16"
            width="16"
            className="me-16"
          />
          <span>{selectedTime ? selectedTime : "Select..."}</span>
          {eco_friendlySelected && (
            <img
              alt="Green timeslot"
              src="https://app.laundryheap.com/images/icons/leaf_green.svg"
              height="16"
              width="16"
              className="ms-2"
            />
          )}
        </div>
        {isOpen && (
          <div className="menu-body">
            {isOpen && TimeOptions?.eco_friendly_routes?.length > 0 ? (
              <>
                {/* Eco-Friendly Timings Section */}
                <div className="font-12-20 medium-grey fw-bold text-uppercase">
                  ECO-FRIENDLY TIMINGS
                </div>
                {Array?.isArray(TimeOptions?.eco_friendly_routes) &&
                  TimeOptions?.eco_friendly_routes?.map((time, index) => (
                    <Link
                      to="#"
                      key={index}
                      className={`font-16-24 deep-black d-flex p-3 flex-row justify-content-start align-items-center dropdown-item text-dark ${
                        selectedTime === `${time.start}-${time.end}`
                          ? "active"
                          : "text-dark"
                      }`}
                      onClick={(e) => {
                        e.preventDefault(); // Prevents reload
                        handleTimeSelect(time);
                      }}
                    >
                      <span className="me-3" style={{ textTransform: "none" }}>
                        {time.start}-{time.end}
                      </span>
                      <img
                        alt="Green timeslot"
                        src="https://app.laundryheap.com/images/icons/leaf_green.svg"
                        height="16"
                        width="16"
                        className="ms-2"
                      />
                    </Link>
                  ))}

                {/* Priority Timings Section */}
                <div className="font-12-20 medium-grey fw-bold text-uppercase">
                  PRIORITY TIMINGS
                </div>
                {Array?.isArray(TimeOptions?.priority_times) &&
                  TimeOptions?.priority_times?.map((time, index) => (
                    <Link
                      to="#"
                      key={index}
                      className={`font-16-24 deep-black d-flex p-3 flex-row justify-content-start align-items-center dropdown-item text-dark ${
                        selectedTime === `${time.start}-${time.end}`
                          ? "active"
                          : "text-dark"
                      }`}
                      onClick={(e) => {
                        e.preventDefault(); // Prevents reload
                        handleTimeSelect(time);
                      }}
                    >
                      <span className="me-3" style={{ textTransform: "none" }}>
                        {time?.start}-{time?.end}
                      </span>
                    </Link>
                  ))}
              </>
            ) : (
              <div className="loading-text101 text-center">Loading...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;

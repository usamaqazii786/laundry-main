import React, { useState, useRef, useEffect } from "react";
import "./Customselect.css"; // Import the CSS for styles
import { Link } from "react-router-dom";

const DeliverySelect = ({TimeOptions}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Toggle the dropdown menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handledateSelect = (date) => {
    const formatteddate = `${date?.start}-${date?.end}`;
    console.log(formatteddate);
    // if (selecteddate !== formatteddate) {
    //   setSelecteddate(formatteddate);
    //   handleChange1({
    //     target: { name: "deliverydate", value: formatteddate },
    //   });
    // }
    setIsOpen(false);
  };

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

  return (
    <div className="dateslot-picker--slot">
      <p className="font-14-21 text-white mb-0 dateslot-label">Select Pick-up Date</p>
      <div className="menu" id="pickup-date" ref={menuRef}>
        <div
          className="menu-header font-16-24 deep-black fw-bold d-flex flex-row align-items-center flex-grow-1"
          onClick={toggleMenu}
        >
          <img
            alt="Select a dateslot"
            src="https://app.laundryheap.com/images/icons/clock_black.svg"
            height="16"
            width="16"
            className="me-16"
          />
          <span>{"one"}</span>
          <span>{"one"}</span>
          <span>{"one"}</span>
          <img
            alt="Select a dateslot"
            src="https://app.laundryheap.com/images/icons/leaf_green.svg"
            height="16"
            width="16"
            className="ms-8"
          />
        </div>
        {isOpen && (
          <div className="menu-body">
            <div className="font-12-20 medium-grey fw-bold text-uppercase">
              ECO-FRIENDLY TIMINGS
            </div>
            {Array?.isArray(TimeOptions) &&
              TimeOptions?.map((day, index) => (
                <Link
                  to="#"
                  key={index}
                  className={`font-16-24 deep-black d-flex p-3 flex-row justify-content-start align-items-center dropdown-item text-dark ${
                    day ? "active" : "text-dark"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handledateSelect(day);
                  }}
                >
                  <span className="me-3" style={{ textTransform: "none" }}>
                    {day}
                  </span>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliverySelect;


import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import the CSS for PhoneInput
import axiosInstance from "../Https/axiosInstance";
import { toast } from "react-toastify";

const Contact = ({handleVerifyModal, setVerifyID}) => {
  // Single state object for all form values
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    number: "",
    firstName: "",
    lastName: "",
    companyName: "",
    textNumber: "",
    email: "",
    contactType: "Individual", // To store selected contact type
  });

  // Handle input change for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle phone number change
  const handlePhoneChange = (phone) => {
    setFormData((prevData) => ({
      ...prevData,
      number: phone.replace(/^\+/, ""),
    }));
  };

  // Handle checkbox change to mimic radio button behavior
  const handleCheckboxChange = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      contactType: prevData.contactType === type ? "" : type,
    }));
  };
  const handleFirstSubmit = () => {
    if (!formData) {
      setLoader(true);
      const formData = new FormData();
      formData.append("first_name", formData?.firstName);
      formData.append("last_name", formData?.firstName);
      formData.append("phone_number", formData?.number);

      axiosInstance
        .post(`detailed-place-order`, formData)
        .then((res) => {
          console.log(res, "order");
          toast.success(res?.data?.response);
          setLoader(false);
          setVerifyID(res?.data?.data?.id);
          handleVerifyModal();
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.message);
          setLoader(false);
        });
    }
  };

  return (
    <>
      <div className="fontsame container">
        <h2 className="fontsame text-start mt-4">Contact</h2>
        <div className="row">
          <h5 className="text-start mb-0">How can we contact you?</h5>
          <p className="text-start">
            We need your contact information to keep you updated about your
            order.
          </p>

          <div className="m-0 px-4 col-lg-6">
            <div className="form-check text-start py-3">
              <input
                className="form-check-input mt-1"
                type="checkbox"
                id="individual"
                name="contactType"
                checked={formData.contactType === "Individual"}
                onChange={() => handleCheckboxChange("Individual")}
              />
              <label className="form-check-label" htmlFor="individual">
                Individual
              </label>
            </div>
          </div>

          <div className="m-0 px-4 col-lg-6">
            <div className="form-check text-start py-3">
              <input
                className="form-check-input mt-1"
                type="checkbox"
                id="company"
                name="contactType"
                checked={formData.contactType === "Company"}
                onChange={() => handleCheckboxChange("Company")}
              />
              <label className="form-check-label" htmlFor="company">
                Company
              </label>
            </div>
          </div>

          <div className="col-lg-12 form-group mt-3">
            <input
              className="fontsame form-control p-4 rounded text-white"
              placeholder="First name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="col-lg-12 form-group mt-3">
            <input
              className="fontsame form-control p-4 rounded text-white"
              placeholder="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="col-lg-12 form-group mt-3">
            <input
              className="fontsame form-control p-4 rounded text-white"
              placeholder="Company name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>

          <div className="col-lg-12 form-group mt-3">
            <input
              className="fontsame form-control p-4 rounded text-white"
              placeholder="Text number (optional)"
              name="textNumber"
              value={formData.textNumber}
              onChange={handleChange}
            />
          </div>

          <div className="col-lg-12 text-secondary mt-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="form-group w-100">
                <PhoneInput
                  inputClass="w-100"
                  country="ae"
                  value={formData.number}
                  onChange={handlePhoneChange}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-12 form-group mt-3">
            <input
              className="fontsame form-control p-4 rounded text-white"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-lg-12 form-group mt-3">
            <Button
              type="button"
              variant="info"
              onClick={handleFirstSubmit}
              className="text-white w-100 py-4"
              disabled={loader} // Disable the button while loading
            >
              {loader ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Loading...
                </>
              ) : (
                "Varefy"
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

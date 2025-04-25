/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import OrderPageSection from "../components/Ordernow/OrderPageSection";
// import OrderOnline from "../components/OrderOnline/Order";
import { Button, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axiosInstance from "../components/Https/axiosInstance";
import { useNavigate } from "react-router-dom";
import OrderOnlineModals from "../components/OrderOnline/OrderOnlineModals";
import { useOrder } from "../OrderProvider";
// import '../App.css'
const OrderPage = () => {
  const [VerifyID, setVerifyID] = useState();
  const [VerifyModalShow, setVerifyModalShow] = useState(false);
  // @ts-ignore
  const [Resendapi, setResendapi] = useState(false);
  const [loader, setLoader] = useState(false);
  const [timer, setTimer] = useState(30); // Initial timer value
  const [isDisabled, setIsDisabled] = useState(false);

  const { currentIndex, show2, handleClose2 } = useOrder();
  const navigate = useNavigate(); // Initialize navigate
  const VerifyEmail = localStorage.getItem("email");
  const VerifyType = localStorage.getItem("contact_type");
  const formData = localStorage.getItem("formData");
  const newformData = JSON.parse(formData);
  const handleClick = () => {
    setIsDisabled(true);
  };
  const [otp, setOtp] = useState(Array(6).fill(""));
  const handleVerifyModalClose = (e) => {
    e.preventDefault();
    setVerifyModalShow(false);
  };

  const handleVerifyModal = () => {
    setVerifyModalShow(true);
  };

  const handleVerifyChange = (element, index) => {
    console.log(element, index, "verify");
    if (isNaN(element.value)) return false;

    setOtp([...otp?.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus on next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleOtp = (e) => {
    e.preventDefault();
    console.log(VerifyID, "VerifyID");
    console.log("Entered OTP is: ", otp);
    const isOtpComplete = otp.every((element) => element !== "");
    console.log(otp.join(""), 'otp.join("")');
    setLoader(true);

    if (isOtpComplete) {
      const formData = new FormData();
      formData.append("otp", otp.join(""));
      formData.append("email", VerifyEmail);
      formData.append("contact_type", VerifyType);

      axiosInstance
        .post("verify-otp", formData)
        .then((res) => {
          setTimeout(() => {
            console.log("Before clearing sessionStorage:", sessionStorage);
            
            sessionStorage.clear(); // ✅ Explicitly clear session storage
            localStorage.clear(); // Clear local storage
          
            console.log("After clearing sessionStorage:", sessionStorage);
          
            sessionStorage.setItem("sessionStarted", "true"); // Reset sessionStarted
            navigate("/");
          }, 1000);          
          console.log(res?.response, "order----->");
          toast.success(res?.data?.response);
          // toast.success(res?.response);
          setLoader(false);
          setOtp(Array(6).fill("")); // Reset OTP fields
          handleVerifyModalClose();
        })
        .catch((err) => {
          console.log(err, err?.response, "err--->");
          toast.error(
            err?.response?.data?.message
              ? err?.response?.data?.message
              : err?.response
          );
          // toast.error(err?.response);
          setLoader(false);
          setOtp(Array(6).fill("")); // Reset OTP fields
        });
    } else {
      setLoader(false);
      // handleVerifyModalClose()
      toast.error("Please Verify Your OTP First");
    }
  };

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsDisabled(false); // Enable the button when the timer reaches 0
    }
    // Cleanup interval
    return () => {
      clearInterval(countdown);
    };
  }, [timer, Resendapi]);

  console.log(currentIndex, "currentIndex");
  const pathname = window.location.pathname;
  return (
    <>
      <Layout>
        <div className="PaddingDive10"/>
        {pathname !== "/order" && (
          <button
            defaultActiveKey={"VIEW PRICES"}
            id="Place-Your-Order"
            className="btn open_download_popup py-3 px-5 rounded btn-theme Place_Your_Order fs-2 d-block mx-auto mt-3"
            // onClick={handleSelect}
          >
            {currentIndex ? "Place Your Order" : "VIEW PRICES"}
          </button>
        )}

        {!currentIndex ? (
          <OrderPageSection
            handleVerifyModal={handleVerifyModal}
            setVerifyID={setVerifyID}
            setTimer={setTimer}
            ResentTimer={timer}
            VerifyID={VerifyID}
            handleVerifyModalClose={handleVerifyModalClose}
            VerifyModalShow={VerifyModalShow}
          />
        ) : (
          <OrderOnlineModals handleClose={handleClose2} show={show2} />
        )}
      </Layout>
      <Modal
        show={VerifyModalShow}
        // onHide={handleVerifyModalClose}
        id={"orderFormmodal"}
        className="verifyModal rounded"
      >
        <Modal.Header
          className="verify-header shadow pb-0"
          closeButton
          onClick={handleVerifyModalClose}
        ></Modal.Header>
        <form
          className="verify-Form d-flex justify-content-center align-items-center flex-column rounded"
          onSubmit={handleOtp}
        >
          <div className="Verify-body rounded">
            <div className="row m-0 p-0">
              <h3 className="col-lg-12 mb-2 mt-3 text-center fw-bold text-white">
                Please enter OTP to finalize your order
              </h3>
              <p className="col-lg-12 mb-3 text-center fw-bold text-white">
                An OTP has been sent to your registered phone number: *******
                {newformData?.number?.slice(-3)}
              </p>
            </div>
            <div className="d-flex justify-content-center mb-4 gap-2">
              {Array.isArray(otp) &&
                otp.map((data, index) => {
                  return (
                    <input
                      className="form-control mx-1 text-center bg-light text-dark shadow rounded focus:ring-2 focus:ring-blue-500 hover:scale-105 transition-transform"
                      type="tel"
                      pattern="[0-9]*"
                      inputmode="numeric"
                      name="otp"
                      maxLength="1"
                      key={index}
                      value={data}
                      onChange={(e) => {
                        handleVerifyChange(e.target, index);
                      }}
                      onFocus={(e) => e.target.select()}
                      style={{ width: "52px", height: "55px" }}
                    />
                  );
                })}
            </div>
          </div>
          <Modal.Footer className="w-100 px-4">
            <Button
              type="button"
              disabled={isDisabled}
              onClick={() => {
                handleClick();
                setResendapi(true);
                localStorage.setItem("Resendapi", "true");
                setTimeout(() => {
                  setResendapi(false);
                  localStorage.setItem("Resendapi", "false"); // Set to false
                }, 1000);
              }}
              className="text-white py-3 px-5 bg-black"
              style={{ width: "53%" }} // Disable button if timer is greater than 0
            >
              {timer > 0 ? `Resend (${timer}s)` : "Resend"}
              {/* Display remaining time on button */}
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="text-white shadow-lg"
              style={{ width: "45%" }}
              disabled={loader} // Disable button while loading
            >
              {loader ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
              ) : (
                "Verify"
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default OrderPage;

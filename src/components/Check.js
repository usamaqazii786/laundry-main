/* eslint-disable */
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import axiosInstance from './Https/axiosInstance';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { toast } from 'react-toastify';

const Check = ({ handleClose, show }) => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");


  const validatePhoneNumber = (phone) => {
    const phoneNumber = parsePhoneNumberFromString(phone);
    return phoneNumber && phoneNumber.isValid() && phoneNumber.isPossible();
  };


  const handleMessage = async (e) => {
    console.log(`+${number}`, "number")
    e.preventDefault();

    if (!validatePhoneNumber(number)) {
      toast.error('Invalid phone number. Please check the number and try again.');
      setError('Invalid phone number. Please check the number and try again.');
      return;
    }
    setError('');


    try {
      const Data = new FormData();
      Data.append("phone_number", number)
      const res = await axiosInstance.post('send-sms', Data);
      console.log(res, "send message")
      toast.success(res?.data?.message);
      setNumber()
    } catch (error) {
      toast.error(error?.message);
      console.log(error, "send message error")
    }
  };

  return (
    <>

<Modal
  fullscreen={"xxl-down"}
  show={show}
  onHide={handleClose}
  keyboard={false}
  className="fixed-top" // Added this class to fix the modal at the top
  style={{
    top: 0,
    marginTop: 0,
    zIndex: 1050, // Ensure the modal appears above other elements
    width: '100%', // Make the modal span the full width of the screen
  }}
>
  <div
    className="row pop_up_bg pt-md-0 hidden fade-in text-center justify-content-center align-items-center"
    style={{ display: "flex" }}
  >
    <i
      id="close_download_popup"
      className="fas fa-times save_c"
      onClick={handleClose}
    />
    <div className="col-lg-5 col-11 order-2 order-lg-1 pop_up_box text-center">
      <div className="cta_content_wrap d-inline-block text-left">
        <h2>Join our Community</h2>
        <p>
          Let us SMS you a direct link to install our app as well as a <br />{" "}
          <span className="bold">30% offer code</span>
        </p>
        <div
          className="wpcf7 js"
          id="wpcf7-f347-o1"
          lang="en-US"
          dir="ltr"
        >
          <form onSubmit={handleMessage} className="wpcf7-form init">
            <PhoneInput
              country={"ae"}
              value={number}
              onChange={(phone) =>
                setNumber(`+${phone.replace(/^\+/, "")}`)
              }
            />
            <p />
            <button
              className="gradient rounded text-white p-4 w-25"
              id='JionBtn'
              type="submit"
            >
              Send
            </button>

            <div
              className="wpcf7-response-output"
              aria-hidden="true"
            />
          </form>
        </div>
        <p className="mb-1 pt-3 bold">Or view our app at</p>
        <div className="d-md-block d-sm-none pb-5">
          <a
            href="https://play.google.com/store/apps/details?id=com.laundryportal.app"
            target="_blank"
            className="me-1"
          >
            <img
              width={800}
              height={234}
              className="download-btn left save_c entered lazyloaded"
              src="../../public/assets/wp-content/themes/byEnero/img/IconGoogleplay-min.png"
              alt="Download Play Store"
              data-lazy-src="../../public/assets/wp-content/themes/byEnero/img/IconGoogleplay-min.png"
              data-ll-status="loaded"
            />
          </a>
          <a
            href="https://apps.apple.com/us/app/laundry-portal/id1457375679?ls=1"
            target="_blank"
          >
            <img
              width={800}
              height={237}
              className="download-btn right save_c entered lazyloaded"
              src="../../public/assets/wp-content/themes/byEnero/img/appstore-badge-min.png"
              alt="Download App Store"
              data-lazy-src="../../public/assets/wp-content/themes/byEnero/img/appstore-badge-min.png"
              data-ll-status="loaded"
            />
          </a>
        </div>
      </div>
    </div>
    <div className="col-lg-4 col-6 order-1 order-lg-2 text-left ml-4">
      <img
        width={400}
        height={493}
        className="img-responsive pop_up_img entered lazyloaded"
        src="../../public/assets/wp-content/themes/byEnero/img/Laundry-service-dual-view.png"
        alt="Laundry Portal Near you download"
        data-lazy-src="../../public/assets/wp-content/themes/byEnero/img/Laundry-service-dual-view.png"
        data-ll-status="loaded"
      />
    </div>
  </div>
</Modal>

    </>

  )
}
export default Check
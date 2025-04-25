/* eslint-disable */
import React from "react";
import Modal from "react-bootstrap/Modal";
// Remove this line:
import "react-phone-input-2/lib/style.css";
import DownloadButton from "../DownloadButton";
const CustomModals = ({ handleClose, show }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        id={"CustomModalsmain"}
        className="w-100"
        style={{
          top: 0,
          zIndex: 1050,
          padding: 0,
          width: "100%",
        }}
      >
        <div className="row newContainerMain">
          <img
            src="./close12.png"
            alt="close12"
            onClick={handleClose}
            id={"close_newContainerMain"}
          />
          <div
            className="d-md-block d-none col-lg-12"
            style={{ marginTop: 65 }}
          >
            <h1 class="gradient-heading">ORDER NOW</h1>
          </div>
          <div className="cardmaindiv">
            <div className="d-md-none d-block py-5 pe-md-0 pe-5">
              <h1 class="gradient-headingmobile">ORDER NOW</h1>
            </div>

            <div className="col-lg-4 mx-md-4 w-100 leftConatinerborder">
              <p className="pt-5 cartToptext d-md-block d-block">
               <h1 className="fromText">FROM APP</h1>
              </p>
              {/* <p
                className="Scaninstall  d-md-none d-block"
                style={{ fontWeight: 600, paddingTop: 15 }}
              >
                Scan this QR code to install
              </p> */}
               <div style={{border:"2px solid #65C7FC",width:"75%", borderRadius:6,display:"flex",justifyContent:"center",alignItems:"center"}} className="m-auto pb-2 pt-2 px-2 websiteWB300">
         <img src="./icons.png" alt="" width={30} height={30}/><div style={{fontSize:22,textTransform:"uppercase"}}>&nbsp;30% off with code <span style={{color:"#65C7FC"}}>wb30</span></div>
         </div>
              <div className="QRScanDiv">
                <p className="p-2 rounded GroupDivMobile d-md-none d-block">
                  <DownloadButton btnText={"Install Now"} />
                </p>
                <p className="bg-light p-2 rounded GroupDiv d-md-block d-none">
                  <img
                    src="./WhatsAppImage.png"
                    alt=""
                    style={{ width: "160px", height: "160px" }}
                  />
                </p>
              </div>
              <div className="mx-2 pb-5 d-block">
                <div className="mx-5">
                  <h4 className="instantlyh4 d-md-none d-block">
                    <img
                      src="./check.png"
                      alt=""
                      width={"24px"}
                      height={"24px"}
                    />
                    &nbsp;&nbsp;&nbsp;30% off your first order
                  </h4>
                  <h4 className="instantlyh4">
                    <img
                      src="./check.png"
                      alt=""
                      width={"24px"}
                      height={"24px"}
                    />
                    &nbsp;&nbsp;&nbsp;Select your preferred vendor
                  </h4>
                  <h4 className="instantlyh4">
                    <img
                      src="./check.png"
                      alt=""
                      width={"24px"}
                      height={"24px"}
                    />
                    &nbsp;&nbsp;&nbsp;Browse discounts & offers
                  </h4>
                  <h4 className="instantlyh4">
                    <img
                      src="./check.png"
                      alt=""
                      width={"24px"}
                      height={"24px"}
                    />
                    &nbsp;&nbsp;&nbsp;Live chat support
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mx-md-4 w-100 rightConatinerborder">
              <p className="pt-5 cartToptext2 d-md-block d-none">
              <h1 className="fromText">FROM WEBSITE</h1>
                {/* <img
                  src="./Place an order directl.png"
                  alt=""
                  width={"100%"}
                  height={"100%"}
                  className="cartToprighttexttwo px-4"
                /> */}
              </p>
              <p className="pt-5 cartToptext2 d-md-none d-block">
              <h1 className="fromText">FROM WEBSITE</h1>
                {/* <img
                  src="./ORDER VIA OUR WEBSITE.png"
                  alt=""
                  width={"100%"}
                  height={"100%"}
                />
                <img
                  src="./Place an order directly from our website.png"
                  alt=""
                  width={"100%"}
                  height={"100%"}
                  className="cartToptextone pt-5 px-4"
                /> */}
              </p>
              <p className="d-md-block d-none">
                <a
                  href={"/order"}
                  className={`btn btn-primary zoom Customgradient1`}
                >
                  order now
                </a>
              </p>
              <p className="d-md-none d-block mt-4">
                <a
                style={{marginTop:'10px'}}

                  href={"/order"}
                  className={`btn btn-primary zoom mobiledownload2`}
                >
                  order now
                </a>
              </p>
              <div className="mx-5  mb-md-0 mb-5 pb-md-0 pb-1">
                <h4 className="instantlyh4">
                  <img
                    src="./check.png"
                    alt=""
                    width={"24px"}
                    height={"24px"}
                  />
                  &nbsp;&nbsp;&nbsp;Order instantly via website
                </h4>
                <h4 className="instantlyh4">
                  <img
                    src="./closse.png"
                    alt=""
                    width={"24px"}
                    height={"24px"}
                  />
                  &nbsp;&nbsp;&nbsp;30% off your first order
                </h4>
                <h4 className="instantlyh4">
                  <img
                    src="./closse.png"
                    alt=""
                    width={"24px"}
                    height={"24px"}
                  />
                  &nbsp;&nbsp;&nbsp;Select your preferred vendor
                </h4>
                <h4 className="instantlyh4">
                  <img
                    src="./closse.png"
                    alt=""
                    width={"24px"}
                    height={"24px"}
                  />
                  &nbsp;&nbsp;&nbsp;Browse discounts & offers
                </h4>
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default CustomModals;

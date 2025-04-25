/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axiosInstance from "./Https/axiosInstance";
import { Oval } from "react-loader-spinner";
import Loader from "./Loader/Loader";
import { useNavigate } from "react-router-dom";
import Check from "./Check";
import VideoModal from "./Modal";
import HowDoes from "./HowDoes";
import DownloadButton from "./DownloadButton";
import Sliderbutton from "./Sliderbutton";
import InstallButton from "./InstallButton";

const Packages = ({idPackages}) => {
  const [modalShow, setModalShow] = useState(false);
  const [Collapse, setCollapse] = useState(false);
  const [Items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [service, setServices] = useState([]);
  const [pageLoader, setPageLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getService = async () => {
    setPageLoader(true);
    await axiosInstance
      .get("cards")
      .then((response) => {
        console.log(response, "card");
        if (response?.data?.status) {
          setServices(response?.data);

          setPageLoader(false);
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log(err);
        setPageLoader(false);
      });
  };

  useEffect(() => {
    setPageLoader(true);
    getService();
  }, []);

  return (
    <>
      <section id="howdoesitwork" className="background_dark">
        <div className="container clr" >
          <section id="prices" className="text-center">
            <h2 className="dborder bblue">Our Pricing</h2>
            <h3 className="text-center">
              Get <span className="bold gradient_text">30% </span>
              off your first order with promo code
              <span className="bold gradient_text">&nbsp;WB30 </span>
            </h3>
            {pageLoader ? (
              <div className="d-flex justify-content-center">
                <Oval
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : (
              <div
                className="myclass d-md-flex flex-md-wrap d-block"
                style={{
                  justifyContent: "space-between",
                }}
              >
                {service?.data?.map((ser) => (
                  <div
                    className={`col-lg-n p-5 col-12  my-5 ${
                      Collapse === true && ser?.title === "Wash & Fold"
                        ? "price_tab_wash"
                        : "price_tab"
                    }`}
                    key={ser?.id}
                  >
                    <div>
                      <div>
                        <img
                          className="price_images"
                          height="auto"
                          width="100%"
                          src={ser?.image ? ser?.image : "/images/img10.png"}
                          alt={ser?.title}
                        />
                      </div>
                      <div className="price_tab_content">
                        <div className={"h2_prices"}>{ser?.title}</div>

                        {ser?.title === "Other Services" ? (
                          <>
                            <br />
                            <br />
                          </>
                        ) : ser?.title === "Carpet Cleaning" ||
                          ser?.title === "Curtain Cleaning" ? (
                          <>
                            <br />
                            <br />
                            <p
                              className="font-italic"
                              style={{ fontStyle: "italic" }}
                            >
                              {ser?.description}
                            </p>
                          </>
                        ) : ser?.description ===
                          "Fill our Laundry Portal bags as full as you can and have everything washed and folded for a fixed price. Please note items will not be pressed." ? (
                          <>
                            <br />
                            <p
                              className="font-italic"
                              style={{ fontStyle: "italic" }}
                            >
                              {ser?.description}
                            </p>
                          </>
                        ) : (
                          <p className="font-italic">{ser?.description}</p>
                        )}
                        {console.log(ser, "ser==>")}
                        {ser?.items && (
                          <>
                            <div>
                              {ser?.title === "Carpet Cleaning" ||
                              ser?.title === "Curtain Cleaning" ||
                              ser?.title === "Other Services" ? (
                                <div>
                                  {ser?.items.map((item, index) => (
                                    <div
                                      className={
                                        item?.name === "Bag" ||
                                        item?.name === "Shoes" ||
                                        item?.name === "Mattress" ||
                                        item?.name === "Alteration"
                                          ? "margin202"
                                          : null
                                      }
                                      key={index}
                                    >
                                      {item?.name === "Bag" ||
                                      item?.name === "Shoes" ||
                                      item?.name === "Mattress" ||
                                      item?.name === "Alteration" ? (
                                        <ul className="text-dark m-0 ps-2">
                                          <li className="m-0">{item?.name}</li>
                                        </ul>
                                      ) : (
                                        <>
                                          <h3 className="text-dark fw-bold m-0">
                                            AED {item?.price}
                                          </h3>
                                          <p className="text-dark">
                                            {item?.name}
                                          </p>
                                        </>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <table border={0}>
                                  <tbody>
                                    {ser?.items.map((item, index) => (
                                      <tr key={index}>
                                        <td>{item?.name}</td>
                                        <td>AED {item?.price}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              )}
                            </div>

                            <div
                              className={`${
                                Collapse === true &&
                                (ser?.title === "Wash & Fold" ||
                                  ser?.title === "Other Title")
                                  ? "price_button_wrap_wash"
                                  : "price_button_wrap"
                              }`}
                            >
                              <div className="pb-3">
                                View full price list in our app
                              </div>
                              {ser?.title === "Wash & Fold" ||
                              ser?.title === "Other Title" ? (
                                <>
                                  <div
                                    className="btn open_download_popup zoom rounded black_btn d-md-inline-block"
                                    onClick={() => setCollapse(!Collapse)}
                                  >
                                    {loader ? <Loader /> : `Learn More`}
                                  </div>
                                  <div
                                    className={`m-3 ${Collapse ? "toggle-el1" : "hide-text"}`}
                                    style={{ textAlign: "justify" }}
                                  >
                                    1. Colored clothing will be split
                                    accordingly.
                                    <br />
                                    2. Clothes are washed separately and not
                                    mixed with other customers’ clothes.
                                    <br />
                                    3. Clothing must be suitable for washing at
                                    40 degrees Celsius
                                    <br />
                                    4. Clothing must be suitable for tumble
                                    drying.{" "}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <p className="d-md-none b-block">
                                    <InstallButton
                                      btnText={"Install Now"}
                                      background={"#000"}
                                    />
                                  </p>
                                  <a
                                    href="#"
                                    onClick={handleShow}
                                    style={{ backgroundColor: "#000" }}
                                    className={`btn open_download_popup  zoom  rounded black_btn d-md-inline-block d-none`}
                                  >
                                    Install Now
                                  </a>
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
          <div className="row text-center justify-content-center pt-1 pt-lg-5">
            <div className="col-12">
              <h4>See Full Price List </h4>
            </div>
            <div className="col-12">
              <p className="d-md-none b-block">
                <DownloadButton btnText={"DOWNLOAD NOW"} />
              </p>
              <a
                href="#"
                onClick={handleShow}
                className="mobiledownload btn btn-primary zoom gradient d-md-inline-block d-none"
              >
                DOWNLOAD NOW
              </a>
            </div>
            <div className="my_space" />
          </div>
          <section id="video" className="row pb-5">
            <div className="col-md-7">
              <div className="d-flex position-relative video_thumbnail_wrap">
                <img
                  className="video_thumbnail"
                  height="auto"
                  width="100%"
                  src="./Laundry-near-you-Video-thumbnail.jpg"
                  data-lazy-src="./Laundry-near-you-Video-thumbnail.jpg"
                />
                <img
                  width={320}
                  height={320}
                  id="play"
                  src="./play.png"
                  data-videourl="https://www.youtube.com/embed/ZCYYsPQLirQ"
                  data-lazy-src="./play.png"
                  onClick={() => setModalShow(true)}
                />
              </div>
            </div>
            <div className="col-md-5 pt-md-0 pt-4 dborder_container">
              <div className="dborder left bblue">
                <br />
                <br />
              </div>
              <h2 className="dborder_heading">Designed for You</h2>
              <div className="fs-3 text-justify dborder left full bblue stretch">
                Now you can book, track and pay for your laundry services all
                from the convenience of one simple app - Laundry Portal. Doing
                your laundry has never been easier. 3 simple steps then it's
                time to let us do the work. From regular dry cleaning, washing
                and ironing to carpet, curtain and shoe cleaning, we take care
                of the mundane and leave you to live an inspired life.{" "}
              </div>
            </div>
          </section>
        </div>
        <HowDoes idPackages={idPackages}/>
      </section>
      <VideoModal show={modalShow} onHide={() => setModalShow(false)} />
      <Check handleShow={handleShow} handleClose={handleClose} show={show} />
    </>
  );
};

export default Packages;

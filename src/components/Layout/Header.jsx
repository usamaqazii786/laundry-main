/* eslint-disable no-use-before-define */
/* eslint-disable no-script-url */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable eqeqeq */
import * as Yup from "yup";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import GetProfiles from "../../lib/GetProfiles";
import { useFormik } from "formik";
import axiosInstance from "../Https/axiosInstance";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Header.css";
import { Tab, Tabs } from "react-bootstrap";
import OrderOnline from "../OrderOnline/Order";
import CustomModals from "./CustomModals";
import DownloadButtonImage from "../OrderOnline/DownloadButtonImage";
import { useOrder } from "../../OrderProvider";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [IsMenu, setIsMenu] = useState(false);
  const [getProfile, setGetProfile] = useState([]);
  const [number, setNumber] = useState("");
  const [Area, setArea] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [VerifyModalShow, setVerifyModalShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [VerifyID, setVerifyID] = useState();
  const [OTPID, setOTPID] = useState();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const { handleSelect } = useOrder();
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  if (show2) {
    document.documentElement.style.overflow = "hidden"; // Hide scroll for <html>
  } else {
    document.documentElement.style.overflow = "auto"; // Hide scroll for <html>
  }
  const handleShow2 = () => {
    setShow2(true);
  };

  const handleVerifyModalClose = () => setVerifyModalShow(false);
  const handleVerifyModal = () => {
    setVerifyModalShow(true);
  };
  const token = localStorage.getItem("token");
  const VerifyEmail = localStorage.getItem("email");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // 50px is the scroll threshold for adding sticky
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (token) {
      GetProfiles()
        .then((res) => {
          setGetProfile(res?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setGetProfile([]);
    }
  }, []);

  const getArea = async () => {
    try {
      const response = await axiosInstance.get("/areas");
      console.log(response, "area");
      setArea(response?.data?.data);
    } catch (error) {
      console.log(error, "area");
    }
  };

  useEffect(() => {
    getArea();
  }, []);

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
    console.log(VerifyID, "VerifyID");
    e.preventDefault();
    console.log("Entered OTP is: ", otp);
    const isOtpComplete = otp?.every((element) => element !== "");
    console.log(otp?.join(""), 'otp?.join("")');
    setLoader(true);
    if (isOtpComplete) {
      const formData = new FormData();
      formData.append(`otp`, otp?.join(""));
      formData.append(`email`, VerifyEmail);
      axiosInstance
        .post(`verify-otp`, formData)
        .then((res) => {
          console.log(res, "order");
          toast.success(res?.data?.response);
          setOTPID(res?.data?.data?.id);
          setLoader(false);
          setOtp("");
          handleVerifyModalClose();
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.message);
          setOtp("");
          setLoader(false);
        });
    } else {
      toast.error("Please Verify Your OTP First");
    }
  };

  const validationSchema = Yup.object().shape({
    fname: Yup.string().required("First name is required"),
    lname: Yup.string().required("Last name is required"),
    area: Yup.string().required("Area is required"),
    building_house: Yup.string().required("Building / House is required"),
    date: Yup.string().required("Date is required"),
    time: Yup.string().required("Time is required"),
    service: Yup.array().required("Service is required"),
    // note: Yup.string().required("Note is required"),
  });

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      area: "",
      building_house: "",
      date: "",
      time: "",
      service: [],
      note: "",
    },
    validationSchema,
    onSubmit: (values, errors) => {
      console.log(errors, "errors");
      console.log(values, "values");
    },
  });
  useEffect(() => {
    // Set the --vh CSS variable to dynamically handle iPhone viewport height
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // Initial call to set the height
    setVh();

    // Add event listener to adjust height on resize
    window.addEventListener("resize", setVh);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", setVh);
  }, []);
  const pathname = window.location.pathname;
  const handleNavigation = (sectionId) => {
    if (pathname === "/order") {
      // Redirect to home
      navigate("/", { replace: true });
  
      // Wait for navigation to complete and section to exist
      const intervalId = setInterval(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          let offset = 0; // Default offset
      
          // Set the scroll offset based on the sectionId
          if (sectionId === "service") {
            offset = 1300; // Scroll 1300px up for service
          } else if (sectionId === "contactus") {
            // Scroll to the bottom of the contactus section and then offset by 200px
            offset = section.scrollHeight - window.innerHeight +190;
          } else if (sectionId === "who_are_we") {
            offset = 1800; // Scroll 1600px up for who_are_we
          }
      
          // Scroll to the section with the dynamic offset
          const top = section.offsetTop + offset;
          window.scrollTo({
            top,
            behavior: "smooth",
          });
      
          // Clear the interval once the section is found and scrolled to
          clearInterval(intervalId);
        }
      }, 50); // Check every 50ms
      
    } else {
      // If already on home, scroll directly
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  
  
  
  return (
    <>
      <>
        <div id="transparent-header-wrap" className="clr">
          <header
            id="site-header"
            className={`transparent-header effect-one clr ${
              isSticky ? "sticky" : ""
            }`}
            data-height={54}
            itemScope="itemscope"
            itemType="https://schema.org/WPHeader"
            role="banner"
          >
            {/* <div className="bg-white topheader">
              <img
                src="./topheader.png"
                alt=""
                width={"100%"}
                style={{ height: "45px", objectFit: "contain" }}
              />
            </div> */}
            {/* <div className={isSticky ? 'd-none':'d-block'}> */}
            <DownloadButtonImage Image={"./topheader.png"} />
            {/* </div> */}
            <div id="site-header-inner" className="clr container">
              <div className="mobile-screen-left d-block d-lg-none">
                <a
                  href="javascript:void(0);" // Prevents URL change
                  className="sticky-logo-link"
                  rel="home"
                  itemProp="url"
                  onClick={(e) => e.preventDefault()} // Ensures no default navigation
                >
                  <img
                    fetchpriority="high"
                    src={
                      "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20866%20100'%3E%3C/svg%3E"
                    }
                    className="sticky-logo hidden"
                    width="866"
                    height="100"
                    alt="Laundry Portal"
                    itemProp="url"
                    data-lazy-src="./laundry-portal.png"
                    style={{ maxHeight: "30px;" }}
                  />
                  <noscript>
                    <img
                      fetchpriority="high"
                      src="./laundry-portal.png"
                      className="sticky-logo"
                      width="866"
                      height="100"
                      alt="Laundry Portal"
                      itemProp="url"
                    />
                  </noscript>
                  <span id="calltosupportmobile" className="gradient_text">
                    <img
                      src="./bars.png"
                      alt=""
                      onClick={() => setIsMenu(true)}
                    />
                    {/* <i class="fa">&#xf095;</i>&nbsp;
      <span className="callus">CALL US</span>{" "} */}
                  </span>
                </a>
              </div>

              <div
                id="site-logo"
                className="clr has-sticky-logo d-none d-lg-block"
                itemScope=""
                itemType="https://schema.org/Brand"
              >
                <div
                  id={"site-logo-inner"}
                  className="clr"
                  style={{ height: isSticky ? "50px" : "74px" }}
                >
                  <Link
                    to={"/"}
                    className="custom-logo-link"
                    rel="home"
                    aria-current="page"
                  >
                    <img
                      width={100}
                      height={185}
                      src={
                        isSticky
                          ? "./laundry-portal.png"
                          : "./laundry-hub-logo-Latest-min.png"
                      }
                      className={
                        isSticky ? "custom-logo-Scroll" : "custom-logo"
                      }
                      alt="Laundry Portal"
                      decoding="async"
                      data-lazy-src={
                        isSticky
                          ? "./laundry-portalLogo.png"
                          : "./laundry-hub-logo-Latest-min.png"
                      }
                    />
                  </Link>
                  <Link
                    to={"/"}
                    className="sticky-logo-link"
                    rel="home"
                    itemProp="url"
                  >
                    <img
                      fetchpriority="high"
                      src="./laundry-portal.png"
                      className="sticky-logo"
                      width={866}
                      height={100}
                      alt="Laundry Portal"
                      itemProp="url"
                      data-lazy-src="./laundry-portal.png"
                    />
                  </Link>
                </div>
              </div>
              <div
                id="site-logo"
                className="clr has-sticky-logo d-block d-lg-none"
                itemScope=""
                itemType="https://schema.org/Brand"
              >
                <div id="site-logo-inner" className="clr">
                  <Link
                    to={"/"}
                    className="sticky-logo-link"
                    rel="home"
                    itemProp="url"
                  >
                    <p
                      className="bolder gradient_text fs-4"
                      style={{ position: "absolute" }}
                    >
                      <span>
                        <i className="fa fa-phone me-2" />
                      </span>
                      Call Us
                    </p>
                  </Link>
                </div>
              </div>
              <div className="after-header-content mobile-screen-middle d-lg-none d-block">
                {pathname === "/order" ? (
                  <a href="#" className="mobile-menu" aria-label="Mobile Menu">
                    <Link
                      // to={"/order"}
                      className="btn open_download_popup p-3 rounded btn-theme"
                      id="mobileheaderorder1"
                      onClick={handleSelect}
                    >
                      {/* <i class="fa fa-weight-hanging"></i>  */}
                      VIEW PRICES
                    </Link>
                  </a>
                ) : (
                  <a href="#" className="mobile-menu " aria-label="Mobile Menu">
                    <Link
                      // to={"/order"}
                      className="btn open_download_popup p-3 rounded btn-theme"
                      id="mobileheaderorder1"
                      onClick={handleShow2}
                    >
                      {/* <i class="fa fa-weight-hanging"></i>  */}
                      Order Now
                    </Link>
                  </a>
                )}
              </div>
              {/* <div className="after-header-content mobile-screen-rigth">
                <div className="after-header-content-inner d-none d-lg-block">
                  <a
                    href="https://www.facebook.com/LaundryPortal/?modal=admin_todo_tour"
                    target="_blank"
                  >
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a
                    href="https://www.instagram.com/laundryportal/"
                    target="_blank"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                </div>
                <div className="oceanwp-mobile-menu-icon clr mobile-right d-block d-lg-none">
                  <a
                    href="https://thelaundryportal.com/cart/"
                    className="wcmenucart wcmenucart-hide"
                  >
                    <span className="wcmenucart-count">
                      <i
                        className=" fas fa-shopping-basket"
                        aria-hidden="true"
                        role="img"
                      />
                      <span className="wcmenucart-details count">0</span>
                    </span>
                  </a>
                  <a
                    href="#"
                    className="mobile-menu"
                    id="mobile-menu14"
                    aria-label="Mobile Menu"
                  >
                    <i
                      className="fa fa-bars"
                      aria-hidden="true"
                      onClick={() => setIsMenu(true)}
                    />
                  </a>
                </div>
              </div> */}
              <div id="site-navigation-wrap" className="clr d-none d-lg-block">
                <nav
                  id="site-navigation"
                  className="navigation main-navigation clr"
                  itemScope="itemscope"
                  itemType="https://schema.org/SiteNavigationElement"
                  role="navigation"
                >
                  <ul
                    id="menu-main-menu"
                    className="main-menu dropdown-menu sf-menu"
                  >
                    <li
                      id="menu-item-44"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-38 current_page_item menu-item-44"
                    >
                      <Link
                        to={"/"}
                        onClick={() => {
                          window.scrollTo(0, 0); // Scroll to top
                        }}
                        className="menu-link"
                        style={{ lineHeight: isSticky ? "50px" : "74px" }}
                      >
                        <span className="text-wrap">Home</span>
                      </Link>
                    </li>
                    <li
                      id="menu-item-360"
                      className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-360"
                    >
                      <a
                        href="#prices"
                        className="menu-link"
                        style={{ lineHeight: isSticky ? "50px" : "74px" }}
                        onClick={() => handleNavigation("prices")}
                      >
                        <span className="text-wrap">Prices</span>
                      </a>
                    </li>
                    <li
                      id="menu-item-348"
                      className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-348"
                    >
                      <a
                        href="#who_are_we"
                        className="menu-link"
                        style={{ lineHeight: isSticky ? "50px" : "74px" }}
                        onClick={() => handleNavigation("who_are_we")}
                      >
                        <span className="text-wrap">About</span>
                      </a>
                    </li>
                    <li
                      id="menu-item-93"
                      className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-93"
                    >
                      <a
                        href="#contactus"
                        className="menu-link"
                        style={{ lineHeight: isSticky ? "50px" : "74px" }}
                        onClick={() => handleNavigation("contactus")}
                      >
                        <span className="text-wrap">Contact</span>
                      </a>
                    </li>
                    <li
                      id="menu-item-573"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-573"
                    >
                      <a
                        href="#service"
                        className="menu-link"
                        style={{ lineHeight: isSticky ? "50px" : "74px" }}
                        onClick={() => handleNavigation("service")}
                      >
                        <span className="text-wrap">services</span>
                      </a>
                    </li>
                    {/* <li className="woo-menu-icon wcmenucart-toggle-drop_down spacious toggle-cart-widget">
                      <a
                        href="https://thelaundryportal.com/cart/"
                        className="wcmenucart wcmenucart-hide"
                      >
                        <span className="wcmenucart-count">
                          <i
                            className=" fas fa-shopping-basket"
                            aria-hidden="true"
                            role="img"
                          />
                          <span className="wcmenucart-details count">0</span>
                        </span>
                      </a>
                      <div className="current-shop-items-dropdown owp-mini-cart clr">
                        <div className="current-shop-items-inner clr">
                          <div className="widget woocommerce widget_shopping_cart">
                            <div className="widget_shopping_cart_content" />
                          </div>
                        </div>
                      </div>
                    </li> */}

                    <li
                      id="menu-item-573"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-573"
                    >
                      {/* <div className="dropdown-container mt-4 me-2">
                        <Link
                          to={"/orderonline"}
                          className="me-4 btn open_download_popup p-3 rounded d-md-inline-block d-none btn-theme"
                        >
                          Pricing
                        </Link>
                      </div> */}
                      <div
                        className={`dropdown-container me-2 ${
                          isSticky
                            ? "webScreen20-scroll mt-1"
                            : "webScreen20 mt-4"
                        }`}
                      >
                        {pathname === "/order" ? (
                          <a
                            href="#"
                            className={`me-4 btn open_download_popup ${
                              isSticky ? "py-2 px-3 mt-2" : "p-3"
                            } rounded d-md-inline-block d-none btn-theme`}
                            onClick={handleSelect}
                          >
                            VIEW PRICES
                          </a>
                        ) : (
                          <a
                            //  href="/order"
                            className={`me-4 btn open_download_popup ${
                              isSticky ? "py-2 px-3 mt-2" : "p-3"
                            } rounded d-md-inline-block d-none btn-theme`}
                            onClick={handleShow2}
                          >
                            Order Now
                          </a>
                        )}
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
        </div>

        <div
          id="mobile-fullscreen"
          className={`clr ${IsMenu === true ? "active d-block" : "d-none"}`}
          style={{ opacity: 1 }}
        >
          <div id="mobile-fullscreen-inner" className="clr">
            <a
              href="/"
              className="close"
              aria-label="Close mobile menu"
              onClick={(e) => {
                e.preventDefault(); // Prevent the default link behavior
                setIsMenu(false); // Close the menu
                window.scrollTo(0, 0); // Scroll to top
              }}
            >
              <div className="close-icon-wrap">
                <div className="close-icon-inner" />
              </div>
            </a>

            <nav
              className="clr col-md-12"
              itemScope="itemscope"
              itemType="https://schema.org/SiteNavigationElement"
              role="navigation"
            >
              <ul id="menu-main-menu-1" className="fs-dropdown-menu">
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-38 current_page_item menu-item-44">
              <a
                className="mx-auto mb-5 btn open_download_popup download_popup1 p-3 rounded d-block btn-theme w-100 text-white"
                style={{ borderRadius: 6 }}
                onClick={() => {
                  handleShow2();
                  setIsMenu(false);
                }}
                // href={"/order"}
              >
                Order Now
              </a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-38 current_page_item menu-item-44">
                  <Link
                    to="/"
                    onClick={() => {
                      setIsMenu(false);
                      window.scrollTo(0, 0); // Scroll to top
                    }}
                  >
                    Home
                  </Link>
                </li>
                {/* <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-38 current_page_item menu-item-44">
                  <Link
                    to="/"
                    onClick={() => {
                      setIsMenu(false);
                    }}
                  >
                    Home
                  </Link>
                </li> */}
                <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-360">
                  <a
                    href="#prices"
                    aria-current="page"
                    onClick={() => {setIsMenu(false)
                      handleNavigation("prices")
                    }}
                  >
                    Prices
                  </a>
                </li>
                {/* <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-95">
                  <a
                    href="#idPackages"
                    aria-current="page"
                    onClick={() => setIsMenu(false)}
                  >
                    Laundry Partners
                  </a>
                </li> */}
                <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-348">
                  <a
                    href="#who_are_we"
                    aria-current="page"
                    onClick={() => {setIsMenu(false)
                      handleNavigation("who_are_we")
                    }}
                  >
                    About
                  </a>
                </li>
                {/* <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11">
                  <a href="#idPackages" onClick={() => setIsMenu(false)}>
                    News Room
                  </a>
                </li> */}
                <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-93">
                  <a
                    href="#contactus"
                    aria-current="page"
                    onClick={() => {setIsMenu(false)
                      handleNavigation("contactus")
                    }}
                  >
                    Contact
                  </a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-573">
                  <a href="#service" onClick={() => {setIsMenu(false)
                      handleNavigation("service")
                    }}>
                    services
                  </a>
                </li>
                {/* <div className=" mt-4 ">
                  <Link
                    to={"/orderonline"}
                    className="me-4 btn open_download_popup p-3 rounded d-block btn-theme w-100 "
                    onClick={() => setIsMenu(false)}
                  >
                    Pricing
                  </Link>
                </div> */}
                {/* <div className=" mt-4 ">
                  <a
                    className="me-4 btn open_download_popup p-3 rounded d-block btn-theme w-100 text-white"
                    onClick={() => {
                      handleShow2();
                      setIsMenu(false);
                    }}
                    // href={"/order"}
                  >
                    Order Now
                  </a>
                </div> */}
              </ul>
            </nav>
          </div>
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          style={{ height: "calc(var(--vh, 1vh) * 100)", overflowY: "auto" }}
          id={"orderFormmodal"}
        >
          <div className="Order-Form d-flex justify-content-center align-items-cneter flex-column">
            <Modal.Header
              className="text-white position-relative border-bottom-none"
              style={{ borderBottom: "none" }}
              onClick={handleClose}
              id="closebtncolor"
            >
              {/* <Modal.Title className="text-white">Place Your Order</Modal.Title> */}
              <Modal.Title
                className="text-white closeBTNX"
                onClick={handleClose}
              >
                X
              </Modal.Title>
            </Modal.Header>
            <Tabs
              defaultActiveKey="Place Your Order"
              id="order-price-tabs"
              className="mb-3 "
            >
              <Tab eventKey="Place Your Order" title="Place Your Order">
                {/* <form onSubmit={formik?.handleSubmit}>
                  <Modal.Body>
                    <div>
                      <div className="row mt-3">
                        <div className="col-sm-12 col-lg-3 text-secondary">
                          <h4 className="mb-1 mb-lg-4 mt-4 mt-lg-0 text-white">
                            First Name
                          </h4>
                          <div className="form-group">
                            <input
                              type="text"
                              name="fname"
                              className="form-control"
                              placeholder="First Name"
                              onChange={formik?.handleChange}
                              value={formik?.values.fname}
                              onBlur={formik?.handleBlur}
                            />
                            <span className="text-danger">
                              {formik?.touched.fname && formik?.errors.fname}
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-12 col-lg-3 text-secondary">
                          <h4 className="mb-1 mb-lg-4 mt-4 mt-lg-0 text-white">
                            Last Name
                          </h4>
                          <div className="form-group">
                            <input
                              type="text"
                              name="lname"
                              className="form-control"
                              placeholder="Last Name"
                              onChange={formik?.handleChange}
                              value={formik?.values.lname}
                              onBlur={formik?.handleBlur}
                            />
                            <span className="text-danger">
                              {formik?.touched.lname && formik?.errors.lname}
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-12 col-lg-3 text-secondary">
                          <h4 className="mb-1 mb-lg-4 mt-4 mt-lg-0 text-white">
                            Phone Number
                          </h4>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="form-group w-100">
                              <PhoneInput
                                inputClassName="w-100"
                                country={"us"}
                                value={number}
                                onChange={(phone) =>
                                  setNumber(`${phone.replace(/^\+/, "")}`)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12 col-lg-3 text-secondary">
                          <button
                            type="button"
                            className="btn btn-theme w-100 mt-2 mt-lg-5 py-lg-3 py-0 resbtn1"
                            onClick={handleFirstSubmit}
                          >
                            Verify
                          </button>
                        </div>
                      </div>

                      <div className="row mt-5">
                        <div className="col-sm-12 col-lg-4 text-secondary">
                          <h4 className="mb-1 mb-lg-4 mt-4 mt-lg-0 text-white">
                            Area in Dubai
                          </h4>
                          <div className="form-group">
                            <select
                              name="area"
                              className="form-control"
                              onChange={formik?.handleChange}
                              value={formik?.values.area}
                              onBlur={formik?.handleBlur}
                            >
                              <option>Select Area in Dubai</option>
                              {Area?.map((e) => {
                                return <option value={e?.id}>{e?.name}</option>;
                              })}
                            </select>
                            <span className="text-danger">
                              {formik?.touched.area && formik?.errors.area}
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-12 col-lg-4 text-secondary">
                          <h4 className="mb-1 mb-lg-4 mt-4 mt-lg-0 text-white">
                            Building / House
                          </h4>
                          <div className="d-flex justify-content-around align-items-center">
                            <div className="">
                              <input
                                type="radio"
                                name="building_house"
                                value="Building"
                                className="mx-4 fs-1"
                                onChange={formik?.handleChange}
                                checked={
                                  formik?.values.building_house === "Building"
                                }
                              />
                              <label className="text-white">Building</label>
                            </div>
                            <div className="">
                              <input
                                type="radio"
                                name="building_house"
                                value="House"
                                className="mx-4 fs-1"
                                onChange={formik?.handleChange}
                                checked={
                                  formik?.values.building_house === "House"
                                }
                              />
                              <label className="text-white">House</label>
                            </div>
                          </div>
                          <span className="text-danger">
                            {formik?.touched.building_house &&
                              formik?.errors.building_house}
                          </span>
                        </div>
                        <div className="col-sm-12 col-lg-4 text-secondary">
                          <h4 className="mb-1 mb-lg-4 mt-4 mt-lg-0 text-white">
                            Apartment / Villa
                          </h4>
                          <div className="form-group">
                            <input
                              ref={inputRef}
                              className="form-control"
                              placeholder="Apartment / Villa"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-5">
                        <div className="" style={{}}>
                          <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={{
                              lat: position.lat,
                              lng: position.lng,
                            }}
                            zoom={18}
                            options={{
                              zoomControl: true,
                              streetViewControl: false,
                              mapTypeControl: false,
                              fullscreenControl: false,
                            }}
                          />
                            <MarkerF
                              position={{
                                lat: position.lat,
                                lng: position.lng,
                              }}
                              draggable={true}
                              onDragEnd={handleMarkerDragEnd}
                            />

                            <MarkerF
                      // key={index}
                        // position={{
                        //   lat: Position[0]?.lat,
                        //   lng: Position[0]?.lng,
                        // }}
                      />
                        </div>
                      </div>
                      <div className="row mt-5">
                        <div className="col-sm-12 col-lg-4 text-secondary">
                          <h4 className="mb-1 mb-lg-4 mt-4 mt-lg-0 text-white">
                            Date
                          </h4>
                          <div className="form-group">
                            <input
                              type="date"
                              name="date"
                              className="form-control"
                              onChange={formik?.handleChange}
                              value={formik?.values.date}
                              onBlur={formik?.handleBlur}
                            />
                            <span className="text-danger">
                              {formik?.touched.date && formik?.errors.date}
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-12 col-lg-4 text-secondary">
                          <h4 className="mb-1 mb-lg-4 mt-4 mt-lg-0 text-white">
                            Time
                          </h4>
                          <div className="form-group">
                            <select
                              name="time"
                              className="form-control"
                              onChange={formik?.handleChange}
                              value={formik?.values.time}
                              onBlur={formik?.handleBlur}
                            >
                              Check if any slots are available
                              {formik?.values.date ===
                                new Date().toISOString().split("T")[0] &&
                              new Date().getHours() >= 20 ? (
                                <option disabled selected>
                                  No slots available
                                </option>
                              ) : (
                                <>
                                  <option disabled>Morning Time</option>
                                  {(formik?.values.date !==
                                    new Date().toISOString().split("T")[0] ||
                                    new Date().getHours() < 10 ||
                                    (new Date().getHours() === 10 &&
                                      new Date().getMinutes() < 0)) && (
                                    <option>10:00AM - 11:30AM</option>
                                  )}
                                  {(formik?.values.date !==
                                    new Date().toISOString().split("T")[0] ||
                                    new Date().getHours() < 11 ||
                                    (new Date().getHours() === 11 &&
                                      new Date().getMinutes() < 30)) && (
                                    <option>11:30AM - 01:00PM</option>
                                  )}

                                  <option disabled>Evening Time</option>
                                  {(formik?.values.date !==
                                    new Date().toISOString().split("T")[0] ||
                                    new Date().getHours() < 16 ||
                                    (new Date().getHours() === 16 &&
                                      new Date().getMinutes() < 0)) && (
                                    <option>04:00PM - 05:30PM</option>
                                  )}
                                  {(formik?.values.date !==
                                    new Date().toISOString().split("T")[0] ||
                                    new Date().getHours() < 17 ||
                                    (new Date().getHours() === 17 &&
                                      new Date().getMinutes() < 30)) && (
                                    <option>05:30PM - 07:00PM</option>
                                  )}
                                  {(formik?.values.date !==
                                    new Date().toISOString().split("T")[0] ||
                                    new Date().getHours() < 19 ||
                                    (new Date().getHours() === 19 &&
                                      new Date().getMinutes() < 0)) && (
                                    <option>07:00PM - 08:30PM</option>
                                  )}
                                  {(formik?.values.date !==
                                    new Date().toISOString().split("T")[0] ||
                                    new Date().getHours() < 20 ||
                                    (new Date().getHours() === 20 &&
                                      new Date().getMinutes() < 29)) && (
                                    <option>08:30PM - 10:00PM</option>
                                  )}
                                </>
                              )}
                            </select>

                            <span className="text-danger">
                              {formik?.touched.time && formik?.errors.time}
                            </span>
                          </div>
                        </div>
                        <div className="mb-1 mb-lg-4 mt-4 mt-lg-0 col-lg-4 text-secondary">
                          <h4 className="mb-4 text-white">Services</h4>
                          <Select
                            id="selectservice1"
                            isMulti
                            name="service"
                            options={options?.map((e) => ({
                              value: e?.value,
                              label: e?.label,
                            }))}
                            onChange={(selectedOptions) =>
                              formik.setFieldValue(
                                "service",
                                selectedOptions.map((option) => ({
                                  value: option?.value,
                                  label: option?.label,
                                }))
                              )
                            }
                            onBlur={formik.handleBlur("service")}
                            value={formik?.services?.map((service) => ({
                              value: service?.value,
                              label: service?.label,
                            }))}
                          />
                          <span className="text-danger">
                            {formik?.touched.service && formik?.errors.service}
                          </span>
                        </div>
                      </div>
                      <div className="row mt-5">
                        <div className="col-12">
                          <h4 className="text-white">Additional Details</h4>
                          <textarea
                            className="form-control"
                            onChange={formik?.handleChange}
                            value={formik?.values.note}
                            onBlur={formik?.handleBlur}
                            name="note"
                            placeholder="Enter Additional Details......."
                          ></textarea>
                          <span className="text-danger">
                        {formik?.touched.note && formik?.errors.note}
                      </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="primary"
                      className="text-white text-end my-5"
                      style={{ float: "right" }}
                      onClick={handleSecondSubmit}
                    >
                      Submit
                    </Button>
                  </Modal.Body>
                  <Modal.Footer>
              </Modal.Footer> 
                </form> */}
                <div>
                  {/* <OrderPage
                    handleVerifyModal={handleVerifyModal}
                    setVerifyID={setVerifyID}
                    handleClose={handleClose}
                  /> */}
                </div>
              </Tab>
              <Tab eventKey="Price List" title="Price List">
                <OrderOnline />
              </Tab>
            </Tabs>
          </div>
        </Modal>

        <Modal
          show={VerifyModalShow}
          onHide={handleVerifyModalClose}
          id={"orderFormmodal"}
          className="verifyModal"
        >
          <Modal.Header className="verify-header" closeButton>
            <Modal.Title className="text-white">
              Please Verify Your Phone Number
            </Modal.Title>
          </Modal.Header>
          <form
            className="verify-Form d-flex justify-content-center align-items-center flex-column"
            onSubmit={handleOtp}
          >
            <div className="Verify-body">
              <div className="d-flex justify-content-center mb-3">
                {Array?.isArray(otp) &&
                  otp?.map((data, index) => {
                    return (
                      <input
                        className="form-control mx-1 text-center bg-light text-dark"
                        type="text"
                        name="otp"
                        maxLength="1"
                        key={index}
                        value={data}
                        onChange={(e) => {
                          handleVerifyChange(e.target, index);
                          console.log(data, "data");
                        }}
                        onFocus={(e) => e.target.select()}
                        style={{ width: "40px", height: "40px" }}
                      />
                    );
                  })}
              </div>
            </div>
            <Modal.Footer>
              <Button type="submit" variant="primary" className="text-white">
                Verify
              </Button>
            </Modal.Footer>
          </form>
        </Modal>

        <CustomModals handleClose={handleClose2} show={show2} />
      </>
    </>
  );
};

export default Header;

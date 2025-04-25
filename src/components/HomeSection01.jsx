/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from "react";
import CustomerFeed from "./CustomerFeed";
import AppFeature from "./AppFeature";
import Packages from "./Packages";
import Check from "./Check";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axiosInstance from "./Https/axiosInstance";
// eslint-disable-next-line no-unused-vars
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./swiper.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Scrollbar, Autoplay } from "swiper/modules";
import DownloadButton from "./DownloadButton";
import DownloadButtonImageQrCode from "./OrderOnline/DownloadButtonImageQrCode";

const HomeSection01 = () => {
  const [showHeading, setShowHeading] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState(false);
  // const [remove, SetRemove] = useState(false);
  // const [remove1, SetRemove1] = useState(false);
  // const [remove2, SetRemove2] = useState(false);

  // const [remove3, SetRemove3] = useState(false);
  // const [remove4, SetRemove4] = useState(false);
  // const [remove5, SetRemove5] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const services = [
    {
      id: 1,
      title: "Dry Cleaning",
      imgSrc:
        "./108.jpg",
      description:
        "All our partners offer dry cleaning services for your delicate and sensitive items – suits, trousers, blouses and more. Download our app today to connect with a laundry nearby.",
    },
    {
      id: 2,
      title: "Ironing",
      imgSrc:
        "./17141.jpg",
      description:
        "All our laundry service providers offer ironing services for your casual clothing, homeware, and professional attire. Download our app today to connect with a laundry nearby.",
    },
    {
      id: 3,
      title: "Wash & Fold",
      imgSrc:
        "./2714884.jpg",
      description:
        "Several partners offer a wash & fold bag service for your non-delicate items. Clothes are separated by color and washed between 30/40 degree heat and then tumble-dried.",
    },
    {
      id: 4,
      title: "Carpet & Curtain",
      imgSrc:
        "./2194.jpg",
      description:
        "Many of our partners offer both carpet & curtain cleaning for your normal or delicate pieces. Download our app today to connect with a laundry nearby.",
    },
    {
      id: 5,
      title: "Shoe Cleaning",
      imgSrc:
        "./113.jpg",
      description:
        "Several laundry service providers offer shoe cleaning services for your casual, sport, or professional wear. Download our app today to connect with a laundry nearby.",
    },
    {
      id: 6,
      title: "Alterations",
      imgSrc:
        "./352.jpg",
      description:
        "Many of our laundry partners offer alterations services to help fix those critical issues in your favorite clothes. Download our app today to connect with a laundry nearby.",
    },
  ];

  const [visibleServices, setVisibleServices] = useState({});

  const handleClick = (id) => {
    setVisibleServices((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // Scrolling down
      setShowHeading(false);
    } else {
      // Scrolling up
      setShowHeading(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize, handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll, handleResize);
    };
  }, [lastScrollY, isMobile]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("email is required"),
    message: Yup.string().required("message is required"),
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoader(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("message", values.message);
      axiosInstance
        .post("contactadmins", formData)
        .then((res) => {
          console.log(res, "contact");
          toast.success(res?.data?.response);
          setLoader(false);
          resetForm();
        })
        .catch((err) => {
          console.log(err?.error, " toast.error(err.response.data.message);");
          toast.error(err?.error);
          // toast.error(err?.response?.data?.message);
          setLoader(false);
        });
    },
  });

  return (
    <>
      <main id="main" className="site-main clr">
        <link
          data-minify={1}
          rel="stylesheet"
          href="../../public/assets/wp-content/cache/min/1/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css?ver=1713743253"
        />
        {/* Header section*/}
        <div id="header">
          <div className="header_bg" />
          {/* <div className="header overlay">
            <div className="container clr">
              <div className="row header_row align-items-center justify-content-center">
                <div className="col-lg-7 align-items-center text-center fade-in two">
                  <img
                    onClick={handleShow}
                    width={1121}
                    height={310}
                    className="discount stamp open_download_popup zoom d-md-block d-none"
                    src="./Container.png"
                    alt="Discount on laundry WB30"
                    data-lazy-src="./Container.png"
                  />
                  <h1 className="main_header gradient_text">LAUNDRY PORTAL</h1>
                  <div className="gradient_line" />
                  <div className="">
                    <Swiper
                      scrollbar={{
                        hide: true,
                      }}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      slidesPerView={"auto"}
                      modules={[Scrollbar, Autoplay]}
                      className="mySwiper"
                    >
                      <SwiperSlide>
                        <div>
                          <h3 className="subheader">Dubai's #1 Laundry App</h3>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div>
                          <h3 className="subheader text-white">
                            Laundry Services At Your Doorstep
                          </h3>
                        </div>
                      </SwiperSlide>

                      <SwiperSlide>
                        <div>
                          <h3 className="subheader">
                            Convenient. Affordable. Simple.
                          </h3>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                  <div className="d-lg-block d-none d-flex justify-content-between">
                    <a href="#"  onClick={handleShow}>
                    <img className="download-btn left open_download_popup zoom"
                      style={{ width: "48%", height: "auto" }}
                      src="../../public/assets/wp-content/themes/byEnero/img/IconGoogleplay-min.png"
                      alt="Download Play Store"
                      data-lazy-src="../../public/assets/wp-content/themes/byEnero/img/IconGoogleplay-min.png"
                    />
                    </a>
                    <a href="#" onClick={handleShow}>
                    <img className="download-btn right open_download_popup zoom"
                      style={{ width: "48%", height: "auto" }}
                      src="../../public/assets/wp-content/themes/byEnero/img/appstore-badge-min.png"
                      alt="Download App Store"
                      data-lazy-src="../../public/assets/wp-content/themes/byEnero/img/appstore-badge-min.png"
                    />
                    </a>
                  </div>

                  <a href="#" className="mobiledownload">
                    <img
                      width={1121}
                      height={310}
                      className="discount stamp d-md-none"
                      src="../../public/assets/wp-content/themes/byEnero/img/stamp discount-min.png"
                      alt="Discount on laundry WB30"
                      data-lazy-src="../../public/assets/wp-content/themes/byEnero/img/stamp discount-min.png"
                    />
                  </a>
                </div>
                <div className="col-lg-5 text-center fade-in three">
                  <div id="hero">
                    <div className="hero_bg paralaxBG" />
                    <img
                      width={426}
                      height={800}
                      className="banner img-responsive bouncy"
                      src="./Laundry-Portal-Paralax-min.png"
                      alt="Laundry Portal Application"
                      data-lazy-src="./Laundry-Portal-Paralax-min.png"
                    />
                  </div>
                  <h5 className="letus text-center d-md-none">
                    <br />
                  </h5>
                  <p className="d-md-none">
                    <DownloadButton btnText={"Install Now"} />
                  </p>
                  <div className="d-lg-none d-md-block d-none">
                    <img
                      width={800}
                      height={234}
                      className="download-btn left open_download_popup zoom"
                      src="../../public/assets/wp-content/themes/byEnero/img/IconGoogleplay-min.png"
                      alt="Download Play Store"
                      data-lazy-src="../../public/assets/wp-content/themes/byEnero/img/IconGoogleplay-min.png"
                    />
                  </div>
                </div>
              </div>
            </div>
            <a
              href="#next"
              id="next"
              className={`banner-header ${showHeading ? "visible" : "hidden"}`}
            >
              How does it work? <br />
              <i className="fas gradient_text fa-chevron-down" />
            </a>
          </div> */}
          <div className="header overlay">
            <div className="container clr">
              <div className="row header_row align-items-center justify-content-center">
                <h1 className="main_header gradient_text text-center d-md-none d-block">
                  DUBAI’S BEST <br /> LAUNDRY APP
                </h1>
                <h1 className="main_header gradient_text text-center d-md-block d-none">
                  DUBAI’S BEST LAUNDRY SERVICE APP
                </h1>
                {/* <div className="">
                  <Swiper
                    scrollbar={{
                      hide: true,
                    }}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    slidesPerView={"auto"}
                    modules={[Scrollbar, Autoplay]}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      <div>
                        <h3 className="subheader">Dubai's #1 Laundry App</h3>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div>
                        <h3 className="subheader text-white">
                          Laundry Services At Your Doorstep
                        </h3>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div>
                        <h3 className="subheader">
                        convenient and affordable laundry services at your doorstep
                        </h3>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div> */}
                {/* <div className="gradient_line" /> */}
                <div className="col-lg-5 align-items-center text-center fade-in two d-md-block d-none">
                  <DownloadButtonImageQrCode />
                </div>
                <div className="col-md-1"></div>
                <div className="col-lg-7 align-items-center text-center fade-in two d-md-none d-block">
                  <div className="mobileCart1">
                    <p className="responsivePtag">
                      {/* <img src="./Frame.png" alt="" style={{width:"100%",height:"100%",objectFit:"contain",padding:"51px 30px 0px 30px"}}/> */}
                      <div
                        style={{
                          border: "2px solid #65C7FC",
                          width: "80%",
                          borderRadius: 6,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="m-auto pb-3 pt-3"
                      >
                        <img src="./icons.png" alt="" width={30} height={30} />
                        <div
                          style={{ fontSize: 16, textTransform: "uppercase" }}
                        >
                          &nbsp;30% off with code{" "}
                          <span style={{ color: "#65C7FC" }}>
                            wb30
                          </span>
                        </div>
                      </div>
                        <p className="pt-4" style={{fontSize:16}}>When you book via our mobile app</p>
                    </p>
                    <p className="d-md-none" style={{ marginTop: "15px" }}>
                      <DownloadButton btnText={"Install Now"} />
                    </p>
                  </div>
                  <br />
                </div>

                <div className="col-lg-5 text-center fade-in three d-md-block d-none">
                  <div id="hero">
                    <div className="hero_bg paralaxBG" />
                    <img
                      width={426}
                      height={800}
                      className="banner img-responsive bouncy"
                      src="./Laundry-Portal-Paralax-min.png"
                      alt="Laundry Portal Application"
                      data-lazy-src="./Laundry-Portal-Paralax-min.png"
                    />
                  </div>
                  <h5 className="letus text-center d-md-none">
                    <br />
                  </h5>
                  <div className="d-lg-none d-md-block d-none">
                    <img
                      width={800}
                      height={234}
                      className="download-btn left open_download_popup zoom"
                      src="../../public/assets/wp-content/themes/byEnero/img/IconGoogleplay-min.png"
                      alt="Download Play Store"
                      data-lazy-src="../../public/assets/wp-content/themes/byEnero/img/IconGoogleplay-min.png"
                    />
                  </div>
                </div>
              </div>
            </div>
            <a
              href="#next"
              id="next"
              className={`banner-header ${showHeading ? "visible" : "hidden"}`}
            >
              How does it work? <br />
              <i className="fas gradient_text fa-chevron-down" />
            </a>
          </div>
        </div>
        {/* /Header section*/}
        {/* How does it work & Video section*/}

        <Packages idPackages={"idPackages"} />

        {/* /.How does it work section */}
        {/* Features section */}
        <AppFeature />
        {/* /.Features section */}
        <div className="background_dark">
          <div className="container clr">
            {/* Pricing Section*/}
            <section className="prices">
              {/* Pricing table section*/}
              <div id="service" className="ancor" />
              <div className="pricingtable_section">
                <section className="text-center">
                  <h2 className="dborder bblue">Services</h2>
                  <p className="text-center h_prices">
                    We have partnered with a variety of laundry providers to
                    ensure no matter where you live in Dubai the best services
                    with the <strong>best prices are always nearby</strong>. You
                    can rest assured the prices listed below and within our
                    laundry app include no mark ups or hidden fees. And along
                    with transparent prices, our{" "}
                    <strong>easy-to-use app&nbsp;</strong>
                    not only lets you schedule regular laundry services but you
                    can also book{" "}
                    <strong>
                      alterations, carpet, curtain & shoe cleaning 
                      {/* and sofa
                      cleaning */}
                    </strong>
                    , all from the convenience of our user friendly app.
                  </p>
                  <div className="row text-center justify-content-center d-md-none d-block">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="col-sm-6 col-lg-4 p-3 p-md-5 service_tab"
                      >
                        <div className="services_images-wrap">
                          <div>
                            <img
                              className="services_images"
                              height="auto"
                              width="100%"
                              src={service.imgSrc}
                              alt={service.title}
                              onClick={() => handleClick(service.id)}
                            />
                          </div>
                          <div
                            className="services_images_overlay"
                            onClick={() => handleClick(service.id)}
                          >
                            <h4 className="service_name">{service.title}</h4>
                          </div>
                        </div>
                        <p
                          className={`toggle-el1 service_description text-white ${
                            visibleServices[service.id] ? "" : "hide-text"
                          }`}
                        >
                          {service.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="row text-center justify-content-center d-md-flex d-none">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="col-sm-6 col-lg-4 p-3 p-md-5 service_tab"
                      >
                        <div className="services_images-wrap">
                          <div>
                            <img
                              className="services_images"
                              height="auto"
                              width="100%"
                              src={service.imgSrc}
                              alt={service.title}
                              onClick={() => handleClick(service.id)}
                            />
                          </div>
                          <div
                            className="services_images_overlay"
                            onClick={() => handleClick(service.id)}
                          >
                            <h4 className="service_name">{service.title}</h4>
                          </div>
                        </div>
                        <p
                          className={`toggle-el1 service_description text-white ${
                            visibleServices[service.id] ? "hide-text" : ""
                          }`}
                        >
                          {service.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div id="prices" className="ancor" />
                </section>
              </div>
              <div className="row text-center justify-content-center">
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
                    className="mobiledownload btn btn-primary gradient zoom d-md-inline-block d-none"
                  >
                    DOWNLOAD NOW
                  </a>
                </div>
                <div className="my_space" />
              </div>
            </section>
          </div>
        </div>
        <div id="who_are_we">
          <div className="cta_bg" />
          <div className="cta overlay">
            <div className="container clr">
              <section id="who_are_we" className="text-center">
                <h2 className="dborder darkblue mobilescreen">Who are we?</h2>
                <div className="row text-left">
                  <div className="col-md-6 pr-md-4 mb-5 mt-5 dborder_container">
                    <div className="dborder left darkblue">
                      <br />
                    </div>
                    <h2 className="dborder_heading">Our Vision</h2>
                    <div className="text-justify dborder left darkblue stretch">
                      To create a digital eco-system that seamlessly connects
                      laundry service providers with customers, ultimately
                      freeing up their time for matters best suited to their
                      expertise and desires.{" "}
                    </div>
                  </div>
                  <div className="col-md-6 mb-5 mb-md-5 mt-md-5 d-none d-md-block">
                    <img
                      className="whoarewe_images"
                      height="auto"
                      width="100%"
                      src="/images/hand.webp"
                      data-lazy-src="/images/hand.webp"
                    />
                  </div>
                  <div className="col-md-6 pr-md-4 mb-md-5 mt-md-5">
                    <img
                      className="whoarewe_images"
                      height="auto"
                      width="90%"
                      src="/images/vision.webp"
                      data-lazy-src="/images/vision.webp"
                    />
                  </div>
                  <div className="col-md-6 mb-5 mt-5 dborder_container">
                    <div className="dborder left darkblue">
                      <br />
                    </div>
                    <h2 className="dborder_heading">About Us</h2>
                    <div className="text-justify dborder left darkblue stretch">
                      We are a locally grown Dubai-based brand inspired by the
                      constant digitization and convenience-craving culture that
                      has cultivated over recent years. Connection Hub Portal is
                      happy to have launched Laundry Portal, a new uniquely
                      styled mobile-app that enables users to browse and
                      schedule their laundry services from a wide selection of
                      high-quality and trusted dry cleaning companies. We offer
                      a simple and seamless user experience aimed at modernizing
                      the existing approach, eliminating miscommunication and
                      providing unquestionable customer satisfaction.{" "}
                    </div>
                  </div>
                  <div className="col-md-6 order-2 order-md-1 pr-md-4 mb-5 mt-5 dborder_container">
                    <div className="dborder left darkblue">
                      <br />
                    </div>
                    <h2 className="dborder_heading">Why choose us?</h2>
                    <div className="text-justify dborder left darkblue stretch">
                      We don’t just provide a simple mechanism for scheduling
                      nearby laundry services, we overlay the entire experience
                      with world class customer service. And by revitalizing an
                      industry that traditionally suffers from wide-spread
                      miscommunication and non-existent customer service, we
                      afford you the freedoms to kick back and enjoy the
                      stress-free nature of it all.{" "}
                    </div>
                  </div>
                  <div className="col-md-6 order-1 order-md-2 mb-md-5 mt-md-5">
                    <img
                      className="whoarewe_images"
                      height="auto"
                      width="100%"
                      src="/images/shirt.webp"
                      data-lazy-src="/images/shirt.webp"
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <div className="background_dark">
          <div className="container clr">
            <CustomerFeed />
            <section id="contactus">
              <div className="title-block text-center">
                <h2 className="dborder bblue">contact us</h2>
              </div>
              <div
                id="number"
                className="text-center"
                style={{ fontSize: "16px" }}
              >
                <i className="fas gradient_text fa-phone-alt pr-1" />
                +971 52 850 0040
              </div>
              <div
                id="mail"
                className="text-center"
                style={{ fontSize: "16px" }}
              >
                <i className="fas gradient_text fa-envelope pr-1" />
                <span id="mailaddress">customercare@thelaundryportal.com</span>
              </div>
              <div
                className="wpforms-container wpforms-container-full"
                id="wpforms-53"
              >
                <form
                  id="wpforms-form-53"
                  className="wpforms-validate wpforms-form wpforms-ajax-form"
                  onSubmit={handleSubmit}
                >
                  <noscript className="wpforms-error-noscript">
                    Please enable JavaScript in your browser to complete this
                    form.
                  </noscript>
                  <div className="wpforms-field-container">
                    <div
                      id="wpforms-53-field_0-container"
                      className="wpforms-field wpforms-field-name wpforms-one-half wpforms-first"
                      data-field-id={0}
                    >
                      <label
                        className="wpforms-field-label wpforms-label-hide"
                        htmlFor="wpforms-53-field_0"
                      >
                        Your Name{" "}
                        <span className="wpforms-required-label">*</span>
                      </label>
                      <input
                        type="text"
                        id="wpforms-53-field_0"
                        className="wpforms-field-large wpforms-field-required"
                        name="name"
                        placeholder="Your Name"
                        required=""
                        onChange={handleChange}
                        value={values.name}
                        onBlur={handleBlur}
                      />
                      <span className="text-danger">
                        {touched.name && errors.name}
                      </span>
                    </div>
                    <div
                      id="wpforms-53-field_1-container"
                      className="wpforms-field wpforms-field-email wpforms-one-half"
                      data-field-id={1}
                    >
                      <label
                        className="wpforms-field-label wpforms-label-hide"
                        htmlFor="wpforms-53-field_1"
                      >
                        Your Email{" "}
                        <span className="wpforms-required-label">*</span>
                      </label>
                      <input
                        type="email"
                        id="wpforms-53-field_1"
                        className="wpforms-field-large wpforms-field-required"
                        name="email"
                        placeholder="Your Email"
                        spellCheck="false"
                        required=""
                        onChange={handleChange}
                        value={values.email}
                        onBlur={handleBlur}
                      />
                      <span className="text-danger">
                        {touched.email && errors.email}
                      </span>
                    </div>
                    <div
                      id="wpforms-53-field_2-container"
                      className="wpforms-field wpforms-field-textarea"
                      data-field-id={2}
                    >
                      <label
                        className="wpforms-field-label wpforms-label-hide"
                        htmlFor="wpforms-53-field_2"
                      >
                        Your Message{" "}
                        <span className="wpforms-required-label">*</span>
                      </label>
                      <textarea
                        id="wpforms-53-field_2"
                        className="wpforms-field-medium wpforms-field-required"
                        name="message"
                        placeholder="Your Message"
                        required=""
                        defaultValue={""}
                        onChange={handleChange}
                        value={values.message}
                        onBlur={handleBlur}
                      />
                      <span className="text-danger">
                        {touched.message && errors.message}
                      </span>
                    </div>
                  </div>
                  <div className="wpforms-submit-container">
                    <button
                      type="submit"
                      name="wpforms[submit]"
                      id="wpforms-submit-53"
                      className="wpforms-submit gradient zoom"
                      style={{color:"white"}}
                      data-alt-text="Sending..."
                      data-submit-text="Send"
                      aria-live="assertive"
                      value="wpforms-submit"
                    >
                      {loader ? "Loading..." : "Send"}
                    </button>
                    <img
                      src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2026%2026'%3E%3C/svg%3E"
                      className="wpforms-submit-spinner"
                      style={{ display: "none" }}
                      width={26}
                      height={26}
                      alt="Loading"
                      data-lazy-src="../../public/assets/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg"
                    />
                    <noscript>
                      &lt;img loading="lazy"
                      src="../../public/assets/wp-content/plugins/wpforms-lite/assets/images/submit-spin.svg"
                      class="wpforms-submit-spinner" style="display: none;"
                      width="26" height="26" alt="Loading" /&gt;
                    </noscript>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
        <div
          id="popup"
          className="row pop_up_bg fade-in hidden text-center justify-content-center align-items-center"
        >
          <div className="col-md-6 col-10 pop_up_box gradient text-center rounded">
            <i id="close_popup" className="fas fa-times save_c" />
            <div className="cta_content_wrap">
              <div id="lets_not" className="cta_header hidden scratched">
                Come on now! Don't push your luck!
              </div>
              <div id="snooze" className="cta_header hidden scratched">
                Sorry, you snooze, you lose!
              </div>
              <div id="hide_cta">
                <div className="cta_header scratched pt-5">
                  GET <span id="percent" className="counter" />% OFF
                </div>
                <div className="row cta_subheader justify-content-center">
                  <div className="col-auto nopadding text-right">
                    with promo &nbsp;
                  </div>
                  <div className="col-auto nopadding text-left" id="cta_code">
                    <div id="code_10">WB10</div>
                    <div id="code_20" className="hidden">
                      WB20
                    </div>
                    <div id="code_30" className="hidden">
                      WB30
                    </div>
                  </div>
                </div>
                <div id="timer">
                  <i className="far fa-clock" />
                  Valid for <span id="time">30</span>s
                </div>
              </div>
              <div className="white_buttons">
                <div
                  id="wantmore"
                  className="wantmore btn black pointer mb-2 mr-md-0 mr-0 mr-sm-3"
                >
                  GET MORE
                </div>
                <a
                  id="cta_odrer_now_btn"
                  href="#"
                  className="mobiledownload save_c btn zoom white d-md-none mb-2 ml-0 ml-sm-3"
                >
                  ORDER NOW
                </a>
              </div>
              <div className="d-md-block d-none pb-5">
                <img
                  width={800}
                  height={234}
                  className="download-btn left save_c open_download_popup zoom"
                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20800%20234'%3E%3C/svg%3E"
                  alt="Download Play Store"
                  data-lazy-src="../../public/assets/wp-content/themes/byEnero/img/IconGoogleplay-min.png"
                />
                <noscript>
                  &lt;img width="800" height="234" class="download-btn left
                  save_c open_download_popup zoom"
                  src="../../public/assets/wp-content/themes/byEnero/img/IconGoogleplay-min.png"
                  alt="Download Play Store"&gt;
                </noscript>
                <img
                  width={800}
                  height={237}
                  className="download-btn right save_c open_download_popup zoom"
                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20800%20237'%3E%3C/svg%3E"
                  alt="Download App Store"
                  data-lazy-src="../../public/assets/wp-content/themes/byEnero/img/appstore-badge-min.png"
                />
                <noscript>
                  &lt;img width="800" height="237" class="download-btn right
                  save_c open_download_popup zoom"
                  src="../../public/assets/wp-content/themes/byEnero/img/appstore-badge-min.png"
                  alt="Download App Store"&gt;
                </noscript>
              </div>
            </div>
          </div>
        </div>
        {/* Pop up download / get SMS */}
        <div
          id="download_popup"
          className="row pop_up_bg hidden fade-in  text-center justify-content-center align-items-center"
        >
          <i id="close_download_popup" className="fas fa-times save_c" />
          <div className="col-5 pop_up_box text-center">
            <div className="cta_content_wrap d-inline-block text-left">
              <h2>Join our Community</h2>
              <p>
                Let us SMS you a direct link to install our app as well as a{" "}
                <br />
                <span className="bold">30% offer code</span>
              </p>
              <div
                className="wpcf7 no-js"
                id="wpcf7-f347-o1"
                lang="en-US"
                dir="ltr"
              >
                <div className="screen-reader-response">
                  <p role="status" aria-live="polite" aria-atomic="true" />
                  <ul />
                </div>
                <form
                  action="/#wpcf7-f347-o1"
                  method="post"
                  className="wpcf7-form init"
                  aria-label="Contact form"
                  noValidate="novalidate"
                  data-status="init"
                >
                  <div style={{ display: "none" }}>
                    <input type="hidden" name="_wpcf7" defaultValue={347} />
                    <input
                      type="hidden"
                      name="_wpcf7_version"
                      defaultValue="5.9.5"
                    />
                    <input
                      type="hidden"
                      name="_wpcf7_locale"
                      defaultValue="en_US"
                    />
                    <input
                      type="hidden"
                      name="_wpcf7_unit_tag"
                      defaultValue="wpcf7-f347-o1"
                    />
                    <input
                      type="hidden"
                      name="_wpcf7_container_post"
                      defaultValue={0}
                    />
                    <input
                      type="hidden"
                      name="_wpcf7_posted_data_hash"
                      defaultValue=""
                    />
                  </div>
                  <p>
                    <span className="wpcf7-form-control-wrap intl_tel-812">
                      <input
                        className="wpcf7-form-control wpcf7-intl_tel wpcf7-intl-tel"
                        aria-invalid="false"
                        data-preferredcountries="AE-DU"
                        defaultValue=""
                        type="tel"
                        name="intl_tel-812-cf7it-national"
                      />
                      <input
                        name="intl_tel-812"
                        type="hidden"
                        className="wpcf7-intl-tel-full"
                      />
                      <input
                        type="hidden"
                        name="intl_tel-812-cf7it-country-name"
                        className="wpcf7-intl-tel-country-name"
                      />
                      <input
                        type="hidden"
                        name="intl_tel-812-cf7it-country-code"
                        className="wpcf7-intl-tel-country-code"
                      />
                      <input
                        type="hidden"
                        name="intl_tel-812-cf7it-country-iso2"
                        className="wpcf7-intl-tel-country-iso2"
                      />
                    </span>
                  </p>
                  <p>
                    <input
                      className="wpcf7-form-control wpcf7-submit has-spinner gradient zoom rounded"
                      type="submit"
                      defaultValue="Send"
                    />
                  </p>
                  <div className="wpcf7-response-output" aria-hidden="true" />
                </form>
              </div>
              <p className="mb-1 pt-3 bold">Or view our app at</p>
              <div className="d-md-block d-none pb-5">
                <a
                  href="https://play.google.com/store/apps/details?id=com.laundryportal.app"
                  target="_blank"
                >
                  <img
                    width={800}
                    height={234}
                    className="download-btn left save_c"
                    src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20800%20234'%3E%3C/svg%3E"
                    alt="Download Play Store"
                    data-lazy-src="../../public/assets/wp-content/themes/byEnero/img/IconGoogleplay-min.png"
                  />
                  <noscript>
                    &lt;img width="800" height="234" class="download-btn left
                    save_c"
                    src="../../public/assets/wp-content/themes/byEnero/img/IconGoogleplay-min.png"
                    alt="Download Play Store"&gt;
                  </noscript>
                </a>
                <a
                  href="https://apps.apple.com/us/app/laundry-portal/id1457375679?ls=1"
                  target="_blank"
                >
                  <img
                    width={800}
                    height={237}
                    className="download-btn right save_c"
                    src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20800%20237'%3E%3C/svg%3E"
                    alt="Download App Store"
                    data-lazy-src="../../public/assets/wp-content/themes/byEnero/img/appstore-badge-min.png"
                  />
                  <noscript>
                    &lt;img width="800" height="237" class="download-btn right
                    save_c"
                    src="../../public/assets/wp-content/themes/byEnero/img/appstore-badge-min.png"
                    alt="Download App Store"&gt;
                  </noscript>
                </a>
              </div>
            </div>
          </div>
          <div className="col-4 text-left ml-4">
            <img
              width={400}
              height={493}
              className=" img-responsive pop_up_img "
              src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20400%20493'%3E%3C/svg%3E"
              alt="Laundry Portal Near you download"
              data-lazy-src="../../public/assets/wp-content/themes/byEnero/img/Laundry-service-dual-view.png"
            />
            <noscript>
              &lt;img width="400" height="493" class=" img-responsive pop_up_img
              "
              src="../../public/assets/wp-content/themes/byEnero/img/Laundry-service-dual-view.png"
              alt="Laundry Portal Near you download"&gt;
            </noscript>
          </div>
        </div>
      </main>
      <Check handleShow={handleShow} handleClose={handleClose} show={show} />
    </>
  );
};

export default HomeSection01;

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./swiper.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import DownloadButton from "./DownloadButton";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import Check from "./Check";
import CustomModals from "./Layout/CustomModals";

const HowDoes = ({ idPackages }) => {
  const swiperRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [activeServiceId, setActiveServiceId] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const goNext = (index) => {
    if (swiperRef.current) {
      console.log(swiperRef.current.swiper, "swiper");
      swiperRef.current.swiper.slideNext();
    }
  };
  const services = [
    {
      id: 1,
      title: "1. Choose Your Laundry",
      description:
        "Browse from some of the best laundry service providers in Dubai and book a free pick-up from your preferred company.",
      image: "/images/slider1.webp",
      toggleClass: "toggle-el",
    },
    {
      id: 2,
      title: "2. Choose Your Timing",
      description:
        "Next, select a pick-up and delivery time that complements your busy, on-the-go lifestyle.",
      image: "/images/slider2.webp",
      toggleClass: "toggle-el3",
    },
    {
      id: 3,
      title: "3. Place Your Order",
      description:
        "Final step and then it's time to relax. But first, do you want to pay by card or cash? Add any additional notes or apply a promo code? No problem, all of this is possible and more.",
      image: "/images/slider3.webp",
      toggleClass: "toggle-el2",
    },
  ];
  // eslint-disable-next-line no-unused-vars
  const goPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  const handleStepClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };
  const handleClick = (id) => {
    setActiveServiceId((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((prevId) => prevId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleResize);
    };
  }, [isMobile]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  return (
    <>
      <div className="howdoesitwork_container section-indent mt-0 mb-lg-5">
        <div class="my_space"></div>
        <div className="container container-fluid-lg">
          <div className="title-block text-center">
            <h2 className="dborder bblue mobilescreen">HOW DOES IT WORK?</h2>
          </div>
        </div>
      </div>

      <Swiper
        id={idPackages}
        ref={swiperRef}
        modules={[Navigation]}
        navigation={true}
        className="mySwiper customSwiper"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveStep(swiper?.activeIndex)}
      >
        <div className="container">
          <div className="row justify-content-center align-items-center">
            {services.map((service) => (
              <SwiperSlide key={service.id}>
                <div className="col-lg-6">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-lg-6" id="textmobile">
                      <h3 className="text-white fw-bolder">{service.title}</h3>
                      <div>
                        <Link
                          to="#"
                          onClick={() => handleClick(service.id)}
                          className="btn btn-primary gradient zoom d-md-none mb-4 p-2 pull-down"
                          id="btnReadmore"
                        >
                          Read More <i className="fa fa-chevron-right"></i>
                        </Link>
                        <p
                          className={`text-white ${service.toggleClass} ${
                            activeServiceId?.includes(service.id)
                              ? ""
                              : "hide-text"
                          }`}
                          id="showtext"
                        >
                          {service.description}
                        </p>
                        <p className={`d-md-block text-white d-none`}>
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="w-100 d-flex justify-content-center">
                        <img
                          src={service.image}
                          style={{ width: "220px" }}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <SwiperSlide>
              <div className="col-lg-6 d-flex justify-content-center">
                <div className="row justify-content-center align-items-center">
                  <div className="col-lg-12">
                    <h3 className="card-title text-center gradient_text how-title d-md-block">
                      Now You're Ready!
                    </h3>
                    <img
                      src="/images/slider4.webp"
                      style={{ width: "220px" }}
                      alt=""
                    />
                    <div className="scratched gradient_text try_header text-center">
                      30% OFF
                    </div>
                    <div className="try_subheader text-center">
                      with promo{" "}
                      <span className="try_code gradient_text">WB30</span>
                    </div>
                    <div className="tt-btn d-flex justify-content-center tt-btn__wide my-3">
                      <p className="d-md-none d-block">
                        <DownloadButton btnText={"Order now"}/>
                      </p>
                      <button
                        onClick={handleShow2}
                        className={
                          "mobiledownload btn btn-primary zoom d-md-inline-block d-none gradient_rev text-white"
                        }
                      >
                        Order now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </div>
        </div>
      </Swiper>

      <div className="step-indicators d-none d-lg-flex">
        {["Step 1", "Step 2", "Step 3", "Order Now"].map((step, index) => (
          <div
            style={{ cursor: "pointer" }}
            key={index}
            onClick={() => {
              handleStepClick(index);
              // if (step === "Order Now") {
              //   handleShow2();
              // }
            }}
            className={`step-indicator ${activeStep === index ? "active" : ""}`}
          >
            {step}
          </div>
        ))}
      </div>
      <CustomModals handleClose={handleClose2} show={show2} />
      <Check handleShow={handleShow} handleClose={handleClose} show={show} />
    </>
  );
};

export default HowDoes;

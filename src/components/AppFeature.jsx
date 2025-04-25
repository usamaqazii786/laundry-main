/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import payleft from "./Loundry Image/Tab2.jpg";
import payright from "./Loundry Image/Tab2r.jpg";
import nofeeleft from "./Loundry Image/Default Display 1.jpg";
import nofeeright from "./Loundry Image/Default Display 2.jpg";
import flextimeleft from "./Loundry Image/./Flexible time Booking 1.jpg";
import sameornext from "./Loundry Image/Same or next day service 1.jpg";
import wideleft from "./Loundry Image/Wide variety of services 1.jpg";
import wideright from "./Loundry Image/Transparent Pricing. No Mark Ups. 1.jpg";
import trans from "./Loundry Image/Transparent Pricing. No Mark Ups. 2.jpg";
import transleft from "./Loundry Image/hello.jpg";
import sameornextright from "./Loundry Image/./Flexible time Booking 1.jpg";
import orderleft from "./Loundry Image/Order Status Updtes 1.jpg";
import orderright from "./Loundry Image/Order Status Updates 2.jpg";
import liveleft from "./Loundry Image/Live Chat Customer service 1.jpg";
import liveright from "./Loundry Image/Live chat customer service 2.jpg";

const AppFeature = () => {
  const [state, setstate] = useState("No service fees");
  const [animationClass, setAnimationClass] = useState('');
    
      // Function to determine the left image based on the state
      const getLeftImage = (state) => {
        switch (state) {
          case "No service fees": return nofeeleft;
          case "Pay": return payleft;
          case "flex": return flextimeleft;
          case "wide": return wideleft;
          case "trans": return transleft;
          case "same": return sameornext;
          case "order": return orderleft;
          case "live": return liveleft;
          default: return '';
        }
      };
    
      // Function to determine the right image based on the state
      const getRightImage = (state) => {
        switch (state) {
          case "No service fees": return nofeeright;
          case "Pay": return payright;
          case "flex": return sameornext;
          case "wide": return wideright;
          case "trans": return trans;
          case "same": return sameornextright;
          case "order": return orderright;
          case "live": return liveright;
          default: return '';
        }
      };
    
      useEffect(() => {
        if (state) {
          // Trigger fade-in animation
          setAnimationClass('fade-in');
    
          // After animation completes, reset the animation class to handle subsequent clicks
          const timer = setTimeout(() => {
            setAnimationClass('fade-out');
          }, 500); // Match the fade-in duration
    
          // Reset the animation class after fade-out completes
          setTimeout(() => {
            setAnimationClass('');
          }, 1000); // Match the total duration (fade-in + fade-out)
    
          return () => clearTimeout(timer); // Cleanup the timer
        }
      }, [state]);
      // Get the images based on the current state
      const condition = getLeftImage(state);
      const conditionone = getRightImage(state);
    

  return (
    <>
      <div id="cta">
        <div className="cta_bg"></div>
        <div className="cta overlay">
          <div className="container clr">
            <section id="features" className="text-center">
              <div id="features_ancor" className="ancor" />
              <h2 className="dborder darkblue">App features</h2>
              <div className="row align-items-center">
                <div className="col-md-3 col-6 order-2 order-md-1 text-left">
                  <a id="fees-id" href="#fees">
                    <div className="row feature_wrap text-center justify-content-end align-items-center pt-3 pb-3 zoom active">
                      <div className="col-md-3 pl-0 pr-0 pr-md-2">
                        <img
                          className="feature_icon entered lazyloaded"
                          height="50px"
                          width="auto"
                          data-lazy-src="./fees.svg"
                          src="./fees.svg"
                          data-ll-status="loaded"
                          onClick={() => setstate("No service fees")}
                        />
                      </div>
                      <div
                        className={`col-md-8 pl-4 text-md-left  textsizeresponsive ${
                          state === "No service fees" && "fw-bolder"
                        }`}
                        onClick={() => setstate("No service fees")}
                      >
                        No service fees
                        <br />
                        &nbsp;
                      </div>
                    </div>
                  </a>
                  <a id="pay-id" href="#pay">
                    <div className="row feature_wrap text-center align-items-center pt-3 pb-3 zoom">
                      <div className="col-md-3 pl-0 pr-0 pr-md-2">
                        <img
                          className="feature_icon entered lazyloaded"
                          height="50px"
                          width="auto"
                          // data-lazy-src="./payment.svg"
                          src="./payment.svg"
                          data-ll-status="loaded"
                          onClick={() => setstate("Pay")}
                        />
                        <noscript>
                          &lt;img class="feature_icon" height="50px"
                          width="auto"
                          src="./payment.svg"&gt;
                        </noscript>{" "}
                      </div>
                      <div
                        className={`col-md-8 pl-4 text-md-left  textsizeresponsive${
                          state === "Pay" && "fw-bolder"
                        }`}
                        onClick={() => setstate("Pay")}
                      >
                        {" "}
                        Pay by Cash or Credit Card
                      </div>
                    </div>
                  </a>
                  <a id="flexible-id" href="#flexible">
                    <div className="row feature_wrap text-center align-items-center pt-3 pb-3 zoom">
                      <div className="col-md-3 pl-0 pr-0 pr-md-2">
                        <img
                          className="feature_icon entered lazyloaded"
                          height="50px"
                          width="auto"
                          src="./flexible.svg"
                          data-lazy-src="./flexible.svg"
                          data-ll-status="loaded"
                          onClick={() => setstate("flex")}
                        />
                        <noscript>
                          &lt;img class="feature_icon" height="50px"
                          width="auto"
                          src="./flexible.svg"&gt;
                        </noscript>{" "}
                      </div>
                      <div
                        className={`col-md-8 pl-4 text-md-left  textsizeresponsive${
                          state === "flex" && "fw-bolder"
                        }`}
                        onClick={() => setstate("flex")}
                      >
                        Flexible Time Booking
                      </div>
                    </div>
                  </a>
                  <a id="variety-id" href="#variety">
                    <div className="row feature_wrap text-center justify-content-end align-items-center pt-3 pb-3 zoom">
                      <div className="col-md-3 pl-0 pr-0 pr-md-2">
                        <img
                          className="feature_icon entered lazyloaded"
                          height="50px"
                          width="auto"
                          src="./services.svg"
                          data-lazy-src="./services.svg"
                          data-ll-status="loaded"
                          onClick={() => setstate("wide")}
                        />
                        <noscript>
                          &lt;img class="feature_icon" height="50px"
                          width="auto"
                          src="./services.svg"&gt;
                        </noscript>{" "}
                      </div>
                      <div
                        className={`col-md-8 pl-4 text-md-left  textsizeresponsive${
                          state === "wide" && "fw-bolder"
                        }`}
                        onClick={() => setstate("wide")}
                      >
                        {" "}
                        Wide Variety of Services
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-6 order-1 order-md-2 p-3 text-center pb-md-2 pb-5 ">
                  <div className="row justify-content-center align-items-end mobile_screens">
                    <div className="col-6 d-flex justify-content-center mobile_screen">
                      <div className="owl-five owl-carousel text-center owl-loaded owl-drag">
                        <div className="owl-stage-outer">
                          <div
                            className="owl-stage"
                            style={{
                              transform: "translate3d(-1067px, 0px, 0px)",
                              transition: "all 0s ease 0s",
                              width: 4268,
                            }}
                          >
                            <div
                              className="owl-item cloned"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="pricing">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Transparent Pricing. No Mark Ups. 1.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Transparent Pricing. No Mark Ups. 1.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item cloned"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="next_day">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Same or next day service 1.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Same or next day service 1.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item cloned"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="status">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Order Status Updtes 1.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Order Status Updtes 1.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item cloned"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="chat">
                                <img
                                  className="features_images entered lazyloaded"
                                  id="animat"
                                  height="auto"
                                  width="90%"
                                  src="./Live Chat Customer service 1.jpg"
                                  data-lazy-src="./Live Chat Customer service 1.jpg"
                                  data-ll-status="loaded"
                                />
                              </div>
                            </div>
                            <div
                              className="owl-item active"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="fees">
                                <img
                                  id="animat"
                                  className={animationClass}
                                  height="auto"
                                  width="90%"
                                  src={condition}
                                  data-ll-status="loaded"
                                />
                                {/* front left screen */}
                              </div>
                            </div>
                            <div
                              className="owl-item"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="pay">
                                <img
                                  className="features_images entered lazyloaded"
                                  height="auto"
                                  width="90%"
                                  src="./Pay by cash or card 1.jpg"
                                  data-lazy-src="./Pay by cash or card 1.jpg"
                                  data-ll-status="loaded"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Pay by cash or card 1.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="flexible">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Flexible time Booking 1.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Flexible time Booking 1.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="variety">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Wide variety of services 1.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Wide variety of services 1.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="pricing">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Transparent Pricing. No Mark Ups. 1 (1).jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Transparent Pricing. No Mark Ups. 1 (1).jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="next_day">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Same or next day service 1 (1).jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Same or next day service 1 (1).jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="status">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Order Status Updtes 1 (1).jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Order Status Updtes 1 (1).jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="chat">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Live Chat Customer service 1.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Live Chat Customer service 1.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item cloned"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="fees">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Default Display 1.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Default Display 1.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item cloned"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="pay">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Pay by cash or card 1.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Pay by cash or card 1.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item cloned"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="flexible">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Flexible time Booking 1.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Flexible time Booking 1.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item cloned"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="variety">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Wide variety of services 1.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Wide variety of services 1.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="owl-nav disabled">
                          <button
                            type="button"
                            role="presentation"
                            className="owl-prev"
                          >
                            <span aria-label="Previous">‹</span>
                          </button>
                          <button
                            type="button"
                            role="presentation"
                            className="owl-next"
                          >
                            <span aria-label="Next">›</span>
                          </button>
                        </div>
                        <div className="owl-dots disabled" />
                      </div>
                      <div className="features_phone_bg left_bg">
                        <img
                          src="./Laundry-Portal-Phone-bg-transparent.png"
                          alt="phone bg"
                          className="entered lazyloaded"
                        />
                        <noscript>
                          <img
                            width="386"
                            height="769"
                            src="./Laundry-Portal-Phone-bg-transparent.png"
                            alt="phone bg"
                          />
                        </noscript>
                      </div>
                    </div>
                    <div className="col-6 d-flex justify-content-center mobile_screen smaller">
                      <div className="owl-four owl-carousel text-center owl-loaded owl-drag">
                        <div className="owl-stage-outer">
                          <div
                            className="owl-stage"
                            style={{
                              transform: "translate3d(-1067px, 0px, 0px)",
                              transition: "all 0s ease 0s",
                              width: 4268,
                            }}
                          >
                            <div
                              className="owl-item cloned"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="pricing">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Transparent Pricing. No Mark Ups. 2.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Transparent Pricing. No Mark Ups. 2.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item cloned"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="next_day">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Same or next day service 2.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Same or next day service 2.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item cloned"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="status">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Order Status Updates 2.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Order Status Updates 2.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item cloned"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="chat">
                                <img
                                  className="features_images entered lazyloaded"
                                  height="auto"
                                  width="90%"
                                  data-lazy-src="./Live chat customer service 2.jpg"
                                  src="./Live chat customer service 2.jpg"
                                  data-ll-status="loaded"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Live chat customer service 2.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item active"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="fees">
                                <img
                                  id="animat"
                                  className={animationClass}
                                  height="auto"
                                  width="90%"
                                  data-lazy-src={conditionone}
                                  src={conditionone}
                                  data-ll-status="loaded"
                                />
                                {/* front right screen */}
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Default Display 2.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="pay">
                                <img
                                  className="features_images entered lazyloaded"
                                  height="auto"
                                  width="90%"
                                  data-lazy-src="./Pay by cash or card 2.jpg"
                                  src="./Pay by cash or card 2.jpg"
                                  data-ll-status="loaded"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Pay by cash or card 2.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="flexible">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Flexible time booking 2.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Flexible time booking 2.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="variety">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Wide variety of services 2.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Wide variety of services 2.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="pricing">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="https://thelaundryportal.com/wp-content/themes/byEnero/img/Features%20Screenshots/Transparent%20Pricing.%20No%20Mark%20Ups.%202.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="https://thelaundryportal.com/wp-content/themes/byEnero/img/Features%20Screenshots/Transparent%20Pricing.%20No%20Mark%20Ups.%202.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="next_day">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Same or next day service 2.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Same or next day service 2.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="status">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Order Status Updates 2.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Order Status Updates 2.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="chat">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Live chat customer service 2.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Live chat customer service 2.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item cloned"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="fees">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Default Display 2.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Default Display 2.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item cloned"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="pay">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Pay by cash or card 2.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Pay by cash or card 2.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item cloned"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="flexible">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Flexible time booking 2.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Flexible time booking 2.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                            <div
                              className="owl-item cloned"
                              style={{ width: "266.75px" }}
                            >
                              <div data-hash="variety">
                                <img
                                  className="features_images"
                                  height="auto"
                                  width="90%"
                                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2090%200'%3E%3C/svg%3E"
                                  data-lazy-src="./Wide variety of services 2.jpg"
                                />
                                <noscript>
                                  &lt;img class="features_images" height="auto"
                                  width="90%"
                                  src="./Wide variety of services 2.jpg"&gt;
                                </noscript>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="owl-nav disabled">
                          <button
                            type="button"
                            role="presentation"
                            className="owl-prev"
                          >
                            <span aria-label="Previous">‹</span>
                          </button>
                          <button
                            type="button"
                            role="presentation"
                            className="owl-next"
                          >
                            <span aria-label="Next">›</span>
                          </button>
                        </div>
                        <div className="owl-dots disabled" />
                      </div>
                      <div className="features_phone_bg right_bg">
                        <img
                          width={386}
                          height={769}
                          src="./Laundry-Portal-Phone-bg-transparent.png"
                          alt="phone bg"
                          data-lazy-src="./Laundry-Portal-Phone-bg-transparent.png"
                          data-ll-status="loaded"
                          className="entered lazyloaded"
                        />
                        <noscript>
                          &lt;img width="386" height="300"
                          src="./Laundry-Portal-Phone-bg-transparent.png"
                          alt="phone bg"&gt;
                        </noscript>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-6 order-3 order-md-3 text-right">
                  <a id="pricing-id" href="#pricing">
                    <div className="row feature_wrap text-center align-items-center pt-3 pb-3 zoom">
                      <div
                        className={`col-md-8 pl-1 order-2 order-md-1 text-md-right ${
                          state === "trans" && "fw-bolder"
                        }`}
                        onClick={() => setstate("trans")}
                      >
                        Transparent Pricing. No Mark Ups
                      </div>
                      <div className="col-md-3 pr-0 order-1 order-md-2">
                        <img
                          className="feature_icon entered lazyloaded"
                          height="50px"
                          width="auto"
                          data-lazy-src="./pricing (1).svg"
                          src="./pricing (1).svg"
                          data-ll-status="loaded"
                          onClick={() => setstate("trans")}
                        />
                        <noscript>
                          &lt;img class="feature_icon" height="50px"
                          width="auto"
                          src="./pricing (1).svg"&gt;
                        </noscript>
                      </div>
                    </div>
                  </a>
                  <a id="next_day-id" href="#next_day">
                    <div className="row feature_wrap justify-content-end text-center align-items-center pt-3 pb-3 zoom">
                      <div
                        className={`col-md-8 pl-1 order-2 order-md-1 text-md-right ${
                          state === "same" && "fw-bolder"
                        }`}
                        onClick={() => setstate("same")}
                      >
                        Same or Next Day Service
                      </div>
                      <div className="col-md-3 pr-0 order-1 order-md-2  pl-0 pl-md-2">
                        <img
                          className="feature_icon entered lazyloaded"
                          height="50px"
                          width="auto"
                          data-lazy-src="./same day (1).svg"
                          src="./same day (1).svg"
                          data-ll-status="loaded"
                          onClick={() => setstate("same")}
                        />
                        <noscript>
                          &lt;img class="feature_icon" height="50px"
                          width="auto"
                          src="./same day (1).svg"&gt;
                        </noscript>
                      </div>
                    </div>
                  </a>
                  <a id="status-id" href="#status">
                    <div className="row feature_wrap justify-content-end text-center align-items-center pt-3 pb-3 zoom">
                      <div
                        className={`col-md-8 pl-1 order-2 order-md-1 text-md-right ${
                          state === "order" && "fw-bolder"
                        }`}
                        onClick={() => setstate("order")}
                      >
                        Order Status Updates
                      </div>
                      <div className="col-md-3 pr-0 order-1 order-md-2  pl-0 pl-md-2">
                        <img
                          className="feature_icon entered lazyloaded"
                          height="50px"
                          width="auto"
                          data-lazy-src="./tracking (1).svg"
                          src="./tracking (1).svg"
                          data-ll-status="loaded"
                          onClick={() => setstate("order")}
                        />
                        <noscript>
                          &lt;img class="feature_icon" height="50px"
                          width="auto"
                          src="./tracking (1).svg"&gt;
                        </noscript>
                      </div>
                    </div>
                  </a>
                  <a id="chat-id" href="#chat">
                    <div className="row feature_wrap text-center align-items-center pt-3 pb-3 zoom">
                      <div
                        className={`col-md-8 pl-1 order-2 order-md-1 text-md-right ${
                          state === "live" && "fw-bolder"
                        }`}
                        onClick={() => setstate("live")}
                      >
                        Live Chat Customer Service
                      </div>
                      <div className="col-md-3 pr-0 order-1 order-md-2  pl-0 pl-md-2">
                        <img
                          className="feature_icon entered lazyloaded"
                          height="50px"
                          width="auto"
                          data-lazy-src="./Group 2.svg"
                          src="./Group 2.svg"
                          data-ll-status="loaded"
                          onClick={() => setstate("live")}
                        />
                        <noscript>
                          &lt;img class="feature_icon" height="50px"
                          width="auto"
                          src="./Group 2.svg"&gt;
                        </noscript>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </section>
          </div>{" "}
          {/* /.container */}
        </div>
      </div>
    </>
  );
};

export default AppFeature;

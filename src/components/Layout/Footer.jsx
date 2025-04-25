/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import Check from "../Check";
import DownloadButton from "../DownloadButton";
import { Link } from "react-router-dom";

const Footer = () => {
  const [Hide, setHide] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const pathname = window.location.pathname;
  return (
    <>
      <footer
        id="footer"
        className="site-footer"
        itemScope="itemscope"
        itemType="https://schema.org/WPFooter"
        role="contentinfo"
      >
        <div id="footer-inner" className="clr">
          <div id="footer-widgets" className="oceanwp-row clr">
            <div className="footer-widgets-inner container">
              <div className="row">
                <div className="col-12">
                  <div
                    id="custom_html-3"
                    className="widget_text footer-widget widget_custom_html clr"
                  >
                    <div
                      className="textwidget custom-html-widget"
                      style={{ fontSize: "18px" }}
                    >
                      <div className="copyright">© 2024 Laundry Portal</div>
                    </div>
                  </div>
                  <div
                    id="nav_menu-3"
                    className="footer-widget widget_nav_menu clr"
                  >
                    <div className="menu-footer-container">
                      <ul id="menu-footer" className="menu">
                        <li
                          id="menu-item-59"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-59"
                        >
                          <Link
                            rel="privacy-policy"
                            style={{ fontSize: "16px" }}
                            to="/privacy-policy"
                          >
                            Privacy Policy
                          </Link>
                        </li>
                        <li
                          id="menu-item-65"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-65"
                        >
                          <Link
                            to="/terms-and-conditions"
                            style={{ fontSize: "16px" }}
                          >
                            Terms &amp; Conditions
                          </Link>
                        </li>
                        <li
                          id="menu-item-64"
                          className="menu-item menu-item-type-post_type menu-item-object-page menu-item-64"
                        >
                          <Link
                            to="/refund-policy"
                            style={{ fontSize: "16px" }}
                          >
                            Refund Policy
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    id="custom_html-5"
                    className="widget_text footer-widget widget_custom_html clr"
                  >
                    <div className="textwidget custom-html-widget">
                      <a
                        href="https://www.facebook.com/LaundryPortal/?modal=admin_todo_tour"
                        target="_blank"
                        rel="noopener"
                      >
                        <FaFacebookF />
                      </a>
                      <a
                        href="https://www.instagram.com/laundryportal/"
                        target="_blank"
                        rel="noopener"
                      >
                        <FaInstagram />
                      </a>
                    </div>
                  </div>
                </div>
                {/* .footer-one-box */}
              </div>
              {/* .container */}
            </div>
            <div className="d-md-none d-block">
              <br />
              <br />
              <br />
            </div>

            {/* #footer-widgets */}
          </div>
          {pathname!="/order"&&(
          <div
            className={`footer mobileFoterfalse ${Hide === false && "d-none "} d-flex d-lg-none`}
          >
            <span className="ps-2 fs-2" onClick={() => setHide(false)}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="1.35355"
                  y1="0.646508"
                  x2="11.3892"
                  y2="10.6822"
                  stroke="white"
                ></line>
                <line
                  x1="0.646447"
                  y1="10.6821"
                  x2="10.6821"
                  y2="0.646422"
                  stroke="white"
                ></line>
              </svg>
            </span>
            <span className="mobileScreenSpan">You’re one tap away!</span>
            <div className="row md-me-5 me-1 mobilebtnfooter">
              <div
                className="col-3 px-0 mobilebtnfooter"
                style={{ backgroundColor: "#000" }}
              >
                <img
                  src="./images/logo.png"
                  alt="icon"
                  width={"16px"}
                  style={{
                    minHeight: "100%",
                    objectFit: "contain",
                    marginTop: "5px",
                  }}
                />
              </div>
              <div
                className="col-7 px-0 mobilebtnfooter"
                id="DownloadButton_Install"
              >
                <DownloadButton color={'white'} btnText={"Install"} />
              </div>
              <div className="col-2"></div>
            </div>
          </div>
          )}
          {/* #footer-inner */}
        </div>
      </footer>
      <Check handleShow={handleShow} handleClose={handleClose} show={show} />
    </>
  );
};

export default Footer;

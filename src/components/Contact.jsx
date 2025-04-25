/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";

const Contact = () => {
  return (
    <>
      <div className="tt-posirion-relative pt-5" id="contact">
        <div className="container container-fluid-lg">
          <div className="title-block text-center">
            <h4 className="title-block__title text-white border-bottom-color contact-h1 mb-4"
            >CONTACT US</h4>
            <div className="title-block__label text-white">
              +971 52 850 0040
            </div>
            <div className="title-block__label text-white">
              customercare@thelaundryportal.com
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="map-layout">
                <form
                  className="form-default"
                  id="contact-form"
                  method="post"
                  noValidate="novalidate"
                  action="#"
                >
                  <div className="row row-align-col">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="email"
                          className="form-control"
                          placeholder="E-mail"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="phonenumber"
                          className="form-control"
                          placeholder="Phone"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      rows={7}
                      className="form-control"
                      placeholder="Your message"
                      defaultValue={""}
                    />
                  </div>
                  <div className="tt-btn tt-btn__wide">
                    <button type="submit" className="button">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

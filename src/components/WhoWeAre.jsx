import React from "react";

const WhoWeAre = () => {
  return (
    <>
      <div
        className="maoin mt-5"
        id="about"
        style={{
          background:
            "-webkit-linear-gradient(110.03deg,rgba(30,163,254,.95) 5.76%,rgba(30,163,254,.95) 56.15%,rgba(154,251,206,.95) 103.49%),url(../../../../../../themes/byEnero/img/Laundry-Portal-cta-bg.jpg) center center",
        }}
      >
        <div className="section-inner py-5 bg-top-left move-top-bottom tt-overflow-hidden lazyloaded">
          <div className="container container-fluid-xl">
            <div className="title-block text-center">
              <h4 className="title-block__title text-white who-h1"
              >WHO ARE WE?</h4>
            </div>
            <div className="box01">
              <div className="box01__content">
                <div
                  style={{
                    borderLeft: "2px solid #1341b8",
                    paddingLeft: "20px",
                    height: "40px",
                  }}
                ></div>
                <div className="title-block mt-2">
                  <h4 className="title-block__title text-white">OUR VISION</h4>
                </div>
                <p
                  className="text-white mb-5"
                  style={{
                    borderLeft: "2px solid #1341b8",
                    paddingLeft: "20px",
                  }}
                >
                  To create a digital eco-system that seamlessly connects
                  laundry service providers with customers, ultimately freeing
                  up their time for matters best suited to their expertise and
                  desires.
                </p>
              </div>
              <div
                className="box01__img rounded"
                style={{ backgroundImage: 'url("/images/hand.webp")' }}
              >
                {" "}
              </div>
            </div>
          </div>
        </div>

        <div className="section-inner py-5 bg-top-left move-top-bottom tt-overflow-hidden lazyloaded">
          <div className="container container-fluid-xl">
            <div className="box01">
              <div
                className="box01__img rounded"
                style={{ backgroundImage: 'url("/images/vision.webp")' }}
              >
                {" "}
              </div>
              <div className="box01__content">
                <div
                  style={{
                    borderLeft: "2px solid #1341b8",
                    paddingLeft: "20px",
                    height: "40px",
                  }}
                ></div>
                <div className="title-block mt-2">
                  <h4 className="title-block__title text-white">ABOUT US</h4>
                </div>
                <p
                  className="text-white"
                  style={{
                    borderLeft: "2px solid #1341b8",
                    paddingLeft: "20px",
                  }}
                >
                  We are a locally grown Dubai-based brand inspired by the
                  constant digitization and convenience-craving culture that has
                  cultivated over recent years. Connection Hub Portal is happy
                  to have launched Laundry Portal, a new uniquely styled
                  mobile-app that enables users to browse and schedule their
                  laundry services from a wide selection of high-quality and
                  trusted dry cleaning companies. We offer a simple and seamless
                  user experience aimed at modernizing the existing approach,
                  eliminating miscommunication and providing unquestionable
                  customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section-inner py-5 bg-top-left move-top-bottom tt-overflow-hidden lazyloaded">
          <div className="container container-fluid-xl">
            <div className="box01">
              <div className="box01__content">
                <div
                  style={{
                    borderLeft: "2px solid #1341b8",
                    paddingLeft: "20px",
                    height: "40px",
                  }}
                ></div>
                <div className="title-block mt-2">
                  <h4 className="title-block__title text-white">
                    WHY CHOOSE US?
                  </h4>
                </div>
                <p
                  className="text-white mb-5"
                  style={{
                    borderLeft: "2px solid #1341b8",
                    paddingLeft: "20px",
                  }}
                >
                  We don’t just provide a simple mechanism for scheduling nearby
                  laundry services, we overlay the entire experience with world
                  class customer service. And by revitalizing an industry that
                  traditionally suffers from wide-spread miscommunication and
                  non-existent customer service, we afford you the freedoms to
                  kick back and enjoy the stress-free nature of it all.
                </p>
              </div>
              <div
                className="box01__img rounded"
                style={{ backgroundImage: 'url("/images/shirt.webp")' }}
              >
               {" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhoWeAre;

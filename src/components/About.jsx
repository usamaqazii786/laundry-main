import React from "react";

const About = () => {
  return (
    <>
      <div className="section-inner bg-top-left move-top-bottom tt-overflow-hidden lazyloaded">
        <div className="container container-fluid-xl">
          <div className="box01">
            <div
              className="box01__img rounded"
              style={{ backgroundImage: 'url("/images/img01.jpg")' }}
            >
              <img
                src="/images/video.webp"
                className="ls-is-cached lazyloaded"
                data-src="/images/video.webp"
                alt=""
                style={{ height: "120px" }}
              />{" "}
            </div>
            <div className="box01__content">
               <div  style={{ borderLeft: "2px solid #35c5fc", paddingLeft: "20px" , height:'40px' }}>
               </div>
              <div className="title-block mt-2">
                <h4 className="title-block__title text-white">
                  DESIGNED FOR YOU
                </h4>
              </div>
              {/* <div className="box01__wrapper-img">
                <img
                  src="/images/img01.jpg"
                  className="lazyload"
                  data-src="/images/img01.jpg"
                  alt=""
                />
              </div> */}
              <p
                className="text-white"
                style={{ borderLeft: "2px solid #35c5fc", paddingLeft: "20px" }}
              >
                Now you can book, track and pay for your laundry services all
                from the convenience of one simple app - Laundry Portal. Doing
                your laundry has never been easier. 3 simple steps then it's
                time to let us do the work. From regular dry cleaning, washing
                and ironing to carpet, curtain and shoe cleaning, we take care
                of the mundane and leave you to live an inspired life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

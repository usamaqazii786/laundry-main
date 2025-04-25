import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./swiper.css";
import "swiper/css/pagination";
import { Pagination,Autoplay } from "swiper/modules";

const CustomerFeed = () => {
  return (
    <>
      <section className="" id="customerfeedback">
        <div className="container container-fluid-lg">
          <div className="title-block text-center pb-0 pt-3">
            <h2 className="dborder bblue mobilescreen">customer feedback</h2>
          </div>
        </div>
      </section>
      <Swiper
        pagination={true}
        modules={[Pagination,Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <SwiperSlide>
              <div
                className="col-lg-10 py-3 px-4 rounded"
                style={{ background: "#242735", marginBottom: "60px" }}
              >
                <div className="row justify-content-center align-items-center">
                  <div className="col-lg-12" style={{ textAlign: "center" }}>
                    <h3 className="text-white">Ali Whitey</h3>
                    <div className="d-flex justify-content-center">
                      <i class="blue fa fa-star"></i>
                      <i class="blue fa fa-star"></i>
                      <i class="blue fa fa-star"></i>
                      <i class="blue fa fa-star"></i>
                      <i class="blue fa fa-star"></i>
                    </div>
                    <p className="text-white">
                      A well designed app! It shows you all the available
                      laundry places around you, let’s you know all the prices
                      for all the services with reviews to each place. Highly
                      recommended!!.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="col-lg-10 py-3 px-4 rounded"
                style={{ background: "#242735" }}
              >
                <div className="row justify-content-center align-items-center">
                  <div className="col-lg-12" style={{ textAlign: "center" }}>
                    <h3 className="text-white">Ali Whitey</h3>
                    <div className="d-flex justify-content-center">
                      <i class="blue fa fa-star"></i>
                      <i class="blue fa fa-star"></i>
                      <i class="blue fa fa-star"></i>
                      <i class="blue fa fa-star"></i>
                      <i class="blue fa fa-star"></i>
                    </div>
                    <p className="text-white">
                      A well designed app! It shows you all the available
                      laundry places around you, let’s you know all the prices
                      for all the services with reviews to each place. Highly
                      recommended!!.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="col-lg-10 py-3 px-4 rounded"
                style={{ background: "#242735" }}
              >
                <div className="row justify-content-center align-items-center">
                  <div className="col-lg-12" style={{ textAlign: "center" }}>
                    <h3 className="text-white">Ali Whitey</h3>
                    <div className="d-flex justify-content-center">
                      <i class="blue fa fa-star"></i>
                      <i class="blue fa fa-star"></i>
                      <i class="blue fa fa-star"></i>
                      <i class="blue fa fa-star"></i>
                      <i class="blue fa fa-star"></i>
                    </div>
                    <p className="text-white">
                      A well designed app! It shows you all the available
                      laundry places around you, let’s you know all the prices
                      for all the services with reviews to each place. Highly
                      recommended!!.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="col-lg-10 py-3 px-4 rounded"
                style={{ background: "#242735" }}
              >
                <div className="row justify-content-center align-items-center">
                  <div className="col-lg-12" style={{ textAlign: "center" }}>
                    <h3 className="text-white">Ali Whitey</h3>
                    <div className="d-flex justify-content-center">
                      <i class="blue fa fa-star"></i>
                      <i class="blue fa fa-star"></i>
                      <i class="blue fa fa-star"></i>
                      <i class="blue fa fa-star"></i>
                      <i class="blue fa fa-star"></i>
                    </div>
                    <p className="text-white">
                      A well designed app! It shows you all the available
                      laundry places around you, let’s you know all the prices
                      for all the services with reviews to each place. Highly
                      recommended!!.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </div>
        </div>
      </Swiper>
    </>
  );
};

export default CustomerFeed;

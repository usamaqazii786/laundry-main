/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axiosInstance from "./Https/axiosInstance";
import { Oval } from "react-loader-spinner";

const OrderBuySection = () => {
  const [getSingleOrder, setGetSingleOrder] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);

  useEffect(() => {
    setPageLoader(true);
    axiosInstance
    .get("user/my-orders")
    .then((res) => {
      setGetSingleOrder(res?.data?.data);
      setPageLoader(false);
    })
    .catch((err) => {
      console.log(err);
      setPageLoader(false);
      });
  }, []);

  return (
    <>
      <div className="container" style={{paddingTop:'80px'}}>
        <div className="row justify-content-center">
          {pageLoader ? (
            <div className="d-flex justify-content-center align-items-center" style={{height:'90vh'}}>
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
            <div className="col-xl-8">
              {getSingleOrder?.map((order) => (
                <div className="card border shadow-none my-4">
                  <div className="card-body">
                    <div className="d-flex align-items-start border-bottom pb-3">
                      <div className="me-4">
                        <img
                          src={
                            order?.services[0]?.image
                              ? order?.services[0]?.image
                              : "/images/package1.webp"
                          }
                          alt=""
                          className="avatar-lg rounded"
                        />
                      </div>
                      <div className="flex-grow-1 align-self-center overflow-hidden px-4">
                        <div>
                          <h5 className="text-truncate font-size-18">
                            <a href="#" className="text-white">
                              Title : {order?.services[0]?.title}{" "}
                            </a>
                          </h5>
                          <p className="text-muted mb-0">
                            <i className="bx bxs-star text-warning" />
                            <i className="bx bxs-star text-warning" />
                            <i className="bx bxs-star text-warning" />
                            <i className="bx bxs-star text-warning" />
                            <i className="bx bxs-star-half text-warning" />
                          </p>
                          <p className="mb-0 mt-1 text-white">
                            Description :{" "}
                            <span className="fw-medium text-white">
                              {order?.services[0]?.description}
                            </span>
                          </p>
                          <p className="mb-0 mt-1 text-white">
                            Price :{" "}
                            <span className="fw-medium text-white">
                              $ {order?.services[0]?.price}
                            </span>
                          </p>
                          <p className="mb-0 mt-1 text-white">
                            Order Status :{" "}
                            <span className="fw-medium text-white">
                              {order?.order_status}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* end row */}
      </div>
    </>
  );
};

export default OrderBuySection;

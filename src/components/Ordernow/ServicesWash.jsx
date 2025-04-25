import React from "react";
import { Button } from "react-bootstrap";

const ServicesWash = () => {

  return (
    <>
      <div className="fontsame container">
        <h2 className="fontsame text-start mt-4">What services do you need?</h2>
        <div className="row">
          <div className="bg-info row p-3 mt-3 rounded">
            <div className="col-lg-9">
              <div className="main-content">
                <div className="image-text-section">
                  <img
                    src="https://prod-cdn.laundryheap.com/images/static/services/web/wash.png"
                    height="32"
                    alt="Wash"
                  />
                  <div className="text-info">
                    <p className="service-name">Wash</p>
                  </div>
                </div>
                <p className="price-info text-start">
                  <span>From</span> <strong>$32.85</strong> &nbsp;
                  <span>/15lbs</span>&nbsp;
                  <span className="price-per-lb">($2.19 /lb)</span>
                </p>
                <div className="badges">
                  <span className="badge">WASH</span>
                  <span className="badge">TUMBLE-DRY</span>
                  <span className="badge">IN A BAG</span>
                  <span className="badge">Separate Wash 90°F</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="add-section">
                <Button
                  type="button"
                  variant="light"
                  className="text-dark w-100 py-3 border border-light"
                >
                  +&nbsp; Add
                </Button>
              </div>
              <p className="price-heading">See Price</p>
            </div>
          </div>
          <div className="bg-info row p-3 mt-3 rounded">
            <div className="col-lg-9">
              <div className="main-content">
                <div className="image-text-section">
                  <img
                    src="https://prod-cdn.laundryheap.com/images/static/services/web/duvets_and_bulky_items.png"
                    height="32"
                    alt="Wash"
                  />
                  <div className="text-info">
                    <p className="service-name">Duvets & Bulky Items</p>
                  </div>
                </div>
                <p className="price-info text-start">
                  <span>From</span> <strong>$32.85</strong> &nbsp;
                  <span>/15lbs</span>&nbsp;
                  <span className="price-per-lb">($2.19 /lb)</span>
                </p>
                <div className="badges">
                  <span className="badge">WASH</span>
                  <span className="badge">TUMBLE-DRY</span>
                  <span className="badge">IN A BAG</span>
                  <span className="badge">Separate Wash 90°F</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="add-section">
                <Button
                  type="button"
                  variant="light"
                  className="text-dark w-100 py-3 border border-light"
                >
                  +&nbsp; Add
                </Button>
              </div>
              <p className="price-heading">See Price</p>
            </div>
          </div>
          <div className="bg-info row p-3 mt-3 rounded">
            <div className="col-lg-9">
              <div className="main-content">
                <div className="image-text-section">
                  <img
                    src="https://prod-cdn.laundryheap.com/images/static/services/web/dry_cleaning.png"
                    height="32"
                    alt="Wash"
                  />
                  <div className="text-info">
                    <p className="service-name">Dry Cleaning</p>
                  </div>
                </div>
                <p className="price-info text-start">
                  <span>From</span> <strong>$32.85</strong> &nbsp;
                  <span>/15lbs</span>&nbsp;
                  <span className="price-per-lb">($2.19 /lb)</span>
                </p>
                <div className="badges">
                  <span className="badge">WASH</span>
                  <span className="badge">TUMBLE-DRY</span>
                  <span className="badge">IN A BAG</span>
                  <span className="badge">Separate Wash 90°F</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="add-section">
                <Button
                  type="button"
                  variant="light"
                  className="text-dark w-100 py-3 border border-light"
                >
                  +&nbsp; Add
                </Button>
              </div>
              <p className="price-heading">See Price</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesWash;

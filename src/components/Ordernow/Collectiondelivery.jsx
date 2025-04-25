import React, { useState } from "react";
import { Button } from "react-bootstrap";

const Collectiondelivery = () => {
  const [selectedType1, setselectedType1] = useState("Just once");
  const handleTypeSelect1 = (type) => {
    setselectedType1(type);
    console.log("Address type selected:", type);
  };
  const [formValues, setFormValues] = useState({
    collectionDay: "",
    collectionTime: "",
    deliveryDay: "",
    deliveryTime: "",
    collectionInstructions: "",
    driverInstructions: "",
    note: "",
  });

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  return (
    <>
      <div className="fontsame container px-5">
        <h2 className="fontsame text-start mt-4">Collection & delivery</h2>
        <div className="row">
          <h5 className="fontsame text-start mt-4 mb-2">Collection time</h5>
          <div className="col-lg-6">
            <div className="form-group text-start">
              <label className="text-white">Select Day</label>
              <div className="input-group">
                <span className="input-group-text bg-light text-white">
                  <i className="fas fa-calendar-day text-dark fs-3"></i>
                </span>
                <select
                  name="collectionDay"
                  className="form-control fs-3"
                  value={formValues.collectionDay}
                  onChange={handleChange1}
                >
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="form-group text-start">
              <label className="text-white">Select Time</label>
              <div className="input-group">
                <span className="input-group-text bg-light text-white">
                  <i className="fas fa-clock text-dark fs-3"></i>
                </span>
                <select
                  name="collectionTime"
                  className="form-control fs-3"
                  value={formValues.collectionTime}
                  onChange={handleChange1}
                >
                  <option value="12:00 - 15:00">12:00 - 15:00</option>
                  <option value="13:00 - 16:00">13:00 - 16:00</option>
                  <option value="17:00 - 20:00">17:00 - 20:00</option>
                  <option value="18:00 - 21:00">18:00 - 21:00</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-12 mt-4">
            <div className="form-group text-start">
              <label className="text-white">Driver instructions</label>
              <div className="input-group">
                <span className="input-group-text bg-light text-white">
               <img src={
                formValues.collectionInstructions === 'inPerson'
                  ? 'https://app.laundryheap.com/images/methods/personal.svg'
                  : formValues.collectionInstructions === 'outside'
                  ? 'https://app.laundryheap.com/images/methods/outside.svg'
                  : 'https://app.laundryheap.com/images/methods/reception_porter.svg'
                  
              } alt={""}/>
                </span>
                <select
                  name="collectionInstructions"
                  className="form-control fs-3"
                  value={formValues.collectionInstructions}
                  onChange={handleChange1}
                >
                  <option value="inPerson">
                    Collect from me in person
                  </option>
                  <option value="outside">
                    Collect from outside
                  </option>
                  <option value="reception">
                    Collect from reception/porter
                  </option>
                </select>
              </div>
            </div>
            <hr className="mt-4" />
          </div>
          <h5 className="fontsame text-start mt-4 mb-2">Delivery time</h5>
          <div className="col-lg-6">
            <div className="form-group text-start">
              <label className="text-white">Select Day</label>
              <div className="input-group">
                <span className="input-group-text bg-light text-white">
                  <i className="fas fa-calendar-day text-dark fs-3"></i>
                </span>
                <select
                  name="deliveryDay"
                  className="form-control fs-3"
                  value={formValues.deliveryDay}
                  onChange={handleChange1}
                >
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="form-group text-start">
              <label className="text-white">Select Time</label>
              <div className="input-group">
                <span className="input-group-text bg-light text-white">
                  <i className="fas fa-clock text-dark fs-3"></i>
                </span>
                <select
                  name="deliveryTime"
                  className="form-control fs-3"
                  value={formValues.deliveryTime}
                  onChange={handleChange1}
                >
                  <option value="12:00 - 15:00">12:00 - 15:00</option>
                  <option value="13:00 - 16:00">13:00 - 16:00</option>
                  <option value="17:00 - 20:00">17:00 - 20:00</option>
                  <option value="18:00 - 21:00">18:00 - 21:00</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-lg-12 mt-4">
            <div className="form-group text-start">
              <label className="text-white">Driver instructions</label>
              <div className="input-group">
              <span className="input-group-text bg-light text-white">
            <img
              src={
                formValues.driverInstructions === 'inPerson'
                  ? 'https://app.laundryheap.com/images/methods/personal.svg'
                  : formValues.driverInstructions === 'outside'
                  ? 'https://app.laundryheap.com/images/methods/outside.svg'
                  : 'https://app.laundryheap.com/images/methods/reception_porter.svg'
              }
              alt="Icon"
              className="icon-image"
            />
          </span>
                <select
                  name="driverInstructions"
                  className="form-control fs-3 with-icons"
                  value={formValues.driverInstructions}
                  onChange={handleChange1}
                >
                  <option value="inPerson">
                    Collect from me in person
                  </option>
                  <option value="outside">
                    Collect from outside
                  </option>
                  <option value="reception">
                    Collect from reception/porter
                  </option>
                </select>
              </div>
            </div>
            <hr className="mt-4" />
          </div>

          <div className="col-12 text-dark" id="textareanote0">
            <textarea
              className="form-control mt-4 bg-light text-dark custom-textarea fs-3 rounded"
              name="note"
              placeholder="Special instructions for driver"
              value={formValues.note}
              onChange={handleChange1}
            ></textarea>
            <hr className="mt-4" />
          </div>
          <h1 className="fontsame text-start mt-3">Choose address type</h1>
          <div className="col-lg-6 mt-3">
            <Button
              variant={selectedType1 === "Just once" ? "info" : "secondary"}
              className="me-2 w-100"
              onClick={() => handleTypeSelect1("Just once")}
            >
              Just once
            </Button>
          </div>
          <div className="col-lg-6 mt-3">
            <Button
              variant={selectedType1 === "Weekly" ? "info" : "secondary"}
              className="me-2 w-100"
              onClick={() => handleTypeSelect1("Weekly")}
            >
              Weekly
            </Button>
          </div>
          <div className="col-lg-6 mt-3">
            <Button
              variant={
                selectedType1 === "Every two weeks" ? "info" : "secondary"
              }
              className="me-2 w-100"
              onClick={() => handleTypeSelect1("Every two weeks")}
            >
              Every two weeks
            </Button>
          </div>
          <div className="col-lg-6 mt-3">
            <Button
              variant={
                selectedType1 === "Every four weeks" ? "info" : "secondary"
              }
              className="me-2 w-100"
              onClick={() => handleTypeSelect1("Every four weeks")}
            >
              Every four weeks
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collectiondelivery;

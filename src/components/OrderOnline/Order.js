/* eslint-disable */
import * as Yup from "yup";
import Accordion from "react-bootstrap/Accordion";
import "./order.css";
import { useFormik } from "formik";
import axiosInstance from "../Https/axiosInstance";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function OrderOnline() {
  const [Data, setdata] = useState([]);
  const [Dataone, setdataone] = useState([]);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [bundleId, setBundleId] = useState();

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setBundleId(id);
    setShow(true);
  };

  const GetData = () => {
    axiosInstance
      .get("bundles")
      .then((res) => {
        console.log(res, "bundles");
        if (res?.data?.status) {
          setdata(res?.data?.data);
        } else {
          console.log("something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const GetDataone = () => {
    axiosInstance
      .get("services")
      .then((res) => {
        console.log(res, "services");
        if (res?.data?.status) {
          const filtercategory = res?.data?.data?.filter(
            (e) => e?.cat_id === e?.category?.id
          );
          const findcategory = res?.data?.data?.find(
            (e) => e?.cat_id === e?.category?.id
          );
          console.log(filtercategory, "filtercategory");
          console.log(findcategory, "findcategory");
          setdataone(res?.data?.data);
        } else {
          console.log("something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    GetData();
    GetDataone();
  }, []);

  const validationSchema = Yup.object().shape({
    fname: Yup.string().required("Full name is required"),
    email: Yup.string().required("email is required"),
    number: Yup.string().required("number is required"),
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      fname: "",
      email: "",
      number: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoader(true);
      const formData = new FormData();
      formData.append("bundle_id", bundleId);
      formData.append("name", values.fname);
      formData.append("email", values.email);
      formData.append("phone_number", values.number);
      axiosInstance
        .post(`place-order`, formData)
        .then((res) => {
          console.log(res, "order");
          setLoader(false);
          toast.success(res?.data?.response);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
          toast.error(err.response.data.message);
        });
    },
  });

  const groupedServices = Dataone.reduce((acc, service) => {
    const { cat_id, category } = service;
    if (!acc[cat_id]) {
      acc[cat_id] = {
        category_name: category ? category.title : "Unknown Category",
        cat_id,
        services: [],
      };
    }
    acc[cat_id].services.push({
      id: service.id,
      title: service.title,
      press: service.press,
      clean_press: service.clean_press,
    });
    return acc;
  }, {});

  // Convert the map to an array
  const result = Object.values(groupedServices);

  console.log(result, "result");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      {/* <Layout> */}
      {/* <div className="order pt-3 OrderBundle" id="OrderBundle"> */}
      <div className="order pt-3" id="OrderBundle">
        <h1 className="container hone mb-5">Bundles</h1>
        {/* <div id="box">25%</div> */}
       {/* {Data.map((e, i) => {
          return (
            <Accordion
              className={`top1 container ${isExpanded ? "top1height" : "top1"}`}
              onClick={handleToggle}
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header>{e?.title}</Accordion.Header>
                <Accordion.Body>
                  {e?.items?.map((item) => {
                    return (
                      <>
                        <div className="d-flex justify-content-between align-items-center border-bottom border-dark pt-3 row">
                          <div className="col-md-6">
                            <h3 className="text-dark">{item?.name}</h3>
                          </div>
                          <div className="col-md-3 ">
                            <h3 className="text-dark">{item?.count}</h3>
                          </div>
                          <div className="col-md-3 text-end">
                            <h3 className="text-dark">{item?.price}</h3>
                          </div>
                        </div>
                      </>
                    );
                  })}
                  <div className="d-flex justify-content-center align-items-center py-5">
                    <button
                      className="btn btn-info text-white p-3 rounded-pill"
                      onClick={() => handleShow(e?.id)}
                    >
                      Order Now
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          );
        })}*/}
        <h2 className="container one my-5">Single Item Pricing</h2>
        {result.map((e, i) => {
          return (
            <Accordion className="top container">
              <Accordion.Item
                eventKey="0"
                style={{ backgroundColor: "#0f1220", color: "white" }}
              >
                <Accordion.Header>{e?.category_name}</Accordion.Header>
                <Accordion.Body>
                  {e?.services?.map((ser) => (
                    <div className="d-flex justify-content-between align-item-center border-bottom border-dark pt-3">
                      <div className="">
                        <label className=""></label>
                        <h3 className="text-dark mt-3">{ser?.title}</h3>
                      </div>
                      <div className="">
                        <label className="fw-bolder mb-3">Press</label>
                        <h3 className="text-dark">{ser?.press}</h3>
                      </div>
                      <div className="">
                        <label className="fw-bolder mb-3">Clean Press</label>
                        <h3 className="text-dark">{ser?.clean_press}</h3>
                      </div>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          );
        })}

        <Modal show={show} onHide={handleClose} id={"OrderForm2"}>
          <form
            className="Order-Form d-flex justify-content-center align-items-cneter flex-column p-4"
            onSubmit={handleSubmit}
          >
            <Modal.Header closeButton>
              <Modal.Title class>Place Your Order</Modal.Title>
            </Modal.Header>
            <Modal.Body className="">
              <div>
                <div className="row my-2">
                  <div className="col-sm-12 text-secondary">
                    <h4 className="mb-4 text-dark">Full Name</h4>
                    <div className="form-group">
                      <input
                        type="text"
                        name="fname"
                        className="form-control"
                        placeholder="Full Name"
                        onChange={handleChange}
                        value={values.fname}
                        onBlur={handleBlur}
                      />
                      <span className="text-danger">
                        {touched.fname && errors.fname}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-sm-12 text-secondary">
                    <h4 className="mb-4 text-dark">Email</h4>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={handleChange}
                        value={values.email}
                        onBlur={handleBlur}
                      />
                      <span className="text-danger">
                        {touched.email && errors.email}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 text-secondary">
                    <h4 className="mb-4 text-dark">Number</h4>
                    <div className="form-group">
                      <input
                        name="number"
                        className="form-control"
                        placeholder="Number"
                        onChange={handleChange}
                        value={values.number}
                        onBlur={handleBlur}
                      />
                      <span className="text-danger">
                        {touched.number && errors.number}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
            <Button type="submit" variant="primary" className="text-white">
                Submit
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
      {/* </Layout> */}
    </>
  );
}

export default OrderOnline;

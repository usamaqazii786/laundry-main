import * as Yup from "yup";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Loader from "../Loader/Loader";
import axiosInstance from "../Https/axiosInstance";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("email is required"),
    password: Yup.string().required("password is required"),
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: (values) => {
        setLoader(true);
        const formData = new FormData();
        formData.append("type", "user");
        formData.append("email", values.email);
        formData.append("password", values.password);
        axiosInstance
          .post("login", formData)
          .then((res) => {
            console.log(res?.data?.data?.token, "res?.data?.status");
            if (res?.data?.status === true) {
              toast.success("Login Successfully");
              const data = JSON.stringify(res?.data?.data);
              localStorage.setItem("token", res?.data?.data?.token);
              localStorage.setItem("data", data);
              navigate("/");
              setLoader(false);
            } else {
              toast.error(res?.data?.error);
              setLoader(false);
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.response.data.message);
            setLoader(false);
          });
      },
    });

  return (
    <>
      <div className="container container-fluid-lg">
        <div className="main-body">
          <div className="row gutters-sm d-flex justify-content-center align-items-center hv-100">
            <div className="col-md-6">
              <div className="card mb-3">
                <form
                  onSubmit={handleSubmit}
                  className="form-default"
                  id="contact-form"
                  noValidate="novalidate"
                >
                  <div className="card-body">
                    <div className="title-block text-center">
                      <h4 className="title-block__title text-white">
                        Laundry Login
                      </h4>
                    </div>

                    <div className="row">
                      <div className="col-sm-12 text-secondary">
                        <h4 className="mb-4">Email</h4>
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
                        <h4 className="mb-4">Password</h4>
                        <div className="form-group">
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={handleChange}
                            value={values.password}
                            onBlur={handleBlur}
                          />
                          <span className="text-danger">
                            {touched.password && errors.password}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group">
                        <div className="checkbox-group">
                          <Link to={"/signup"}>Create your account?</Link>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <button type="submit" className="w-100 btn open_download_popup gradient zoom  rounded d-md-inline-block d-none">
                          {loader ? <Loader /> : "Login"}
                        </button>
                      </div>
                    </div>
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

export default LoginComponent;

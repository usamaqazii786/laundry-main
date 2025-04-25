import * as Yup from "yup";
import React, { useState } from "react";
import { useFormik } from "formik";
import Loader from "./Loader/Loader";
import axiosInstance from "./Https/axiosInstance";
import { toast } from "react-toastify";

const ProfileComponent = () => {
  const [loader, setLoader] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(selectedImage);
  const getProfile = JSON.parse(localStorage.getItem("data"));

  const handleIconClick = () => {
    document.getElementById("imageUpload").click();
  };

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validationSchema = Yup.object().shape({
    fname: Yup.string().required("first name is required"),
    lname: Yup.string().required("last name is required"),
    email: Yup.string().required("email is required"),
    password: Yup.string().required("password is required"),
    image: Yup.mixed().test((value) => value && ["image/jpeg", "image/png"]),
    number: Yup.string().required("number is required"),
    address: Yup.string().required("address is required"),
    city: Yup.string().required("city is required"),
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    resetForm,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      fname: getProfile?.fname || "",
      lname: getProfile?.lname || "",
      email: getProfile?.email || "",
      image: getProfile?.image || null,
      number: getProfile?.mobile_number || "",
      address: getProfile?.address || "",
      city: getProfile?.city || "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoader(true);
      const formDataImage = new FormData();
      const formData = new URLSearchParams();
      formData.append("fname", values.fname);
      formData.append("lname", values.lname);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("mobile_number", values.number);
      formData.append("address", values.address);
      formData.append("city", values.city);

      if (typeof values?.image === "object") {
        axiosInstance
          .post(`/user/${getProfile?.id}/update_profile_pic`, formDataImage)
          .then((res) => {
            console.log(res);
            toast.success("Profile Updated");
            setLoader(false);
            resetForm();
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.response.data.message);
            setLoader(false);
          });
        formDataImage.append("image", values?.image);
      }

      axiosInstance
        .put(`user/${getProfile?.id}/update_profile`, formData)
        .then((res) => {
          toast.success(res?.data?.response);
          setLoader(false);
          const data = JSON.stringify(res?.data?.data);
          localStorage.setItem("data", data);
          window.location.reload();
          resetForm();
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
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm justify-content-center">
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
                        Edit Profile
                      </h4>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-sm-3">
                        <div className="d-flex flex-column align-items-center text-center">
                          {imagePreview ? (
                            <div className="image-preview">
                              <img
                                src={imagePreview}
                                alt="Selected"
                                className="rounded-circle"
                                style={{ width: "120px", height: "120px" }}
                                onClick={handleIconClick}
                              />
                            </div>
                          ) : (
                            <img
                              src={
                                getProfile?.image
                                  ? getProfile?.image
                                  : "https://bootdey.com/img/Content/avatar/avatar7.png"
                              }
                              onClick={handleIconClick}
                              alt="Admin"
                              className="rounded-circle"
                              style={{ width: "120px", height: "120px" }}
                            />
                          )}
                          <div className="image-upload-section">
                            <img
                              src={
                                "https://static.vecteezy.com/system/resources/thumbnails/023/454/938/small_2x/important-document-upload-logo-design-vector.jpg"
                              }
                              alt="Admin"
                              className="rounded-circle"
                              onClick={handleIconClick}
                              style={{
                                width: "30px",
                                height: "30px",
                                cursor: "pointer",
                                marginLeft: '70px',
                                marginTop: '-60px',
                              }}
                            />
                            <input
                              type="file"
                              id="imageUpload"
                              accept="image/*"
                              style={{ display: "none" }}
                              onChange={(event) => {
                                setFieldValue(
                                  "image",
                                  event.currentTarget.files[0]
                                );
                                handleImageChange(event);
                              }}
                            />
                            <br />
                            <span className="text-danger">
                              {touched.image && errors.image}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-12 text-secondary">
                        <h4 className="mb-4">First Name</h4>
                        <div className="form-group">
                          <input
                            type="text"
                            name="fname"
                            className="form-control"
                            placeholder="First Name"
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

                    <div className="row">
                      <div className="col-sm-12 text-secondary">
                        <h4 className="mb-4">Last Name</h4>
                        <div className="form-group">
                          <input
                            type="text"
                            name="lname"
                            className="form-control"
                            placeholder="Last Name"
                            onChange={handleChange}
                            value={values.lname}
                            onBlur={handleBlur}
                          />
                          <span className="text-danger">
                            {touched.lname && errors.lname}
                          </span>
                        </div>
                      </div>
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
                      <div className="col-sm-12 text-secondary">
                        <h4 className="mb-4">Number</h4>
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

                    <div className="row">
                      <div className="col-sm-12 text-secondary">
                        <h4 className="mb-4">City</h4>
                        <div className="form-group">
                          <input
                            type="text"
                            name="city"
                            className="form-control"
                            placeholder="City"
                            onChange={handleChange}
                            value={values.city}
                            onBlur={handleBlur}
                          />
                          <span className="text-danger">
                            {touched.city && errors.city}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 text-secondary">
                        <h4 className="mb-4">Address</h4>
                        <div className="form-group">
                          <input
                            type="text"
                            name="address"
                            className="form-control"
                            placeholder="Address"
                            onChange={handleChange}
                            value={values.address}
                            onBlur={handleBlur}
                          />
                          <span className="text-danger">
                            {touched.address && errors.address}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <button
                          type="submit"
                          className="w-100 btn open_download_popup gradient zoom  rounded d-md-inline-block d-none"
                        >
                          {loader ? <Loader /> : "Edit Profile"}
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

export default ProfileComponent;

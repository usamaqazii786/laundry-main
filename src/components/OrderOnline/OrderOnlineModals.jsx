/* eslint-disable */
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import OrderOnlineModalstable from "./OrderOnlineModalstable";
import axiosInstance from "../Https/axiosInstance";

const OrderOnlineModals = ({ handleClose, show }) => {
  const [categories, setCategories] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [activeTab, setActiveTab] = useState(null); // Active tab state
  const [loading, setLoading] = useState(false); // Loader state

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("view/categories");
      const titles = response.data?.data; // Extract titles from API response
      setCategories(titles || []);
      if (titles?.length > 0) {
        setActiveTab(titles[0]?.title); // Set the first category as the active tab
        fetchBundles(titles[0]?.id); // Fetch bundles for the first category
      }
      console.log("Fetched tab data:", titles);
    } catch (error) {
      console.error("Error fetching tab data:", error);
    }
  };

  const fetchBundles = async (id) => {
    console.log("Selected tab ID:", id);
    setLoading(true); // Start loader
    try {
      const response = await axiosInstance.get(`view/bundles/${id}`);
      const datas = response.data?.data; // Extract bundles from API response
      setBundles(datas || []);
      console.log("Fetched bundles data:", datas);
    } catch (error) {
      console.error("Error fetching bundles data:", error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []); // Run only once on component mount

  const handleTabSelect = (key) => {
    setActiveTab(key); // Set the clicked tab as active
    const selectedCategory = categories.find(
      (category) => category?.title === key
    );
    if (selectedCategory) {
      fetchBundles(selectedCategory.id); // Fetch bundles for the selected category
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        id={"CustomModalsmain"}
        className="w-100"
        style={{
          top: 0,
          zIndex: 1050,
          padding: 0,
          width: "100%",
        }}
      >
        <div className="row newContainerMain">
          <img
            src="./close12.png"
            alt="close12"
            onClick={handleClose}
            id={"close_newContainerMain"}
            style={{ zIndex: 100 }}
          />

          <div className="cardmaindiv w-100">
            <div className="col-lg-10 h-100">
              {/* <p className="pb-3 ps-4">
              <h1 className="gradient-heading" style={{letterSpacing:'10px'}}>PRICE LIST</h1>

              </p> */}
              <p className="d-md-block d-none">
                <a
                  href={"/order"}
                  className={`fs-5 btn btn-primary zoom gradient-heading`}
                >
                  PRICE LIST
                </a>
              </p>
              <p className="d-md-none d-block mt-4">
                <a
                  href={"/order"}
                  className={`btn btn-primary price zoom gradient-headingmobile`}
                >
                  PRICE LIST
                </a>
              </p>
              <Tabs
                activeKey={activeTab}
                onSelect={handleTabSelect}
                id="uncontrolled-tab-all-services"
                className="mb-3 border-0 categories-tab-all-services md-ms-3 ms-0"
              >
                {categories?.map((category) => (
                  <Tab
                    key={category?.id}
                    eventKey={category?.title}
                    title={category?.title}
                  >
                    {loading ? (
                      <div className="loader">Loading...</div> // Show loader while fetching bundles
                    ) : (
                      <OrderOnlineModalstable
                        Title={category?.title}
                        bundles={bundles}
                      />
                    )}
                  </Tab>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OrderOnlineModals;

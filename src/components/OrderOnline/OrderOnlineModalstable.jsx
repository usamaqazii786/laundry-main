/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

const OrderOnlineModalstable = ({ Title, bundles }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(bundles.length); // Default: Show all items

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 3000) {
        setItemsPerPage(bundles.length); // Show all items on mobile
      } else {
        setItemsPerPage(10); // Paginate for screens 768px and above
      }
      setCurrentPage(1); // Reset to first page when resizing
    };

    handleResize(); // Call on mount to set the correct initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [bundles.length]);

  // Total pages
  const totalPages = Math.ceil(bundles.length / itemsPerPage);

  // Get current page's data
  const currentData = bundles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log(itemsPerPage, "itemsPerPage-->");
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <main className="pe-2 pe-md-3 mainDivOnlineMOdal">
        <div className="row">
          <div className="col-md-6 col-6">
            <div className="row">
              <h4 className="col-md-6 col-12 pt-5 px-md-5 px-3 text-start gradient-headingmobile fs-1">
                {Title}
              </h4>
              <h4 className="col-md-6 col-6 pt-5 px-md-4 px-0 text-md-end d-md-block d-none text-end gradient-headingmobile fs-1">
                {itemsPerPage > 0 && "AED"}
              </h4>
            </div>
          </div>
          <div className="col-md-6 col-6 px-md-4 px-0">
            <h4 className="col-md-12 col-12 pt-5 text-md-end text-end px-md-1 px-1 gradient-headingmobile fs-1">
              {itemsPerPage> 2 && "AED"}
            </h4>
          </div>
        </div>
        <div className="row mb-4 ms-md-1 ms-0">
          {currentData.map((pricelist, index) => (
            <div className="col-lg-6 mb-3 px-1 px-md-4" key={index}>
              <div className="newTableprocelist p-1 p-md-3">
                <h4>{pricelist?.title}</h4>
                <h4>{pricelist?.price}</h4>
              </div>
            </div>
          ))}
        </div>
        {window.innerWidth >= 3000 && totalPages > 1 && (
          <div className="pagination-controls text-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-button ${
                  currentPage === page ? "active" : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default OrderOnlineModalstable;

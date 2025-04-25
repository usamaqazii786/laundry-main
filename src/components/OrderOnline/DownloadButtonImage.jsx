import React from "react";

const DownloadButtonImage = ({ btnText, background }) => {
  // Determine URL based on device and browser
  const getUrl = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Check for iOS devices
    const isIOS =
      /iPad|iPhone|iPod|Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent) &&
      !window.MSStream;

    // Check for Android devices
    const isAndroid = /android/i.test(userAgent);

    if (isIOS) {
      // URL for iOS devices
      return "https://apps.apple.com/us/app/laundry-portal/id1457375679?ls=1";
    } else if (isAndroid) {
      // URL for Android devices
      return "https://play.google.com/store/apps/details?id=com.laundryportal.app&pli=1";
    } else {
      return "https://play.google.com/store/apps/details?id=com.laundryportal.app&pli=1";
    }
  };
  const url = getUrl();

  return (
    <a
      href={url}
      // style={{ backgroundColor: background }}
      // className={`mobiledownload btn btn-primary mobileColor12 zoom  ${
      //   background ? "" : "gradient"
      // }`}
    >
      <div className="bg-white topheader text-center">
        {/* <img
          src={"./topheader.png"}
          alt=""
          width={"100%"}
          style={{ height: "45px", objectFit: "contain" }}
        /> */}
        <h5 className="text-black topheserh3">30% off your first order with code <span className="py-3"><img src="./Frame13.png" alt="" style={{height:"24px"}} height={24}/></span></h5>
      </div>
    </a>
  );
};

export default DownloadButtonImage;

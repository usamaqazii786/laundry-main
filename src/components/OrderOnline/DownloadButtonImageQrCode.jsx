import React from "react";

const DownloadButtonImageQrCode = ({ btnText, background }) => {
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
    <a href={url}>
      <div className={"QRCodeScanHome pt-2"}>
        <p className="pt-5 mt-5">
         <div style={{border:"2px solid #65C7FC",width:"75%", borderRadius:6,display:"flex",justifyContent:"center",alignItems:"center"}} className="m-auto pb-2 pt-2">
         <img src="./icons.png" alt="" width={30} height={30}/><div id="maxFontsize" style={{fontSize:24,textTransform:"uppercase"}}>&nbsp;30% off with code <span style={{color:"#65C7FC"}}>wb30</span></div>
         </div>
         <br />
         <img src="./When you book via our mobile app Scan this QR code now!.png" alt="" />
        </p>
        <p style={{ marginTop: "35px" }}>
          <img src="../../../WhatsAppImage.png" alt="" className="GroupQrCode" />
        </p>
      </div>
    </a>
  );
};

export default DownloadButtonImageQrCode;

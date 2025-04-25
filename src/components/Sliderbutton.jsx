import React from 'react';

const DownloadButton = ({ btnText,background }) => {
  // Determine URL based on device and browser
  const getUrl = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Check for iOS devices
    const isIOS = /iPad|iPhone|iPod|Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent) && !window.MSStream;

    // Check for Android devices
    const isAndroid = /android/i.test(userAgent);

    if (isIOS) {
      // URL for iOS devices
      return 'https://apps.apple.com/us/app/laundry-portal/id1457375679?ls=1';
    } else if (isAndroid) {
      // URL for Android devices
      return 'https://play.google.com/store/apps/details?id=com.laundryportal.app&pli=1';
    } else {
      return 'https://play.google.com/store/apps/details?id=com.laundryportal.app&pli=1'; 
    }
  };
  const url = getUrl();
  const buttonClasses = `mobiledownload btn btn-primary zoom d-md-inline-block d-none gradient_rev`;

  return (
    <a 
    href={url} 
    style={{ backgroundColor: background }}
    className={buttonClasses}
  >
    {btnText}
  </a>

  );
};

export default DownloadButton;
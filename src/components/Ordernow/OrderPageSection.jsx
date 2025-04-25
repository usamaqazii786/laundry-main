/* eslint-disable no-useless-escape */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FaHome } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";
import { ImOffice } from "react-icons/im";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { IoLogoWhatsapp } from "react-icons/io5";

import CustomSelect from "./CustomSelect";
import moment from "moment-timezone";
import CustomSelectcollection from "./CustomSelectcollection";
import DeliverySelect from "./DeliverySelect";
import { useLocation, useNavigate } from "react-router-dom";
// Function to get data from localStorage or return default value
const service = [
  {
    id: 1,
    title: "Clean & Press",
    image: "./service.png",
  },
  {
    id: 2,
    title: "Pressing Only",
    image: "./service2.png",
  },
  {
    id: 3,
    title: "Wash & Fold (No Ironing)",
    image: "./2714884.jpg",
  },
  {
    id: 4,
    title: "Carpet Cleaning",
    image: "./2194.jpg",
  },
  {
    id: 5,
    title: "Curtain Cleaning",
    image: "./pardy.png",
  },
  // Add more services as needed
];

const getFromSessionStorage = (key, defaultValue) => {
  const saved = sessionStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};
const OrderPageSection = ({
  handleVerifyModal,
  setVerifyID,
  setTimer,
  VerifyID,
  ResentTimer,
  handleVerifyModalClose,
}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const [showBox, setShowBox] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const menuRef = useRef(null); // Ref for the menu
  const Resendapi = localStorage.getItem("Resendapi");
  const targetDivRef = useRef(null);
  const [position, setPosition] = useState({ lat: "", lng: "" });
  const [placeName, setPlaceName] = useState(() =>
    getFromSessionStorage("placeName", "")
  );
  console.log(position, "posri");
  const [selectedOption, setSelectedOption] = useState(() =>
    getFromSessionStorage("selectedOption", "")
  );
  const [selectedOptionCode, setSelectedOptionCode] = useState(() =>
    getFromSessionStorage("selectedOptionCode", "")
  );

  // Update selected option and persist it to localStorage
  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
  };

  // Update selected option code and persist it to localStorage
  const handleCheckboxChangeCode = (option) => {
    setSelectedOptionCode(option);
  };

  const [placeaddress, setplaceaddress] = useState(() =>
    getFromSessionStorage("placeaddress", "")
  );

  const [currentStep, setCurrentStep] = useState(() =>
    getFromSessionStorage("currentStep", 0)
  );
  const [PlaceAdress, setPlaceAdress] = useState("");
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [ShowForm, setShowForm] = useState(() =>
    getFromSessionStorage("ShowForm", false)
  );
  const [collection_date, setcollection_date] = useState(() =>
    getFromSessionStorage("collection_date", [])
  );
  const [delivery_date, setdelivery_date] = useState(() =>
    getFromSessionStorage("delivery_date", [])
  );
  const [collection_slots, setcollection_slots] = useState(() =>
    getFromSessionStorage("collection_slots", [])
  );
  const [delivery_slots, setdelivery_slots] = useState(() =>
    getFromSessionStorage("delivery_slots", [])
  );
  const [selectedType, setSelectedType] = useState(() =>
    getFromSessionStorage("selectedType", "home")
  );
  // const [selectedType1, setselectedType1] = useState("justonce");
  const [address_details, setAddress_details] = useState(() =>
    getFromSessionStorage("address_details", "")
  );
  const [selectedService, setSelectedService] = useState(() =>
    getFromSessionStorage("selectedService", [])
  );
  const [address_details2, setAddress_details2] = useState(() =>
    getFromSessionStorage("address_details2", "")
  );
  const [formValues, setFormValues] = useState(() =>
    getFromSessionStorage("formValues", {
      collectionDay: "",
      collectionTime: "Select...",
      deliveryDay: "",
      deliveryTime: "Select...",
      collectionInstructions: "",
      driverInstructions: "",
      note: "",
    })
  );

  const [formData, setFormData] = useState(() =>
    getFromSessionStorage("formData", {
      number: "",
      firstName: "",
      lastName: "",
      RoomNumber: "",
      email: "",
    })
  );

  // slots api
  const handleDeliverySlots = (type, selectedValue) => {
    const Timezone = moment.tz.guess();
    const data = {
      timezone: Timezone,
      fetch: "delivery_slots",
      collection_date: formValues.collectionDay,
      delivery_date: formValues.deliveryDay,
      collection_start_slot: formValues.collectionTime,
    };
    if (type === "delivery_date") {
      data.delivery_date = selectedValue;
    } else {
      data.collection_start_slot = selectedValue;
    }

    if (
      data.collection_date &&
      data.delivery_date &&
      data.collection_start_slot
    ) {
      setdelivery_slots([]);
      axios
        .post("https://api.laundry.dev-iuh.xyz/api/fetch-slots", data, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
            "Content-Type": "application/json", // Set content type to JSON
          },
        })
        .then((res) => {
          setFuctionUpdate(false);
          console.log(res?.data, "res---->");
          if (res?.data) {
            setdelivery_slots(res?.data);
          }
          toast.success(res?.data?.response);
          setLoader(false);
        })
        .catch((err) => {
          console.log(err, "err---->");
          if (
            err?.response?.data?.message !==
              "The delivery date field must be a date after collection date." ||
            err?.response?.data?.message !==
              "The delivery date field must be a valid date. (and 1 more error)"
          ) {
          }
          setLoader(false);
        });
    }
  };
  const handleSlots = (type = "collection_date", date) => {
    setLoader(true);
    const Timezone = moment.tz.guess();
    let data = {
      timezone: Timezone,
      fetch: "collection_date",
    };

    // // Adjust data object based on conditions
    if (type === "collection_slots" && date !== "") {
      // If 'date' is present, create the data object for fetching by 'collection_date'
      data = {
        timezone: Timezone,
        fetch: "collection_slots",
        collection_date: date,
      };
    } else if (type === "delivery_date") {
      // If the type is 'delivery_date', use the 'deliveryDay' from formValues
      data = {
        timezone: Timezone,
        fetch: "delivery_date",
        collection_date: date, // assuming 'collectionDay' is intended for delivery
      };
    }
    axios
      .post("https://api.laundry.dev-iuh.xyz/api/fetch-slots", data, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
          "Content-Type": "application/json", // Set content type to JSON
        },
      })
      .then((res) => {
        console.log(res?.data, "res---->");
        if (res?.data) {
          if (data.fetch === "collection_date") {
            setcollection_date(res?.data?.dates);
          } else if (data.fetch === "collection_slots") {
            setcollection_slots(res?.data);
          } else if (data.fetch === "delivery_date") {
            setdelivery_date(res?.data?.dates);
          } else if (data.fetch === "delivery_slots") {
            setdelivery_slots(res?.data);
          }
        }
        toast.success(res?.data?.response);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message, "err---->");
        if (
          err?.response?.data?.message !==
            "The delivery date field must be a date after collection date." ||
          err?.response?.data?.message !==
            "The delivery date field must be a valid date. (and 1 more error)"
        ) {
          toast.error(err?.response?.data?.message);
        }
        setLoader(false);
      });
  };
  const formatDate = (date) => {
    if (isNaN(new Date(date))) {
      return "Select..."; // Return "Select..." for invalid dates
    }
    const options = { weekday: "short", day: "2-digit", month: "short" };
    return new Date(date).toLocaleDateString("en-GB", options); // Format valid dates
  };
  console.log(formValues, "formValues--->");

  // useEffect(() => {
  //   if (handleVerifyModalClose) {
  //     setIsButtonDisabled(false);
  //   }
  // }, [handleVerifyModalClose]);

  useEffect(() => {
    if (ResentTimer === 0) {
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 1000); // 1 second delay after timer reaches 0
    }
  }, [ResentTimer]);

  useEffect(() => {
    // Get the timezone from moment
    const timeoutId = setTimeout(() => {
      handleSlots();
    }, 5000);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line
  }, []);

  console.log(formValues, "driverInstructions");
  const [loader, setLoader] = useState(false);
  const [FuctionUpdate, setFuctionUpdate] = useState(false);
  const [FuctionUpdatenew, setFuctionUpdatenew] = useState(false);
  const [FuctionUpdatedelivery_date, setFuctionUpdatedelivery_date] =
    useState(false);
  const [show, setShow] = useState(false);
  const [ShowTime1, setShowTime1] = useState(() =>
    getFromSessionStorage("ShowTime1", "")
  );
  const [ShowTime2, setShowTime2] = useState(() =>
    getFromSessionStorage("ShowTime1", "")
  );
  console.log(ShowTime2, "ShowTime2");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(name, value, "name, value");
  };
  const handlePhoneChange = (phone) => {
    setFormData((prevData) => ({
      ...prevData,
      number: phone.replace(/^\+/, ""),
    }));
  };

  const isFormFilled = () => {
    switch (currentStep) {
      case 0:
        return (
          (selectedType === "hotel" && !address_details) ||
          (selectedType === "home" && !address_details) ||
          (selectedType === "office" && !address_details)
        ); // All fields must be truthy for the selected type

      case 1:
        return (
          formValues?.collectionDay &&
          formValues?.collectionTime &&
          formValues?.collectionInstructions &&
          formValues?.deliveryDay &&
          formValues?.deliveryTime &&
          selectedService?.length > 0 &&
          formValues?.driverInstructions
        ); // All fields must be truthy

      case 2:
        return (
          formData?.number &&
          formData?.firstName &&
          formData?.lastName &&
          formData?.email
        ); // All fields must be truthy

      default:
        return false; // Default case, validation fails
    }
  };

  console.log(formData?.RoomNumber, "RoomNumber-->");
  console.log("Current Step:", currentStep);
  const handleNext = () => {
    console.log("Current Step:", currentStep);
    console.log("Place Name:", placeName);
    console.log("Form Values:", formValues);
    console.log("Form Data:", formData);
    console.log("Selected Services:", selectedService);
    console.log("Show Confirm:", showConfirm);
    console.log("Show placeName?.url:", placeName);

    if (currentStep === 0) {
      setCurrentStep(1); // Proceed to the next step if Step 0 is valid
    } else if (currentStep === 1) {
      if (isFormFilled()) {
        setCurrentStep(2); // Move to step 2 if all fields are filled
      } else {
        console.log("Step 1: Required fields are missing.");
      }
    } else if (currentStep === 2) {
      if (isFormFilled()) {
        setCurrentStep(3); // Move to step 3 if all personal fields are filled
      } else {
        console.log("Step 2: Required fields are missing.");
      }
    }
    console.log("validate---->", {
      placeName,
      formData,
      address_details,
      address_details2,
    });
    // Scroll to the target div
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    // Add slight delay to ensure state updates complete before scrolling
    setTimeout(() => {
      // Scroll window to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Scroll .mapcontent to top
      const mapContent = document.querySelector(".mapcontent");
      if (mapContent) {
        mapContent.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }, 50); // 50ms delay ensures smooth transition
  };

  // Helper function to check if a value is not empty, undefined, or null
  const isNotEmpty = (value) =>
    value !== undefined && value !== null && value !== "";

  useEffect(() => {
    if (
      isNotEmpty(ShowTime1) ||
      isNotEmpty(ShowTime2) ||
      isNotEmpty(address_details) ||
      isNotEmpty(formValues.collectionDay) ||
      isNotEmpty(formValues.collectionTime) ||
      isNotEmpty(formValues.deliveryDay) ||
      isNotEmpty(formValues.deliveryTime) ||
      isNotEmpty(formValues.collectionInstructions) ||
      isNotEmpty(formValues.driverInstructions) ||
      isNotEmpty(formData.number) ||
      isNotEmpty(formData.firstName) ||
      isNotEmpty(formData.lastName) ||
      isNotEmpty(formData.RoomNumber) ||
      isNotEmpty(formData.email) ||
      selectedService.length > 0 ||
      delivery_date.length > 0 ||
      delivery_slots.length > 0 ||
      collection_slots.length > 0 ||
      collection_date.length > 0 ||
      isNotEmpty(placeName) ||
      ShowForm !== undefined // Check if ShowForm is either true or false
    ) {
      sessionStorage.setItem("formValues", JSON.stringify(formValues));
      sessionStorage.setItem("delivery_date", JSON.stringify(delivery_date));
      sessionStorage.setItem("delivery_slots", JSON.stringify(delivery_slots));
      sessionStorage.setItem(
        "collection_slots",
        JSON.stringify(collection_slots)
      );
      sessionStorage.setItem(
        "collection_date",
        JSON.stringify(collection_date)
      );
      sessionStorage.setItem(
        "collectionTime",
        JSON.stringify(formValues.collectionTime)
      );
      sessionStorage.setItem(
        "deliveryDay",
        JSON.stringify(formValues.deliveryDay)
      );
      sessionStorage.setItem(
        "deliveryTime",
        JSON.stringify(formValues.deliveryTime)
      );
      sessionStorage.setItem(
        "collectionInstructions",
        JSON.stringify(formValues.collectionInstructions)
      );
      sessionStorage.setItem(
        "driverInstructions",
        JSON.stringify(formValues.driverInstructions)
      );
      sessionStorage.setItem(
        "address_details",
        JSON.stringify(address_details)
      );
      sessionStorage.setItem("ShowForm", JSON.stringify(ShowForm));
      // sessionStorage.setItem("collection_date", JSON.stringify(collection_date));
      sessionStorage.setItem("formData", JSON.stringify(formData));
      sessionStorage.setItem(
        "selectedService",
        JSON.stringify(selectedService)
      );
      sessionStorage.setItem("currentStep", JSON.stringify(currentStep));
      sessionStorage.setItem("placeName", JSON.stringify(placeName));
      sessionStorage.setItem("placeaddress", JSON.stringify(placeaddress));
      sessionStorage.setItem("ShowTime1", JSON.stringify(ShowTime1));
      sessionStorage.setItem("ShowTime2", JSON.stringify(ShowTime2));
      sessionStorage.setItem("selectedType", JSON.stringify(selectedType));
      sessionStorage.setItem(
        "address_details",
        JSON.stringify(address_details)
      );
    }
    // eslint-disable-next-line
  }, [
    formValues,
    formData,
    selectedService,
    currentStep,
    placeName,
    placeaddress,
    ShowForm,
    selectedType,
    address_details,
    ShowTime1,
    ShowTime2,
    address_details,
    collection_date,
    delivery_date,
    delivery_slots,
    collection_slots,
  ]);

  useEffect(() => {
    if (!sessionStorage.getItem("sessionStarted")) {
      localStorage.clear(); // Clear localStorage only for new tab
      sessionStorage.setItem("sessionStarted", "true"); // Mark session as started
    }
  }, []);

  //  page load and window off data clear

  const containerOrderplaceStyle = {
    width: "100%",
    height: "300px",
  };
  // Initialize the loader with consistent options
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDOvpM2gM3ZoFXJ4H1nKELhnS781ZGk1BU", // Use environment variable
    libraries: ["places"],
  });

  const autoCompleteRef = useRef(null);
  const geocoder = useRef(null);
  const inputRef = useRef(null); // Using useRef to manage the input reference
  // Function to check if Google Maps is loaded

  // eslint-disable-next-line
  const checkGoogleMaps = () => {
    if (window.google && window.google.maps) {
      setIsMapLoaded(true);
    } else {
      // Retry after a short delay if not loaded yet
      setTimeout(checkGoogleMaps, 100);
    }
  };
  let customIcon = null;

  if (isMapLoaded) {
    try {
      customIcon = {
        url: "./images/location.jpeg", // Replace with the path to your logo image
        scaledSize: new window.google.maps.Size(50, 50), // Properly create Size object
      };
    } catch (error) {
      console.error("Error creating the custom icon:", error);
    }
  }

  const clearInput = () => {
    setPlaceName(""); // Reset place name
    setcollection_date([]);
    setplaceaddress(""); // Reset place address
    setCurrentStep(0); // Reset step to 0
    setPlaceAdress(""); // Reset place address
    setIsMapLoaded(false); // Reset map loaded state
    setShowConfirm(false); // Reset confirmation visibility
    setShowForm(false); // Reset form visibility
    setSelectedType("home"); // Reset selected type to default
    setAddress_details2(""); // Reset selected type to default
    setAddress_details(""); // Reset address details
    setSelectedService([]); // Reset selected services
    setFormValues({
      collectionDay: "Select...",
      collectionTime: "Select...",
      deliveryDay: "Select...",
      deliveryTime: "Select...",
      collectionInstructions: "",
      driverInstructions: "",
      note: "",
    }); // Reset form values
    setFormData({
      number: "",
      firstName: "",
      lastName: "",
      RoomNumber: "",
      email: "",
    }); // Reset form data
    setLoader(false); // Reset loader state
    setShow(false); // Reset show state
    setShowTime1(""); // Reset show time 1
    setShowTime2(""); // Reset show time 2
    setPosition({ lat: 0, lng: 0 }); // Reset position
    setSelectedOption("cod"); // Reset selected option to default
    setSelectedOptionCode("sms"); // Reset selected option code to default
    handleChange1({ target: { value: "" } });
    localStorage.clear(); // Clear all items from local storage

    if (inputRef.current) {
      inputRef.current.value = ""; // Clear the input field
      console.log(inputRef.current.value, inputRef, "inputRef.current.value");
    }
    // Add slight delay to ensure state updates complete before scrolling
    setTimeout(() => {
      // Scroll window to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Scroll .mapcontent to top
      const mapContent = document.querySelector(".mapcontent");
      if (mapContent) {
        mapContent.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }, 50); // 50ms delay ensures smooth transition
  };
  const inputRefCallback = useCallback(
    (node) => {
      if (node !== null && isLoaded) {
        console.log("Input field is referenced correctly");
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
          node,
          {
            componentRestrictions: { country: "AE" }, // Restrict to UAE
          }
        );
        geocoder.current = new window.google.maps.Geocoder();
        inputRef.current = node; // Set the node reference
        autoCompleteRef.current.addListener("place_changed", () => {
          setShowForm(true);
          const place = autoCompleteRef?.current?.getPlace();
          if (place?.geometry && place?.geometry?.location) {
            const lat = place?.geometry?.location?.lat();
            const lng = place?.geometry?.location?.lng();
            setPosition({ lat, lng });
            setPlaceName(place);
            console.log("Place selected:", lat, lng, place?.url, place);
          } else {
            console.error("Place details not found");
          }
        });
      }
    },
    [isLoaded]
  );

  // const inputRefCallback = useCallback(
  //   (node) => {
  //     if (node !== null && isLoaded) {
  //       console.log("Input field is referenced correctly");
  //       autoCompleteRef.current = new window.google.maps.places.Autocomplete(
  //         node
  //       );
  //       geocoder.current = new window.google.maps.Geocoder();
  //       inputRef.current = node; // Set the node reference
  //       autoCompleteRef.current.addListener("place_changed", () => {
  //         setShowForm(true);
  //         const place = autoCompleteRef?.current?.getPlace();
  //         if (place?.geometry && place?.geometry?.location) {
  //           const lat = place?.geometry?.location?.lat();
  //           const lng = place?.geometry?.location?.lng();
  //           setPosition({ lat, lng });
  //           setPlaceName(place);
  //           console.log("Place selected:", lat, lng, place?.url);
  //         } else {
  //           console.error("Place details not found");
  //         }
  //       });
  //     }
  //   },
  //   [isLoaded]
  // );

  const inputRefCallbackSecond = useCallback(
    (node) => {
      if (node !== null && isLoaded) {
        console.log("Input field is referenced correctly");
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
          node
        );
        geocoder.current = new window.google.maps.Geocoder();
        inputRef.current = node; // Set the node reference
        autoCompleteRef.current.addListener("place_changed", () => {
          const place = autoCompleteRef?.current?.getPlace();
          if (place?.geometry && place?.geometry?.location) {
            const lat = place?.geometry?.location?.lat();
            const lng = place?.geometry?.location?.lng();
            setPosition({ lat, lng });
            setPlaceName(place);
            console.log("Place selected:", lat, lng, place?.url, place);
          } else {
            console.error("Place details not found");
          }
        });
      }
    },
    [isLoaded]
  );

  const handleMarkerDragEnd = (event) => {
    const lat = event?.latLng?.lat();
    const lng = event?.latLng?.lng();
    setPosition({ lat, lng });

    // Reverse geocode to get the place details from the new lat/lng
    if (geocoder.current) {
      geocoder.current.geocode(
        { location: { lat, lng } },
        (results, status) => {
          if (status === "OK" && results[0]) {
            const place = results[0];
            setPlaceName(place);
            setPlaceAdress(place);

            // Construct the Google Maps URL using the place_id
            const placeId = place.place_id;
            const placeUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
            setplaceaddress(placeUrl);
            // Log the latitude, longitude, and constructed URL
            console.log("Marker dragged to:", lat, lng, placeUrl, place);
          } else {
            console.error(
              "Geocode was not successful for the following reason:",
              status
            );
          }
        }
      );
    } else {
      console.log("Geocoder is not initialized");
    }
  };
  const newAddressName =
    placeName?.name +
    " - " +
    placeName?.address_components
      ?.map((add) => add?.long_name)
      .filter((value, index, self) => self.indexOf(value) === index) // Removes duplicates
      .join(" - ");

  console.log(
    placeName?.name +
      " - " +
      placeName?.address_components
        ?.map((add) => add?.long_name)
        .filter((value, index, self) => self.indexOf(value) === index) // Removes duplicates
        .join(" - "),
    "address_details---->"
  );

  const titles = selectedService.map((service) => service.title);
  const handleFirstSubmit = (e) => {
    e?.preventDefault();

    // Disable the button as soon as the form is submitted
    setIsButtonDisabled(true);
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setIsButtonDisabled(false); // Re-enable the button after 30 seconds
    }, 30000); // Button becomes clickable again after 30 seconds (30000ms)

    const data = new FormData();
    data.append(
      "pin_location",
      placeName?.url !== undefined ? placeName?.url : placeaddress || ""
    );
    data.append("address", newAddressName !== undefined ? newAddressName : "");
    data.append("address_type", selectedType || "");
    if (selectedType === "hotel") {
      data.append("address_details", address_details || "");
    }
    if (selectedType === "office") {
      data.append("address_details", address_details || "");
    }
    if (selectedType === "home") {
      data.append("address_details", address_details || "");
    }
    data.append("collection_day", formValues.collectionDay || "");
    data.append("collection_time", formValues.collectionTime || "");
    data.append(
      "collection_driver_instruction",
      formValues.collectionInstructions || ""
    );
    data.append("delivery_day", formValues.deliveryDay || "");
    data.append("contact_type", selectedOptionCode || "");
    data.append("payment_type", selectedOption || "");
    data.append("delivery_time", formValues.deliveryTime || "");
    data.append(
      "delivery_driver_instruction",
      formValues.driverInstructions || ""
    );
    data.append("special_driver_instructions", formValues.note || "");
    data.append("service_type", JSON.stringify(titles));
    data.append("first_name", formData.firstName || "");
    data.append("last_name", formData.lastName || "");
    data.append("phone_number", formData.number || "");
    data.append("email", formData.email || "");

    axios
      .post("https://api.laundry.dev-iuh.xyz/api/detailed-place-order", data, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
          "Content-Type": "multipart/form-data", // Set content type
        },
      })
      .then((res) => {
        // toast.success(res?.data?.response);
        localStorage.setItem("email", formData?.email);
        localStorage.setItem("contact_type", selectedOptionCode);
        console.log(res?.data?.response, "res?.detailed---->");
        console.log(res?.data, "res?.data?.response1---->");
        setVerifyID(res?.data?.data?.id);
        if (res?.status) {
          setLoader(false);
          handleVerifyModal();
          setTimer(30);
          setTimer(30);
          handleClose();
        } else if (res?.status !== 200 || res?.status !== true) {
          // localStorage.clear();
          setIsButtonDisabled(false);
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log(err, "err---->");
        setIsButtonDisabled(false);
        toast.error(err?.response?.data?.message);
        setLoader(false);
      });
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    checkGoogleMaps();
  }, [checkGoogleMaps]);
  useEffect(() => {
    if (
      formValues.collectionDay ||
      formValues.collectionTime ||
      formValues.deliveryDay
    ) {
      setFormValues((prev) => ({
        ...prev,
        deliveryTime: "", // Reset deliveryTime
      }));
    }
  }, [
    formValues.collectionDay,
    formValues.collectionTime,
    formValues.deliveryDay,
  ]);
  console.log(delivery_date, "deliveryDay--->");
  useEffect(() => {
    if (Resendapi && localStorage.getItem("Resendapi") === "true") {
      handleFirstSubmit();
      localStorage.setItem("Resendapi", "false"); // Reset Resendapi to prevent another call
    }
    // eslint-disable-next-line
  }, [Resendapi]);

  const handleServiceClick = (service) => {
    // Log the title and id separately
    console.log("Service Title:", service.title);
    console.log("Service ID:", service.id);

    setSelectedService((prevSelectedServices) => {
      // Check if the service is already selected based on its id
      if (prevSelectedServices.some((s) => s.id === service.id)) {
        // If selected, remove it from the list
        return prevSelectedServices.filter((s) => s.id !== service.id);
      } else {
        // If not selected, add it to the list
        return [...prevSelectedServices, service];
      }
    });
  };
  // if (!isLoaded || !isMapLoaded) {
  //   return null;
  // }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1); // Move to the previous step
    }
    // Add slight delay to ensure state updates complete before scrolling
    setTimeout(() => {
      // Scroll window to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Scroll .mapcontent to top
      const mapContent = document.querySelector(".mapcontent");
      if (mapContent) {
        mapContent.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }, 50); // 50ms delay ensures smooth transition
  };

  // ✅ Jab bhi step change ho, URL update ho
  useEffect(() => {
    navigate(`?step=${currentStep}`, { replace: false }); // 👈 replace false rakho
  }, [currentStep, navigate]);

  // ✅ Mobile ka back button aur browser ka <- button handle karo
  useEffect(() => {
    const handlePopState = () => {
      const query = new URLSearchParams(window.location.search);
      const stepFromUrl = parseInt(query.get("step")) || 0;

      if (stepFromUrl !== currentStep) {
        setCurrentStep(stepFromUrl);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [currentStep]); // 👈 isko sync karo

  console.log("Form Data-service--->:", selectedService?.length);

  // Function to toggle the menu open/close
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleMenu1 = () => {
    setIsOpen1(!isOpen1);
  };

  const isDisabled =
    newAddressName !== "undefined - undefined" && address_details === "";
  console.log(address_details, "address_details--->");
  const isDisabledsecond = !(
    formValues?.collectionDay &&
    formValues?.collectionTime &&
    formValues?.collectionInstructions &&
    formValues?.deliveryDay &&
    formValues?.deliveryTime &&
    formValues?.driverInstructions
  );
  return (
    <>
      <div className="fontsame pt-3 order" ref={targetDivRef}>
        <div className="fontsame row">
          <div
            className="fontsame col-lg-7 mapcontent my-5 px-3 pe-md-1 ps-md-5"
            style={{ overflowY: "scroll", maxHeight: "calc(100vh - 50px)" }}
          >
            {currentStep === 0 && (
              <div className="fontsame containerOrderplace col-lg-12 px-3 text-start">
                <h2 className="fontsame text-start mt-4 lowercase">
                  Enter your building/area name
                </h2>
                <div className="form-group">
                  <div
                    className=" position-relative"
                    style={{ cursor: "pointer" }}
                  >
                    <input
                      ref={inputRefCallback}
                      type="text"
                      defaultValue={placeName?.formatted_address}
                      className="fontsame form-control ps-4 pe-5  rounded text-white floating-input"
                      style={{ textTransform: "none" }}
                      placeholder=" " // Keep this space to ensure the label works correctly
                      onChange={(e) => {
                        setPlaceAdress(e.target.value); // Update state when input changes
                      }}
                    />
                    <label className="floating-label">
                      Search for address or building/area name
                    </label>
                    {/* Close Icon */}
                    {PlaceAdress !== "" && (
                      <ImCross
                        onClick={clearInput}
                        className="position-absolute top-50 cursor-pointer end-0 translate-middle-y me-3 border-0"
                      />
                    )}
                  </div>

                  <div className="d-flex my-4">
                    <img
                      src="https://app.laundryheap.com/images/icons/location_arrow.svg"
                      style={{ width: "24px", cursor: "pointer" }}
                      className="h-100"
                      alt=""
                      onClick={handleShow}
                    />{" "}
                    <p
                      className="fontsame text-start mt-2 fw-bold"
                      style={{ color: "#4A91F1", cursor: "pointer" }}
                      onClick={handleShow}
                    >
                      Map search
                    </p>
                  </div>
                </div>
                {ShowForm && (
                  <>
                    <h1 className="fontsame text-start my-3">
                      Choose address type
                    </h1>
                    <div className="d-flex justify-content-start my-3">
                      <Button
                        variant={selectedType === "home" ? "info" : "secondary"}
                        className="me-2 w-100 fw-bold"
                        style={{ textTransform: "none" }}
                        onClick={() => {
                          setSelectedType("home");
                          // setFormData({
                          //   number: "",
                          // });
                          // setAddress_details("");
                        }}
                      >
                        <FaHome className="fs-1" /> Home
                      </Button>
                      <Button
                        variant={
                          selectedType === "office" ? "info" : "secondary"
                        }
                        className="me-2 w-100 fw-bold"
                        style={{ textTransform: "none" }}
                        onClick={() => {
                          setSelectedType("office");
                          // setFormData({
                          //   number: "",
                          // });
                          // setAddress_details("");
                        }}
                      >
                        <ImOffice className="fs-1" /> Office
                      </Button>
                      <Button
                        variant={
                          selectedType === "hotel" ? "info" : "secondary"
                        }
                        className="w-100 py-4"
                        style={{ textTransform: "none" }}
                        onClick={() => {
                          setSelectedType("hotel");

                          // setAddress_details("");
                        }}
                      >
                        <FaHotel className="fs-1" /> Hotel
                      </Button>
                    </div>
                    {selectedType === "home" && (
                      <div className="form-group">
                        <div
                          className="position-relative"
                          style={{ cursor: "pointer" }}
                        >
                          <input
                            className="fontsame form-control ps-4 pe-5  rounded text-white floating-input"
                            placeholder=" " // Keep this space to ensure the label works correctly
                            value={address_details}
                            type="text"
                            name="addressdetails"
                            style={{ textTransform: "none" }}
                            onChange={(e) => setAddress_details(e.target.value)}
                          />
                          {selectedType === "home" && (
                            <label className="floating-label">
                              Add address details (home name, house number...)
                            </label>
                          )}
                          {/* {address_details === "" ? (
                            <p
                              style={{ fontStyle: "italic", color: "#EB798C" }}
                            >
                              This field is required
                            </p>
                          ) : null} */}
                        </div>
                      </div>
                    )}
                    {selectedType === "office" && (
                      <div className="form-group">
                        <div
                          className="position-relative"
                          style={{ cursor: "pointer" }}
                        >
                          <input
                            className="fontsame form-control ps-4 pe-5  rounded text-white floating-input"
                            placeholder=" " // Keep this space to ensure the label works correctly
                            value={address_details}
                            type="text"
                            name="addressdetails"
                            style={{ textTransform: "none" }}
                            onChange={(e) => setAddress_details(e.target.value)}
                          />
                          {selectedType === "office" && (
                            <label className="floating-label">
                              Add address details (ofiice name, floor number...)
                            </label>
                          )}
                          {address_details === "" &&
                            selectedType === "office" && (
                              <p
                                style={{
                                  fontStyle: "italic",
                                  color: "#EB798C",
                                }}
                              >
                                This field is required
                              </p>
                            )}
                        </div>
                      </div>
                    )}
                    {selectedType === "hotel" && (
                      <div className="form-group">
                        <div
                          className=" position-relative"
                          style={{ cursor: "pointer" }}
                        >
                          <input
                            className="fontsame form-control ps-4 pe-5  rounded text-white floating-input"
                            placeholder=" " // Keep this space to ensure the label works correctly
                            type="text"
                            // name="RoomNumber"
                            value={address_details}
                            onChange={(e) => setAddress_details(e.target.value)}

                            // onChange={handleChange}
                          />
                          <label className="floating-label">
                            Add address details (hotel name, floor number, room
                            number...)
                          </label>
                          {selectedType === "hotel" ||
                            (address_details === "" && (
                              <p
                                style={{
                                  fontStyle: "italic",
                                  color: "#EB798C",
                                }}
                              >
                                This field is required
                              </p>
                            ))}
                        </div>
                      </div>
                    )}
                    <div className="row my-3">
                      <h1 className="fontsame text-start">
                        Confirm building entrance
                      </h1>
                      <div style={{ position: "relative" }}>
                        <GoogleMap
                          mapContainerStyle={containerOrderplaceStyle}
                          center={position}
                          zoom={18}
                          options={{
                            zoomControl: true,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                          }}
                        >
                          <MarkerF
                            position={position}
                            draggable={true}
                            onDragEnd={handleMarkerDragEnd}
                            icon={customIcon} // Apply custom icon
                          />
                          {showBox && (
                            <div
                              style={{ position: "absolute", width: "100%" }}
                            >
                              <div
                                className="boxmap"
                                style={{ position: "relative" }}
                              >
                                {/* Cross Icon Button */}
                                <button
                                  onClick={() => setShowBox(false)}
                                  style={{
                                    position: "absolute",
                                    top: -10,
                                    right: -7,
                                    fontSize: 13,
                                    background:
                                      "linear-gradient(102.59deg, #1ea3fe 0%, #9afbce 100%), #1ea3fe ",
                                    border: "none",
                                    cursor: "pointer",
                                    borderRadius: 20,
                                    padding: "4px 12px 4px 12px",
                                  }}
                                >
                                  X
                                </button>

                                <p
                                  className="m-0"
                                  style={{
                                    backgroundColor: "rgb(157 239 255)",
                                    borderRadius: "50%",
                                    height: 50,
                                    width: 50,
                                    justifyContent: "center",
                                    display: "flex",
                                    alignItems: "center",
                                    textAlign: "center",
                                  }}
                                >
                                  <img
                                    src="https://app.laundryheap.com/images/methods/outside.svg"
                                    alt=""
                                    style={{ width: 30 }} // Adjust width and height as needed
                                  />
                                </p>
                                <p className="m-1 p-3">
                                  Drag to move pin to exact location - this
                                  helps our driver find you.
                                </p>
                              </div>
                            </div>
                          )}
                        </GoogleMap>
                        <Button
                          type="button"
                          variant="info"
                          onClick={() => {
                            setCurrentStep(1);
                            // window.scrollBy(0, -50);
                            // Add slight delay to ensure state updates complete before scrolling
                            setTimeout(() => {
                              // Scroll window to top
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });

                              // Scroll .mapcontent to top
                              const mapContent =
                                document.querySelector(".mapcontent");
                              if (mapContent) {
                                mapContent.scrollTo({
                                  top: 0,
                                  behavior: "smooth",
                                });
                              }
                            }, 50); // 50ms delay ensures smooth transition
                          }}
                          disabled={
                            !address_details &&
                            !formData?.RoomNumber &&
                            !address_details
                          }
                          className="text-white w-100 py-4"
                          style={{ textTransform: "none" }}
                        >
                          CONFIRM
                        </Button>
                        {/* {showConfirm && (
                          <div className="ConfrimBtn">
                            <div className="ConfirmUnderBTn">
                              <p
                                className="text-center"
                                style={{ textTransform: "none" }}
                              >
                                Thank you for your help!
                              </p>
                              <Button
                                type="button"
                                variant="info"
                                className="text-white w-100 py-4"
                                onClick={() => setCurrentStep(1)}
                                disabled={!address_details}
                                style={{ textTransform: "none" }}
                              >
                                Confirm
                              </Button>
                            </div>
                          </div>
                        )} */}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
            {currentStep === 1 && (
              <div className="fontsame col-lg-12 px-2 text-start">
                <Button
                  type="button"
                  onClick={() => {
                    handleBack();
                    // window.scrollTo({
                    //   top: 0,
                    //   behavior: "smooth",
                    // });
                    // Add slight delay to ensure state updates complete before scrolling
                    setTimeout(() => {
                      // Scroll window to top
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });

                      // Scroll .mapcontent to top
                      const mapContent = document.querySelector(".mapcontent");
                      if (mapContent) {
                        mapContent.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }
                    }, 50); // 50ms delay ensures smooth transition
                  }}
                  className="text-white btn-theme"
                  style={{ padding: "3px 17px 0px 17px" }}
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className=""
                    style={{ fontSize: "25px" }}
                  />
                </Button>
                <div className="fontsame mx-1">
                  <h2
                    className="fontsame text-start mt-4"
                    style={{ textTransform: "none" }}
                  >
                    PICK UP AND DELIVERY DETAILS
                  </h2>
                  <div className="row">
                    <h5 className="fontsame text-start mt-4 mb-2">
                      Pick-up Date
                    </h5>
                    <div className="col-lg-6">
                      {/* <div className="form-group text-start fixedWidth">
                        <label className="text-white">
                          Select Pick-up Date
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-light text-white">
                            <i className="fas fa-calendar-day text-dark fs-3"></i>
                          </span>
                          <select
                            name="collectionDay"
                            className="form-control fs-3 rounded-r-md"
                            style={{ textTransform: "none" }}
                            defaultValue={formValues.collectionDay}
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              setFuctionUpdate(true);
                              // Reset related fields
                              setFormValues((prev) => ({
                                ...prev,
                                collectionDay: selectedValue,
                                deliveryDay: "",
                              }));

                              // Trigger slots and update
                              setTimeout(() => {
                                setFuctionUpdate(false);
                              }, 1000);
                              handleSlots("collection_slots", selectedValue);
                              handleSlots("delivery_date", selectedValue);
                            }}
                          >
                            <option value="">Select...</option>
                            {Array.isArray(collection_date) &&
                              collection_date?.map((day, index) => (
                                <option
                                  key={index}
                                  className="font-16-24 deep-black d-flex p-3 flex-row justify-content-start align-items-center dropdown-item text-dark active"
                                  value={day}
                                  style={{
                                    textTransform: "none",
                                    width: "100%",
                                  }}
                                >
                                  {formatDate(day)}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div> */}
                      <div className="dateslot-picker--slot">
                        <p className="font-14-21 text-white mb-0 dateslot-label">
                          Select Pick-up Date
                        </p>
                        <div className="menu" id="pickup-date" ref={menuRef}>
                          <div
                            className="menu-header font-16-24 deep-black fw-bold d-flex flex-row align-items-center flex-grow-1"
                            onClick={() => {
                              toggleMenu1();
                              handleSlots();
                            }}
                          >
                            <img
                              alt="Select a dateslot"
                              src="https://www.pngkey.com/png/detail/18-180664_calendar-clock-comments-time-and-date-icon-png.png"
                              height="16"
                              width="16"
                              className="me-16"
                            />
                            <span>
                              {formatDate(formValues.collectionDay) ||
                                "Select..."}
                            </span>
                          </div>
                          {isOpen1 && (
                            <div className="menu-body">
                              {collection_date?.length > 0 ? (
                                <>
                                  {Array.isArray(collection_date) &&
                                    collection_date.map((day, index) => (
                                      <div
                                        key={index}
                                        className={`font-16-24 deep-black d-flex p-3 flex-row justify-content-start align-items-center dropdown-item text-dark ${
                                          formValues.collectionDay === day
                                            ? "active"
                                            : ""
                                        }`}
                                        onClick={() => {
                                          // Update the selected date
                                          setFormValues((prev) => ({
                                            ...prev,
                                            collectionDay: day,
                                            deliveryDay: "", // Clear delivery day when collection day changes
                                          }));

                                          // Trigger slots update
                                          handleSlots("collection_slots", day);
                                          handleSlots("delivery_date", day);

                                          // Close the menu after selecting the date
                                          setIsOpen1(false);
                                        }}
                                        onChange={(e) => {
                                          const selectedValue = e.target.value;
                                          setFuctionUpdate(true);
                                          // Reset related fields
                                          setFormValues((prev) => ({
                                            ...prev,
                                            collectionDay: selectedValue,
                                            deliveryDay: "",
                                          }));

                                          // Trigger slots and update
                                          setTimeout(() => {
                                            setFuctionUpdate(false);
                                          }, 1000);
                                          handleSlots(
                                            "collection_slots",
                                            selectedValue
                                          );
                                          handleSlots(
                                            "delivery_date",
                                            selectedValue
                                          );
                                        }}
                                      >
                                        <span
                                          className="me-3"
                                          style={{ textTransform: "none" }}
                                        >
                                          {formatDate(day) || "Select..."}
                                        </span>
                                      </div>
                                    ))}
                                </>
                              ) : (
                                <div className="loading-text text-center">
                                  Loading...
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group text-start ">
                        <CustomSelectcollection
                          handleChange1={(e) => {
                            setFormValues((prev) => ({
                              ...prev,
                              deliveryDay: "",
                              deliveryTime: "Select...", // Reset delivery day
                            }));
                            handleChange1({
                              ...e,
                              target: { ...e.target, name: "collectionTime" },
                            });
                            setFormValues((prev) => ({
                              ...prev,
                            }));
                          }}
                          values={formValues.collectionTime}
                          collection_date={formValues.collectionDay}
                          disabledfield={FuctionUpdate}
                          setFuctionUpdatenew={setFuctionUpdatenew}
                          handleSlotsfield={handleDeliverySlots}
                          TimeOptions={collection_slots}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 mt-4">
                      <div className="form-group text-start">
                        <label className="text-white">
                          Collection instructions
                        </label>
                        <div className="row">
                          <div className="col-lg-4 col-md-6 col-sm-n12">
                            <div className="add-section">
                              <Button
                                type="button"
                                id="pickupbtntype"
                                variant="light"
                                className={`w-100 py-3 fs-6 px-0 ${
                                  formValues.collectionInstructions ===
                                  "collect from me in person"
                                    ? "boxborder1 border-info bg-info text-white" // Adjust this color to match your "info" border color
                                    : "border border-light text-dark"
                                }`}
                                style={{ textTransform: "none" }}
                                onClick={() =>
                                  handleChange1({
                                    target: {
                                      name: "collectionInstructions",
                                      value: "collect from me in person",
                                    },
                                  })
                                }
                              >
                                <img
                                  src={"./imgicon.png"}
                                  style={{
                                    height: 40,
                                    width: "100%",
                                    objectFit: "contain",
                                    filter:
                                      formValues.collectionInstructions ===
                                      "collect from me in person"
                                        ? "invert(1) grayscale(1) contrast(100%)"
                                        : null,
                                  }}
                                  alt="images"
                                />
                                <br />
                                Collect from me in person
                                <br />
                                <br />
                              </Button>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-n12">
                            <div className="add-section">
                              <Button
                                type="button"
                                variant="light"
                                className={`w-100 pt-4 pb-3 fs-6 px-0 ${
                                  formValues.collectionInstructions ===
                                  "collect from outside"
                                    ? "boxborder1 border-info bg-info text-white" // Adjust this color to match your "info" border color
                                    : "border border-light text-dark"
                                }`}
                                style={{ textTransform: "none" }}
                                onClick={() =>
                                  handleChange1({
                                    target: {
                                      name: "collectionInstructions",
                                      value: "collect from outside",
                                    },
                                  })
                                }
                              >
                                <img
                                  src={
                                    "https://static.thenounproject.com/png/1877610-200.png"
                                  }
                                  style={{
                                    height: 40,
                                    width: "100%",
                                    objectFit: "contain",
                                    filter:
                                      formValues.collectionInstructions ===
                                      "collect from outside"
                                        ? "invert(1) grayscale(1) contrast(100%)"
                                        : null,
                                  }}
                                  alt=""
                                />
                                <br />
                                Collect from outside
                                <br />
                                <span className="bg-info rounded text-white p-2">
                                  RECOMMENDED
                                </span>
                              </Button>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-n12">
                            <div className="add-section">
                              <Button
                                type="button"
                                id="pickupbtntype"
                                variant="light"
                                className={`w-100 py-3 fs-6 px-0 ${
                                  formValues.collectionInstructions ===
                                  "collect from reception/porter"
                                    ? "boxborder1 border-info bg-info text-white" // Adjust this color to match your "info" border color
                                    : "border border-light text-dark"
                                }`}
                                style={{ textTransform: "none" }}
                                onClick={() =>
                                  handleChange1({
                                    target: {
                                      name: "collectionInstructions",
                                      value: "collect from reception/porter",
                                    },
                                  })
                                }
                              >
                                <img
                                  src={
                                    "https://cdn-icons-png.flaticon.com/512/185/185539.png"
                                  }
                                  style={{
                                    height: 40,
                                    width: "100%",
                                    objectFit: "contain",
                                    filter:
                                      formValues.collectionInstructions ===
                                      "collect from reception/porter"
                                        ? "invert(1) grayscale(1) contrast(100%)"
                                        : null,
                                  }}
                                  alt=""
                                />
                                <br />
                                Collect from reception/security
                                <br />
                                <br />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="mt-4" />
                    </div>
                    <h5 className="fontsame text-start mt-4 mb-2">
                      Delivery time
                    </h5>
                    <div className="col-lg-6">
                      {/* <div className="form-group text-start fixedWidth">
                        <label className="text-white">
                          Select delivery Date
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-light text-white">
                            <i className="fas fa-calendar-day text-dark fs-3"></i>
                          </span>
                          <select
                            name="deliveryDay"
                            className="form-control fs-3"
                            value={formValues.deliveryDay}
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              // Reset deliveryDay and deliveryTime
                              setFormValues((prev) => ({
                                ...prev,
                                deliveryDay: selectedValue, // Clear deliveryTime when deliveryDay changes
                              }));

                              // Check and call handleDeliverySlots
                              if (
                                formValues.collectionTime !== "" &&
                                formValues.collectionDay !== "" &&
                                selectedValue !== ""
                              ) {
                                handleDeliverySlots(
                                  "delivery_date",
                                  selectedValue
                                );
                              }
                            }}
                            onClick={() => {
                              setFuctionUpdatedelivery_date(true);
                              setTimeout(() => {
                                setFuctionUpdatedelivery_date(false);
                              }, 1000);
                            }}
                          >
                            <option value="">Select...</option>
                            {Array.isArray(delivery_date) &&
                              delivery_date.map((day, index) => (
                                <option
                                  key={index}
                                  value={day}
                                  style={{
                                    textTransform: "none",
                                    width: "160px",
                                  }}
                                >
                                  {formatDate(day)}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div> */}
                      <div className="dateslot-picker--slot">
                        <p className="font-14-21 text-white mb-0 dateslot-label">
                          Select delivery Date
                        </p>
                        <div className="menu" id="delivery-date" ref={menuRef}>
                          <div
                            className="menu-header font-16-24 deep-black fw-bold d-flex flex-row align-items-center flex-grow-1"
                            onClick={toggleMenu}
                          >
                            <img
                              alt="Select a dateslot"
                              src="https://www.pngkey.com/png/detail/18-180664_calendar-clock-comments-time-and-date-icon-png.png"
                              height="16"
                              width="18"
                              className="me-16"
                            />
                            <span>
                              {formatDate(formValues.deliveryDay) ||
                                "Select..."}
                            </span>
                          </div>
                          {isOpen && (
                            <div className="menu-body">
                              {delivery_date?.length > 0 ? (
                                <>
                                  {Array.isArray(delivery_date) &&
                                    delivery_date.map((day, index) => (
                                      <div
                                        key={index}
                                        className={`font-16-24 deep-black d-flex p-3 flex-row justify-content-start align-items-center dropdown-item text-dark ${
                                          formValues.deliveryDay === day
                                            ? "active"
                                            : ""
                                        }`}
                                        onClick={() => {
                                          // Update the selected date
                                          setFormValues((prev) => ({
                                            ...prev,
                                            deliveryDay: day,
                                          }));

                                          // Call handleDeliverySlots when a date is selected
                                          if (
                                            formValues.collectionTime !== "" &&
                                            formValues.collectionDay !== "" &&
                                            day !== ""
                                          ) {
                                            handleDeliverySlots(
                                              "delivery_date",
                                              day
                                            );
                                          }
                                          setFuctionUpdatedelivery_date(true);
                                          setTimeout(() => {
                                            setFuctionUpdatedelivery_date(
                                              false
                                            );
                                          }, 1000);
                                          // Close the menu after selecting the date
                                          setIsOpen(false);
                                        }}
                                      >
                                        <span
                                          className="me-3"
                                          style={{ textTransform: "none" }}
                                        >
                                          {formatDate(day)}
                                        </span>
                                      </div>
                                    ))}
                                </>
                              ) : (
                                <div className="loading-text text-center">
                                  Loading...
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group text-start ">
                        <CustomSelect
                          handleChange1={(e) =>
                            handleChange1({
                              ...e,
                              target: { ...e.target, name: "deliveryTime" },
                            })
                          }
                          values={formValues.deliveryTime}
                          FuctionUpdate={FuctionUpdate}
                          FuctionUpdatenew={FuctionUpdatenew}
                          FuctionUpdatedelivery_date={
                            FuctionUpdatedelivery_date
                          }
                          disabledfield={FuctionUpdate}
                          TimeOptions={delivery_slots}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12 mt-4">
                      <div className="form-group text-start">
                        <label className="text-white">
                          Delivery instructions
                        </label>
                        <div className="row">
                          <div className="col-lg-4 col-md-6 col-sm-n12">
                            <div className="add-section">
                              <Button
                                type="button"
                                variant="light"
                                id="pickupbtntype"
                                className={`w-100 fs-6 px-0 ${
                                  formValues.driverInstructions ===
                                  "driver to me in person"
                                    ? "boxborder1 border-info bg-info text-white" // Adj text-whiteust this color to match your "info" border color
                                    : "border border-light text-dark"
                                }`}
                                style={{
                                  textTransform: "none",
                                }}
                                onClick={() =>
                                  handleChange1({
                                    target: {
                                      name: "driverInstructions",
                                      value: "driver to me in person",
                                    },
                                  })
                                }
                              >
                                <img
                                  src={
                                    "https://static.thenounproject.com/png/48705-200.png"
                                  }
                                  style={{
                                    height: 40,
                                    width: "100%",
                                    filter:
                                      formValues.driverInstructions ===
                                      "driver to me in person"
                                        ? "invert(1) grayscale(1) contrast(100%)"
                                        : null,
                                    objectFit: "contain",
                                  }}
                                  alt=""
                                />
                                <br />
                                Deliver to me in person
                                <br />
                                <br />
                              </Button>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-n12">
                            <div className="add-section">
                              <Button
                                type="button"
                                variant="light"
                                className={`w-100 pt-4 pb-3 fs-6 px-0 ${
                                  formValues.driverInstructions ===
                                  "leave at the door"
                                    ? "boxborder1 border-info" // Adj text-whiteust this color to match your "info" border color
                                    : "border border-light text-dark"
                                }`}
                                style={{ textTransform: "none" }}
                                onClick={() =>
                                  handleChange1({
                                    target: {
                                      name: "driverInstructions",
                                      value: "leave at the door",
                                    },
                                  })
                                }
                              >
                                <img
                                  src={
                                    "https://cdn0.iconfinder.com/data/icons/construction-44/512/Exit-512.png"
                                  }
                                  style={{
                                    height: 40,
                                    width: "100%",
                                    filter:
                                      formValues.driverInstructions ===
                                      "leave at the door"
                                        ? "invert(1) grayscale(1) contrast(100%)"
                                        : null,
                                    objectFit: "contain",
                                  }}
                                  alt=""
                                />
                                <br />
                                Leave at the door
                                <br />
                                <span className="bg-info rounded text-white p-2">
                                  RECOMMENDED
                                </span>
                              </Button>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-n12">
                            <div className="add-section">
                              <Button
                                type="button"
                                variant="light"
                                id="pickupbtntype"
                                className={`w-100 py-3 fs-6 px-0 ${
                                  formValues.driverInstructions ===
                                  "driver to the reception/porter"
                                    ? "boxborder1 border-info" // Adj text-whiteust this color to match your "info" border color
                                    : "border border-light text-dark"
                                }`}
                                style={{ textTransform: "none" }}
                                onClick={() =>
                                  handleChange1({
                                    target: {
                                      name: "driverInstructions",
                                      value: "driver to the reception/porter",
                                    },
                                  })
                                }
                              >
                                <img
                                  src={"./images1.png"}
                                  style={{
                                    height: 40,
                                    width: "100%",
                                    background: "none",
                                    filter:
                                      formValues.driverInstructions ===
                                      "driver to the reception/porter"
                                        ? "invert(1) grayscale(1) contrast(100%)"
                                        : null,
                                    objectFit: "contain",
                                  }}
                                  alt=""
                                />
                                <br />
                                Deliver to the reception/security
                                <br />
                                <br />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="mt-4" />
                    </div>

                    <div className="col-12 text-dark" id="textareanote0">
                      <h5 className="fontsame text-start  mb-2">
                        Special instructions or comments
                      </h5>
                      <textarea
                        className="form-control mt-4 bg-light text-dark custom-textarea fs-3 rounded"
                        name="note"
                        placeholder=""
                        value={formValues.note}
                        onChange={handleChange1}
                      ></textarea>
                      <hr className="mt-4" />
                    </div>
                  </div>
                </div>
                <div className="fontsame container12">
                  <h2
                    className="fontsame text-start mt-4"
                    style={{ textTransform: "none" }}
                  >
                    Please select your required services
                  </h2>
                  <div className="row m-0">
                    {service?.map((items, index) => {
                      const isSelected = selectedService.some(
                        (s) => s.id === items?.id
                      );

                      return (
                        <div
                          key={index}
                          className="bg-info row p-3 rounded my-3 w-100"
                        >
                          <div className="col-lg-9">
                            <div className="main-content">
                              <div className="image-text-section">
                                <img
                                  src={
                                    items?.image ||
                                    "https://prod-cdn.laundryheap.com/images/static/services/web/wash.png"
                                  }
                                  height="32"
                                  style={{
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                  }}
                                  alt="Service"
                                />
                                <div className="text-info">
                                  <p
                                    className="service-name"
                                    style={{ textTransform: "none" }}
                                  >
                                    {items?.title}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="add-section1 mt-md-0 mt-2">
                              <Button
                                type="button"
                                variant={isSelected ? "danger" : "light"}
                                className={`w-100 py-3 border ${
                                  isSelected
                                    ? "border-danger text-white"
                                    : "border-light text-dark"
                                }`}
                                onClick={() =>
                                  handleServiceClick({
                                    title: items?.title,
                                    id: items?.id,
                                  })
                                }
                              >
                                {isSelected ? "Cancel" : "+ Add"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="fontsame containerOrderplace col-lg-12 px-3 text-start">
                {/* <Button
                  type="button"
                  variant="info"
                  onClick={() => {
                    handleBack();
                    window.scrollBy(0, -50);
                  }}
                  className="text-white btn-theme"
                  style={{ padding: "3px 17px 0px 17px" }}
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className=""
                    style={{ fontSize: "25px" }}
                  />
                </Button> */}
                <Button
                  type="button"
                  onClick={() => {
                    handleBack();
                    // window.scrollTo({
                    //   top: 0,
                    //   behavior: "smooth",
                    // });
                    // Add slight delay to ensure state updates complete before scrolling
                    setTimeout(() => {
                      // Scroll window to top
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });

                      // Scroll .mapcontent to top
                      const mapContent = document.querySelector(".mapcontent");
                      if (mapContent) {
                        mapContent.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }
                    }, 50); // 50ms delay ensures smooth transition
                  }}
                  className="text-white btn-theme"
                  style={{ padding: "3px 17px 0px 17px" }}
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className=""
                    style={{ fontSize: "25px" }}
                  />
                </Button>
                <div className="container fontsame">
                  <h2 className="fontsame text-start mt-4">Contact</h2>
                  <div className="row">
                    <h5 className="text-start mb-0">How can we contact you?</h5>
                    <p className="text-start">
                      We need your contact information to keep you updated about
                      your order.
                    </p>

                    {/* First Name Input */}
                    <div
                      className="position-relative col-lg-12 mb-4"
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className="fas fa-user input-icon text-info"
                        style={{
                          top: "12px",
                          textAlign: "right",
                          position: "absolute",
                          right: "20px",
                          fontSize: "xx-large",
                        }}
                      ></i>
                      <input
                        style={{ padding: "20px 0px 10px 15px" }}
                        className="fontsame form-control rounded text-white floating-input"
                        placeholder=""
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      <label className="floating-label">First name</label>
                    </div>

                    {/* Last Name Input */}
                    <div
                      className="position-relative col-lg-12 mb-4"
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className="fa-solid fa-pen-to-square text-info"
                        style={{
                          top: "12px",
                          textAlign: "right",
                          position: "absolute",
                          right: "20px",
                          fontSize: "xx-large",
                        }}
                      ></i>
                      <input
                        style={{ padding: "20px 0px 10px 15px" }}
                        className="fontsame form-control rounded text-white floating-input"
                        placeholder=""
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      <label className="floating-label">Last name</label>
                    </div>

                    {/* Phone Number Input */}
                    <div className="col-lg-12 text-secondary mb-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="form-group w-100">
                          <PhoneInput
                            inputClass="w-100"
                            country="ae"
                            value={formData.number}
                            onChange={handlePhoneChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email Input */}
                    <div
                      className="position-relative col-lg-12 mb-4"
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className="fas fa-envelope input-icon text-info"
                        style={{
                          top: "12px",
                          textAlign: "right",
                          position: "absolute",
                          right: "20px",
                          fontSize: "xx-large",
                        }}
                      ></i>
                      <input
                        style={{ padding: "20px 0px 10px 15px" }}
                        className="fontsame form-control rounded text-white floating-input"
                        placeholder=""
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <label className="floating-label">Email</label>
                    </div>

                    {/* Payment Method */}
                    <h5 className="text-start mb-0 mt-3">
                      <i className="fas fa-credit-card me-2"></i> Select a
                      payment method
                    </h5>
                    <div className="col-lg-6 col-md-6 my-3">
                      <div className="add-section">
                        <Button
                          type="button"
                          variant="light"
                          className={`w-100 py-3 fs-6 px-0 ${
                            selectedOption === "cod"
                              ? "boxborder1 border-info bg-info text-white"
                              : "border border-light text-dark"
                          }`}
                          style={{ textTransform: "none" }}
                          onClick={() => handleCheckboxChange("cod")}
                        >
                          <img
                            src={
                              "https://static.thenounproject.com/png/1877610-200.png"
                            }
                            style={{
                              height: 40,
                              width: "100%",
                              objectFit: "contain",
                              filter:
                                selectedOption === "cod"
                                  ? "invert(1) grayscale(1) contrast(100%)"
                                  : null,
                            }}
                            alt="Cash on delivery"
                          />
                          <br />
                          Cash on delivery
                          <br />
                        </Button>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 my-3">
                      <div className="add-section">
                        <Button
                          type="button"
                          variant="light"
                          className={`w-100 py-3 fs-6 px-0 ${
                            selectedOption === "credit card"
                              ? "boxborder1 border-info bg-info text-white"
                              : "border border-light text-dark"
                          }`}
                          style={{ textTransform: "none" }}
                          onClick={() => handleCheckboxChange("credit card")}
                        >
                          <img
                            src={"/images/card.png"}
                            style={{
                              height: 40,
                              width: "100%",
                              objectFit: "contain",
                              filter:
                                selectedOption === "credit card"
                                  ? "invert(1) grayscale(1) contrast(100%)"
                                  : null,
                            }}
                            alt="Credit card"
                          />
                          <br />
                          Credit card
                          <br />
                        </Button>
                      </div>
                    </div>

                    {selectedOption === "credit card" && (
                      <p>
                        We will share a payment link to your WhatsApp/SMS before
                        delivery
                      </p>
                    )}

                    {/* OTP Verification */}
                    <h5 className="text-start mb-0">
                      <i
                        className="fas fa-lock me-2"
                        style={{ color: "#00BCD4" }}
                      ></i>{" "}
                      Select OTP verification method
                    </h5>

                    <div className="col-lg-6 col-md-6 my-3">
                      <div className="add-section">
                        <Button
                          type="button"
                          variant="light"
                          className={`w-100 py-3 fs-6 px-0 ${
                            selectedOptionCode === "whatsapp"
                              ? "boxborder1 border-info bg-info text-white"
                              : "border border-light text-dark"
                          }`}
                          style={{ textTransform: "none" }}
                          onClick={() => handleCheckboxChangeCode("whatsapp")}
                        >
                          <IoLogoWhatsapp
                            style={{
                              height: 40,
                              width: "100%",
                              objectFit: "contain",
                              color:
                                selectedOptionCode === "whatsapp"
                                  ? "white"
                                  : "black",
                            }}
                          />
                          {/* <img
                            src={"/images/whatsapp.png"}
                            style={{
                              height: 40,
                              width: "100%",
                              objectFit: "contain",
                              filter:
                                selectedOptionCode === "whatsapp"
                                  ? "invert(1) grayscale(1) contrast(100%)"
                                  : null,
                            }}
                            alt="WhatsApp"
                          /> */}
                          <br />
                          WhatsApp
                          <br />
                        </Button>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 my-3">
                      <div className="add-section">
                        <Button
                          type="button"
                          variant="light"
                          className={`w-100 py-3 fs-6 px-0 ${
                            selectedOptionCode === "sms"
                              ? "boxborder1 border-info bg-info text-white"
                              : "border border-light text-dark"
                          }`}
                          style={{ textTransform: "none" }}
                          onClick={() => handleCheckboxChangeCode("sms")}
                        >
                          <img
                            src={"/images/sms.png"}
                            style={{
                              height: 40,
                              width: "100%",
                              objectFit: "contain",
                              filter:
                                selectedOptionCode === "sms"
                                  ? "invert(1) grayscale(1) contrast(100%)"
                                  : null,
                            }}
                            alt="SMS"
                          />
                          <br />
                          Mobile number
                          <br />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className="fontsame col-lg-5  my-5 px-md-5 py-3 leftside2"
            style={{
              position: "sticky",
              top: "0",
              // height: "100vh",
            }}
          >
            <div className="border border-secondary my-5">
              <div className="m-0 p-4">
                {currentStep === 2 ? (
                  <Button
                    type="button"
                    variant="info"
                    onClick={handleFirstSubmit}
                    className="text-white w-100 py-4"
                    disabled={!isFormFilled() || isButtonDisabled} // Disable button based on form status and state
                  >
                    {loader ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />{" "}
                        Loading...
                      </>
                    ) : (
                      `ORDER NOW ${ResentTimer > 0 ? ResentTimer : ""}`
                    )}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="info"
                    onClick={() => {
                      handleNext();

                      // Add slight delay to ensure state updates complete before scrolling
                      setTimeout(() => {
                        // Scroll window to top
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });

                        // Scroll .mapcontent to top
                        const mapContent =
                          document.querySelector(".mapcontent");
                        if (mapContent) {
                          mapContent.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }
                      }, 50); // 50ms delay ensures smooth transition
                    }}
                    className="text-white w-100 py-4"
                    disabled={
                      currentStep === 0 ? isFormFilled() : !isFormFilled()
                    }
                  >
                    NEXT
                  </Button>
                )}
              </div>
              <div className="m-0 px-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    className="form-check text-start py-3"
                    style={{ width: "80%" }}
                  >
                    <input
                      className="form-check-input mt-2 me-0"
                      type="checkbox"
                      id={"address"}
                      checked
                      disabled={!placeName?.formatted_address}
                    />
                    <label
                      className="form-check-label text-info bold px-2"
                      htmlFor={"address"}
                    >
                      Address
                    </label>
                    {newAddressName !== undefined &&
                      newAddressName !== "" &&
                      newAddressName !== "undefined - undefined" && (
                        <p
                          className="m-0 px-2"
                          style={{ textTransform: "none" }}
                        >
                          {newAddressName}
                        </p>
                      )}

                    {address_details !== "" && selectedType === "home" && (
                      <p className="m-0 px-2">{address_details}</p>
                    )}
                    {address_details !== "" && selectedType === "office" && (
                      <p className="m-0 px-2">{address_details}</p>
                    )}
                    {console.log(
                      address_details,
                      formData.RoomNumber,
                      "address_details--->"
                    )}
                    {address_details !== "" &&
                      selectedType === "hotel" &&
                      address_details !== undefined && (
                        <p className="m-0 px-2">{address_details}</p>
                      )}
                  </div>
                  <div
                    className="edit-icons1"
                    disabled={!newAddressName || !address_details}
                    onClick={() => {
                      setCurrentStep(0);
                      // Add slight delay to ensure state updates complete before scrolling
                      setTimeout(() => {
                        // Scroll window to top
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });

                        // Scroll .mapcontent to top
                        const mapContent =
                          document.querySelector(".mapcontent");
                        if (mapContent) {
                          mapContent.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }
                      }, 50); // 50ms delay ensures smooth transition
                    }}
                  >
                    <i className="fas fa-edit mr-2"></i>
                    <span>Edit</span>
                  </div>
                </div>

                <hr className="m-0" />
              </div>
              <div className="m-0 px-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="form-check text-start pt-3">
                      <input
                        className="form-check-input mt-2 me-0"
                        type="checkbox"
                        id={"collectionTime"}
                        checked
                        disabled={!formValues?.collectionDay}
                      />
                      <label
                        className="form-check-label text-info bold px-2"
                        htmlFor={"collectionTime"}
                        style={{ textTransform: "none" }}
                      >
                        Pick-up Time
                      </label>
                      {formValues?.collectionDay ? (
                        <p
                          className="m-0 px-2"
                          style={{ textTransform: "none" }}
                        >
                          {formatDate(formValues?.collectionDay)}&nbsp;
                          {formValues?.collectionTime !== "Select..." &&
                            formValues?.collectionTime}
                          <br />
                          <span className="" style={{ textTransform: "none" }}>
                            {formValues?.collectionInstructions ===
                            "collect from reception/porter"
                              ? "Collect from reception/security"
                              : formValues?.collectionInstructions ===
                                "collect from outside"
                              ? "Collect from outside"
                              : formValues?.collectionInstructions ===
                                  "collect from me in person" &&
                                "Collect from me in person"}
                          </span>
                        </p>
                      ) : null}
                    </div>
                    <div
                      className="form-check text-start py-3"
                      style={{ width: "80%" }}
                    >
                      <input
                        className="form-check-input mt-2 me-0"
                        type="checkbox"
                        id={"DeliveryTime"}
                        checked
                        disabled={!formValues?.deliveryDay}
                      />
                      <label
                        className="form-check-label text-info bold px-2"
                        htmlFor={"DeliveryTime"}
                        style={{ textTransform: "none" }}
                      >
                        Delivery Time
                      </label>
                      {formValues?.deliveryDay ? (
                        <>
                          <p className="m-0 px-2">
                            {formatDate(formValues?.deliveryDay)}&nbsp;
                            {formValues?.deliveryTime !== "Select..." &&
                              formValues?.deliveryTime}
                            <br />
                            {formValues?.driverInstructions ===
                            "driver to the reception/porter"
                              ? "Deliver to the reception/security"
                              : formValues?.driverInstructions ===
                                "leave at the door"
                              ? "Leave at the door"
                              : formValues?.driverInstructions ===
                                  "driver to me in person" &&
                                "Deliver to me in person"}
                          </p>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div
                    className={`edit-icons1 ${
                      !address_details || isDisabled ? "disabled101" : ""
                    }`}
                    onClick={() => {
                      if (!address_details) return; // Agar empty hai to function execute hi na ho

                      setCurrentStep(1);

                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });

                        const mapContent =
                          document.querySelector(".mapcontent");
                        if (mapContent) {
                          mapContent.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }, 50);
                    }}
                    disabled={!address_details || isDisabled}
                  >
                    <i className="fas fa-edit mr-2"></i>
                    <span>Edit</span>
                    {console.log(newAddressName, "newAddressName--->")}
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    className="form-check text-start py-3"
                    style={{ width: "80%" }}
                  >
                    <input
                      className="form-check-input mt-2 me-0"
                      type="checkbox"
                      id={"selectedServices"}
                      checked
                      disabled={selectedService?.length === 0}
                    />
                    {console.log(
                      selectedService,
                      selectedService?.length,
                      "selectedService-->"
                    )}
                    <label
                      className="form-check-label text-info bold px-2"
                      htmlFor={"selectedServices"}
                    >
                      Services
                    </label>
                    <p className="m-0 px-2">
                      {titles?.map((title, index) => (
                        <span key={index} className={index !== 0 && ""}>
                          {title}
                          {index < titles.length - 1 && <br />}{" "}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
                <hr className="m-0" />
              </div>
              <div className="m-0 px-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    className="form-check text-start py-3"
                    style={{ width: "80%" }}
                  >
                    <input
                      className="form-check-input mt-2 me-0"
                      type="checkbox"
                      id={"Contact"}
                      checked
                      disabled={selectedService?.length === 0}
                    />
                    {console.log(
                      selectedService,
                      selectedService?.length,
                      "selectedService-->"
                    )}
                    <label
                      className="form-check-label text-info bold px-2"
                      htmlFor={"Contact"}
                    >
                      Contact
                    </label>
                    <p>
                      <p className="m-0 px-2" style={{ textTransform: "none" }}>
                        {formData?.firstName && formData?.firstName}
                        <br />
                        {formData?.lastName && (
                          <>
                            <span
                              className=""
                              style={{ textTransform: "none" }}
                            >
                              {formData?.lastName}
                            </span>
                            <br />
                          </>
                        )}
                        {formData?.number && (
                          <>
                            <span
                              className=""
                              style={{ textTransform: "none" }}
                            >
                              {formData?.number}
                            </span>
                            <br />
                          </>
                        )}
                        {formData?.email && (
                          <>
                            <span
                              className=""
                              style={{ textTransform: "none" }}
                            >
                              {formData?.email && formData?.email}
                            </span>
                            <br />
                          </>
                        )}
                        {console.log(selectedOption, "eee")}
                        {selectedOption && (
                          <>
                            <span
                              className=""
                              style={{ textTransform: "none" }}
                            >
                              {selectedOption === "cod"
                                ? "Cash On Devlivery"
                                : "Credit Card Payment Method"}
                            </span>
                            <br />
                          </>
                        )}
                        {console.log(selectedOptionCode, "code")}
                        {selectedOptionCode && (
                          <span className="" style={{ textTransform: "none" }}>
                            {selectedOptionCode == "whatsapp"
                              ? "Whatsapp Otp Verification"
                              : "Sms Otp Verification"}
                          </span>
                        )}
                      </p>
                    </p>
                  </div>
                  <div
                    className={`edit-icons1 ${
                      isDisabledsecond ? "disabled101" : ""
                    }`}
                    onClick={
                      isDisabledsecond
                        ? undefined
                        : () => {
                            setCurrentStep(2);
                            // window.scrollTo({ top: 0, behavior: "smooth" });
                            // Add slight delay to ensure state updates complete before scrolling
                            setTimeout(() => {
                              // Scroll window to top
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });

                              // Scroll .mapcontent to top
                              const mapContent =
                                document.querySelector(".mapcontent");
                              if (mapContent) {
                                mapContent.scrollTo({
                                  top: 0,
                                  behavior: "smooth",
                                });
                              }
                            }, 50); // 50ms delay ensures smooth transition
                          }
                    }
                  >
                    <i className="fas fa-edit mr-2"></i>
                    <span>Edit</span>
                    {console.log(newAddressName, "newAddressName--->")}
                  </div>
                </div>
                {/* <hr className="m-0" /> */}
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          size="sm"
          id="mapModal"
          aria-labelledby="contained-modal-title-vcenter"
          centered // This property helps center the modal on the screen
        >
          <Modal.Header
            closeButton
            className="text-white"
            onClick={() => {
              setShowConfirm(false);
              setShowForm(false);
            }}
          >
            <Modal.Title className="fw-bold">Your location</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ height: "100%", width: "640px" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                padding: "7%",
                height: 480,
                overflow: "auto",
              }}
              id="mobilemap2"
            >
              {showConfirm && (
                <div
                  className=" position-relative mb-2"
                  style={{ cursor: "pointer" }}
                >
                  <input
                    ref={inputRefCallbackSecond}
                    defaultValue={placeName?.formatted_address}
                    className="fontsame form-control rounded text-white floating-input"
                    placeholder=" " // Keep this space to ensure the label works correctly
                    onChange={(e) => {
                      setPlaceName(e.target.value); // Update state when input changes
                    }}
                  />
                  <label className="floating-label">
                    Search for address or building
                  </label>
                  {/* Close Icon */}
                  {(placeName !== "" || inputRef.current?.value !== "") && (
                    <ImCross
                      onClick={clearInput}
                      className="position-absolute top-50 cursor-pointer end-0 translate-middle-y me-4 border-0"
                    />
                  )}
                </div>
              )}
              <GoogleMap
                mapContainerStyle={containerOrderplaceStyle}
                center={position}
                zoom={18}
                options={{
                  zoomControl: true,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
              >
                <MarkerF
                  position={position}
                  draggable={true}
                  onDragEnd={handleMarkerDragEnd}
                  icon={customIcon} // Apply custom icon
                />
                {showBox && (
                  <div style={{ position: "absolute", width: "100%" }}>
                    <div className="boxmap1" style={{ position: "relative" }}>
                      <button
                        onClick={() => setShowBox(false)}
                        style={{
                          position: "absolute",
                          top: -10,
                          right: -7,
                          fontSize: 13,
                          background:
                            "linear-gradient(102.59deg, #1ea3fe 0%, #9afbce 100%), #1ea3fe ",
                          border: "none",
                          cursor: "pointer",
                          borderRadius: 20,
                          padding: "4px 12px 4px 12px",
                        }}
                      >
                        X
                      </button>
                      <p
                        className="boxmap1_p mb-0"
                        style={{
                          backgroundColor: "rgb(157 239 255)",
                          borderRadius: "50%",
                          justifyContent: "center",
                          display: "flex",
                          textAlign: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src="https://app.laundryheap.com/images/methods/outside.svg"
                          alt=""
                          style={{ width: 30 }} // Adjust width and height as needed
                        />
                      </p>
                      <p className="m-1 p-0">
                        Drag to move pin to exact location - this helps our
                        driver find you.
                      </p>
                    </div>
                  </div>
                )}
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    bottom: "20px",
                    left: 10,
                  }}
                >
                  <p
                    className=" mb-0"
                    onClick={() => setShowConfirm(true)}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "50%",
                      height: 60,
                      width: 60,
                      justifyContent: "center",
                      display: "flex",
                      textAlign: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src="https://icons.veryicon.com/png/o/commerce-shopping/small-icons-with-highlights/search-259.png"
                      alt=""
                      style={{ width: 30 }} // Adjust width and height as needed
                    />
                  </p>
                </div>
              </GoogleMap>
              <Button
                type="button"
                variant="info"
                onClick={() => {
                  handleClose();
                  setShowForm(true);
                  // Add slight delay to ensure state updates complete before scrolling
                  setTimeout(() => {
                    // Scroll window to top
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });

                    // Scroll .mapcontent to top
                    const mapContent = document.querySelector(".mapcontent");
                    if (mapContent) {
                      mapContent.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }
                  }, 50); // 50ms delay ensures smooth transition
                }}
                className="text-white w-100 py-4 mt-5"
              >
                Looks Good
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default OrderPageSection;

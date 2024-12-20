import React from "react";
import { useForm } from "react-hook-form";
import logo from "../assets/JSG_logo.png";
import css from "./formB.module.css";
import { remoteUrl } from "../api.config";
import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";

// Updated validation patterns
const validationPatterns = {
  numeric: {
    value: /^\d+$/,
    message: "Please enter only numbers",
  },
  alphabetsOnly: {
    value: /^[A-Za-z\s]*$/,
    message: "Please enter only alphabets",
  },
  mobile: {
    value: /^[+()0-9]*$/,
    message: "Please enter a valid phone number",
  },
};

// Required field indicator component
const RequiredField = () => (
  <span style={{ color: "red", marginLeft: "4px" }}>*</span>
);

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [previews, setPreviews] = useState({}); // State for multiple previews
  const [isSubmitted, setIsSubmitted] = useState(false); // State to control PDF button visibility
  const [isSubmitting, setIsSubmitting] = useState(false); // State for showing spinner
  const [isMobileUpdated, setIsMobileUpdated] = useState(false);
  // const onSubmit = data => {
  //   console.log('Form submitted with data:', data);
  //   alert("Form submitted successfully!");
  //   // You could also send this data to an API here
  // };
  const presidentMobile = watch("presidentMobile"); // Watch the value of presidentMobile
  const presidentWhatsapp = watch("presidentWhatsapp"); // Watch the value of presidentWhatsapp
  const immediateFormerPresidentMobile = watch(
    "immediateFormerPresidentMobile"
  ); // Watch the value of immediateFormerPresidentMobile
  const immediateFormerPresidentWhatsapp = watch(
    "immediateFormerPresidentWhatsapp"
  ); // Watch the value of immediateFormerPresidentWhatsapp
  const founderPresidentMobile = watch("founderPresidentMobile"); // Watch the value of founderPresidentMobile
  const founderPresidentWhatsapp = watch("founderPresidentWhatsapp"); // Watch the value of founderPresidentWhatsapp
  const nominatedFormerPresident1Mobile = watch(
    "nominatedFormerPresident1Mobile"
  ); // Watch the value of nominatedFormerPresident1Mobile
  const nominatedFormerPresident1Whatsapp = watch(
    "nominatedFormerPresident1Whatsapp"
  ); // Watch the value of nominatedFormerPresident1Whatsapp
  const nominatedFormerPresident2Mobile = watch(
    "nominatedFormerPresident2Mobile"
  ); // Watch the value of nominatedFormerPresident2Mobile
  const nominatedFormerPresident2Whatsapp = watch(
    "nominatedFormerPresident2Whatsapp"
  ); // Watch the value of nominatedFormerPresident2Whatsapp
  const nominatedFormerPresident3Mobile = watch(
    "nominatedFormerPresident3Mobile"
  ); // Watch the value of nominatedFormerPresident3Mobile
  const nominatedFormerPresident3Whatsapp = watch(
    "nominatedFormerPresident3Whatsapp"
  ); // Watch the value of nominatedFormerPresident3Whatsapp
  const vicePresidentMobile = watch("vicePresidentMobile"); // Watch the value of vicePresidentMobile
  const vicePresidentWhatsapp = watch("vicePresidentWhatsapp"); // Watch the value of vicePresidentWhatsapp
  const secretaryMobile = watch("secretaryMobile"); // Watch the value of secretaryMobile
  const secretaryWhatsapp = watch("secretaryWhatsapp"); // Watch the value of secretaryWhatsapp
  const jointSecretaryMobile = watch("jointSecretaryMobile"); // Watch the value of jointSecretaryMobile
  const jointSecretaryWhatsapp = watch("jointSecretaryWhatsapp"); // Watch the value of jointSecretaryWhatsapp
  const treasurerMobile = watch("treasurerMobile"); // Watch the value of treasurerMobile
  const treasurerWhatsapp = watch("treasurerWhatsapp"); // Watch the value of treasurerWhatsapp

  //For AutoFilling
  const [groupNo, setGroupNo] = useState(""); // For tracking the group number input
  const [groupDetails, setGroupDetails] = useState({
    groupName: "",
    region: "",
  });

  // State for managing suggestions and visibility
  const [regionSuggestions, setRegionSuggestions] = useState([]); // Holds suggestions for the region input
  const [groupNameSuggestions, setGroupNameSuggestions] = useState([]); // Holds suggestions for the group name input
  const [showRegionSuggestions, setShowRegionSuggestions] = useState(false); // Controls visibility of the region suggestions dropdown
  const [showGroupNameSuggestions, setShowGroupNameSuggestions] =
    useState(false); // Controls visibility of the group name suggestions dropdown

  // Watch the current region value (react-hook-form's watch)
  const currentRegion = watch("region"); // Tracks the selected region in real-time

  // Debounce utility function to limit the frequency of API calls
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout); // Clear any pending timeout
        func(...args); // Execute the function after the specified delay
      };
      clearTimeout(timeout); // Reset the timeout for consecutive calls
      timeout = setTimeout(later, wait); // Set a new timeout
    };
  };

  // Fetch suggestions for the region input
  const fetchRegionSuggestions = async (query) => {
    if (query.length < 2) {
      // Do not fetch suggestions for queries shorter than 2 characters
      setRegionSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        //`http://localhost:5000/api/suggestions?query=${query}&type=region`
        `https://gorabptxn1.execute-api.us-east-2.amazonaws.com/dev/suggestions?query=${query}&type=region`
      );
      const result = await response.json();

      console.log("REGION:", result);

      if (result.body.success) {
        setRegionSuggestions(result.body.data); // Populate suggestions list
        setShowRegionSuggestions(true); // Show the suggestions dropdown
      }
    } catch (error) {
      console.error("Error fetching region suggestions:", error);
    }
  };

  // Fetch suggestions for the group name input (filtered by selected region)
  const fetchGroupNameSuggestions = async (query) => {
    if (query.length < 2) {
      // Do not fetch suggestions for queries shorter than 2 characters
      setGroupNameSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        // `http://localhost:5000/api/suggestions?query=${query}&type=groupName&region=${encodeURIComponent(
        //   currentRegion || ""
        // )}`
        `https://gorabptxn1.execute-api.us-east-2.amazonaws.com/dev/suggestions?query=${query}&type=groupName&region=${encodeURIComponent(
          currentRegion || ""
        )}`
      );
      const result = await response.json();

      console.log("GROUPNAME:", result);

      if (result.body.success) {
        setGroupNameSuggestions(result.body.data); // Populate suggestions list
        setShowGroupNameSuggestions(true); // Show the suggestions dropdown
      }
    } catch (error) {
      console.error("Error fetching group name suggestions:", error);
    }
  };

  // Create debounced versions of the suggestion fetch functions
  const debouncedFetchRegionSuggestions = useCallback(
    debounce(fetchRegionSuggestions, 300), // Debounce with a delay of 300ms
    []
  );

  const debouncedFetchGroupNameSuggestions = useCallback(
    debounce(fetchGroupNameSuggestions, 300), // Debounce with a delay of 300ms
    [currentRegion] // Dependency to refresh when the region changes
  );

  // Fetch group details when a group number is selected or input
  const fetchGroupDetails = async (groupNo) => {
    try {
      const response = await fetch(
        //`http://localhost:5000/api/groups/${String(groupNo)}`
        `https://gorabptxn1.execute-api.us-east-2.amazonaws.com/dev/groups/${String(
          groupNo
        )}`
      );
      const result = await response.json();

      console.log("RESULT:", result);

      if (response.ok && result.body.success) {
        // Populate form fields with the fetched group details
        setValue("region", result.body.data.region || "");
        setValue("groupName", result.body.data.groupName || "");
        setValue("groupNo", String(result.body.data.groupNo || groupNo)); // Explicitly set group number
        setGroupDetails({
          groupName: result.body.data.groupName || "",
          region: result.body.data.region || "",
        });
      } else {
        // Clear the form fields if no group details are found
        setValue("region", "");
        setValue("groupName", "");
        setValue("groupNo", "");
        setGroupDetails({ groupName: "", region: "" });
      }
    } catch (error) {
      console.error("Error fetching group details:", error);
    }
  };

  // Handle region input changes
  const handleRegionInputChange = (e) => {
    const value = e.target.value;
    setValue("region", value); // Update the form value for region

    // Reset group name when region changes
    setValue("groupName", "");
    setGroupNameSuggestions([]);
    setShowGroupNameSuggestions(false);

    // Fetch suggestions for the updated region input
    debouncedFetchRegionSuggestions(value);
  };

  // Handle group name input changes
  const handleGroupNameInputChange = (e) => {
    const value = e.target.value;

    if (currentRegion) {
      // Fetch group name suggestions only if a region is selected
      setValue("groupName", value);
      debouncedFetchGroupNameSuggestions(value);
    } else {
      // Alert the user to select a region before typing a group name
      alert("Please select a region first");
      e.target.value = ""; // Clear the input
    }
  };

  // Handle the selection of a region suggestion
  const selectRegionSuggestion = (region) => {
    setValue("region", region); // Update the form value for region
    setShowRegionSuggestions(false); // Hide the suggestions dropdown

    // Reset group name and suggestions when a region is selected
    setValue("groupName", "");
    setGroupNameSuggestions([]);
  };

  // Handle the selection of a group name suggestion
  const selectGroupNameSuggestion = (suggestion) => {
    setValue("groupName", suggestion.groupName); // Update the form value for group name
    const groupNoString = String(suggestion.groupNo);
    setValue("groupNo", groupNoString); // Update the form value for group number
    setGroupNo(groupNoString);
    fetchGroupDetails(groupNoString); // Fetch and populate group details
    setShowGroupNameSuggestions(false); // Hide the suggestions dropdown
  };

  // Handle changes to the group number input
  const handleGroupNoChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numeric values
    setGroupNo(value);
    fetchGroupDetails(value); // Fetch and populate group details
  };

  // Close suggestions dropdown when clicking outside the input fields
  const regionInputRef = useRef(null); // Ref for the region input field
  const groupNameInputRef = useRef(null); // Ref for the group name input field

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        regionInputRef.current &&
        !regionInputRef.current.contains(event.target)
      ) {
        setShowRegionSuggestions(false); // Close region suggestions
      }

      if (
        groupNameInputRef.current &&
        !groupNameInputRef.current.contains(event.target)
      ) {
        setShowGroupNameSuggestions(false); // Close group name suggestions
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Add click listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup listener
    };
  }, []); // Run once on component mount

  useEffect(() => {
    // Check if presidentMobile is empty and presidentWhatsapp is a valid phone number
    if (
      !presidentMobile &&
      presidentWhatsapp &&
      presidentWhatsapp.length === 10 &&
      !isMobileUpdated
    ) {
      setValue("presidentMobile", presidentWhatsapp); // Set presidentMobile to presidentWhatsapp if valid
    }
  }, [presidentWhatsapp, presidentMobile, setValue]);

  useEffect(() => {
    // Check if immediateFormerPresidentMobile is empty and immediateFormerPresidentWhatsapp is a valid phone number
    if (
      !immediateFormerPresidentMobile &&
      immediateFormerPresidentWhatsapp &&
      immediateFormerPresidentWhatsapp.length === 10 &&
      !isMobileUpdated
    ) {
      setValue(
        "immediateFormerPresidentMobile",
        immediateFormerPresidentWhatsapp
      ); // Set immediateFormerPresidentMobile to immediateFormerPresidentWhatsapp if valid
    }
  }, [
    immediateFormerPresidentWhatsapp,
    immediateFormerPresidentMobile,
    setValue,
  ]);

  useEffect(() => {
    // Check if founderPresidentMobile is empty and founderPresidentWhatsapp is a valid phone number
    if (
      !founderPresidentMobile &&
      founderPresidentWhatsapp &&
      founderPresidentWhatsapp.length === 10 &&
      !isMobileUpdated
    ) {
      setValue("founderPresidentMobile", founderPresidentWhatsapp); // Set founderPresidentMobile to founderPresidentWhatsapp if valid
    }
  }, [founderPresidentWhatsapp, founderPresidentMobile, setValue]);

  useEffect(() => {
    // Check if nominatedFormerPresident1Mobile is empty and nominatedFormerPresident1Whatsapp is a valid phone number
    if (
      !nominatedFormerPresident1Mobile &&
      nominatedFormerPresident1Whatsapp &&
      nominatedFormerPresident1Whatsapp.length === 10 &&
      !isMobileUpdated
    ) {
      setValue(
        "nominatedFormerPresident1Mobile",
        nominatedFormerPresident1Whatsapp
      ); // Set nominatedFormerPresident1Mobile to nominatedFormerPresident1Whatsapp if valid
    }
  }, [
    nominatedFormerPresident1Whatsapp,
    nominatedFormerPresident1Mobile,
    setValue,
  ]);

  useEffect(() => {
    // Check if nominatedFormerPresident2Mobile is empty and nominatedFormerPresident2Whatsapp is a valid phone number
    if (
      !nominatedFormerPresident2Mobile &&
      nominatedFormerPresident2Whatsapp &&
      nominatedFormerPresident2Whatsapp.length === 10 &&
      !isMobileUpdated
    ) {
      setValue(
        "nominatedFormerPresident2Mobile",
        nominatedFormerPresident2Whatsapp
      ); // Set nominatedFormerPresident2Mobile to nominatedFormerPresident2Whatsapp if valid
    }
  }, [
    nominatedFormerPresident2Whatsapp,
    nominatedFormerPresident2Mobile,
    setValue,
  ]);

  useEffect(() => {
    // Check if nominatedFormerPresident3Mobile is empty and nominatedFormerPresident3Whatsapp is a valid phone number
    if (
      !nominatedFormerPresident3Mobile &&
      nominatedFormerPresident3Whatsapp &&
      nominatedFormerPresident3Whatsapp.length === 10 &&
      !isMobileUpdated
    ) {
      setValue(
        "nominatedFormerPresident3Mobile",
        nominatedFormerPresident3Whatsapp
      ); // Set nominatedFormerPresident3Mobile to nominatedFormerPresident3Whatsapp if valid
    }
  }, [
    nominatedFormerPresident3Whatsapp,
    nominatedFormerPresident3Mobile,
    setValue,
  ]);

  useEffect(() => {
    // Check if vicePresidentMobile is empty and vicePresidentWhatsapp is a valid phone number
    if (
      !vicePresidentMobile &&
      vicePresidentWhatsapp &&
      vicePresidentWhatsapp.length === 10 &&
      !isMobileUpdated
    ) {
      setValue("vicePresidentMobile", vicePresidentWhatsapp); // Set vicePresidentMobile to vicePresidentWhatsapp if valid
    }
  }, [vicePresidentWhatsapp, vicePresidentMobile, setValue]);

  useEffect(() => {
    // Check if secretaryMobile is empty and secretaryWhatsapp is a valid phone number
    if (
      !secretaryMobile &&
      secretaryWhatsapp &&
      secretaryWhatsapp.length === 10 &&
      !isMobileUpdated
    ) {
      setValue("secretaryMobile", secretaryWhatsapp); // Set secretaryMobile to secretaryWhatsapp if valid
    }
  }, [secretaryWhatsapp, secretaryMobile, setValue]);

  useEffect(() => {
    // Check if jointSecretaryMobile is empty and jointSecretaryWhatsapp is a valid phone number
    if (
      !jointSecretaryMobile &&
      jointSecretaryWhatsapp &&
      jointSecretaryWhatsapp.length === 10 &&
      !isMobileUpdated
    ) {
      setValue("jointSecretaryMobile", jointSecretaryWhatsapp); // Set jointSecretaryMobile to jointSecretaryWhatsapp if valid
    }
  }, [jointSecretaryWhatsapp, jointSecretaryMobile, setValue]);

  useEffect(() => {
    // Check if treasurerMobile is empty and treasurerWhatsapp is a valid phone number
    if (
      !treasurerMobile &&
      treasurerWhatsapp &&
      treasurerWhatsapp.length === 10 &&
      !isMobileUpdated
    ) {
      setValue("treasurerMobile", treasurerWhatsapp); // Set treasurerMobile to treasurerWhatsapp if valid
    }
  }, [treasurerWhatsapp, treasurerMobile, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Iterate over the object and append fields
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key] instanceof FileList) {
            // Handle FileList (multiple files)
            Array.from(data[key]).forEach((file) => {
              formData.append(key, file);
            });
          } else {
            // Handle other fields
            formData.append(key, data[key]);
          }
        }
      }

      // Debugging: Check the content of the FormData
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      // Send the FormData using Axios
      const response = await axios.post(
        `https://gorabptxn1.execute-api.us-east-2.amazonaws.com/dev/forums`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsSubmitting(true); // Show the spinner
      console.log("Response:", response.data);

      alert("Form submitted successfully!");
      setIsSubmitted(true); // Show the "Download as PDF" button
      setIsSubmitting(false); // Hide the spinner
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  console.log(errors);

  const handleNumericInput = (e) => {
    // Allow only numeric input (prevent non-numeric characters)
    e.target.value = e.target.value.replace(!/^[+()0-9]*$/, "");
  };

  const handlePresidentMobile = (e) => {
    setIsMobileUpdated(true);
  };

  const handleImmediateFormerPresidentMobile = (e) => {
    setIsMobileUpdated(true);
  };

  const handleFounderPresidentMobile = (e) => {
    setIsMobileUpdated(true);
  };

  const handleNominatedFormerPresident1Mobile = (e) => {
    setIsMobileUpdated(true);
  };

  const handleNominatedFormerPresident2Mobile = (e) => {
    setIsMobileUpdated(true);
  };

  const handleNominatedFormerPresident3Mobile = (e) => {
    setIsMobileUpdated(true);
  };

  const handleVicePresidentMobile = (e) => {
    setIsMobileUpdated(true);
  };

  const handleSecretaryMobile = (e) => {
    setIsMobileUpdated(true);
  };

  const handleJointSecretaryMobile = (e) => {
    setIsMobileUpdated(true);
  };

  const handleTreasurerMobile = (e) => {
    setIsMobileUpdated(true);
  };

  //Preview Image
  const handleFileChange = (event, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviews((prev) => ({
          ...prev,
          [fieldName]: reader.result, // Update preview for the specific field
        }));
      };
    }
  };

  // Function to handle alphabets-only input
  const handleAlphabetsOnly = (e) => {
    if (
      !/^[A-Za-z\s]*$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight"
    ) {
      e.preventDefault();
    }
  };

  // Function to handle mobile number input
  const handleMobileInput = (e) => {
    const value = e.target.value;
    // Allow only if the total length is less than 15 or if deleting
    if (value.length >= 15 && e.key !== "Backspace" && e.key !== "Delete") {
      e.preventDefault();
    }
    // Allow only numbers, +, and parentheses
    if (
      !/^[+()0-9]*$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight"
    ) {
      e.preventDefault();
    }
  };

  // Custom register function with input restrictions
  const registerField = (fieldName, options = {}) => {
    const baseRules = register(fieldName, options);

    if (options.alphabetsOnly) {
      return {
        ...baseRules,
        onKeyDown: handleAlphabetsOnly,
      };
    }

    if (options.isMobile) {
      return {
        ...baseRules,
        onKeyDown: handleMobileInput,
        onChange: (e) => {
          if (e.target.value.length > 15) {
            e.target.value = e.target.value.slice(0, 15);
          }
        },
      };
    }

    return baseRules;
  };

  //PDF
  const componentRef = useRef();

  const handlePrint = async () => {
    window.print();
  };

  return (
    <div className={css["form-container"]}>
      {/* Header Section */}
      <div className={css["header-section"]}>
        <img
          src={logo} // Replace with the logo URL
          alt="Logo"
          className={css.logo}
        />

        <div className={css["header-details"]}>
          <h1>JAIN SOCIAL GROUPS INT. FEDERATION</h1>
          <p>
            4-O/P, Vijay Chambers, Opp. Dreamland Cinema, Tribhuvan Road, Mumbai
            - 400 004
            <br />
            Tel.: 022-35302861 Mobile: 8169274400 E-mail: office@jsgif.co.in{" "}
            <a href="https://jsgif.co.in">www.jsgif.co.in</a>
          </p>
        </div>
        <h1 className={css["form-title"]}>Form "B"</h1>
      </div>

      {/* Form Section */}
      <div
        ref={componentRef}
        style={{ padding: "20px", background: "#3f0986", height: "auto" }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={css["scrolling-form"]}
        >
          {/* General Info Section */}
          <div className={css["form-section"]}>
            <h3>General Info </h3>

            {/* Group Number Input */}
            <div className={css["form-group"]}>
              <h5 htmlFor="groupNo" className={css["input-label"]}>
                Group Number
                <RequiredField />
              </h5>
              <input
                id="groupNo"
                type="text"
                value={groupNo}
                placeholder="Enter group number"
                className={css["input-field"]}
                {...register("groupNo", {
                  required: "Group No is required",
                  pattern: validationPatterns.numeric,
                })}
                onChange={handleGroupNoChange}
              />
              {errors.groupNo && (
                <p className={css.error}>{errors.groupNo.message}</p>
              )}
            </div>

            {/* Region Input with Enhanced Autocomplete */}
            <div className={css["form-group"]} ref={regionInputRef}>
              <h5 htmlFor="region" className={css["input-label"]}>
                Region
                <RequiredField />
              </h5>
              <input
                id="region"
                type="text"
                placeholder="Search for a region"
                className={css["input-field"]}
                {...register("region", {
                  required: "Region is required",
                })}
                onChange={handleRegionInputChange}
                onFocus={() =>
                  regionSuggestions.length > 0 && setShowRegionSuggestions(true)
                }
              />
              {errors.region && (
                <p className={css.error}>{errors.region.message}</p>
              )}

              {/* Region Suggestions Dropdown */}
              {showRegionSuggestions && regionSuggestions.length > 0 && (
                <ul className={css["suggestions-dropdown"]}>
                  {regionSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => selectRegionSuggestion(suggestion.region)}
                      className={css["suggestion-item"]}
                    >
                      {suggestion.region}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Group Name Input with Enhanced Autocomplete */}
            <div className={css["form-group"]} ref={groupNameInputRef}>
              <h5 htmlFor="groupName" className={css["input-label"]}>
                Group Name
                <RequiredField />
              </h5>
              <input
                id="groupName"
                type="text"
                placeholder={
                  currentRegion
                    ? `Search for a group in ${currentRegion}`
                    : "Select Region First"
                }
                className={css["input-field"]}
                {...register("groupName", {
                  required: "Group Name is required",
                })}
                onChange={handleGroupNameInputChange}
                onFocus={() =>
                  groupNameSuggestions.length > 0 &&
                  setShowGroupNameSuggestions(true)
                }
                disabled={!currentRegion}
              />
              {errors.groupName && (
                <p className={css.error}>{errors.groupName.message}</p>
              )}

              {/* Group Name Suggestions Dropdown */}
              {showGroupNameSuggestions && groupNameSuggestions.length > 0 && (
                <ul className={css["suggestions-dropdown"]}>
                  {groupNameSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => selectGroupNameSuggestion(suggestion)}
                      className={css["suggestion-item"]}
                    >
                      {suggestion.groupName}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Name of the Sponsoring Group</h5>
              <input
                type="text"
                placeholder="Name of the Sponsoring Group"
                {...register("sponsoringGroup", {})}
              />
              {errors.sponsoringGroup && (
                <span className={css.error}>
                  {errors.sponsoringGroup.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Date of Inaugration</h5>
              <input
                type="date"
                placeholder="Date of Inaugration"
                {...register("dateOfInaugration", {})}
              />
              {errors.dateOfInaugration && (
                <span className={css.error}>
                  {errors.dateOfInaugration.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Date of Charter</h5>
              <input
                type="date"
                placeholder="Date of Charter"
                {...register("dateOfCharter", {})}
              />
              {errors.dateOfCharter && (
                <span className={css.error}>
                  {errors.dateOfCharter.message}
                </span>
              )}
            </div>

            <div className={css["form-group full-row"]}>
              <h5>
                Correspondence Address <RequiredField />
              </h5>
              <textarea
                type="text"
                placeholder="Address"
                {...register("address", {
                  required: "Group Address is required",
                })}
              />
              {errors.address && (
                <span className={css.error}>{errors.address.message}</span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Pin Code</h5>
              <input
                type="text"
                placeholder="Pin Code"
                {...register("pinCode", {
                  //required: "Pin Code is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.pinCode && (
                <span className={css.error}>{errors.pinCode.message}</span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Phone (with STD)</h5>
              <input
                type="text"
                placeholder="Phone (with STD)"
                {...register("phone", {
                  //required: "Mobile number is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.phone && (
                <span className={css.error}>{errors.phone.message}</span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                Mobile <RequiredField />
              </h5>
              <input
                type="text"
                placeholder="Mobile"
                {...register("mobile", {
                  required: "Mobile number is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.mobile && (
                <span className={css.error}>{errors.mobile.message}</span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>E-Mail ID</h5>
              <input
                type="email"
                placeholder="E-Mail"
                {...register("email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className={css.error}>{errors.email.message}</span>
              )}
            </div>
          </div>

          {/*Comittee Member Details */}
          <div className={css["form-section"]}>
            <h3>
              Details of General Council Members and Managing Committee Members
              for 2025 - 2027
            </h3>

            <div className={css["form-group"]}>
              <h5>
                General Meeting for Election of our Forum was held on Date
              </h5>
              <input
                type="date"
                {...register("general-meet", { required: false })}
              />
            </div>

            <div className={css["form-group"]}>
              <h5>
                Following Office Bearers of our Forum were elected on Date
              </h5>
              <input
                type="date"
                {...register("elected-bearers", { required: false })}
              />
            </div>
          </div>

          {/*President */}
          <div className={css["form-section"]}>
            <h3>
              (1) President <RequiredField />
            </h3>

            <div className={css["form-group"]}>
              <h5>
                Name <RequiredField />
              </h5>
              <input
                type="text"
                placeholder="Name"
                {...register("presidentName", {
                  required: "President Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.presidentName && (
                <span className={css.error}>
                  {errors.presidentName.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                Passport Size Photo <RequiredField />
              </h5>
              <input
                type="file"
                accept="image/*"
                {...register("presidentPhoto", {
                  required: "President Photo is required",
                })}
                onChange={(e) => handleFileChange(e, "presidentPhoto")} // Unique field name
              />
              {errors.presidentPhoto && (
                <span className={css.error}>
                  {errors.presidentPhoto.message}
                </span>
              )}
            </div>

            {/* Image Preview for President */}
            {previews.presidentPhoto && (
              <div className={css["mt-3"]}>
                <p>Image Preview (President):</p>
                <img
                  src={previews.presidentPhoto}
                  alt="President preview"
                  className={css["img-thumbnail"]}
                  style={{ maxWidth: "200px" }}
                />
              </div>
            )}

            <div className={css["form-group full-row"]}>
              <h5>
                Correspondence Address <RequiredField />
              </h5>
              <textarea
                type="text"
                placeholder="Address"
                {...register("presidentAddress", {
                  required: "Address is required",
                })}
              />
              {errors.presidentAddress && (
                <span className={css.error}>
                  {errors.presidentAddress.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Pin Code</h5>
              <input
                type="text"
                placeholder="Pin Code"
                {...register("presidentPinCode", {
                  //required: "Pin Code is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.presidentPinCode && (
                <span className={css.error}>
                  {errors.presidentPinCode.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Phone (with STD)</h5>
              <input
                type="text"
                placeholder="Phone (with STD)"
                {...register("presidentPhone", {
                  //required: "Phone (with STD) is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.presidentPhone && (
                <span className={css.error}>
                  {errors.presidentPhone.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                Whatsapp/Mobile No.
                <RequiredField />
              </h5>
              <input
                type="text"
                placeholder="Whatsapp/Mobile No."
                {...register("presidentWhatsapp", {
                  required: "Whatsapp/Mobile No. is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.presidentWhatsapp && (
                <span className={css.error}>
                  {errors.presidentWhatsapp.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Addtional Mobile No.</h5>
              <input
                type="text"
                placeholder="Mobile"
                {...register("presidentMobile", {
                  //required: "Addtional Mobile is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
                onChange={handlePresidentMobile}
              />
              {errors.presidentMobile && (
                <span className={css.error}>
                  {errors.presidentMobile.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>E-Mail ID</h5>
              <input
                type="email"
                placeholder="E-Mail"
                {...register("presidentEmail", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.presidentEmail && (
                <span className={css.error}>
                  {errors.presidentEmail.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Occupation Details</h5>
              <input
                type="text"
                placeholder="Occupation"
                {...register("presidentOccupation", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.presidentOccupation && (
                <span className={css.error}>
                  {errors.presidentOccupation.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Spouse's Name</h5>
              <input
                type="text"
                placeholder="Spouse's Name"
                {...register("presidentSpouseName", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.presidentSpouseName && (
                <span className={css.error}>
                  {errors.presidentSpouseName.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                President's Birth Date <RequiredField />
              </h5>
              <input
                type="date"
                {...register("presidentBirthDate", {
                  required: "Birth Date is required",
                  validate: (value) => {
                    const date = new Date(value);
                    const now = new Date();
                    return date < now || "Birth date cannot be in the future";
                  },
                })}
              />
              {errors.presidentBirthDate && (
                <span className={css.error}>
                  {errors.presidentBirthDate.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Spouse's Birth Date</h5>
              <input
                type="date"
                {...register("presidentSpouseBirthDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return date < now || "Birth date cannot be in the future";
                  },
                })}
              />
              {errors.presidentSpouseBirthDate && (
                <span className={css.error}>
                  {errors.presidentSpouseBirthDate.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Marriage Date</h5>
              <input
                type="date"
                {...register("presidentMarriageDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return (
                      date < now || "Marriage date cannot be in the future"
                    );
                  },
                })}
              />
              {errors.presidentMarriageDate && (
                <span className={css.error}>
                  {errors.presidentMarriageDate.message}
                </span>
              )}
            </div>
          </div>

          {/*Immediate Former President */}
          <div className={css["form-section"]}>
            <h3>(2) Immediate Former President</h3>

            <div className={css["form-group"]}>
              <h5>Name</h5>
              <input
                type="text"
                placeholder="Name"
                {...register("immediateFormerPresidentName", {
                  //required: "Immediate Former President Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.immediateFormerPresidentName && (
                <span className={css.error}>
                  {errors.immediateFormerPresidentName.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Passport Size Photo</h5>
              <input
                type="file"
                accept="image/*"
                {...register("immediateFormerPresidentPhoto", {})}
                onChange={(e) =>
                  handleFileChange(e, "immediateFormerPresidentPhoto")
                } // Unique field name
              />
              {errors.immediateFormerPresidentPhoto && (
                <span className={css.error}>
                  {errors.immediateFormerPresidentPhoto.message}
                </span>
              )}
            </div>

            {/* Image Preview for Immediate Former President */}
            {previews.immediateFormerPresidentPhoto && (
              <div className={css["mt-3"]}>
                <p>Image Preview (Immediate Former President):</p>
                <img
                  src={previews.immediateFormerPresidentPhoto}
                  alt="Secretary preview"
                  className={css["img-thumbnail"]}
                  style={{ maxWidth: "200px" }}
                />
              </div>
            )}

            <div className={css["form-group full-row"]}>
              <h5>Correspondence Address</h5>
              <textarea
                type="text"
                placeholder="Address"
                {...register("immediateFormerPresidentAddress", {})}
              />
              {errors.immediateFormerPresidentAddress && (
                <span className={css.error}>
                  {errors.immediateFormerPresidentAddress.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Pin Code</h5>
              <input
                type="text"
                placeholder="Pin Code"
                {...register("immediateFormerPresidentPinCode", {
                  //required: "Pin Code is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.immediateFormerPresidentPinCode && (
                <span className={css.error}>
                  {errors.immediateFormerPresidentPinCode.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Phone (with STD)</h5>
              <input
                type="text"
                placeholder="Phone (with STD)"
                {...register("immediateFormerPresidentPhone", {
                  //required: "Phone (with STD) is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.immediateFormerPresidentPhone && (
                <span className={css.error}>
                  {errors.immediateFormerPresidentPhone.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Whatsapp/Mobile No.</h5>
              <input
                type="text"
                placeholder="Whatsapp/Mobile No."
                {...register("immediateFormerPresidentWhatsapp", {
                  //required: "Whatsapp/Mobile No. is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.immediateFormerPresidentWhatsapp && (
                <span className={css.error}>
                  {errors.immediateFormerPresidentWhatsapp.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Addtional Mobile No.</h5>
              <input
                type="text"
                placeholder="Mobile"
                {...register("immediateFormerPresidentMobile", {
                  //required: "Addtional Mobile is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
                onChange={handleImmediateFormerPresidentMobile}
              />
              {errors.immediateFormerPresidentMobile && (
                <span className={css.error}>
                  {errors.immediateFormerPresidentMobile.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>E-Mail ID</h5>
              <input
                type="email"
                placeholder="E-Mail"
                {...register("immediateFormerPresidentEmail", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.immediateFormerPresidentEmail && (
                <span className={css.error}>
                  {errors.immediateFormerPresidentEmail.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Occupation Details</h5>
              <input
                type="text"
                placeholder="Occupation"
                {...register("immediateFormerPresidentOccupation", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.immediateFormerPresidentOccupation && (
                <span className={css.error}>
                  {errors.immediateFormerPresidentOccupation.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Spouse's Name</h5>
              <input
                type="text"
                placeholder="Spouse's Name"
                {...register("immediateFormerPresidentSpouseName", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.immediateFormerPresidentSpouseName && (
                <span className={css.error}>
                  {errors.immediateFormerPresidentSpouseName.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Immediate Former President's Birth Date</h5>
              <input
                type="date"
                {...register("immediateFormerPresidentBirthDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return date < now || "Birth date cannot be in the future";
                  },
                })}
              />
              {errors.immediateFormerPresidentBirthDate && (
                <span className={css.error}>
                  {errors.immediateFormerPresidentBirthDate.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Spouse's Birth Date</h5>
              <input
                type="date"
                {...register("immediateFormerPresidentSpouseBirthDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return date < now || "Birth date cannot be in the future";
                  },
                })}
              />
              {errors.immediateFormerPresidentSpouseBirthDate && (
                <span className={css.error}>
                  {errors.immediateFormerPresidentSpouseBirthDate.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Marriage Date</h5>
              <input
                type="date"
                {...register("immediateFormerPresidentMarriageDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return (
                      date < now || "Marriage date cannot be in the future"
                    );
                  },
                })}
              />
              {errors.immediateFormerPresidentMarriageDate && (
                <span className={css.error}>
                  {errors.immediateFormerPresidentMarriageDate.message}
                </span>
              )}
            </div>
          </div>

          {/*Founder President */}
          <div className={css["form-section"]}>
            <h3>
              (3) Founder President <RequiredField />
            </h3>

            <div className={css["form-group"]}>
              <h5>
                Name <RequiredField />
              </h5>
              <input
                type="text"
                placeholder="Name"
                {...register("founderPresidentName", {
                  required: "Founder President Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.founderPresidentName && (
                <span className={css.error}>
                  {errors.founderPresidentName.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                Passport Size Photo <RequiredField />
              </h5>
              <input
                type="file"
                accept="image/*"
                {...register("founderPresidentPhoto", {})}
                onChange={(e) => handleFileChange(e, "founderPresidentPhoto")} // Unique field name
              />
              {errors.founderPresidentPhoto && (
                <span className={css.error}>
                  {errors.founderPresidentPhoto.message}
                </span>
              )}
            </div>
            {/* Image Preview for Founder President */}
            {previews.founderPresidentPhoto && (
              <div className={css["mt-3"]}>
                <p>Image Preview (Founder President):</p>
                <img
                  src={previews.founderPresidentPhoto}
                  alt="Founder President preview"
                  className={css["img-thumbnail"]}
                  style={{ maxWidth: "200px" }}
                />
              </div>
            )}

            <div className={css["form-group full-row"]}>
              <h5>
                Correspondence Address <RequiredField />
              </h5>
              <textarea
                type="text"
                placeholder="Address"
                {...register("founderPresidentAddress", {
                  required: "Address is required",
                })}
              />
              {errors.founderPresidentAddress && (
                <span className={css.error}>
                  {errors.founderPresidentAddress.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Pin Code</h5>
              <input
                type="text"
                placeholder="Pin Code"
                {...register("founderPresidentPinCode", {
                  //required: "Pin Code is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.founderPresidentPinCode && (
                <span className={css.error}>
                  {errors.founderPresidentPinCode.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Phone (with STD)</h5>
              <input
                type="text"
                placeholder="Phone (with STD)"
                {...register("founderPresidentPhone", {
                  //required: "Phone (with STD) is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.founderPresidentPhone && (
                <span className={css.error}>
                  {errors.founderPresidentPhone.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                Whatsapp/Mobile No.
                <RequiredField />
              </h5>
              <input
                type="text"
                placeholder="Whatsapp/Mobile No."
                {...register("founderPresidentWhatsapp", {
                  required: "Whatsapp/Mobile No. is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.founderPresidentWhatsapp && (
                <span className={css.error}>
                  {errors.founderPresidentWhatsapp.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Mobile</h5>
              <input
                type="text"
                placeholder="Mobile"
                {...register("founderPresidentMobile", {
                  //required: "Addtional Mobile is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
                onChange={handleFounderPresidentMobile}
              />
              {errors.founderPresidentMobile && (
                <span className={css.error}>
                  {errors.founderPresidentMobile.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>E-Mail ID</h5>
              <input
                type="email"
                placeholder="E-Mail"
                {...register("founderPresidentEmail", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.founderPresidentEmail && (
                <span className={css.error}>
                  {errors.founderPresidentEmail.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Occupation Details</h5>
              <input
                type="text"
                placeholder="Occupation"
                {...register("founderPresidentOccupation", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.founderPresidentOccupation && (
                <span className={css.error}>
                  {errors.founderPresidentOccupation.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Spouse's Name</h5>
              <input
                type="text"
                placeholder="Spouse's Name"
                {...register("founderPresidentSpouseName", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.founderPresidentSpouseName && (
                <span className={css.error}>
                  {errors.founderPresidentSpouseName.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                Founder President's Birth Date
                <RequiredField />
              </h5>
              <input
                type="date"
                {...register("founderPresidentBirthDate", {
                  required: "Birth Date is required",
                  validate: (value) => {
                    const date = new Date(value);
                    const now = new Date();
                    return date < now || "Birth date cannot be in the future";
                  },
                })}
              />
              {errors.founderPresidentBirthDate && (
                <span className={css.error}>
                  {errors.founderPresidentBirthDate.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Spouse's Birth Date</h5>
              <input
                type="date"
                {...register("founderPresidentSpouseBirthDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return date < now || "Birth date cannot be in the future";
                  },
                })}
              />
              {errors.founderPresidentSpouseBirthDate && (
                <span className={css.error}>
                  {errors.founderPresidentSpouseBirthDate.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Marriage Date</h5>
              <input
                type="date"
                {...register("founderPresidentMarriageDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return (
                      date < now || "Marriage date cannot be in the future"
                    );
                  },
                })}
              />
              {errors.founderPresidentMarriageDate && (
                <span className={css.error}>
                  {errors.founderPresidentMarriageDate.message}
                </span>
              )}
            </div>
          </div>

          {/*Nominated Former President 1 */}
          <div className={css["form-section"]}>
            <h3>(5) Nominated Former President - 1</h3>

            <div className={css["form-group"]}>
              <h5>Name</h5>
              <input
                type="text"
                placeholder="Name"
                {...register("nominatedFormerPresident1Name", {
                  //required: "Nominated Former President 1 Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.nominatedFormerPresident1Name && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident1Name.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Passport Size Photo</h5>
              <input
                type="file"
                accept="image/*"
                {...register("nominatedFormerPresident1Photo", {})}
                onChange={(e) =>
                  handleFileChange(e, "nominatedFormerPresident1Photo")
                } // Unique field name
              />
              {errors.nominatedFormerPresident1Photo && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident1Photo.message}
                </span>
              )}
            </div>
            {/* Image Preview for Nominated Former President 1 */}
            {previews.nominatedFormerPresident1Photo && (
              <div className={css["mt-3"]}>
                <p>Image Preview (Nominated Former President 1):</p>
                <img
                  src={previews.nominatedFormerPresident1Photo}
                  alt="Nominated Former President 1 preview"
                  className={css["img-thumbnail"]}
                  style={{ maxWidth: "200px" }}
                />
              </div>
            )}

            <div className={css["form-group full-row"]}>
              <h5>Correspondence Address</h5>
              <textarea
                type="text"
                placeholder="Address"
                {...register("nominatedFormerPresident1Address", {})}
              />
              {errors.nominatedFormerPresident1Address && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident1Address.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Pin Code</h5>
              <input
                type="text"
                placeholder="Pin Code"
                {...register("nominatedFormerPresident1PinCode", {
                  //required: "Pin Code is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.nominatedFormerPresident1PinCode && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident1PinCode.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Phone (with STD)</h5>
              <input
                type="text"
                placeholder="Phone (with STD)"
                {...register("nominatedFormerPresident1Phone", {
                  //required: "Phone (with STD) is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.nominatedFormerPresident1Phone && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident1Phone.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Whatsapp/Mobile No.</h5>
              <input
                type="text"
                placeholder="Whatsapp/Mobile No."
                {...register("nominatedFormerPresident1Whatsapp", {
                  //required: "Whatsapp/Mobile No. is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.nominatedFormerPresident1Whatsapp && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident1Whatsapp.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Addtional Mobile No.</h5>
              <input
                type="text"
                placeholder="Mobile"
                {...register("nominatedFormerPresident1Mobile", {
                  //required: "Addtional Mobile is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
                onChange={handleNominatedFormerPresident1Mobile}
              />
              {errors.nominatedFormerPresident1Mobile && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident1Mobile.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>E-Mail ID</h5>
              <input
                type="email"
                placeholder="E-Mail"
                {...register("nominatedFormerPresident1Email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.nominatedFormerPresident1Email && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident1Email.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Occupation Details</h5>
              <input
                type="text"
                placeholder="Occupation"
                {...register("nominatedFormerPresident1Occupation", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.nominatedFormerPresident1Occupation && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident1Occupation.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Spouse's Name</h5>
              <input
                type="text"
                placeholder="Spouse's Name"
                {...register("nominatedFormerPresident1SpouseName", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.nominatedFormerPresident1SpouseName && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident1SpouseName.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Nominated Former President 1 's Birth Date</h5>
              <input
                type="date"
                {...register("nominatedFormerPresident1BirthDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return date < now || "Birth date cannot be in the future";
                  },
                })}
              />
              {errors.nominatedFormerPresident1BirthDate && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident1BirthDate.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Spouse's Birth Date</h5>
              <input
                type="date"
                {...register("nominatedFormerPresident1SpouseBirthDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return date < now || "Birth date cannot be in the future";
                  },
                })}
              />
              {errors.nominatedFormerPresident1SpouseBirthDate && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident1SpouseBirthDate.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Marriage Date</h5>
              <input
                type="date"
                {...register("nominatedFormerPresident1MarriageDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return (
                      date < now || "Marriage date cannot be in the future"
                    );
                  },
                })}
              />
              {errors.nominatedFormerPresident1MarriageDate && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident1MarriageDate.message}
                </span>
              )}
            </div>
          </div>

          {/*Nominated Former President 2 */}
          <div className={css["form-section"]}>
            <h3>(5) Nominated Former President - 2</h3>

            <div className={css["form-group"]}>
              <h5>Name</h5>
              <input
                type="text"
                placeholder="Name"
                {...register("nominatedFormerPresident2Name", {
                  //required: "Nominated Former President 2 Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.nominatedFormerPresident2Name && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident2Name.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Passport Size Photo</h5>
              <input
                type="file"
                accept="image/*"
                {...register("nominatedFormerPresident2Photo", {})}
                onChange={(e) =>
                  handleFileChange(e, "nominatedFormerPresident2Photo")
                } // Unique field name
              />
              {errors.nominatedFormerPresident2Photo && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident2Photo.message}
                </span>
              )}
            </div>
            {/* Image Preview for Nominated Former President 2 */}
            {previews.nominatedFormerPresident2Photo && (
              <div className={css["mt-3"]}>
                <p>Image Preview (Nominated Former President 2):</p>
                <img
                  src={previews.nominatedFormerPresident2Photo}
                  alt="Nominated Former President 2 preview"
                  className={css["img-thumbnail"]}
                  style={{ maxWidth: "200px" }}
                />
              </div>
            )}

            <div className={css["form-group full-row"]}>
              <h5>Correspondence Address</h5>
              <textarea
                type="text"
                placeholder="Address"
                {...register("nominatedFormerPresident2Address", {})}
              />
              {errors.nominatedFormerPresident2Address && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident2Address.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Pin Code</h5>
              <input
                type="text"
                placeholder="Pin Code"
                {...register("nominatedFormerPresident2PinCode", {
                  //required: "Pin Code is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.nominatedFormerPresident2PinCode && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident2PinCode.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Phone (with STD)</h5>
              <input
                type="text"
                placeholder="Phone (with STD)"
                {...register("nominatedFormerPresident2Phone", {
                  //required: "Phone (with STD) is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.nominatedFormerPresident2Phone && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident2Phone.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Whatsapp/Mobile No.</h5>
              <input
                type="text"
                placeholder="Whatsapp/Mobile No."
                {...register("nominatedFormerPresident2Whatsapp", {
                  //required: "Whatsapp/Mobile No. is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.nominatedFormerPresident2Whatsapp && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident2Whatsapp.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Addtional Mobile No.</h5>
              <input
                type="text"
                placeholder="Mobile"
                {...register("nominatedFormerPresident2Mobile", {
                  //required: "Addtional Mobile is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
                onChange={handleNominatedFormerPresident2Mobile}
              />
              {errors.nominatedFormerPresident2Mobile && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident2Mobile.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>E-Mail ID</h5>
              <input
                type="email"
                placeholder="E-Mail"
                {...register("nominatedFormerPresident2Email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.nominatedFormerPresident2Email && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident2Email.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Occupation Details</h5>
              <input
                type="text"
                placeholder="Occupation"
                {...register("nominatedFormerPresident2Occupation", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.nominatedFormerPresident2Occupation && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident2Occupation.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Spouse's Name</h5>
              <input
                type="text"
                placeholder="Spouse's Name"
                {...register("nominatedFormerPresident2SpouseName", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.nominatedFormerPresident2SpouseName && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident2SpouseName.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Nominated Former President 2 's Birth Date</h5>
              <input
                type="date"
                {...register("nominatedFormerPresident2BirthDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return date < now || "Birth date cannot be in the future";
                  },
                })}
              />
              {errors.nominatedFormerPresident2BirthDate && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident2BirthDate.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Spouse's Birth Date</h5>
              <input
                type="date"
                {...register("nominatedFormerPresident2SpouseBirthDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return date < now || "Birth date cannot be in the future";
                  },
                })}
              />
              {errors.nominatedFormerPresident2SpouseBirthDate && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident2SpouseBirthDate.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Marriage Date</h5>
              <input
                type="date"
                {...register("nominatedFormerPresident2MarriageDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return (
                      date < now || "Marriage date cannot be in the future"
                    );
                  },
                })}
              />
              {errors.nominatedFormerPresident2MarriageDate && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident2MarriageDate.message}
                </span>
              )}
            </div>
          </div>

          {/*Nominated Former President 3 */}
          <div className={css["form-section"]}>
            <h3>(6) Nominated Former President - 3</h3>

            <div className={css["form-group"]}>
              <h5>Name</h5>
              <input
                type="text"
                placeholder="Name"
                {...register("nominatedFormerPresident3Name", {
                  //required: "Nominated Former President 3 Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.nominatedFormerPresident3Name && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident3Name.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Passport Size Photo</h5>
              <input
                type="file"
                accept="image/*"
                {...register("nominatedFormerPresident3Photo", {})}
                onChange={(e) =>
                  handleFileChange(e, "nominatedFormerPresident3Photo")
                } // Unique field name
              />
              {errors.nominatedFormerPresident3Photo && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident3Photo.message}
                </span>
              )}
            </div>
            {/* Image Preview for Nominated Former President 3 */}
            {previews.nominatedFormerPresident3Photo && (
              <div className={css["mt-3"]}>
                <p>Image Preview (Nominated Former President 3):</p>
                <img
                  src={previews.nominatedFormerPresident3Photo}
                  alt="Nominated Former President 3 preview"
                  className={css["img-thumbnail"]}
                  style={{ maxWidth: "200px" }}
                />
              </div>
            )}

            <div className={css["form-group full-row"]}>
              <h5>Correspondence Address</h5>
              <textarea
                type="text"
                placeholder="Address"
                {...register("nominatedFormerPresident3Address", {})}
              />
              {errors.nominatedFormerPresident3Address && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident3Address.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Pin Code</h5>
              <input
                type="text"
                placeholder="Pin Code"
                {...register("nominatedFormerPresident3PinCode", {
                  //required: "Pin Code is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.nominatedFormerPresident3PinCode && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident3PinCode.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Phone (with STD)</h5>
              <input
                type="text"
                placeholder="Phone (with STD)"
                {...register("nominatedFormerPresident3Phone", {
                  //required: "Phone (with STD) is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.nominatedFormerPresident3Phone && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident3Phone.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Whatsapp/Mobile No.</h5>
              <input
                type="text"
                placeholder="Whatsapp/Mobile No."
                {...register("nominatedFormerPresident3Whatsapp", {
                  //required: "Whatsapp/Mobile No. is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.nominatedFormerPresident3Whatsapp && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident3Whatsapp.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Addtional Mobile No.</h5>
              <input
                type="text"
                placeholder="Mobile"
                {...register("nominatedFormerPresident3Mobile", {
                  //required: "Addtional Mobile is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
                onChange={handleNominatedFormerPresident3Mobile}
              />
              {errors.nominatedFormerPresident3Mobile && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident3Mobile.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>E-Mail ID</h5>
              <input
                type="email"
                placeholder="E-Mail"
                {...register("nominatedFormerPresident3Email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.nominatedFormerPresident3Email && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident3Email.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Occupation Details</h5>
              <input
                type="text"
                placeholder="Occupation"
                {...register("nominatedFormerPresident3Occupation", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.nominatedFormerPresident3Occupation && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident3Occupation.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Spouse's Name</h5>
              <input
                type="text"
                placeholder="Spouse's Name"
                {...register("nominatedFormerPresident3SpouseName", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.nominatedFormerPresident3SpouseName && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident3SpouseName.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Nominated Former President 3 's Birth Date</h5>
              <input
                type="date"
                {...register("nominatedFormerPresident3BirthDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return date < now || "Birth date cannot be in the future";
                  },
                })}
              />
              {errors.nominatedFormerPresident3BirthDate && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident3BirthDate.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Spouse's Birth Date</h5>
              <input
                type="date"
                {...register("nominatedFormerPresident3SpouseBirthDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return date < now || "Birth date cannot be in the future";
                  },
                })}
              />
              {errors.nominatedFormerPresident3SpouseBirthDate && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident3SpouseBirthDate.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Marriage Date</h5>
              <input
                type="date"
                {...register("nominatedFormerPresident3MarriageDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return (
                      date < now || "Marriage date cannot be in the future"
                    );
                  },
                })}
              />
              {errors.nominatedFormerPresident3MarriageDate && (
                <span className={css.error}>
                  {errors.nominatedFormerPresident3MarriageDate.message}
                </span>
              )}
            </div>
          </div>

          {/*Vice President  */}
          <div className={css["form-section"]}>
            <h3>
              (7) Vice President
              <RequiredField />
            </h3>

            <div className={css["form-group"]}>
              <h5>
                Name <RequiredField />
              </h5>
              <input
                type="text"
                placeholder="Name"
                {...register("vicePresidentName", {
                  required: "Vice President Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.vicePresidentName && (
                <span className={css.error}>
                  {errors.vicePresidentName.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                Passport Size Photo <RequiredField />
              </h5>
              <input
                type="file"
                accept="image/*"
                {...register("vicePresidentPhoto", {})}
                onChange={(e) => handleFileChange(e, "vicePresidentPhoto")} // Unique field name
              />
              {errors.vicePresidentPhoto && (
                <span className={css.error}>
                  {errors.vicePresidentPhoto.message}
                </span>
              )}
            </div>
            {/* Image Preview for Vice President */}
            {previews.vicePresidentPhoto && (
              <div className={css["mt-3"]}>
                <p>Image Preview (Vice President):</p>
                <img
                  src={previews.vicePresidentPhoto}
                  alt="Vice President preview"
                  className={css["img-thumbnail"]}
                  style={{ maxWidth: "200px" }}
                />
              </div>
            )}

            <div className={css["form-group full-row"]}>
              <h5>
                Correspondence Address <RequiredField />
              </h5>
              <textarea
                type="text"
                placeholder="Address"
                {...register("vicePresidentAddress", {
                  required: "Address is required",
                })}
              />
              {errors.vicePresidentAddress && (
                <span className={css.error}>
                  {errors.vicePresidentAddress.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Pin Code</h5>
              <input
                type="text"
                placeholder="Pin Code"
                {...register("vicePresidentPinCode", {
                  //required: "Pin Code is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.vicePresidentPinCode && (
                <span className={css.error}>
                  {errors.vicePresidentPinCode.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Phone (with STD)</h5>
              <input
                type="text"
                placeholder="Phone (with STD)"
                {...register("vicePresidentPhone", {
                  //required: "Phone (with STD) is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.vicePresidentPhone && (
                <span className={css.error}>
                  {errors.vicePresidentPhone.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                Whatsapp/Mobile No.
                <RequiredField />
              </h5>
              <input
                type="text"
                placeholder="Whatsapp/Mobile No."
                {...register("vicePresidentWhatsapp", {
                  required: "Whatsapp/Mobile No. is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.vicePresidentWhatsapp && (
                <span className={css.error}>
                  {errors.vicePresidentWhatsapp.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Addtional Mobile No.</h5>
              <input
                type="text"
                placeholder="Mobile"
                {...register("vicePresidentMobile", {
                  //required: "Addtional Mobile is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
                onChange={handleVicePresidentMobile}
              />
              {errors.vicePresidentMobile && (
                <span className={css.error}>
                  {errors.vicePresidentMobile.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>E-Mail ID</h5>
              <input
                type="email"
                placeholder="E-Mail"
                {...register("vicePresidentEmail", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.vicePresidentEmail && (
                <span className={css.error}>
                  {errors.vicePresidentEmail.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Occupation Details</h5>
              <input
                type="text"
                placeholder="Occupation"
                {...register("vicePresidentOccupation", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.vicePresidentOccupation && (
                <span className={css.error}>
                  {errors.vicePresidentOccupation.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Spouse's Name</h5>
              <input
                type="text"
                placeholder="Spouse's Name"
                {...register("vicePresidentSpouseName", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.vicePresidentSpouseName && (
                <span className={css.error}>
                  {errors.vicePresidentSpouseName.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                Vice President's Birth Date
                <RequiredField />
              </h5>
              <input
                type="date"
                {...register("vicePresidentBirthDate", {
                  required: "Birth Date is required",
                  validate: (value) => {
                    const date = new Date(value);
                    const now = new Date();
                    return date < now || "Birth date cannot be in the future";
                  },
                })}
              />
              {errors.vicePresidentBirthDate && (
                <span className={css.error}>
                  {errors.vicePresidentBirthDate.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Spouse's Birth Date</h5>
              <input
                type="date"
                {...register("vicePresidentSpouseBirthDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return date < now || "Birth date cannot be in the future";
                  },
                })}
              />
              {errors.vicePresidentSpouseBirthDate && (
                <span className={css.error}>
                  {errors.vicePresidentSpouseBirthDate.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Marriage Date</h5>
              <input
                type="date"
                {...register("vicePresidentMarriageDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return (
                      date < now || "Marriage date cannot be in the future"
                    );
                  },
                })}
              />
              {errors.vicePresidentMarriageDate && (
                <span className={css.error}>
                  {errors.vicePresidentMarriageDate.message}
                </span>
              )}
            </div>
          </div>

          {/*Secretary */}
          <div className={css["form-section"]}>
            <h3>
              (8) Secretary <RequiredField />
            </h3>

            <div className={css["form-group"]}>
              <h5>
                Name <RequiredField />
              </h5>
              <input
                type="text"
                placeholder="Name"
                {...register("secretaryName", {
                  required: "Secretary Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.secretaryName && (
                <span className={css.error}>
                  {errors.secretaryName.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                Passport Size Photo <RequiredField />
              </h5>
              <input
                type="file"
                accept="image/*"
                {...register("secretaryPhoto", {})}
                onChange={(e) => handleFileChange(e, "secretaryPhoto")} // Unique field name
              />
              {errors.secretaryPhoto && (
                <span className={css.error}>
                  {errors.secretaryPhoto.message}
                </span>
              )}
            </div>
            {/* Image Preview for Secretary */}
            {previews.secretaryPhoto && (
              <div className={css["mt-3"]}>
                <p>Image Preview (Secretary):</p>
                <img
                  src={previews.secretaryPhoto}
                  alt="Secretary preview"
                  className={css["img-thumbnail"]}
                  style={{ maxWidth: "200px" }}
                />
              </div>
            )}

            <div className={css["form-group full-row"]}>
              <h5>
                Correspondence Address <RequiredField />
              </h5>
              <textarea
                type="text"
                placeholder="Address"
                {...register("secretaryAddress", {
                  required: "Address is required",
                })}
              />
              {errors.secretaryAddress && (
                <span className={css.error}>
                  {errors.secretaryAddress.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Pin Code</h5>
              <input
                type="text"
                placeholder="Pin Code"
                {...register("secretaryPinCode", {
                  //required: "Pin Code is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.secretaryPinCode && (
                <span className={css.error}>
                  {errors.secretaryPinCode.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Phone (with STD)</h5>
              <input
                type="text"
                placeholder="Phone (with STD)"
                {...register("secretaryPhone", {
                  //required: "Phone (with STD) is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.secretaryPhone && (
                <span className={css.error}>
                  {errors.secretaryPhone.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                Whatsapp/Mobile No.
                <RequiredField />
              </h5>
              <input
                type="text"
                placeholder="Whatsapp/Mobile No."
                {...register("secretaryWhatsapp", {
                  required: "Whatsapp/Mobile No. is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.secretaryWhatsapp && (
                <span className={css.error}>
                  {errors.secretaryWhatsapp.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Addtional Mobile No.</h5>
              <input
                type="text"
                placeholder="Mobile"
                {...register("secretaryMobile", {
                  //required: "Addtional Mobile is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
                onChange={handleSecretaryMobile}
              />
              {errors.secretaryMobile && (
                <span className={css.error}>
                  {errors.secretaryMobile.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>E-Mail ID</h5>
              <input
                type="email"
                placeholder="E-Mail"
                {...register("secretaryEmail", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.secretaryEmail && (
                <span className={css.error}>
                  {errors.secretaryEmail.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Occupation Details</h5>
              <input
                type="text"
                placeholder="Occupation"
                {...register("secretaryOccupation", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.secretaryOccupation && (
                <span className={css.error}>
                  {errors.secretaryOccupation.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Spouse's Name</h5>
              <input
                type="text"
                placeholder="Spouse's Name"
                {...register("secretarySpouseName", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.secretarySpouseName && (
                <span className={css.error}>
                  {errors.secretarySpouseName.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                Secretary's Birth Date
                <RequiredField />
              </h5>
              <input
                type="date"
                {...register("secretaryBirthDate", {
                  required: "Birth Date is required",
                  validate: (value) => {
                    const date = new Date(value);
                    const now = new Date();
                    return date < now || "Birth date cannot be in the future";
                  },
                })}
              />
              {errors.secretaryBirthDate && (
                <span className={css.error}>
                  {errors.secretaryBirthDate.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Spouse's Birth Date</h5>
              <input
                type="date"
                {...register("secretarySpouseBirthDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return date < now || "Birth date cannot be in the future";
                  },
                })}
              />
              {errors.secretarySpouseBirthDate && (
                <span className={css.error}>
                  {errors.secretarySpouseBirthDate.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Marriage Date</h5>
              <input
                type="date"
                {...register("secretaryMarriageDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return (
                      date < now || "Marriage date cannot be in the future"
                    );
                  },
                })}
              />
              {errors.secretaryMarriageDate && (
                <span className={css.error}>
                  {errors.secretaryMarriageDate.message}
                </span>
              )}
            </div>
          </div>

          {/*Joint Secretary */}
          <div className={css["form-section"]}>
            <h3>
              (9) Joint Secretary
              <RequiredField />
            </h3>

            <div className={css["form-group"]}>
              <h5>
                Name <RequiredField />
              </h5>
              <input
                type="text"
                placeholder="Name"
                {...register("jointSecretaryName", {
                  required: "Joint Sectrtary Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.jointSecretaryName && (
                <span className={css.error}>
                  {errors.jointSecretaryName.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                Passport Size Photo <RequiredField />
              </h5>
              <input
                type="file"
                accept="image/*"
                {...register("jointSecretaryPhoto", {})}
                onChange={(e) => handleFileChange(e, "jointSecretaryPhoto")} // Unique field name
              />
              {errors.jointSecretaryPhoto && (
                <span className={css.error}>
                  {errors.jointSecretaryPhoto.message}
                </span>
              )}
            </div>
            {/* Image Preview for Joint Secretary */}
            {previews.jointSecretaryPhoto && (
              <div className={css["mt-3"]}>
                <p>Image Preview (Joint Secretary):</p>
                <img
                  src={previews.jointSecretaryPhoto}
                  alt="Secretary preview"
                  className={css["img-thumbnail"]}
                  style={{ maxWidth: "200px" }}
                />
              </div>
            )}

            <div className={css["form-group full-row"]}>
              <h5>
                Correspondence Address <RequiredField />
              </h5>
              <textarea
                type="text"
                placeholder="Address"
                {...register("jointSecretaryAddress", {
                  required: "Address is required",
                })}
              />
              {errors.jointSecretaryAddress && (
                <span className={css.error}>
                  {errors.jointSecretaryAddress.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Pin Code</h5>
              <input
                type="text"
                placeholder="Pin Code"
                {...register("jointSecretaryPinCode", {
                  //required: "Pin Code is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.jointSecretaryPinCode && (
                <span className={css.error}>
                  {errors.jointSecretaryPinCode.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Phone (with STD)</h5>
              <input
                type="text"
                placeholder="Phone (with STD)"
                {...register("jointSecretaryPhone", {
                  //required: "Phone (with STD) is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.jointSecretaryPhone && (
                <span className={css.error}>
                  {errors.jointSecretaryPhone.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                Whatsapp/Mobile No.
                <RequiredField />
              </h5>
              <input
                type="text"
                placeholder="Whatsapp/Mobile No."
                {...register("jointSecretaryWhatsapp", {
                  required: "Whatsapp/Mobile No. is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.jointSecretaryWhatsapp && (
                <span className={css.error}>
                  {errors.jointSecretaryWhatsapp.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Addtional Mobile No.</h5>
              <input
                type="text"
                placeholder="Mobile"
                {...register("jointSecretaryMobile", {
                  //required: "Addtional Mobile is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
                onChange={handleJointSecretaryMobile}
              />
              {errors.jointSecretaryMobile && (
                <span className={css.error}>
                  {errors.jointSecretaryMobile.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>E-Mail ID</h5>
              <input
                type="email"
                placeholder="E-Mail"
                {...register("jointSecretaryEmail", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.jointSecretaryEmail && (
                <span className={css.error}>
                  {errors.jointSecretaryEmail.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Occupation Details</h5>
              <input
                type="text"
                placeholder="Occupation"
                {...register("jointSecretaryOccupation", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.jointSecretaryOccupation && (
                <span className={css.error}>
                  {errors.jointSecretaryOccupation.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Spouse's Name</h5>
              <input
                type="text"
                placeholder="Spouse's Name"
                {...register("jointSecretarySpouseName", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.jointSecretarySpouseName && (
                <span className={css.error}>
                  {errors.jointSecretarySpouseName.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                Joint Secretary's Birth Date
                <RequiredField />
              </h5>
              <input
                type="date"
                {...register("jointSecretaryBirthDate", {
                  required: "Birth Date is required",
                  validate: (value) => {
                    const date = new Date(value);
                    const now = new Date();
                    return date < now || "Birth date cannot be in the future";
                  },
                })}
              />
              {errors.jointSecretaryBirthDate && (
                <span className={css.error}>
                  {errors.jointSecretaryBirthDate.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Spouse's Birth Date</h5>
              <input
                type="date"
                {...register("jointSecretarySpouseBirthDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return date < now || "Birth date cannot be in the future";
                  },
                })}
              />
              {errors.jointSecretarySpouseBirthDate && (
                <span className={css.error}>
                  {errors.jointSecretarySpouseBirthDate.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Marriage Date</h5>
              <input
                type="date"
                {...register("jointSecretaryMarriageDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return (
                      date < now || "Marriage date cannot be in the future"
                    );
                  },
                })}
              />
              {errors.jointSecretaryMarriageDate && (
                <span className={css.error}>
                  {errors.jointSecretaryMarriageDate.message}
                </span>
              )}
            </div>
          </div>

          {/*Treasurer  */}
          <div className={css["form-section"]}>
            <h3>
              (10) Treasurer <RequiredField />
            </h3>

            <div className={css["form-group"]}>
              <h5>
                Name <RequiredField />
              </h5>
              <input
                type="text"
                placeholder="Name"
                {...register("treasurerName", {
                  required: "Treasurer Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.treasurerName && (
                <span className={css.error}>
                  {errors.treasurerName.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                Passport Size Photo <RequiredField />
              </h5>
              <input
                type="file"
                accept="image/*"
                {...register("treasurerPhoto", {})}
                onChange={(e) => handleFileChange(e, "treasurerPhoto")} // Unique field name
              />
              {errors.treasurerPhoto && (
                <span className={css.error}>
                  {errors.treasurerPhoto.message}
                </span>
              )}
            </div>
            {/* Image Preview for Treasurer */}
            {previews.treasurerPhoto && (
              <div className={css["mt-3"]}>
                <p>Image Preview (Treasurer):</p>
                <img
                  src={previews.treasurerPhoto}
                  alt="Treasurer preview"
                  className={css["img-thumbnail"]}
                  style={{ maxWidth: "200px" }}
                />
              </div>
            )}

            <div className={css["form-group full-row"]}>
              <h5>
                Correspondence Address <RequiredField />
              </h5>
              <textarea
                type="text"
                placeholder="Address"
                {...register("treasurerAddress", {
                  required: "Address is required",
                })}
              />
              {errors.treasurerAddress && (
                <span className={css.error}>
                  {errors.treasurerAddress.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Pin Code</h5>
              <input
                type="text"
                placeholder="Pin Code"
                {...register("treasurerPinCode", {
                  //required: "Pin Code is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.treasurerPinCode && (
                <span className={css.error}>
                  {errors.treasurerPinCode.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Phone (with STD)</h5>
              <input
                type="text"
                placeholder="Phone (with STD)"
                {...register("treasurerPhone", {
                  //required: "Phone (with STD) is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.treasurerPhone && (
                <span className={css.error}>
                  {errors.treasurerPhone.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                Whatsapp/Mobile No.
                <RequiredField />
              </h5>
              <input
                type="text"
                placeholder="Whatsapp/Mobile No."
                {...register("treasurerWhatsapp", {
                  required: "Whatsapp/Mobile No. is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.treasurerWhatsapp && (
                <span className={css.error}>
                  {errors.treasurerWhatsapp.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Addtional Mobile No.</h5>
              <input
                type="text"
                placeholder="Mobile"
                {...register("treasurerMobile", {
                  //required: "Mobile is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
                onChange={handleTreasurerMobile}
              />
              {errors.treasurerMobile && (
                <span className={css.error}>
                  {errors.treasurerMobile.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>E-Mail ID</h5>
              <input
                type="email"
                placeholder="E-Mail"
                {...register("treasurerEmail", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.treasurerEmail && (
                <span className={css.error}>
                  {errors.treasurerEmail.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Occupation Details</h5>
              <input
                type="text"
                placeholder="Occupation"
                {...register("treasurerOccupation", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.treasurerOccupation && (
                <span className={css.error}>
                  {errors.treasurerOccupation.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Spouse's Name</h5>
              <input
                type="text"
                placeholder="Spouse's Name"
                {...register("treasurerSpouseName", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.treasurerSpouseName && (
                <span className={css.error}>
                  {errors.treasurerSpouseName.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                Treasurer's Birth Date
                <RequiredField />
              </h5>
              <input
                type="date"
                {...register("treasurerBirthDate", {
                  required: "Birth Date is required",
                  validate: (value) => {
                    const date = new Date(value);
                    const now = new Date();
                    return date < now || "Birth date cannot be in the future";
                  },
                })}
              />
              {errors.treasurerBirthDate && (
                <span className={css.error}>
                  {errors.treasurerBirthDate.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Spouse's Birth Date</h5>
              <input
                type="date"
                {...register("treasurerSpouseBirthDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return date < now || "Birth date cannot be in the future";
                  },
                })}
              />
              {errors.treasurerSpouseBirthDate && (
                <span className={css.error}>
                  {errors.treasurerSpouseBirthDate.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Marriage Date</h5>
              <input
                type="date"
                {...register("treasurerMarriageDate", {
                  required: false, // The field is not required
                  validate: (value) => {
                    if (!value) {
                      // If no value is selected, validation passes
                      return true;
                    }
                    const date = new Date(value);
                    const now = new Date();
                    return (
                      date < now || "Marriage date cannot be in the future"
                    );
                  },
                })}
              />
              {errors.treasurerMarriageDate && (
                <span className={css.error}>
                  {errors.treasurerMarriageDate.message}
                </span>
              )}
            </div>
          </div>

          {/*Committee Member 1 */}
          <div className={css["form-section"]}>
            <h3>(11) Committee Member - 1</h3>

            <div className={css["form-group"]}>
              <h5>Name</h5>
              <input
                type="text"
                placeholder="Name"
                {...register("committeemember1Name", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.committeemember1Name && (
                <span className={css.error}>
                  {errors.committeemember1Name.message}
                </span>
              )}
            </div>

            <div className={css["form-group full-row"]}>
              <h5>Address</h5>
              <textarea
                type="text"
                placeholder="Address"
                {...register("committeemember1Address", {})}
              />
              {errors.committeemember1Address && (
                <span className={css.error}>
                  {errors.committeemember1Address.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Pin Code</h5>
              <input
                type="text"
                placeholder="Pin Code"
                {...register("committeemember1PinCode", {
                  //required: "Pin Code is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember1PinCode && (
                <span className={css.error}>
                  {errors.committeemember1PinCode.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Phone (with STD)</h5>
              <input
                type="text"
                placeholder="Phone (with STD)"
                {...register("committeemember1Phone", {
                  //required: "Phone (with STD) is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember1Phone && (
                <span className={css.error}>
                  {errors.committeemember1Phone.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Addtional Mobile No.</h5>
              <input
                type="text"
                placeholder="Mobile"
                {...register("committeemember1Mobile", {
                  //required: "Mobile is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember1Mobile && (
                <span className={css.error}>
                  {errors.committeemember1Mobile.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>E-Mail ID</h5>
              <input
                type="email"
                placeholder="E-Mail"
                {...register("committeemember1Email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.committeemember1Email && (
                <span className={css.error}>
                  {errors.committeemember1Email.message}
                </span>
              )}
            </div>
          </div>

          {/*Committee Member 2 */}
          <div className={css["form-section"]}>
            <h3>(12) Committee Member - 2</h3>

            <div className={css["form-group"]}>
              <h5>Name</h5>
              <input
                type="text"
                placeholder="Name"
                {...register("committeemember2Name", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.committeemember2Name && (
                <span className={css.error}>
                  {errors.committeemember2Name.message}
                </span>
              )}
            </div>

            <div className={css["form-group full-row"]}>
              <h5>Address</h5>
              <textarea
                type="text"
                placeholder="Address"
                {...register("committeemember2Address", {})}
              />
              {errors.committeemember2Address && (
                <span className={css.error}>
                  {errors.committeemember2Address.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Pin Code</h5>
              <input
                type="text"
                placeholder="Pin Code"
                {...register("committeemember2PinCode", {
                  //required: "Pin Code is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember2PinCode && (
                <span className={css.error}>
                  {errors.committeemember2PinCode.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Phone (with STD)</h5>
              <input
                type="text"
                placeholder="Phone (with STD)"
                {...register("committeemember2Phone", {
                  //required: "Phone (with STD) is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember2Phone && (
                <span className={css.error}>
                  {errors.committeemember2Phone.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Addtional Mobile No.</h5>
              <input
                type="text"
                placeholder="Mobile"
                {...register("committeemember2Mobile", {
                  //required: "Mobile is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember2Mobile && (
                <span className={css.error}>
                  {errors.committeemember2Mobile.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>E-Mail ID</h5>
              <input
                type="email"
                placeholder="E-Mail"
                {...register("committeemember2Email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.committeemember2Email && (
                <span className={css.error}>
                  {errors.committeemember2Email.message}
                </span>
              )}
            </div>
          </div>

          {/*Committee Member 3 */}
          <div className={css["form-section"]}>
            <h3>(13) Committee Member - 3</h3>

            <div className={css["form-group"]}>
              <h5>Name</h5>
              <input
                type="text"
                placeholder="Name"
                {...register("committeemember3Name", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.committeemember3Name && (
                <span className={css.error}>
                  {errors.committeemember3Name.message}
                </span>
              )}
            </div>

            <div className={css["form-group full-row"]}>
              <h5>Address</h5>
              <textarea
                type="text"
                placeholder="Address"
                {...register("committeemember3Address", {})}
              />
              {errors.committeemember3Address && (
                <span className={css.error}>
                  {errors.committeemember3Address.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Pin Code</h5>
              <input
                type="text"
                placeholder="Pin Code"
                {...register("committeemember3PinCode", {
                  //required: "Pin Code is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember3PinCode && (
                <span className={css.error}>
                  {errors.committeemember3PinCode.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Phone (with STD)</h5>
              <input
                type="text"
                placeholder="Phone (with STD)"
                {...register("committeemember3Phone", {
                  //required: "Phone (with STD) is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember3Phone && (
                <span className={css.error}>
                  {errors.committeemember3Phone.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Addtional Mobile No.</h5>
              <input
                type="text"
                placeholder="Mobile"
                {...register("committeemember3Mobile", {
                  //required: "Mobile is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember3Mobile && (
                <span className={css.error}>
                  {errors.committeemember3Mobile.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>E-Mail ID</h5>
              <input
                type="email"
                placeholder="E-Mail"
                {...register("committeemember3Email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.committeemember3Email && (
                <span className={css.error}>
                  {errors.committeemember3Email.message}
                </span>
              )}
            </div>
          </div>

          {/*Committee Member 4 */}
          <div className={css["form-section"]}>
            <h3>(14) Committee Member - 4</h3>

            <div className={css["form-group"]}>
              <h5>Name</h5>
              <input
                type="text"
                placeholder="Name"
                {...register("committeemember4Name", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.committeemember4Name && (
                <span className={css.error}>
                  {errors.committeemember4Name.message}
                </span>
              )}
            </div>

            <div className={css["form-group full-row"]}>
              <h5>Address</h5>
              <textarea
                type="text"
                placeholder="Address"
                {...register("committeemember4Address", {})}
              />
              {errors.committeemember4Address && (
                <span className={css.error}>
                  {errors.committeemember4Address.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Pin Code</h5>
              <input
                type="text"
                placeholder="Pin Code"
                {...register("committeemember4PinCode", {
                  //required: "Pin Code is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember4PinCode && (
                <span className={css.error}>
                  {errors.committeemember4PinCode.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Phone (with STD)</h5>
              <input
                type="text"
                placeholder="Phone (with STD)"
                {...register("committeemember4Phone", {
                  //required: "Phone (with STD) is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember4Phone && (
                <span className={css.error}>
                  {errors.committeemember4Phone.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Addtional Mobile No.</h5>
              <input
                type="text"
                placeholder="Mobile"
                {...register("committeemember4Mobile", {
                  //required: "Mobile is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember4Mobile && (
                <span className={css.error}>
                  {errors.committeemember4Mobile.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>E-Mail ID</h5>
              <input
                type="email"
                placeholder="E-Mail"
                {...register("committeemember4Email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.committeemember4Email && (
                <span className={css.error}>
                  {errors.committeemember4Email.message}
                </span>
              )}
            </div>
          </div>

          {/*Committee Member 5 */}
          <div className={css["form-section"]}>
            <h3>(15) Committee Member - 5</h3>

            <div className={css["form-group"]}>
              <h5>Name</h5>
              <input
                type="text"
                placeholder="Name"
                {...register("committeemember5Name", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.committeemember5Name && (
                <span className={css.error}>
                  {errors.committeemember5Name.message}
                </span>
              )}
            </div>

            <div className={css["form-group full-row"]}>
              <h5>Address</h5>
              <textarea
                type="text"
                placeholder="Address"
                {...register("committeemember5Address", {})}
              />
              {errors.committeemember5Address && (
                <span className={css.error}>
                  {errors.committeemember5Address.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Pin Code</h5>
              <input
                type="text"
                placeholder="Pin Code"
                {...register("committeemember5PinCode", {
                  //required: "Pin Code is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember5PinCode && (
                <span className={css.error}>
                  {errors.committeemember5PinCode.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Phone (with STD)</h5>
              <input
                type="text"
                placeholder="Phone (with STD)"
                {...register("committeemember5Phone", {
                  //required: "Phone (with STD) is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember5Phone && (
                <span className={css.error}>
                  {errors.committeemember5Phone.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Addtional Mobile No.</h5>
              <input
                type="text"
                placeholder="Mobile"
                {...register("committeemember5Mobile", {
                  //required: "Mobile is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember5Mobile && (
                <span className={css.error}>
                  {errors.committeemember5Mobile.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>E-MailI ID</h5>
              <input
                type="email"
                placeholder="E-Mail"
                {...register("committeemember5Email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.committeemember5Email && (
                <span className={css.error}>
                  {errors.committeemember5Email.message}
                </span>
              )}
            </div>
          </div>

          {/*Committee Member 6 */}
          <div className={css["form-section"]}>
            <h3>(16) Committee Member - 6</h3>

            <div className={css["form-group"]}>
              <h5>Name</h5>
              <input
                type="text"
                placeholder="Name"
                {...register("committeemember6Name", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.committeemember6Name && (
                <span className={css.error}>
                  {errors.committeemember6Name.message}
                </span>
              )}
            </div>

            <div className={css["form-group full-row"]}>
              <h5>Address</h5>
              <textarea
                type="text"
                placeholder="Address"
                {...register("committeemember6Address", {})}
              />
              {errors.committeemember6Address && (
                <span className={css.error}>
                  {errors.committeemember6Address.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Pin Code</h5>
              <input
                type="text"
                placeholder="Pin Code"
                {...register("committeemember6PinCode", {
                  //required: "Pin Code is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember6PinCode && (
                <span className={css.error}>
                  {errors.committeemember6PinCode.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Phone (with STD)</h5>
              <input
                type="text"
                placeholder="Phone (with STD)"
                {...register("committeemember6Phone", {
                  //required: "Phone (with STD) is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember6Phone && (
                <span className={css.error}>
                  {errors.committeemember6Phone.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Addtional Mobile No.</h5>
              <input
                type="text"
                placeholder="Mobile"
                {...register("committeemember6Mobile", {
                  //required: "Mobile is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember6Mobile && (
                <span className={css.error}>
                  {errors.committeemember6Mobile.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>E-Mail ID</h5>
              <input
                type="email"
                placeholder="E-Mail"
                {...register("committeemember6Email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.committeemember6Email && (
                <span className={css.error}>
                  {errors.committeemember6Email.message}
                </span>
              )}
            </div>
          </div>

          {/*Committee Member 7 */}
          <div className={css["form-section"]}>
            <h3>(17) Committee Member - 7</h3>

            <div className={css["form-group"]}>
              <h5>Name</h5>
              <input
                type="text"
                placeholder="Name"
                {...register("committeemember7Name", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.committeemember7Name && (
                <span className={css.error}>
                  {errors.committeemember7Name.message}
                </span>
              )}
            </div>

            <div className={css["form-group full-row"]}>
              <h5>Address</h5>
              <textarea
                type="text"
                placeholder="Address"
                {...register("committeemember7Address", {})}
              />
              {errors.committeemember7Address && (
                <span className={css.error}>
                  {errors.committeemember7Address.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Pin Code</h5>
              <input
                type="text"
                placeholder="Pin Code"
                {...register("committeemember7PinCode", {
                  //required: "Pin Code is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember7PinCode && (
                <span className={css.error}>
                  {errors.committeemember7PinCode.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Phone (with STD)</h5>
              <input
                type="text"
                placeholder="Phone (with STD)"
                {...register("committeemember7Phone", {
                  //required: "Phone (with STD) is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember7Phone && (
                <span className={css.error}>
                  {errors.committeemember7Phone.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Addtional Mobile No.</h5>
              <input
                type="text"
                placeholder="Mobile"
                {...register("committeemember7Mobile", {
                  //required: "Mobile is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember7Mobile && (
                <span className={css.error}>
                  {errors.committeemember7Mobile.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>E-Mail ID</h5>
              <input
                type="email"
                placeholder="E-Mail"
                {...register("committeemember7Email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.committeemember7Email && (
                <span className={css.error}>
                  {errors.committeemember7Email.message}
                </span>
              )}
            </div>
          </div>

          {/*Committee Member 8 */}
          <div className={css["form-section"]}>
            <h3>(18) Committee Member - 8</h3>

            <div className={css["form-group"]}>
              <h5>Name</h5>
              <input
                type="text"
                placeholder="Name"
                {...register("committeemember8Name", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter only alphabets",
                  },
                })}
              />
              {errors.committeemember8Name && (
                <span className={css.error}>
                  {errors.committeemember8Name.message}
                </span>
              )}
            </div>

            <div className={css["form-group full-row"]}>
              <h5>Address</h5>
              <textarea
                type="text"
                placeholder="Address"
                {...register("committeemember8Address", {})}
              />
              {errors.committeemember8Address && (
                <span className={css.error}>
                  {errors.committeemember8Address.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Pin Code</h5>
              <input
                type="text"
                placeholder="Pin Code"
                {...register("committeemember8PinCode", {
                  //required: "Pin Code is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember8PinCode && (
                <span className={css.error}>
                  {errors.committeemember8PinCode.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Phone (with STD)</h5>
              <input
                type="text"
                placeholder="Phone (with STD)"
                {...register("committeemember8Phone", {
                  //required: "Phone (with STD) is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember8Phone && (
                <span className={css.error}>
                  {errors.committeemember8Phone.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>Addtional Mobile No.</h5>
              <input
                type="text"
                placeholder="Mobile"
                {...register("committeemember8Mobile", {
                  //required: "Mobile is required",
                  isMobile: true,
                  pattern: validationPatterns.mobile,
                })}
              />
              {errors.committeemember8Mobile && (
                <span className={css.error}>
                  {errors.committeemember8Mobile.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>E-Mail ID</h5>
              <input
                type="email"
                placeholder="E-Mail"
                {...register("committeemember8Email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.committeemember8Email && (
                <span className={css.error}>
                  {errors.committeemember8Email.message}
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className={css["form-actions"]}>
            <button
              type="submit"
              className={css["submit-button"]}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Form"}
            </button>
          </div>
        </form>
      </div>
      {isSubmitting && (
        <div className={css["spinner-container"]}>
          <div className={css.spinner}></div>
        </div>
      )}
      {/* Print Button (Visible after submission) */}
      <div className={css["print-div"]}>
        {isSubmitted && (
          <button
            onClick={handlePrint}
            className={css["print-btn"]}
            style={{ marginTop: "20px" }}
          >
            Print
          </button>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import logo from "../assets/JSG_logo.png";
import axios from "axios";
import { remoteUrl } from "../api.config";
import css from "./formA.module.css";

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
    value: /^\d{10}$/,
    message: "Please enter exactly 10 digits",
  },
  decimal: {
    value: /^\d{1,6}(\.\d{1,2})?$/,
    message: "Please enter a valid number with up to 2 decimal places",
  },
};

// Required field indicator component
const RequiredField = () => (
  <span style={{ color: "red", marginLeft: "4px" }}>*</span>
);

export default function FormA() {
  useEffect(() => {
    document.title = "JSGIF Form A";
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      previousDues: "0",
      lessPaid: "0",
      groupNo: "",
      groupName: "",
    },
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // State to control PDF button visibility
  const [isSubmitting, setIsSubmitting] = useState(false); // State for showing spinner
  const [submissionStatus, setSubmissionStatus] = useState(null); // "success" or "error"
  const [submissionMessage, setSubmissionMessage] = useState("");

  const successMessage = `
    Thank you, Form "A" has been successfully submitted. 
    We will shortly email you the PDF of the same form submitted.
    For any queries or further details, please contact on +91-XXXXXXXXXX or email us at example@email.com.
  `;

  const errorMessages = {
    networkError:
      "Unable to connect to the server. Please check your internet connection and try again.",
    serverError:
      "There was a server error while processing your form. Please try again later.",
    unknownError: "An unexpected error occurred. Please try again later.",
  };

  // Watch form inputs for real-time updates
  const coupleMembers = watch("coupleMembers"); // Number of Couple Members
  const singleMembers = watch("singleMembers"); // Number of Single Members
  const previousDues = watch("previousDues"); // Previous Dues
  const creditWithJSGIF = watch("lessPaid"); // Less Paid / Credit

  // State for calculated values
  const [coupleContribution, setCoupleContribution] = useState(0);
  const [singleContribution, setSingleContribution] = useState(0);
  const [currentDues, setCurrentDues] = useState(0);
  const [grossTotal, setGrossTotal] = useState(0);
  const [gstAmount, setGstAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [netPayable, setNetPayable] = useState(0);

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
        setRegionSuggestions(result / body.data); // Populate suggestions list
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
        //`http://localhost:5000/api/suggestions?query=${query}&type=groupName&region=${encodeURIComponent(
        //  currentRegion || ""
        //)}`
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
    // If group number is empty, reset all fields
    if (!groupNo) {
      setValue("region", "");
      setValue("groupName", "");
      setValue("previousDues", 0);
      setValue("lessPaid", 0);

      setGroupDetails({
        groupName: "",
        region: "",
        previousDues: 0,
        lessPaid: 0,
      });

      return;
    }

    try {
      // First, fetch group details
      const groupResponse = await fetch(
        //`http://localhost:5000/api/groups/${String(groupNo)}`
        `https://gorabptxn1.execute-api.us-east-2.amazonaws.com/dev/groups/${String(
          groupNo
        )}`
      );
      const groupResult = await groupResponse.json();

      // If group details are found, populate them regardless of financial data
      console.log("RESULT : ", groupResult);
      if (groupResult.body.success) {
        // Populate group details
        setValue("region", groupResult.body.data.region || "");
        setValue("groupName", groupResult.body.data.groupName || "");
        setValue("groupNo", String(groupResult.body.data.groupNo || groupNo));

        // Update group details state
        setGroupDetails((prevDetails) => ({
          ...prevDetails,
          groupName: groupResult.body.data.groupName || "",
          region: groupResult.body.data.region || "",
        }));

        try {
          // Attempt to fetch financial details
          const financialResponse = await fetch(
            //`http://localhost:5000/api/financials/${String(groupNo)}`
            `https://gorabptxn1.execute-api.us-east-2.amazonaws.com/dev/financials/${String(
              groupNo
            )}`
          );
          const financialResult = await financialResponse.json();

          console.log("FINANCE:", financialResult);

          // If financial details are found, update them
          if (financialResult.body.success) {
            const previousDuesValue =
              financialResult.body.data.previousDues || 0;
            const lessPaidValue = financialResult.body.data.lessPaid || 0;

            setValue("previousDues", previousDuesValue);
            setValue("lessPaid", lessPaidValue);

            setGroupDetails((prevDetails) => ({
              ...prevDetails,
              previousDues: previousDuesValue,
              lessPaid: lessPaidValue,
            }));
          } else {
            // If no financial details found, set defaults but keep group details
            setValue("previousDues", 0);
            setValue("lessPaid", 0);

            setGroupDetails((prevDetails) => ({
              ...prevDetails,
              previousDues: 0,
              lessPaid: 0,
            }));
          }
        } catch (financialError) {
          console.error("Error fetching financial details:", financialError);
          // Set default financial values but keep group details
          setValue("previousDues", 0);
          setValue("lessPaid", 0);

          setGroupDetails((prevDetails) => ({
            ...prevDetails,
            previousDues: 0,
            lessPaid: 0,
          }));
        }
      } else {
        // If no group details found, reset all fields
        setValue("region", "");
        setValue("groupName", "");
        setValue("groupNo", "");
        setValue("previousDues", 0);
        setValue("lessPaid", 0);

        setGroupDetails({
          groupName: "",
          region: "",
          previousDues: 0,
          lessPaid: 0,
        });
      }
    } catch (error) {
      console.error("Error fetching group details:", error);
      // Handle the error gracefully while maintaining any existing data
      setValue("previousDues", 0);
      setValue("lessPaid", 0);
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

    // Only fetch details if value is not empty
    if (value) {
      fetchGroupDetails(value);
    } else {
      // Reset fields when group number is cleared
      fetchGroupDetails(null);
    }
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

  // Utility function to format number to Indian currency format
  const formatToIndianCurrency = (number) => {
    // Convert to 2 decimal places
    const fixedNumber = Number(number).toFixed(2);

    // Split into whole and decimal parts
    const [wholePart, decimalPart] = fixedNumber.split(".");

    // Format whole part with Indian grouping
    const lastThree = wholePart.substring(wholePart.length - 3);
    const otherNumbers = wholePart.substring(0, wholePart.length - 3);
    const formattedWholePart = otherNumbers
      ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
      : lastThree;

    // Return formatted string with decimal part
    return `₹${formattedWholePart}.${decimalPart}`;
  };

  // Calculate the contribution dynamically
  useEffect(() => {
    if (coupleMembers !== undefined && singleMembers !== undefined) {
      // Rates
      const coupleBaseRate = 7500;
      const additionalCoupleRate = 100;
      const singleRate = 50;
      const gstRate = 0.18;

      // Ensure previousDues is treated as a number
      const previousDuesAmount = parseFloat(previousDues) || 0;
      const creditWithJSGIFAmount = parseFloat(creditWithJSGIF) || 0;

      // Couple Contribution Calculation
      const coupleContributionAmount =
        coupleMembers >= 50
          ? coupleBaseRate +
            Math.max(0, coupleMembers - 50) * additionalCoupleRate
          : coupleMembers < 50
          ? 7500
          : coupleMembers * 7500;

      // GST on Couple Contribution
      const coupleGst = coupleContributionAmount * gstRate;

      // Single Contribution Calculation
      const singleContributionAmount = singleMembers * singleRate;

      // GST on Single Contribution
      const singleGst = singleContributionAmount * gstRate;

      //Current Dues
      const currentDues = coupleContributionAmount + singleContributionAmount;

      // Gross Total
      const grossTotalAmount =
        coupleContributionAmount + singleContributionAmount;

      // GST on Gross Total
      const gstAmountCalculated = grossTotalAmount * gstRate;

      // Grand Total
      const grandTotalAmount = grossTotalAmount + gstAmountCalculated;

      // Net Payable after deducting credit
      const netPayableAmount =
        grandTotalAmount + previousDuesAmount - creditWithJSGIFAmount; //no GSR on previousDues
      const finalNetPayable = netPayableAmount < 0 ? 0 : netPayableAmount;

      // Set the calculated values in state
      setCoupleContribution(coupleContributionAmount);
      setSingleContribution(singleContributionAmount);
      setCurrentDues(currentDues);
      setGrossTotal(grossTotalAmount);
      setGstAmount(gstAmountCalculated);
      setGrandTotal(grandTotalAmount);
      setNetPayable(finalNetPayable);
    }
  }, [coupleMembers, singleMembers, previousDues, creditWithJSGIF]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmissionStatus(null);
    setSubmissionMessage("");
    setIsSubmitted(false);

    console.log("Final Submitted Data: ", {
      ...data,
      previousDues: data.previousDues || 0,
      lessPaid: data.lessPaid || 0,
      coupleContribution,
      singleContribution,
      currentDues,
      grossTotal,
      gstAmount,
      grandTotal,
      netPayable,
    });

    //api call to backend
    try {
      const response = await axios.post(
        `https://gorabptxn1.execute-api.us-east-2.amazonaws.com/dev/contributions`,
        //`http://localhost:5000/api/contributions`,
        {
          ...data,
          previousDues: data.previousDues || 0,
          lessPaid: data.lessPaid || 0,
          coupleContribution,
          singleContribution,
          currentDues,
          grossTotal,
          gstAmount,
          grandTotal,
          netPayable,
        }
      );
      if (response.status === 200 || response.status === 201) {
        setSubmissionStatus("success");
        setSubmissionMessage(successMessage);
        setIsSubmitted(true); // Show the print button
      } else {
        setSubmissionStatus("error");
        setSubmissionMessage(errorMessages.serverError);
      }
    } catch (error) {
      setSubmissionStatus("error");
      if (error.message === "Network Error") {
        setSubmissionMessage(errorMessages.networkError);
      } else {
        setSubmissionMessage(errorMessages.unknownError);
      }
    } finally {
      setIsSubmitting(false); // Hide the spinner
    }

    // setIsSubmitting(true); // Show the spinner
    console.log("RESPONSE: ", response);

    // Simulate an API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
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
        <img src={logo} alt="Logo" className={css.logo} />

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

        <h1 className={css["form-title"]}>Form "A"</h1>
      </div>

      {/* Form Section */}
      <div
        ref={componentRef}
        style={{ padding: "5px", background: "#3f0986", height: "auto" }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={css["scrolling-form"]}
        >
          {/* Group Information */}
          <div className={css["form-section"]}>
            <h3>Group Details</h3>

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
                  // required: "Region is required",
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

            <div className={css["form-group full-row"]}>
              <h5>
                Group Address
                <RequiredField />
              </h5>
              <textarea
                type="text"
                placeholder="Address"
                {...register("groupAddress", {
                  required: "Group Address is required",
                })}
              />
              {errors.groupAddress && (
                <span className={css.error}>{errors.groupAddress.message}</span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                President Mobile No. <RequiredField />
              </h5>
              <div className={css["phone-input-container"]}>
                <div className={css["phone-prefix"]}>+91</div>
                <input
                  type="text"
                  className={css["phone-input"]}
                  placeholder="Enter 10 digit number"
                  {...register("presidentMobileNumber", {
                    required: "President mobile number is required",
                    pattern: validationPatterns.mobile,
                    onChange: (e) => {
                      let value = e.target.value;
                      value = value.replace(/\D/g, "");
                      value = value.slice(0, 10);
                      e.target.value = value;
                    },
                  })}
                />
              </div>
              {errors.presidentMobileNumber && (
                <span className={css.error}>
                  {errors.presidentMobileNumber.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                Secretary Mobile No. <RequiredField />
              </h5>
              <div className={css["phone-input-container"]}>
                <div className={css["phone-prefix"]}>+91</div>
                <input
                  type="text"
                  className={css["phone-input"]}
                  placeholder="Enter 10 digit number"
                  {...register("secretaryMobileNumber", {
                    required: "Secretary mobile number is required",
                    pattern: validationPatterns.mobile,
                    onChange: (e) => {
                      let value = e.target.value;
                      value = value.replace(/\D/g, "");
                      value = value.slice(0, 10);
                      e.target.value = value;
                    },
                  })}
                />
              </div>
              {errors.secretaryMobileNumber && (
                <span className={css.error}>
                  {errors.secretaryMobileNumber.message}
                </span>
              )}
            </div>

            <div className={css["form-group"]}>
              <h5>
                Treasurer Mobile No. <RequiredField />
              </h5>
              <div className={css["phone-input-container"]}>
                <div className={css["phone-prefix"]}>+91</div>
                <input
                  type="text"
                  className={css["phone-input"]}
                  placeholder="Enter 10 digit number"
                  {...register("treasurerMobileNumber", {
                    required: "Treasurer mobile number is required",
                    pattern: validationPatterns.mobile,
                    onChange: (e) => {
                      let value = e.target.value;
                      value = value.replace(/\D/g, "");
                      value = value.slice(0, 10);
                      e.target.value = value;
                    },
                  })}
                />
              </div>
              {errors.treasurerMobileNumber && (
                <span className={css.error}>
                  {errors.treasurerMobileNumber.message}
                </span>
              )}
            </div>
          </div>

          {/* Rates of Contribution */}
          <div className={css["form-section"]}>
            <fieldset className={css["rates-section"]}>
              <legend>Rates of Contribution</legend>
              <div className={css["rates-info"]}>
                <p>
                  Rates of Contribution for Year 2025-2026 (01.04.2025 to
                  31.03.2026):
                </p>
                <ul>
                  <li>
                    Contribution for First 50 Couple Members: ₹7,500/- + GST
                  </li>
                  <li>
                    Contribution per Couple Members from 51st Couple: ₹100/- +
                    GST
                  </li>
                  <li>Contribution per Single Member: ₹50/- + GST</li>
                </ul>
              </div>
            </fieldset>
          </div>

          {/* Contribution Payable */}
          <div className={css["contribution-details"]}>
            <h3>Contribution Payable</h3>

            {/* Number of Couple Members */}
            <div className={css["form-row"]}>
              <div className={css["input-group"]}>
                <h5>
                  Number of Couple Members
                  <RequiredField />
                </h5>
                <input
                  type="number"
                  placeholder="Couple Members"
                  {...registerField("coupleMembers", {
                    required: "Number of couple members is required",
                    pattern: validationPatterns.numeric,
                    validate: (value) =>
                      (value >= 0 && value <= 9999) ||
                      "Maximum 4 digits allowed",
                  })}
                />
                {errors.coupleMembers && (
                  <span className={css.error}>
                    {errors.coupleMembers.message}
                  </span>
                )}
              </div>
              <div className={css["amount-group"]}>
                <h5>Couple Contribution</h5>
                <p>{formatToIndianCurrency(coupleContribution)}</p>
              </div>
            </div>

            {/* Number of Single Members */}
            <div className={css["form-row"]}>
              <div className={css["input-group"]}>
                <h5>
                  Number of Single Members
                  <RequiredField />{" "}
                </h5>
                <input
                  type="number"
                  placeholder="Single Members"
                  {...registerField("singleMembers", {
                    required: "Single Members is required",
                    pattern: validationPatterns.numeric,
                    validate: (value) =>
                      (value >= 0 && value <= 9999) ||
                      "Maximum 4 digits allowed",
                  })}
                />
                {errors.coupleMembers && (
                  <span className={css.error}>
                    {errors.coupleMembers.message}
                  </span>
                )}
              </div>
              <div className={css["amount-group"]}>
                <h5>Single Contribution</h5>
                <p>{formatToIndianCurrency(singleContribution)}</p>
              </div>
            </div>

            {/* Current Year Dues */}
            <div className={css["form-row"]}>
              <div className={css["text-group"]}>
                <h5>Current Year Dues</h5>
              </div>
              <div className={css["amount-group"]}>
                <h5>{formatToIndianCurrency(currentDues)}</h5>
              </div>
            </div>

            {/* Gross Total */}
            <div className={css["form-row"]}>
              <div className={css["text-group"]}>
                <h5>Gross Total</h5>
              </div>
              <div className={css["amount-group"]}>
                <h5>{formatToIndianCurrency(grossTotal)}</h5>
              </div>
            </div>

            {/* GST */}
            <div className={css["form-row"]}>
              <div className={css["text-group"]}>
                <h5>GST @ 18%</h5>
              </div>
              <div className={css["amount-group"]}>
                <h5>{formatToIndianCurrency(gstAmount)}</h5>
              </div>
            </div>

            {/* Grand Total */}
            <div className={css["form-row"]}>
              <div className={css["text-group"]}>
                <h5>Grand Total</h5>
              </div>
              <div className={css["amount-group"]}>
                <h5>{formatToIndianCurrency(grandTotal)}</h5>
              </div>
            </div>

            {/* Previous Dues */}
            <div className={css["form-row"]}>
              <div className={css["input-group"]}>
                <h5>
                  Previous Dues
                  <RequiredField />{" "}
                </h5>
                <input
                  type="number"
                  placeholder="Previous Dues"
                  {...register("previousDues", {
                    required: "Previous dues is required",
                    pattern: validationPatterns.decimal,
                  })}
                  disabled
                />
              </div>
              <div className={css["amount-group"]}>
                <h5>Previous Dues Amount</h5>
                <p>{formatToIndianCurrency(previousDues)}</p>
              </div>
            </div>

            {/* Less Paid / Credit with JSGIF */}
            <div className={css["form-row"]}>
              <div className={css["input-group"]}>
                <h5>
                  Less Paid / Credit with JSGIF
                  <RequiredField />
                </h5>
                <input
                  type="number"
                  placeholder="Less Paid / Credit"
                  {...register("lessPaid", {
                    required: "Previous dues is required",
                    pattern: validationPatterns.decimal,
                  })}
                  disabled
                />
              </div>
              <div className={css["amount-group"]}>
                <h5>Credit Amount</h5>
                <p>{formatToIndianCurrency(creditWithJSGIF)}</p>
              </div>
            </div>

            {/* Net Payable */}
            <div className={css["form-row"]}>
              <div className={css["text-group"]}>
                <h5>Net Payable</h5>
              </div>
              <div className={css["amount-group"]}>
                <h5>{formatToIndianCurrency(netPayable)}</h5>
              </div>
            </div>
          </div>

          {/* New Payment Details Section */}
          <div className={css["payment-details"]}>
            <h3>Payment Details</h3>

            <div className={css["payment-row"]}>
              <div className={css["input-group"]}>
                <h5>DD / Cheque / IMPS / Online Transfer Ref. No.</h5>
                <input
                  type="text"
                  placeholder="Reference Number"
                  {...register("paymentReferenceNumber", {
                    // required: "Reference Number is required",
                  })}
                />
                {errors.paymentReferenceNumber && (
                  <span className={css.error}>
                    {errors.paymentReferenceNumber.message}
                  </span>
                )}
              </div>
              <div className={css["input-group"]}>
                <h5 style={{ textAlign: "left" }}>Date</h5>
                <input
                  type="date"
                  {...register("paymentDate", {
                    // required: "Date is required",
                  })}
                />
                {errors.paymentDate && (
                  <span className={css.error}>
                    {errors.paymentDate.message}
                  </span>
                )}
              </div>
            </div>

            <div className={css["payment-row"]}>
              <div className={css["input-group"]}>
                <h5>Amount Paid</h5>
                <input
                  type="text"
                  placeholder="Amount Paid"
                  {...register("amountPaid", {
                    // required: "Amount Paid is required",
                    pattern: validationPatterns.decimal,
                  })}
                />
                {errors.amountPaid && (
                  <span className={css.error}>{errors.amountPaid.message}</span>
                )}
              </div>
              <div className={css["input-group"]}>
                <h5>Drawn On (Bank Name)</h5>
                <input
                  type="text"
                  placeholder="Bank Name"
                  {...register("drawnOnBank", {
                    //required: "Bank Name is required",
                    pattern: validationPatterns.alphabetsOnly,
                  })}
                />
                {errors.drawnOnBank && (
                  <span className={css.error}>
                    {errors.drawnOnBank.message}
                  </span>
                )}
              </div>
            </div>

            <div className={css["payment-row"]}>
              <div className={css["input-group"]}>
                <h5>Branch</h5>
                <input
                  type="text"
                  placeholder="Bank Branch"
                  {...register("bankBranch", {
                    // required: "Branch is required",
                    pattern: validationPatterns.alphabetsOnly,
                  })}
                />
                {errors.bankBranch && (
                  <span className={css.error}>{errors.bankBranch.message}</span>
                )}
              </div>
            </div>
          </div>

          {/* Account Details Section */}
          <fieldset className={css["account-section"]}>
            <legend>Account Details</legend>
            <div className={css["account-details"]}>
              <p>
                <strong>A/c Name:</strong> JSG International Federation
                <br />
                <strong>Bank:</strong> Indian Bank
                <br />
                <strong>A/c No.:</strong> 417721000
                <br />
                <strong>IFSC Code:</strong> IDIB000P049
                <br />
                <strong>Branch:</strong> Prarthana Samaj Branch, Mumbai
              </p>
            </div>
          </fieldset>

          {/* Action Buttons */}
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
      {/* Submission Messages */}
      {submissionStatus && (
        <div
          className={
            submissionStatus === "success"
              ? css.successMessage
              : css.errorMessage
          }
        >
          {submissionMessage}
        </div>
      )}
      {/* Print Button */}
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
      {/* <div className={css["print-div"]}>
        {isSubmitted && (
          <button
            onClick={handlePrint}
            className={css["print-btn"]}
            style={{ marginTop: "20px" }}
          >
            Print
          </button>
        )}
      </div> */}
    </div>
  );
}

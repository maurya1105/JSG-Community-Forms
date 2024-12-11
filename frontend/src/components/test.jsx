import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import css from "./test.module.css";

export default function test() {
  console.log(css);

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
  const formRef = useRef(); // Reference for the form content

  // State for WhatsApp and Mobile Numbers
  const [contactNumbers, setContactNumbers] = useState({
    presidentWhatsapp: "",
    presidentMobile: "",
    secretaryWhatsapp: "",
    secretaryMobile: "",
  });

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
        `http://localhost:5000/api/suggestions?query=${query}&type=region`
      );
      const result = await response.json();

      if (result.success) {
        setRegionSuggestions(result.data); // Populate suggestions list
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
        `http://localhost:5000/api/suggestions?query=${query}&type=groupName&region=${encodeURIComponent(
          currentRegion || ""
        )}`
      );
      const result = await response.json();

      if (result.success) {
        setGroupNameSuggestions(result.data); // Populate suggestions list
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
        `http://localhost:5000/api/groups/${String(groupNo)}`
      );
      const result = await response.json();

      if (response.ok && result.success) {
        // Populate form fields with the fetched group details
        setValue("region", result.data.region || "");
        setValue("groupName", result.data.groupName || "");
        setValue("groupNo", String(result.data.groupNo || groupNo)); // Explicitly set group number
        setGroupDetails({
          groupName: result.data.groupName || "",
          region: result.data.region || "",
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

  const onSubmit = async (data) => {
    if (!data.presidentMobile) {
      data.presidentMobile = data.presidentWhatsapp;
    }
    if (!data.secretaryMobile) {
      data.secretaryMobile = data.secretaryWhatsapp;
    }

    setIsSubmitting(true); // Show the spinner
    console.log("Form submitted with data:", data);

    // Simulate an API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitted(true); // Show the "Download as PDF" button
    setIsSubmitting(false); // Hide the spinner
    alert("Form submitted successfully!");
  };

  const handleNumericInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

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

  const handlePrint = async () => {
    const element = formRef.current;
    if (element) {
      // Capture the form as an image
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution for better PDF quality
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");

      // Create a PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const ratio = canvasWidth / pdfWidth;
      const totalPages = Math.ceil(canvasHeight / (pdfHeight * ratio));

      for (let i = 0; i < totalPages; i++) {
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, -i * pdfHeight, pdfWidth, pdfHeight);
      }
      pdf.save("form.pdf");
    }
  };

  const handleWhatsAppChange = (e, role) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Ensure only numeric input

    setContactNumbers((prev) => {
      const isMobileBlank = !prev[`${role}Mobile`]; // Check if Mobile is empty
      return {
        ...prev,
        [`${role}Whatsapp`]: value,
        ...(isMobileBlank && { [`${role}Mobile`]: value }), // Copy WhatsApp to Mobile if it's blank
      };
    });
  };

  const handleMobileChange = (e, role) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Ensure only numbers
    setContactNumbers((prev) => ({
      ...prev,
      [`${role}Mobile`]: value,
    }));
  };

  return (
    <div className={css.test}>
      {/* Header Section */}
      <div className={css["header-section"]}>
        <img src="/api/placeholder/200/100" alt="Logo" className={css.logo} />
        <h1 className={css["form-title"]}>Form B</h1>
      </div>

      {/* Form Section */}
      <div ref={formRef}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={css["scrolling-form"]}
        >
          {/* General Info Section */}
          <div className={css["form-section"]}>
            <h3>General Info</h3>

            <div className={css["form-gorup"]}>
              <h5>STD Code</h5>
              <input
                type="text"
                placeholder="Std code"
                {...register("stdCode", {
                  required: "STD Code is required",
                  pattern: {
                    value: /^[0-9]*$/i,
                    message: "Please enter only numbers",
                  },
                })}
                onInput={handleNumericInput}
              />
              {errors.stdCode && (
                <span className="text-red-500">{errors.stdCode.message}</span>
              )}
            </div>

            {/* Region Input with Enhanced Autocomplete */}
            <div className={css["input-wrapper"]} ref={regionInputRef}>
              <label htmlFor="region" className="input-label">
                Region
              </label>
              <input
                id="region"
                type="text"
                placeholder="Search for a region"
                className="input-field"
                {...register("region", {
                  // required: "Region is required",
                })}
                onChange={handleRegionInputChange}
                onFocus={() =>
                  regionSuggestions.length > 0 && setShowRegionSuggestions(true)
                }
              />
              {errors.region && (
                <p className="error-message">{errors.region.message}</p>
              )}

              {/* Region Suggestions Dropdown */}
              {showRegionSuggestions && regionSuggestions.length > 0 && (
                <ul className="suggestions-dropdown">
                  {regionSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => selectRegionSuggestion(suggestion.region)}
                      className="suggestion-item"
                    >
                      {suggestion.region}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Group Name Input with Enhanced Autocomplete */}
            <div className="input-wrapper" ref={groupNameInputRef}>
              <label htmlFor="groupName" className="input-label">
                Group Name
              </label>
              <input
                id="groupName"
                type="text"
                placeholder={
                  currentRegion
                    ? `Search for a group in ${currentRegion}`
                    : "Select Region First"
                }
                className="input-field"
                {...register("groupName", {
                  // required: "Group Name is required",
                })}
                onChange={handleGroupNameInputChange}
                onFocus={() =>
                  groupNameSuggestions.length > 0 &&
                  setShowGroupNameSuggestions(true)
                }
                disabled={!currentRegion}
              />
              {errors.groupName && (
                <p className="error-message">{errors.groupName.message}</p>
              )}

              {/* Group Name Suggestions Dropdown */}
              {showGroupNameSuggestions && groupNameSuggestions.length > 0 && (
                <ul className="suggestions-dropdown">
                  {groupNameSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => selectGroupNameSuggestion(suggestion)}
                      className="suggestion-item"
                    >
                      {suggestion.groupName}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Group Number Input */}
            <div className="input-wrapper">
              <label htmlFor="groupNo" className="input-label">
                Group Number
              </label>
              <input
                id="groupNo"
                type="text"
                value={groupNo}
                placeholder="Enter group number"
                className="input-field"
                {...register("groupNo", {
                  // required: "Group No is required",
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Please enter only numbers",
                  },
                })}
                onChange={handleGroupNoChange}
              />
              {errors.groupNo && (
                <p className="error-message">{errors.groupNo.message}</p>
              )}
            </div>

            <div className="form-group">
              <h5>Date of Inaugration</h5>
              <input
                type="date"
                {...register("dateOfInaugration", {
                  required: "Date of Inaugration is required",
                })}
              />
              {errors.dateOfInaugration && (
                <span className="text-red-500">
                  {errors.dateOfInaugration.message}
                </span>
              )}
            </div>

            {/* Add similar validation for other fields in General Info section */}
          </div>

          {/* Committee Member Details */}
          <div className="form-section">
            <h3>
              Details of General Council Members and Managing Committee Members
              for 2025 - 2027
            </h3>

            <div className="form-group">
              <h5>General Meeting Date</h5>
              <input
                type="date"
                {...register("generalMeetingDate", {
                  required: "General Meeting Date is required",
                })}
              />
              {errors.generalMeetingDate && (
                <span className="text-red-500">
                  {errors.generalMeetingDate.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <h5>Election Date</h5>
              <input
                type="date"
                {...register("electionDate", {
                  required: "Election Date is required",
                })}
              />
              {errors.electionDate && (
                <span className="text-red-500">
                  {errors.electionDate.message}
                </span>
              )}
            </div>
          </div>

          {/* President Section */}
          <div className="form-section">
            <h3>(1) President</h3>

            <div className="form-group">
              <h5>Membership No.</h5>
              <input
                type="text"
                placeholder="Membership No."
                {...register("presidentMembershipNo", {
                  required: "Membership Number is required",
                  pattern: {
                    value: /^[0-9]*$/i,
                    message: "Please enter only numbers",
                  },
                })}
                onInput={handleNumericInput}
              />
              {errors.presidentMembershipNo && (
                <span className="text-red-500">
                  {errors.presidentMembershipNo.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <h5>Name</h5>
              <input
                type="text"
                placeholder="Name"
                {...register("presidentName", {
                  required: "Name is required",
                })}
              />
              {errors.presidentName && (
                <span className="text-red-500">
                  {errors.presidentName.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <h5>Photo</h5>
              <input
                type="file"
                {...register("presidentPhoto", {
                  required: "Photo is required",
                })}
                onChange={(e) => handleFileChange(e, "presidentPhoto")} // Unique field name
              />
              {errors.presidentPhoto && (
                <span className="text-red-500">
                  {errors.presidentPhoto.message}
                </span>
              )}
            </div>

            {/* Image Preview for President */}
            {previews.presidentPhoto && (
              <div className="mt-3">
                <p>Image Preview (President):</p>
                <img
                  src={previews.presidentPhoto}
                  alt="President preview"
                  className="img-thumbnail"
                  style={{ maxWidth: "200px" }}
                />
              </div>
            )}

            <div className="form-group">
              <h5>Mobile</h5>
              <input
                type="text"
                placeholder="Mobile"
                {...register("presidentMobile", {
                  pattern: {
                    value: /^[0-9]*$/i,
                    message: "Please enter only numbers",
                  },
                })}
                value={contactNumbers.presidentMobile}
                onChange={(e) => handleMobileChange(e, "president")}
                onInput={handleNumericInput}
              />
              {errors.presidentMobile && (
                <span className="text-red-500">
                  {errors.presidentMobile.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <h5>Whatsapp</h5>
              <input
                type="text"
                placeholder="Whatsapp"
                {...register("presidentWhatsapp", {
                  required: "Whatsapp no. is required",
                  pattern: {
                    value: /^[0-9]*$/i,
                    message: "Please enter only numbers",
                  },
                })}
                value={contactNumbers.presidentWhatsapp}
                onChange={(e) => handleWhatsAppChange(e, "president")}
                onInput={handleNumericInput}
              />
              {errors.presidentWhatsapp && (
                <span className="text-red-500">
                  {errors.presidentWhatsapp.message}
                </span>
              )}
            </div>

            {/* Add similar validation for other president fields */}
          </div>

          {/* Secretary Section */}
          <div className="form-section">
            <h3>(2) Sectretary</h3>

            <div className="form-group">
              <h5>Membership No.</h5>
              <input
                type="text"
                placeholder="Membership No."
                {...register("secretaryMembershipNo", {
                  required: "Membership Number is required",
                  pattern: {
                    value: /^[0-9]*$/i,
                    message: "Please enter only numbers",
                  },
                })}
                onInput={handleNumericInput}
              />
              {errors.presidentMembershipNo && (
                <span className="text-red-500">
                  {errors.presidentMembershipNo.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <h5>Name</h5>
              <input
                type="text"
                placeholder="Name"
                {...register("secretaryName", {
                  required: "Name is required",
                })}
              />
              {errors.presidentName && (
                <span className="text-red-500">
                  {errors.presidentName.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <h5>Photo</h5>
              <input
                type="file"
                {...register("secretaryPhoto", {
                  required: "Photo is required",
                })}
                onChange={(e) => handleFileChange(e, "secretaryPhoto")} // Unique field name
              />
              {errors.presidentPhoto && (
                <span className="text-red-500">
                  {errors.presidentPhoto.message}
                </span>
              )}
            </div>

            {/* Image Preview for Secretary */}
            {previews.secretaryPhoto && (
              <div className="mt-3">
                <p>Image Preview (Secretary):</p>
                <img
                  src={previews.secretaryPhoto}
                  alt="Secretary preview"
                  className="img-thumbnail"
                  style={{ maxWidth: "200px" }}
                />
              </div>
            )}

            <div className="form-group">
              <h5>Mobile</h5>
              <input
                type="text"
                placeholder="Mobile"
                {...register("secretaryMobile", {
                  pattern: {
                    value: /^[0-9]*$/i,
                    message: "Please enter only numbers",
                  },
                })}
                value={contactNumbers.secretaryMobile}
                onChange={(e) => handleMobileChange(e, "secretary")}
                onInput={handleNumericInput}
              />
              {errors.secretaryMobile && (
                <span className="text-red-500">
                  {errors.secretaryMobile.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <h5>Whatsapp</h5>
              <input
                type="text"
                placeholder="Whatsapp"
                {...register("secretaryWhatsapp", {
                  required: "Whatsapp no. is required",
                  pattern: {
                    value: /^[0-9]*$/i,
                    message: "Please enter only numbers",
                  },
                })}
                value={contactNumbers.secretaryWhatsapp}
                onChange={(e) => handleWhatsAppChange(e, "secretary")}
                onInput={handleNumericInput}
              />
              {errors.secretaryWhatsapp && (
                <span className="text-red-500">
                  {errors.secretaryWhatsapp.message}
                </span>
              )}
            </div>

            {/* Add similar validation for other president fields */}
          </div>

          {/* Similar sections for Immediate Former President and Committee Members */}
          {/* ... */}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? "Submitting..." : "Submit Form"}
          </button>
        </form>
      </div>
      {isSubmitting && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      {/* Print Button (Visible after submission) */}
      {isSubmitted && (
        <button
          onClick={handlePrint}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          style={{ marginTop: "20px" }}
        >
          Download as PDF
        </button>
      )}
    </div>
  );
}

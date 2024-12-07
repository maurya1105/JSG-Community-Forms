import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Test() {
  const {
    register,
    handleSubmit,
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

  // Fetch group details based on groupNo
  const fetchGroupDetails = async (groupNo) => {
    try {
      const response = await fetch(`/api/groups/${groupNo}`);
      const data = await response.json();

      if (response.ok) {
        setGroupDetails({
          groupName: data.groupName || "",
          region: data.region || "",
        });
      } else {
        setGroupDetails({
          groupName: "",
          region: "",
        });
        console.error("Group not found or error fetching data");
      }
    } catch (error) {
      console.error("Error fetching group details:", error);
    }
  };

  // Trigger fetchGroupDetails when groupNo changes
  useEffect(() => {
    if (groupNo) {
      fetchGroupDetails(groupNo);
    } else {
      // Clear details if groupNo is empty
      setGroupDetails({ groupName: "", region: "" });
    }
  }, [groupNo]);

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
    <div className="form-container">
      {/* Header Section */}
      <div className="header-section">
        <img src="/api/placeholder/200/100" alt="Logo" className="logo" />
        <h1 className="form-title">Form B</h1>
      </div>

      {/* Form Section */}
      <div ref={formRef}>
        <form onSubmit={handleSubmit(onSubmit)} className="scrolling-form">
          {/* General Info Section */}
          <div className="form-section">
            <h3>General Info</h3>

            <div className="form-group">
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

            <div className="form-group">
              <h5>Region</h5>
              <input
                type="text"
                value={groupDetails.region}
                placeholder="Region"
                {...register("region", {
                  required: "Region is required",
                })}
              />
              {errors.region && (
                <span className="text-red-500">{errors.region.message}</span>
              )}
            </div>

            <div className="form-group">
              <h5>Group Name</h5>
              <input
                type="text"
                value={groupDetails.groupName}
                placeholder="Name of the Group"
                {...register("groupName", {
                  required: "Group Name is required",
                })}
              />
              {errors.groupName && (
                <span className="text-red-500">{errors.groupName.message}</span>
              )}
            </div>

            <div className="form-group">
              <h5>Group Number</h5>
              <input
                type="text"
                value={groupNo}
                placeholder="Group No"
                {...register("groupNo", {
                  required: "Group No is required",
                })}
                onChange={(e) => setGroupNo(e.target.value)} // Update state on change
              />
              {errors.groupNo && (
                <span className="text-red-500">{errors.groupNo.message}</span>
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

import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from "react";

export default function Test() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [previews, setPreviews] = useState({}); // State for multiple previews
  
  const onSubmit = data => {
    console.log('Form submitted with data:', data);
    // You could also send this data to an API here
  };

  const handleNumericInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
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

  return (
    <div className="form-container">
      {/* Header Section */}
      <div className="header-section">
        <img
          src="/api/placeholder/200/100"
          alt="Logo"
          className="logo"
        />
        <h1 className="form-title">Form B</h1>
      </div>

      {/* Form Section */}
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
                  message: "Please enter only numbers"
                }
              })} 
              onInput={handleNumericInput}
            />
            {errors.stdCode && <span className="text-red-500">{errors.stdCode.message}</span>}
          </div>

          <div className="form-group">
            <h5>Region</h5>
            <input 
              type="text" 
              placeholder="Region" 
              {...register("region", {
                required: "Region is required"
              })} 
            />
            {errors.region && <span className="text-red-500">{errors.region.message}</span>}
          </div>

          <div className="form-group">
            <h5>Date of Inaugration</h5>
            <input 
              type="date" 
              {...register("dateOfInaugration", {
                required: "Date of Inaugration is required"
              })} 
            />
            {errors.dateOfInaugration && <span className="text-red-500">{errors.dateOfInaugration.message}</span>}
          </div>

          {/* Add similar validation for other fields in General Info section */}
        </div>

        {/* Committee Member Details */}
        <div className="form-section">
          <h3>Details of General Council Members and Managing Committee Members for 2025 - 2027</h3>

          <div className="form-group">
            <h5>General Meeting Date</h5>
            <input 
              type="date" 
              {...register("generalMeetingDate", {
                required: "General Meeting Date is required"
              })} 
            />
            {errors.generalMeetingDate && <span className="text-red-500">{errors.generalMeetingDate.message}</span>}
          </div>

          <div className="form-group">
            <h5>Election Date</h5>
            <input 
              type="date" 
              {...register("electionDate", {
                required: "Election Date is required"
              })} 
            />
            {errors.electionDate && <span className="text-red-500">{errors.electionDate.message}</span>}
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
                  message: "Please enter only numbers"
                }
              })} 
              onInput={handleNumericInput}
            />
            {errors.presidentMembershipNo && <span className="text-red-500">{errors.presidentMembershipNo.message}</span>}
          </div>

          <div className="form-group">
            <h5>Name</h5>
            <input 
              type="text" 
              placeholder="Name" 
              {...register("presidentName", {
                required: "Name is required"
              })} 
            />
            {errors.presidentName && <span className="text-red-500">{errors.presidentName.message}</span>}
          </div>

          <div className="form-group">
            <h5>Photo</h5>
            <input 
              type="file" 
              {...register("presidentPhoto", {
                required: "Photo is required"
              })}
              onChange={(e) => handleFileChange(e, "presidentPhoto")} // Unique field name
            />
            {errors.presidentPhoto && <span className="text-red-500">{errors.presidentPhoto.message}</span>}
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
                  message: "Please enter only numbers"
                }
              })} 
              onInput={handleNumericInput}
            />
            {errors.presidentMembershipNo && <span className="text-red-500">{errors.presidentMembershipNo.message}</span>}
          </div>

          <div className="form-group">
            <h5>Name</h5>
            <input 
              type="text" 
              placeholder="Name" 
              {...register("secretaryName", {
                required: "Name is required"
              })} 
            />
            {errors.presidentName && <span className="text-red-500">{errors.presidentName.message}</span>}
          </div>

          <div className="form-group">
            <h5>Photo</h5>
            <input 
              type="file" 
              {...register("secretaryPhoto", {
                required: "Photo is required"
              })}
              onChange={(e) => handleFileChange(e, "secretaryPhoto")} // Unique field name
            />
            {errors.presidentPhoto && <span className="text-red-500">{errors.presidentPhoto.message}</span>}
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

          {/* Add similar validation for other president fields */}
        </div>

        {/* Similar sections for Immediate Former President and Committee Members */}
        {/* ... */}

        {/* Submit Button */}
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Submit Form
        </button>
      </form>
    </div>
  );
}
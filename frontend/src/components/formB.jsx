import React from 'react';
import { useForm } from 'react-hook-form';
import logo from '../assets/JSG_logo.png';
import "./formB.css";
import { remoteUrl } from '../api.config';
import axios from 'axios';
import { useState } from "react";


export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [previews, setPreviews] = useState({}); // State for multiple previews
  // const onSubmit = data => {
  //   console.log('Form submitted with data:', data);
  //   alert("Form submitted successfully!");
  //   // You could also send this data to an API here
  // };

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
      const response = await axios.post(`${remoteUrl}/api/forums`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Response:', response.data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form. Please try again.');
    }
  };

  
  console.log(errors);

  const handleNumericInput = (e) => {
    // Allow only numeric input (prevent non-numeric characters)
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
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

  return (
    <div className="form-container">
      {/* Header Section */}
      <div className="header-section">
        <img
          src= {logo} // Replace with the logo URL
          alt="Logo"
          className="logo"
        />

        <div className="header-details">
        <h1>JAIN SOCIAL GROUPS INT. FEDERATION</h1>
        <p>4-O/P, Vijay Chambers, Opp. Dreamland Cinema, Tribhuvan Road, Mumbai - 400 004<br/>
        Tel.: 022-35302861  Mobile: 8169274400  E-mail: office@jsgif.co.in <a href='https://jsgif.co.in'>www.jsgif.co.in</a></p>

        </div>
        <h1 className="form-title">Form "B"</h1>
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
        maxLength: { value: 10, message: "STD Code cannot exceed 10 digits" },
        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.stdCode && <span className="text-red-500 text-sm">{errors.stdCode.message}</span>}
  </div>

  <div className="form-group">
    <h5>Region</h5>
    <input 
      type="text" 
      placeholder="Region" 
      {...register("region", {

      })} 
    />
    {errors.region && <span className="text-red-500 text-sm">{errors.region.message}</span>}
  </div>

  <div className="form-group">
    <h5>Date of Inaugration</h5>
    <input 
      type="date" 
      placeholder="Date of Inaugration" 
      {...register("dateOfInaugration", {

      })} 
    />
    {errors.dateOfInaugration && <span className="text-red-500 text-sm">{errors.dateOfInaugration.message}</span>}
  </div>

  <div className="form-group">
    <h5>Date of Charter</h5>
    <input 
      type="date" 
      placeholder="Date of Charter" 
      {...register("dateOfCharter", {

      })} 
    />
    {errors.dateOfCharter && <span className="text-red-500 text-sm">{errors.dateOfCharter.message}</span>}
  </div>

  <div className="form-group">
    <h5>Name of Sponsoring Group</h5>
    <input 
      type="text" 
      placeholder="Name of Sponsoring Group" 
      {...register("sponsoringGroup", {

      })} 
    />
    {errors.sponsoringGroup && <span className="text-red-500 text-sm">{errors.sponsoringGroup.message}</span>}
  </div>

  <div className="form-group">
    <h5>Name of the Forum</h5>
    <input 
      type="text" 
      placeholder="Name of the Forum" 
      {...register("forumName", {

      })} 
    />
    {errors.forumName && <span className="text-red-500 text-sm">{errors.forumName.message}</span>}
  </div>

  <div className="form-group">
    <h5>Group No.</h5>
    <input 
      type="text" 
      placeholder="Group No." 
      {...register("groupNo", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.groupNo && <span className="text-red-500 text-sm">{errors.groupNo.message}</span>}
  </div>

  <div className="form-group full-row">
    <h5>Correspondence Address</h5>
    <textarea 
      type="text" 
      placeholder="Address" 
      {...register("address", {

      })} 
    />
    {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
  </div>

  <div className="form-group">
    <h5>Pin Code</h5>
    <input 
      type="text" 
      placeholder="Pin Code" 
      {...register("pinCode", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 6, message: "Pin Code must be 6 digits" },
        maxLength: { value: 6, message: "Pin Code must be 6 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.pinCode && <span className="text-red-500 text-sm">{errors.pinCode.message}</span>}
  </div>

  <div className="form-group">
    <h5>Phone (with STD)</h5>
    <input 
      type="text" 
      placeholder="Phone (with STD)" 
      {...register("phone", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 8, message: "Phone number must be at least 8 digits" },
        maxLength: { value: 15, message: "Phone number cannot exceed 15 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
  </div>

  <div className="form-group">
    <h5>Mobile</h5>
    <input 
      type="text" 
      placeholder="Mobile" 
      {...register("mobile", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "Mobile number must be 10 digits" },
        maxLength: { value: 10, message: "Mobile number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile.message}</span>}
  </div>

  <div className="form-group">
    <h5>E-Mail</h5>
    <input 
      type="email" 
      placeholder="E-Mail" 
      {...register("email", {

        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })} 
    />
    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
  </div>
      </div>

      {/*Comittee Member Details */}
      <div className="form-section">
        <h3>Details of General Council Members and Managing Committee Members for 2025 - 2027</h3>

        <div className="form-group">
          <h5>General Meeting for Election of our Forum was held on Date</h5>
          <input type="date" {...register("general-meet", {required: false})} />
        </div>

        <div className="form-group">
          <h5>Following Office Bearers of our Forum were elected on Date</h5>
          <input type="date"  {...register("elected-bearers", {required: false})} />
        </div>
      </div>

      {/*President */}
      <div className="form-section">
  <h3>(1) President</h3>

  <div className="form-group">
    <h5>Name</h5>
    <input 
      type="text" 
      placeholder="Name" 
      {...register("presidentName", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.presidentName && <span className="text-red-500 text-sm">{errors.presidentName.message}</span>}
  </div>

  <div className="form-group">
    <h5>Passport Size Photo</h5>
    <input 
      type="file" 
      accept="image/*"
      {...register("presidentPhoto", {

      })} 
      onChange={(e) => handleFileChange(e, "presidentPhoto")} // Unique field name
    />
    {errors.presidentPhoto && <span className="text-red-500 text-sm">{errors.presidentPhoto.message}</span>}
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

  <div className="form-group full-row">
    <h5>Correspondence Address</h5>
    <textarea 
      type="text" 
      placeholder="Address" 
      {...register("presidentAddress", {

        minLength: { value: 10, message: "Please enter complete address" }
      })} 
    />
    {errors.presidentAddress && <span className="text-red-500 text-sm">{errors.presidentAddress.message}</span>}
  </div>

  <div className="form-group">
    <h5>Pin Code</h5>
    <input 
      type="text" 
      placeholder="Pin Code" 
      {...register("presidentPinCode", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 6, message: "Pin Code must be 6 digits" },
        maxLength: { value: 6, message: "Pin Code must be 6 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.presidentPinCode && <span className="text-red-500 text-sm">{errors.presidentPinCode.message}</span>}
  </div>

  <div className="form-group">
    <h5>Phone (with STD)</h5>
    <input 
      type="text" 
      placeholder="Phone (with STD)" 
      {...register("presidentPhone", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 8, message: "Phone number must be at least 8 digits" },
        maxLength: { value: 15, message: "Phone number cannot exceed 15 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.presidentPhone && <span className="text-red-500 text-sm">{errors.presidentPhone.message}</span>}
  </div>

  <div className="form-group">
    <h5>Mobile</h5>
    <input 
      type="text" 
      placeholder="Mobile" 
      {...register("presidentMobile", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "Mobile number must be 10 digits" },
        maxLength: { value: 10, message: "Mobile number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.presidentMobile && <span className="text-red-500 text-sm">{errors.presidentMobile.message}</span>}
  </div>

  <div className="form-group">
    <h5>Whatsapp No.</h5>
    <input 
      type="text" 
      placeholder="Whatsapp No." 
      {...register("presidentWhatsapp", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "WhatsApp number must be 10 digits" },
        maxLength: { value: 10, message: "WhatsApp number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.presidentWhatsapp && <span className="text-red-500 text-sm">{errors.presidentWhatsapp.message}</span>}
  </div>

  <div className="form-group">
    <h5>E-Mail</h5>
    <input 
      type="email" 
      placeholder="E-Mail" 
      {...register("presidentEmail", {

        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })} 
    />
    {errors.presidentEmail && <span className="text-red-500 text-sm">{errors.presidentEmail.message}</span>}
  </div>

  <div className="form-group">
    <h5>Occupation Details</h5>
    <input 
      type="text" 
      placeholder="Occupation" 
      {...register("presidentOccupation", {

      })} 
    />
    {errors.presidentOccupation && <span className="text-red-500 text-sm">{errors.presidentOccupation.message}</span>}
  </div>

  <div className="form-group">
    <h5>Spouse's Name</h5>
    <input 
      type="text" 
      placeholder="Spouse's Name" 
      {...register("presidentSpouseName", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.presidentSpouseName && <span className="text-red-500 text-sm">{errors.presidentSpouseName.message}</span>}
  </div>

  <div className="form-group">
    <h5>Birth Date</h5>
    <input 
      type="date" 
      {...register("presidentBirthDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Birth date cannot be in the future";
        }
      })} 
    />
    {errors.presidentBirthDate && <span className="text-red-500 text-sm">{errors.presidentBirthDate.message}</span>}
  </div>

  <div className="form-group">
    <h5>Spouse's Birth Date</h5>
    <input 
      type="date" 
      {...register("presidentSpouseBirthDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Birth date cannot be in the future";
        }
      })} 
    />
    {errors.presidentSpouseBirthDate && <span className="text-red-500 text-sm">{errors.presidentSpouseBirthDate.message}</span>}
  </div>

  <div className="form-group">
    <h5>Marriage Date</h5>
    <input 
      type="date" 
      {...register("presidentMarriageDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Marriage date cannot be in the future";
        }
      })} 
    />
    {errors.presidentMarriageDate && <span className="text-red-500 text-sm">{errors.presidentMarriageDate.message}</span>}
  </div>
    </div>

      {/*Immediate Former President */}
      <div className="form-section">
  <h3>(2) Immediate Former President</h3>

  <div className="form-group">
    <h5>Name</h5>
    <input 
      type="text" 
      placeholder="Name" 
      {...register("immediateFormerPresidentName", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.immediateFormerPresidentName && <span className="text-red-500 text-sm">{errors.immediateFormerPresidentName.message}</span>}
  </div>

  <div className="form-group">
    <h5>Passport Size Photo</h5>
    <input 
      type="file" 
      accept="image/*"
      {...register("immediateFormerPresidentPhoto", {

      })} 
      onChange={(e) => handleFileChange(e, "immediateFormerPresidentPhoto")} // Unique field name
    />
    {errors.immediateFormerPresidentPhoto && <span className="text-red-500 text-sm">{errors.immediateFormerPresidentPhoto.message}</span>}
  </div>

    {/* Image Preview for Immediate Former President */}
    {previews.immediateFormerPresidentPhoto && (
            <div className="mt-3">
              <p>Image Preview (Immediate Former President):</p>
              <img
                src={previews.immediateFormerPresidentPhoto}
                alt="Secretary preview"
                className="img-thumbnail"
                style={{ maxWidth: "200px" }}
              />
            </div>
          )}

  <div className="form-group full-row">
    <h5>Correspondence Address</h5>
    <textarea 
      type="text" 
      placeholder="Address" 
      {...register("immediateFormerPresidentAddress", {

        minLength: { value: 10, message: "Please enter complete address" }
      })} 
    />
    {errors.immediateFormerPresidentAddress && <span className="text-red-500 text-sm">{errors.immediateFormerPresidentAddress.message}</span>}
  </div>

  <div className="form-group">
    <h5>Pin Code</h5>
    <input 
      type="text" 
      placeholder="Pin Code" 
      {...register("immediateFormerPresidentPinCode", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 6, message: "Pin Code must be 6 digits" },
        maxLength: { value: 6, message: "Pin Code must be 6 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.immediateFormerPresidentPinCode && <span className="text-red-500 text-sm">{errors.immediateFormerPresidentPinCode.message}</span>}
  </div>

  <div className="form-group">
    <h5>Phone (with STD)</h5>
    <input 
      type="text" 
      placeholder="Phone (with STD)" 
      {...register("immediateFormerPresidentPhone", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 8, message: "Phone number must be at least 8 digits" },
        maxLength: { value: 15, message: "Phone number cannot exceed 15 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.immediateFormerPresidentPhone && <span className="text-red-500 text-sm">{errors.immediateFormerPresidentPhone.message}</span>}
  </div>

  <div className="form-group">
    <h5>Mobile</h5>
    <input 
      type="text" 
      placeholder="Mobile" 
      {...register("immediateFormerPresidentMobile", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "Mobile number must be 10 digits" },
        maxLength: { value: 10, message: "Mobile number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.immediateFormerPresidentMobile && <span className="text-red-500 text-sm">{errors.immediateFormerPresidentMobile.message}</span>}
  </div>

  <div className="form-group">
    <h5>Whatsapp No.</h5>
    <input 
      type="text" 
      placeholder="Whatsapp No." 
      {...register("immediateFormerPresidentWhatsapp", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "WhatsApp number must be 10 digits" },
        maxLength: { value: 10, message: "WhatsApp number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.immediateFormerPresidentWhatsapp && <span className="text-red-500 text-sm">{errors.immediateFormerPresidentWhatsapp.message}</span>}
  </div>

  <div className="form-group">
    <h5>E-Mail</h5>
    <input 
      type="email" 
      placeholder="E-Mail" 
      {...register("immediateFormerPresidentEmail", {

        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })} 
    />
    {errors.immediateFormerPresidentEmail && <span className="text-red-500 text-sm">{errors.immediateFormerPresidentEmail.message}</span>}
  </div>

  <div className="form-group">
    <h5>Occupation Details</h5>
    <input 
      type="text" 
      placeholder="Occupation" 
      {...register("immediateFormerPresidentOccupation", {

      })} 
    />
    {errors.immediateFormerPresidentOccupation && <span className="text-red-500 text-sm">{errors.immediateFormerPresidentOccupation.message}</span>}
  </div>

  <div className="form-group">
    <h5>Spouse's Name</h5>
    <input 
      type="text" 
      placeholder="Spouse's Name" 
      {...register("immediateFormerPresidentSpouseName", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.immediateFormerPresidentSpouseName && <span className="text-red-500 text-sm">{errors.immediateFormerPresidentSpouseName.message}</span>}
  </div>

  <div className="form-group">
    <h5>Birth Date</h5>
    <input 
      type="date" 
      {...register("immediateFormerPresidentBirthDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Birth date cannot be in the future";
        }
      })} 
    />
    {errors.immediateFormerPresidentBirthDate && <span className="text-red-500 text-sm">{errors.immediateFormerPresidentBirthDate.message}</span>}
  </div>

  <div className="form-group">
    <h5>Spouse's Birth Date</h5>
    <input 
      type="date" 
      {...register("immediateFormerPresidentSpouseBirthDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Birth date cannot be in the future";
        }
      })} 
    />
    {errors.immediateFormerPresidentSpouseBirthDate && <span className="text-red-500 text-sm">{errors.immediateFormerPresidentSpouseBirthDate.message}</span>}
  </div>

  <div className="form-group">
    <h5>Marriage Date</h5>
    <input 
      type="date" 
      {...register("immediateFormerPresidentMarriageDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Marriage date cannot be in the future";
        }
      })} 
    />
    {errors.immediateFormerPresidentMarriageDate && <span className="text-red-500 text-sm">{errors.immediateFormerPresidentMarriageDate.message}</span>}
  </div>
    </div>

      {/*Founder President */}
      <div className="form-section">
  <h3>(3) Founder President</h3>

  <div className="form-group">
    <h5>Name</h5>
    <input 
      type="text" 
      placeholder="Name" 
      {...register("founderPresidentName", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.founderPresidentName && <span className="text-red-500 text-sm">{errors.founderPresidentName.message}</span>}
  </div>

  <div className="form-group">
    <h5>Passport Size Photo</h5>
    <input 
      type="file" 
      accept="image/*"
      {...register("founderPresidentPhoto", {

      })} 
      onChange={(e) => handleFileChange(e, "founderPresidentPhoto")} // Unique field name
    />
    {errors.founderPresidentPhoto && <span className="text-red-500 text-sm">{errors.founderPresidentPhoto.message}</span>}
  </div>
  {/* Image Preview for Founder President */}
  {previews.founderPresidentPhoto && (
            <div className="mt-3">
              <p>Image Preview (Founder President):</p>
              <img
                src={previews.founderPresidentPhoto}
                alt="Founder President preview"
                className="img-thumbnail"
                style={{ maxWidth: "200px" }}
              />
            </div>
          )}

  <div className="form-group full-row">
    <h5>Correspondence Address</h5>
    <textarea 
      type="text" 
      placeholder="Address" 
      {...register("founderPresidentAddress", {

        minLength: { value: 10, message: "Please enter complete address" }
      })} 
    />
    {errors.founderPresidentAddress && <span className="text-red-500 text-sm">{errors.founderPresidentAddress.message}</span>}
  </div>

  <div className="form-group">
    <h5>Pin Code</h5>
    <input 
      type="text" 
      placeholder="Pin Code" 
      {...register("founderPresidentPinCode", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 6, message: "Pin Code must be 6 digits" },
        maxLength: { value: 6, message: "Pin Code must be 6 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.founderPresidentPinCode && <span className="text-red-500 text-sm">{errors.founderPresidentPinCode.message}</span>}
  </div>

  <div className="form-group">
    <h5>Phone (with STD)</h5>
    <input 
      type="text" 
      placeholder="Phone (with STD)" 
      {...register("founderPresidentPhone", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 8, message: "Phone number must be at least 8 digits" },
        maxLength: { value: 15, message: "Phone number cannot exceed 15 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.founderPresidentPhone && <span className="text-red-500 text-sm">{errors.founderPresidentPhone.message}</span>}
  </div>

  <div className="form-group">
    <h5>Mobile</h5>
    <input 
      type="text" 
      placeholder="Mobile" 
      {...register("founderPresidentMobile", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "Mobile number must be 10 digits" },
        maxLength: { value: 10, message: "Mobile number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.founderPresidentMobile && <span className="text-red-500 text-sm">{errors.founderPresidentMobile.message}</span>}
  </div>

  <div className="form-group">
    <h5>Whatsapp No.</h5>
    <input 
      type="text" 
      placeholder="Whatsapp No." 
      {...register("founderPresidentWhatsapp", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "WhatsApp number must be 10 digits" },
        maxLength: { value: 10, message: "WhatsApp number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.founderPresidentWhatsapp && <span className="text-red-500 text-sm">{errors.founderPresidentWhatsapp.message}</span>}
  </div>

  <div className="form-group">
    <h5>E-Mail</h5>
    <input 
      type="email" 
      placeholder="E-Mail" 
      {...register("founderPresidentEmail", {

        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })} 
    />
    {errors.founderPresidentEmail && <span className="text-red-500 text-sm">{errors.founderPresidentEmail.message}</span>}
  </div>

  <div className="form-group">
    <h5>Occupation Details</h5>
    <input 
      type="text" 
      placeholder="Occupation" 
      {...register("founderPresidentOccupation", {

      })} 
    />
    {errors.founderPresidentOccupation && <span className="text-red-500 text-sm">{errors.founderPresidentOccupation.message}</span>}
  </div>

  <div className="form-group">
    <h5>Spouse's Name</h5>
    <input 
      type="text" 
      placeholder="Spouse's Name" 
      {...register("founderPresidentSpouseName", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.founderPresidentSpouseName && <span className="text-red-500 text-sm">{errors.founderPresidentSpouseName.message}</span>}
  </div>

  <div className="form-group">
    <h5>Birth Date</h5>
    <input 
      type="date" 
      {...register("founderPresidentBirthDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Birth date cannot be in the future";
        }
      })} 
    />
    {errors.founderPresidentBirthDate && <span className="text-red-500 text-sm">{errors.founderPresidentBirthDate.message}</span>}
  </div>

  <div className="form-group">
    <h5>Spouse's Birth Date</h5>
    <input 
      type="date" 
      {...register("founderPresidentSpouseBirthDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Birth date cannot be in the future";
        }
      })} 
    />
    {errors.founderPresidentSpouseBirthDate && <span className="text-red-500 text-sm">{errors.founderPresidentSpouseBirthDate.message}</span>}
  </div>

  <div className="form-group">
    <h5>Marriage Date</h5>
    <input 
      type="date" 
      {...register("founderPresidentMarriageDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Marriage date cannot be in the future";
        }
      })} 
    />
    {errors.founderPresidentMarriageDate && <span className="text-red-500 text-sm">{errors.founderPresidentMarriageDate.message}</span>}
  </div>
      </div>

      {/*Nominated Former President 1 */}
      <div className="form-section">
  <h3>(5) Nominated Former President - 1</h3>


  <div className="form-group">
    <h5>Name</h5>
    <input 
      type="text" 
      placeholder="Name" 
      {...register("nominatedFormerPresident1Name", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.nominatedFormerPresident1Name && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident1Name.message}</span>}
  </div>

  <div className="form-group">
    <h5>Passport Size Photo</h5>
    <input 
      type="file" 
      accept="image/*"
      {...register("nominatedFormerPresident1Photo", {

      })} 
      onChange={(e) => handleFileChange(e, "nominatedFormerPresident1Photo")} // Unique field name
    />
    {errors.nominatedFormerPresident1Photo && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident1Photo.message}</span>}
  </div>
  {/* Image Preview for Nominated Former President 1 */}
  {previews.nominatedFormerPresident1Photo && (
            <div className="mt-3">
              <p>Image Preview (Nominated Former President 1):</p>
              <img
                src={previews.nominatedFormerPresident1Photo}
                alt="Nominated Former President 1 preview"
                className="img-thumbnail"
                style={{ maxWidth: "200px" }}
              />
            </div>
          )}

  <div className="form-group full-row">
    <h5>Correspondence Address</h5>
    <textarea 
      type="text" 
      placeholder="Address" 
      {...register("nominatedFormerPresident1Address", {

        minLength: { value: 10, message: "Please enter complete address" }
      })} 
    />
    {errors.nominatedFormerPresident1Address && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident1Address.message}</span>}
  </div>

  <div className="form-group">
    <h5>Pin Code</h5>
    <input 
      type="text" 
      placeholder="Pin Code" 
      {...register("nominatedFormerPresident1PinCode", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 6, message: "Pin Code must be 6 digits" },
        maxLength: { value: 6, message: "Pin Code must be 6 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.nominatedFormerPresident1PinCode && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident1PinCode.message}</span>}
  </div>

  <div className="form-group">
    <h5>Phone (with STD)</h5>
    <input 
      type="text" 
      placeholder="Phone (with STD)" 
      {...register("nominatedFormerPresident1Phone", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 8, message: "Phone number must be at least 8 digits" },
        maxLength: { value: 15, message: "Phone number cannot exceed 15 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.nominatedFormerPresident1Phone && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident1Phone.message}</span>}
  </div>

  <div className="form-group">
    <h5>Mobile</h5>
    <input 
      type="text" 
      placeholder="Mobile" 
      {...register("nominatedFormerPresident1Mobile", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "Mobile number must be 10 digits" },
        maxLength: { value: 10, message: "Mobile number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.nominatedFormerPresident1Mobile && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident1Mobile.message}</span>}
  </div>

  <div className="form-group">
    <h5>Whatsapp No.</h5>
    <input 
      type="text" 
      placeholder="Whatsapp No." 
      {...register("nominatedFormerPresident1Whatsapp", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "WhatsApp number must be 10 digits" },
        maxLength: { value: 10, message: "WhatsApp number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.nominatedFormerPresident1Whatsapp && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident1Whatsapp.message}</span>}
  </div>

  <div className="form-group">
    <h5>E-Mail</h5>
    <input 
      type="email" 
      placeholder="E-Mail" 
      {...register("nominatedFormerPresident1Email", {

        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })} 
    />
    {errors.nominatedFormerPresident1Email && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident1Email.message}</span>}
  </div>

  <div className="form-group">
    <h5>Occupation Details</h5>
    <input 
      type="text" 
      placeholder="Occupation" 
      {...register("nominatedFormerPresident1Occupation", {

      })} 
    />
    {errors.nominatedFormerPresident1Occupation && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident1Occupation.message}</span>}
  </div>

  <div className="form-group">
    <h5>Spouse's Name</h5>
    <input 
      type="text" 
      placeholder="Spouse's Name" 
      {...register("nominatedFormerPresident1SpouseName", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.nominatedFormerPresident1SpouseName && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident1SpouseName.message}</span>}
  </div>

  <div className="form-group">
    <h5>Birth Date</h5>
    <input 
      type="date" 
      {...register("nominatedFormerPresident1BirthDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Birth date cannot be in the future";
        }
      })} 
    />
    {errors.nominatedFormerPresident1BirthDate && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident1BirthDate.message}</span>}
  </div>

  <div className="form-group">
    <h5>Spouse's Birth Date</h5>
    <input 
      type="date" 
      {...register("nominatedFormerPresident1SpouseBirthDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Birth date cannot be in the future";
        }
      })} 
    />
    {errors.nominatedFormerPresident1SpouseBirthDate && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident1SpouseBirthDate.message}</span>}
  </div>

  <div className="form-group">
    <h5>Marriage Date</h5>
    <input 
      type="date" 
      {...register("nominatedFormerPresident1MarriageDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Marriage date cannot be in the future";
        }
      })} 
    />
    {errors.nominatedFormerPresident1MarriageDate && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident1MarriageDate.message}</span>}
  </div>
      </div>

      {/*Nominated Former President 2 */}
      <div className="form-section">
  <h3>(5) Nominated Former President - 2</h3>

  <div className="form-group">
    <h5>Name</h5>
    <input 
      type="text" 
      placeholder="Name" 
      {...register("nominatedFormerPresident2Name", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.nominatedFormerPresident2Name && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident2Name.message}</span>}
  </div>

  <div className="form-group">
    <h5>Passport Size Photo</h5>
    <input 
      type="file" 
      accept="image/*"
      {...register("nominatedFormerPresident2Photo", {

      })} 
      onChange={(e) => handleFileChange(e, "nominatedFormerPresident2Photo")} // Unique field name
    />
    {errors.nominatedFormerPresident2Photo && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident2Photo.message}</span>}
  </div>
  {/* Image Preview for Nominated Former President 2 */}
  {previews.nominatedFormerPresident2Photo && (
            <div className="mt-3">
              <p>Image Preview (Nominated Former President 2):</p>
              <img
                src={previews.nominatedFormerPresident2Photo}
                alt="Nominated Former President 2 preview"
                className="img-thumbnail"
                style={{ maxWidth: "200px" }}
              />
            </div>
          )}

  <div className="form-group full-row">
    <h5>Correspondence Address</h5>
    <textarea 
      type="text" 
      placeholder="Address" 
      {...register("nominatedFormerPresident2Address", {

        minLength: { value: 10, message: "Please enter complete address" }
      })} 
    />
    {errors.nominatedFormerPresident2Address && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident2Address.message}</span>}
  </div>

  <div className="form-group">
    <h5>Pin Code</h5>
    <input 
      type="text" 
      placeholder="Pin Code" 
      {...register("nominatedFormerPresident2PinCode", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 6, message: "Pin Code must be 6 digits" },
        maxLength: { value: 6, message: "Pin Code must be 6 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.nominatedFormerPresident2PinCode && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident2PinCode.message}</span>}
  </div>

  <div className="form-group">
    <h5>Phone (with STD)</h5>
    <input 
      type="text" 
      placeholder="Phone (with STD)" 
      {...register("nominatedFormerPresident2Phone", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 8, message: "Phone number must be at least 8 digits" },
        maxLength: { value: 15, message: "Phone number cannot exceed 15 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.nominatedFormerPresident2Phone && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident2Phone.message}</span>}
  </div>

  <div className="form-group">
    <h5>Mobile</h5>
    <input 
      type="text" 
      placeholder="Mobile" 
      {...register("nominatedFormerPresident2Mobile", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "Mobile number must be 10 digits" },
        maxLength: { value: 10, message: "Mobile number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.nominatedFormerPresident2Mobile && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident2Mobile.message}</span>}
  </div>

  <div className="form-group">
    <h5>Whatsapp No.</h5>
    <input 
      type="text" 
      placeholder="Whatsapp No." 
      {...register("nominatedFormerPresident2Whatsapp", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "WhatsApp number must be 10 digits" },
        maxLength: { value: 10, message: "WhatsApp number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.nominatedFormerPresident2Whatsapp && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident2Whatsapp.message}</span>}
  </div>

  <div className="form-group">
    <h5>E-Mail</h5>
    <input 
      type="email" 
      placeholder="E-Mail" 
      {...register("nominatedFormerPresident2Email", {

        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })} 
    />
    {errors.nominatedFormerPresident2Email && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident2Email.message}</span>}
  </div>

  <div className="form-group">
    <h5>Occupation Details</h5>
    <input 
      type="text" 
      placeholder="Occupation" 
      {...register("nominatedFormerPresident2Occupation", {

      })} 
    />
    {errors.nominatedFormerPresident2Occupation && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident2Occupation.message}</span>}
  </div>

  <div className="form-group">
    <h5>Spouse's Name</h5>
    <input 
      type="text" 
      placeholder="Spouse's Name" 
      {...register("nominatedFormerPresident2SpouseName", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.nominatedFormerPresident2SpouseName && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident2SpouseName.message}</span>}
  </div>

  <div className="form-group">
    <h5>Birth Date</h5>
    <input 
      type="date" 
      {...register("nominatedFormerPresident2BirthDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Birth date cannot be in the future";
        }
      })} 
    />
    {errors.nominatedFormerPresident2BirthDate && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident2BirthDate.message}</span>}
  </div>

  <div className="form-group">
    <h5>Spouse's Birth Date</h5>
    <input 
      type="date" 
      {...register("nominatedFormerPresident2SpouseBirthDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Birth date cannot be in the future";
        }
      })} 
    />
    {errors.nominatedFormerPresident2SpouseBirthDate && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident2SpouseBirthDate.message}</span>}
  </div>

  <div className="form-group">
    <h5>Marriage Date</h5>
    <input 
      type="date" 
      {...register("nominatedFormerPresident2MarriageDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Marriage date cannot be in the future";
        }
      })} 
    />
    {errors.nominatedFormerPresident2MarriageDate && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident2MarriageDate.message}</span>}
  </div>
      </div>

      {/*Nominated Former President 3 */}
      <div className="form-section">
  <h3>(6) Nominated Former President - 3</h3>


  <div className="form-group">
    <h5>Name</h5>
    <input 
      type="text" 
      placeholder="Name" 
      {...register("nominatedFormerPresident3Name", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.nominatedFormerPresident3Name && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident3Name.message}</span>}
  </div>

  <div className="form-group">
    <h5>Passport Size Photo</h5>
    <input 
      type="file" 
      accept="image/*"
      {...register("nominatedFormerPresident3Photo", {

      })} 
      onChange={(e) => handleFileChange(e, "nominatedFormerPresident3Photo")} // Unique field name
    />
    {errors.nominatedFormerPresident3Photo && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident3Photo.message}</span>}
  </div>
  {/* Image Preview for Nominated Former President 3 */}
  {previews.nominatedFormerPresident3Photo && (
            <div className="mt-3">
              <p>Image Preview (Nominated Former President 3):</p>
              <img
                src={previews.nominatedFormerPresident3Photo}
                alt="Nominated Former President 3 preview"
                className="img-thumbnail"
                style={{ maxWidth: "200px" }}
              />
            </div>
          )}

  <div className="form-group full-row">
    <h5>Correspondence Address</h5>
    <textarea 
      type="text" 
      placeholder="Address" 
      {...register("nominatedFormerPresident3Address", {

        minLength: { value: 10, message: "Please enter complete address" }
      })} 
    />
    {errors.nominatedFormerPresident3Address && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident3Address.message}</span>}
  </div>

  <div className="form-group">
    <h5>Pin Code</h5>
    <input 
      type="text" 
      placeholder="Pin Code" 
      {...register("nominatedFormerPresident3PinCode", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 6, message: "Pin Code must be 6 digits" },
        maxLength: { value: 6, message: "Pin Code must be 6 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.nominatedFormerPresident3PinCode && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident3PinCode.message}</span>}
  </div>

  <div className="form-group">
    <h5>Phone (with STD)</h5>
    <input 
      type="text" 
      placeholder="Phone (with STD)" 
      {...register("nominatedFormerPresident3Phone", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 8, message: "Phone number must be at least 8 digits" },
        maxLength: { value: 15, message: "Phone number cannot exceed 15 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.nominatedFormerPresident3Phone && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident3Phone.message}</span>}
  </div>

  <div className="form-group">
    <h5>Mobile</h5>
    <input 
      type="text" 
      placeholder="Mobile" 
      {...register("nominatedFormerPresident3Mobile", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "Mobile number must be 10 digits" },
        maxLength: { value: 10, message: "Mobile number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.nominatedFormerPresident3Mobile && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident3Mobile.message}</span>}
  </div>

  <div className="form-group">
    <h5>Whatsapp No.</h5>
    <input 
      type="text" 
      placeholder="Whatsapp No." 
      {...register("nominatedFormerPresident3Whatsapp", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "WhatsApp number must be 10 digits" },
        maxLength: { value: 10, message: "WhatsApp number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.nominatedFormerPresident3Whatsapp && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident3Whatsapp.message}</span>}
  </div>

  <div className="form-group">
    <h5>E-Mail</h5>
    <input 
      type="email" 
      placeholder="E-Mail" 
      {...register("nominatedFormerPresident3Email", {

        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })} 
    />
    {errors.nominatedFormerPresident3Email && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident3Email.message}</span>}
  </div>

  <div className="form-group">
    <h5>Occupation Details</h5>
    <input 
      type="text" 
      placeholder="Occupation" 
      {...register("nominatedFormerPresident3Occupation", {

      })} 
    />
    {errors.nominatedFormerPresident3Occupation && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident3Occupation.message}</span>}
  </div>

  <div className="form-group">
    <h5>Spouse's Name</h5>
    <input 
      type="text" 
      placeholder="Spouse's Name" 
      {...register("nominatedFormerPresident3SpouseName", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.nominatedFormerPresident3SpouseName && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident3SpouseName.message}</span>}
  </div>

  <div className="form-group">
    <h5>Birth Date</h5>
    <input 
      type="date" 
      {...register("nominatedFormerPresident3BirthDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Birth date cannot be in the future";
        }
      })} 
    />
    {errors.nominatedFormerPresident3BirthDate && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident3BirthDate.message}</span>}
  </div>

  <div className="form-group">
    <h5>Spouse's Birth Date</h5>
    <input 
      type="date" 
      {...register("nominatedFormerPresident3SpouseBirthDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Birth date cannot be in the future";
        }
      })} 
    />
    {errors.nominatedFormerPresident3SpouseBirthDate && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident3SpouseBirthDate.message}</span>}
  </div>

  <div className="form-group">
    <h5>Marriage Date</h5>
    <input 
      type="date" 
      {...register("nominatedFormerPresident3MarriageDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Marriage date cannot be in the future";
        }
      })} 
    />
    {errors.nominatedFormerPresident3MarriageDate && <span className="text-red-500 text-sm">{errors.nominatedFormerPresident3MarriageDate.message}</span>}
  </div>
      </div>

      {/*Vice President  */}
      <div className="form-section">
  <h3>(7) Vice President</h3>


  <div className="form-group">
    <h5>Name</h5>
    <input 
      type="text" 
      placeholder="Name" 
      {...register("vicePresidentName", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.vicePresidentName && <span className="text-red-500 text-sm">{errors.vicePresidentName.message}</span>}
  </div>

  <div className="form-group">
    <h5>Passport Size Photo</h5>
    <input 
      type="file" 
      accept="image/*"
      {...register("vicePresidentPhoto", {

      })} 
      onChange={(e) => handleFileChange(e, "vicePresidentPhoto")} // Unique field name
    />
    {errors.vicePresidentPhoto && <span className="text-red-500 text-sm">{errors.vicePresidentPhoto.message}</span>}
  </div>
  {/* Image Preview for Vice President */}
  {previews.vicePresidentPhoto && (
            <div className="mt-3">
              <p>Image Preview (Vice President):</p>
              <img
                src={previews.vicePresidentPhoto}
                alt="Vice President preview"
                className="img-thumbnail"
                style={{ maxWidth: "200px" }}
              />
            </div>
          )}

  <div className="form-group full-row">
    <h5>Correspondence Address</h5>
    <textarea 
      type="text" 
      placeholder="Address" 
      {...register("vicePresidentAddress", {

        minLength: { value: 10, message: "Please enter complete address" }
      })} 
    />
    {errors.vicePresidentAddress && <span className="text-red-500 text-sm">{errors.vicePresidentAddress.message}</span>}
  </div>

  <div className="form-group">
    <h5>Pin Code</h5>
    <input 
      type="text" 
      placeholder="Pin Code" 
      {...register("vicePresidentPinCode", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 6, message: "Pin Code must be 6 digits" },
        maxLength: { value: 6, message: "Pin Code must be 6 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.vicePresidentPinCode && <span className="text-red-500 text-sm">{errors.vicePresidentPinCode.message}</span>}
  </div>

  <div className="form-group">
    <h5>Phone (with STD)</h5>
    <input 
      type="text" 
      placeholder="Phone (with STD)" 
      {...register("vicePresidentPhone", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 8, message: "Phone number must be at least 8 digits" },
        maxLength: { value: 15, message: "Phone number cannot exceed 15 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.vicePresidentPhone && <span className="text-red-500 text-sm">{errors.vicePresidentPhone.message}</span>}
  </div>

  <div className="form-group">
    <h5>Mobile</h5>
    <input 
      type="text" 
      placeholder="Mobile" 
      {...register("vicePresidentMobile", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "Mobile number must be 10 digits" },
        maxLength: { value: 10, message: "Mobile number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.vicePresidentMobile && <span className="text-red-500 text-sm">{errors.vicePresidentMobile.message}</span>}
  </div>

  <div className="form-group">
    <h5>Whatsapp No.</h5>
    <input 
      type="text" 
      placeholder="Whatsapp No." 
      {...register("vicePresidentWhatsapp", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "WhatsApp number must be 10 digits" },
        maxLength: { value: 10, message: "WhatsApp number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.vicePresidentWhatsapp && <span className="text-red-500 text-sm">{errors.vicePresidentWhatsapp.message}</span>}
  </div>

  <div className="form-group">
    <h5>E-Mail</h5>
    <input 
      type="email" 
      placeholder="E-Mail" 
      {...register("vicePresidentEmail", {

        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })} 
    />
    {errors.vicePresidentEmail && <span className="text-red-500 text-sm">{errors.vicePresidentEmail.message}</span>}
  </div>

  <div className="form-group">
    <h5>Occupation Details</h5>
    <input 
      type="text" 
      placeholder="Occupation" 
      {...register("vicePresidentOccupation", {

      })} 
    />
    {errors.vicePresidentOccupation && <span className="text-red-500 text-sm">{errors.vicePresidentOccupation.message}</span>}
  </div>

  <div className="form-group">
    <h5>Spouse's Name</h5>
    <input 
      type="text" 
      placeholder="Spouse's Name" 
      {...register("vicePresidentSpouseName", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.vicePresidentSpouseName && <span className="text-red-500 text-sm">{errors.vicePresidentSpouseName.message}</span>}
  </div>

  <div className="form-group">
    <h5>Birth Date</h5>
    <input 
      type="date" 
      {...register("vicePresidentBirthDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Birth date cannot be in the future";
        }
      })} 
    />
    {errors.vicePresidentBirthDate && <span className="text-red-500 text-sm">{errors.vicePresidentBirthDate.message}</span>}
  </div>

  <div className="form-group">
    <h5>Spouse's Birth Date</h5>
    <input 
      type="date" 
      {...register("vicePresidentSpouseBirthDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Birth date cannot be in the future";
        }
      })} 
    />
    {errors.vicePresidentSpouseBirthDate && <span className="text-red-500 text-sm">{errors.vicePresidentSpouseBirthDate.message}</span>}
  </div>

  <div className="form-group">
    <h5>Marriage Date</h5>
    <input 
      type="date" 
      {...register("vicePresidentMarriageDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Marriage date cannot be in the future";
        }
      })} 
    />
    {errors.vicePresidentMarriageDate && <span className="text-red-500 text-sm">{errors.vicePresidentMarriageDate.message}</span>}
  </div>
      </div>

      {/*Secretary */}
      <div className="form-section">
  <h3>(8) Secretary</h3>

  <div className="form-group">
    <h5>Name</h5>
    <input 
      type="text" 
      placeholder="Name" 
      {...register("secretaryName", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.secretaryName && <span className="text-red-500 text-sm">{errors.secretaryName.message}</span>}
  </div>

  <div className="form-group">
    <h5>Passport Size Photo</h5>
    <input 
      type="file" 
      accept="image/*"
      {...register("secretaryPhoto", {

      })} 
      onChange={(e) => handleFileChange(e, "secretaryPhoto")} // Unique field name
    />
    {errors.secretaryPhoto && <span className="text-red-500 text-sm">{errors.secretaryPhoto.message}</span>}
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

  <div className="form-group full-row">
    <h5>Correspondence Address</h5>
    <textarea 
      type="text" 
      placeholder="Address" 
      {...register("secretaryAddress", {

        minLength: { value: 10, message: "Please enter complete address" }
      })} 
    />
    {errors.secretaryAddress && <span className="text-red-500 text-sm">{errors.secretaryAddress.message}</span>}
  </div>

  <div className="form-group">
    <h5>Pin Code</h5>
    <input 
      type="text" 
      placeholder="Pin Code" 
      {...register("secretaryPinCode", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 6, message: "Pin Code must be 6 digits" },
        maxLength: { value: 6, message: "Pin Code must be 6 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.secretaryPinCode && <span className="text-red-500 text-sm">{errors.secretaryPinCode.message}</span>}
  </div>

  <div className="form-group">
    <h5>Phone (with STD)</h5>
    <input 
      type="text" 
      placeholder="Phone (with STD)" 
      {...register("secretaryPhone", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 8, message: "Phone number must be at least 8 digits" },
        maxLength: { value: 15, message: "Phone number cannot exceed 15 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.secretaryPhone && <span className="text-red-500 text-sm">{errors.secretaryPhone.message}</span>}
  </div>

  <div className="form-group">
    <h5>Mobile</h5>
    <input 
      type="text" 
      placeholder="Mobile" 
      {...register("secretaryMobile", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "Mobile number must be 10 digits" },
        maxLength: { value: 10, message: "Mobile number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.secretaryMobile && <span className="text-red-500 text-sm">{errors.secretaryMobile.message}</span>}
  </div>

  <div className="form-group">
    <h5>Whatsapp No.</h5>
    <input 
      type="text" 
      placeholder="Whatsapp No." 
      {...register("secretaryWhatsapp", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "WhatsApp number must be 10 digits" },
        maxLength: { value: 10, message: "WhatsApp number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.secretaryWhatsapp && <span className="text-red-500 text-sm">{errors.secretaryWhatsapp.message}</span>}
  </div>

  <div className="form-group">
    <h5>E-Mail</h5>
    <input 
      type="email" 
      placeholder="E-Mail" 
      {...register("secretaryEmail", {

        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })} 
    />
    {errors.secretaryEmail && <span className="text-red-500 text-sm">{errors.secretaryEmail.message}</span>}
  </div>

  <div className="form-group">
    <h5>Occupation Details</h5>
    <input 
      type="text" 
      placeholder="Occupation" 
      {...register("secretaryOccupation", {

      })} 
    />
    {errors.secretaryOccupation && <span className="text-red-500 text-sm">{errors.secretaryOccupation.message}</span>}
  </div>

  <div className="form-group">
    <h5>Spouse's Name</h5>
    <input 
      type="text" 
      placeholder="Spouse's Name" 
      {...register("secretarySpouseName", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.secretarySpouseName && <span className="text-red-500 text-sm">{errors.secretarySpouseName.message}</span>}
  </div>

  <div className="form-group">
    <h5>Birth Date</h5>
    <input 
      type="date" 
      {...register("secretaryBirthDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Birth date cannot be in the future";
        }
      })} 
    />
    {errors.secretaryBirthDate && <span className="text-red-500 text-sm">{errors.secretaryBirthDate.message}</span>}
  </div>

  <div className="form-group">
    <h5>Spouse's Birth Date</h5>
    <input 
      type="date" 
      {...register("secretarySpouseBirthDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Birth date cannot be in the future";
        }
      })} 
    />
    {errors.secretarySpouseBirthDate && <span className="text-red-500 text-sm">{errors.secretarySpouseBirthDate.message}</span>}
  </div>

  <div className="form-group">
    <h5>Marriage Date</h5>
    <input 
      type="date" 
      {...register("secretaryMarriageDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Marriage date cannot be in the future";
        }
      })} 
    />
    {errors.secretaryMarriageDate && <span className="text-red-500 text-sm">{errors.secretaryMarriageDate.message}</span>}
  </div>
      </div>

      {/*Joint Secretary */}
      <div className="form-section">
  <h3>(9) Joint Secretary</h3>

  <div className="form-group">
    <h5>Name</h5>
    <input 
      type="text" 
      placeholder="Name" 
      {...register("jointSecretaryName", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.jointsecretaryName && <span className="text-red-500 text-sm">{errors.jointsecretaryName.message}</span>}
  </div>

  <div className="form-group">
    <h5>Passport Size Photo</h5>
    <input 
      type="file" 
      accept="image/*"
      {...register("jointSecretaryPhoto", {

      })} 
      onChange={(e) => handleFileChange(e, "jointSecretaryPhoto")} // Unique field name
    />
    {errors.jointSecretaryPhoto && <span className="text-red-500 text-sm">{errors.jointSecretaryPhoto.message}</span>}
  </div>
  {/* Image Preview for Joint Secretary */}
  {previews.jointSecretaryPhoto && (
            <div className="mt-3">
              <p>Image Preview (Joint Secretary):</p>
              <img
                src={previews.jointSecretaryPhoto}
                alt="Secretary preview"
                className="img-thumbnail"
                style={{ maxWidth: "200px" }}
              />
            </div>
          )}

  <div className="form-group full-row">
    <h5>Correspondence Address</h5>
    <textarea 
      type="text" 
      placeholder="Address" 
      {...register("jointSecretaryAddress", {

        minLength: { value: 10, message: "Please enter complete address" }
      })} 
    />
    {errors.jointsecretaryAddress && <span className="text-red-500 text-sm">{errors.jointsecretaryAddress.message}</span>}
  </div>

  <div className="form-group">
    <h5>Pin Code</h5>
    <input 
      type="text" 
      placeholder="Pin Code" 
      {...register("jointSecretaryPinCode", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 6, message: "Pin Code must be 6 digits" },
        maxLength: { value: 6, message: "Pin Code must be 6 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.jointsecretaryPinCode && <span className="text-red-500 text-sm">{errors.jointsecretaryPinCode.message}</span>}
  </div>

  <div className="form-group">
    <h5>Phone (with STD)</h5>
    <input 
      type="text" 
      placeholder="Phone (with STD)" 
      {...register("jointSecretaryPhone", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 8, message: "Phone number must be at least 8 digits" },
        maxLength: { value: 15, message: "Phone number cannot exceed 15 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.jointsecretaryPhone && <span className="text-red-500 text-sm">{errors.jointsecretaryPhone.message}</span>}
  </div>

  <div className="form-group">
    <h5>Mobile</h5>
    <input 
      type="text" 
      placeholder="Mobile" 
      {...register("jointSecretaryMobile", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "Mobile number must be 10 digits" },
        maxLength: { value: 10, message: "Mobile number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.jointsecretaryMobile && <span className="text-red-500 text-sm">{errors.jointsecretaryMobile.message}</span>}
  </div>

  <div className="form-group">
    <h5>Whatsapp No.</h5>
    <input 
      type="text" 
      placeholder="Whatsapp No." 
      {...register("jointSecretaryWhatsapp", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "WhatsApp number must be 10 digits" },
        maxLength: { value: 10, message: "WhatsApp number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.jointsecretaryWhatsapp && <span className="text-red-500 text-sm">{errors.jointsecretaryWhatsapp.message}</span>}
  </div>

  <div className="form-group">
    <h5>E-Mail</h5>
    <input 
      type="email" 
      placeholder="E-Mail" 
      {...register("jointSecretaryEmail", {

        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })} 
    />
    {errors.jointsecretaryEmail && <span className="text-red-500 text-sm">{errors.jointsecretaryEmail.message}</span>}
  </div>

  <div className="form-group">
    <h5>Occupation Details</h5>
    <input 
      type="text" 
      placeholder="Occupation" 
      {...register("jointSecretaryOccupation", {

      })} 
    />
    {errors.jointsecretaryOccupation && <span className="text-red-500 text-sm">{errors.jointsecretaryOccupation.message}</span>}
  </div>

  <div className="form-group">
    <h5>Spouse's Name</h5>
    <input 
      type="text" 
      placeholder="Spouse's Name" 
      {...register("jointSecretarySpouseName", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.jointsecretarySpouseName && <span className="text-red-500 text-sm">{errors.jointsecretarySpouseName.message}</span>}
  </div>

  <div className="form-group">
    <h5>Birth Date</h5>
    <input 
      type="date" 
      {...register("jointSecretaryBirthDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Birth date cannot be in the future";
        }
      })} 
    />
    {errors.jointsecretaryBirthDate && <span className="text-red-500 text-sm">{errors.jointsecretaryBirthDate.message}</span>}
  </div>

  <div className="form-group">
    <h5>Spouse's Birth Date</h5>
    <input 
      type="date" 
      {...register("jointSecretarySpouseBirthDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Birth date cannot be in the future";
        }
      })} 
    />
    {errors.jointsecretarySpouseBirthDate && <span className="text-red-500 text-sm">{errors.jointsecretarySpouseBirthDate.message}</span>}
  </div>

  <div className="form-group">
    <h5>Marriage Date</h5>
    <input 
      type="date" 
      {...register("jointSecretaryMarriageDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Marriage date cannot be in the future";
        }
      })} 
    />
    {errors.jointsecretaryMarriageDate && <span className="text-red-500 text-sm">{errors.jointsecretaryMarriageDate.message}</span>}
  </div>
      </div>

      {/*Treasurer  */}
      <div className="form-section">
  <h3>(10) Treasurer</h3>

  <div className="form-group">
    <h5>Name</h5>
    <input 
      type="text" 
      placeholder="Name" 
      {...register("treasurerName", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.treasurerName && <span className="text-red-500 text-sm">{errors.treasurerName.message}</span>}
  </div>

  <div className="form-group">
    <h5>Passport Size Photo</h5>
    <input 
      type="file" 
      accept="image/*"
      {...register("treasurerPhoto", {

      })} 
      onChange={(e) => handleFileChange(e, "treasurerPhoto")} // Unique field name
    />
    {errors.treasurerPhoto && <span className="text-red-500 text-sm">{errors.treasurerPhoto.message}</span>}
  </div>
  {/* Image Preview for Treasurer */}
  {previews.treasurerPhoto && (
            <div className="mt-3">
              <p>Image Preview (Treasurer):</p>
              <img
                src={previews.treasurerPhoto}
                alt="Treasurer preview"
                className="img-thumbnail"
                style={{ maxWidth: "200px" }}
              />
            </div>
          )}

  <div className="form-group full-row">
    <h5>Correspondence Address</h5>
    <textarea 
      type="text" 
      placeholder="Address" 
      {...register("treasurerAddress", {

        minLength: { value: 10, message: "Please enter complete address" }
      })} 
    />
    {errors.treasurerAddress && <span className="text-red-500 text-sm">{errors.treasurerAddress.message}</span>}
  </div>

  <div className="form-group">
    <h5>Pin Code</h5>
    <input 
      type="text" 
      placeholder="Pin Code" 
      {...register("treasurerPinCode", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 6, message: "Pin Code must be 6 digits" },
        maxLength: { value: 6, message: "Pin Code must be 6 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.treasurerPinCode && <span className="text-red-500 text-sm">{errors.treasurerPinCode.message}</span>}
  </div>

  <div className="form-group">
    <h5>Phone (with STD)</h5>
    <input 
      type="text" 
      placeholder="Phone (with STD)" 
      {...register("treasurerPhone", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 8, message: "Phone number must be at least 8 digits" },
        maxLength: { value: 15, message: "Phone number cannot exceed 15 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.treasurerPhone && <span className="text-red-500 text-sm">{errors.treasurerPhone.message}</span>}
  </div>

  <div className="form-group">
    <h5>Mobile</h5>
    <input 
      type="text" 
      placeholder="Mobile" 
      {...register("treasurerMobile", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "Mobile number must be 10 digits" },
        maxLength: { value: 10, message: "Mobile number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.treasurerMobile && <span className="text-red-500 text-sm">{errors.treasurerMobile.message}</span>}
  </div>

  <div className="form-group">
    <h5>Whatsapp No.</h5>
    <input 
      type="text" 
      placeholder="Whatsapp No." 
      {...register("treasurerWhatsapp", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "WhatsApp number must be 10 digits" },
        maxLength: { value: 10, message: "WhatsApp number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.treasurerWhatsapp && <span className="text-red-500 text-sm">{errors.treasurerWhatsapp.message}</span>}
  </div>

  <div className="form-group">
    <h5>E-Mail</h5>
    <input 
      type="email" 
      placeholder="E-Mail" 
      {...register("treasurerEmail", {

        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })} 
    />
    {errors.treasurerEmail && <span className="text-red-500 text-sm">{errors.treasurerEmail.message}</span>}
  </div>

  <div className="form-group">
    <h5>Occupation Details</h5>
    <input 
      type="text" 
      placeholder="Occupation" 
      {...register("treasurerOccupation", {

      })} 
    />
    {errors.treasurerOccupation && <span className="text-red-500 text-sm">{errors.treasurerOccupation.message}</span>}
  </div>

  <div className="form-group">
    <h5>Spouse's Name</h5>
    <input 
      type="text" 
      placeholder="Spouse's Name" 
      {...register("treasurerSpouseName", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.treasurerSpouseName && <span className="text-red-500 text-sm">{errors.treasurerSpouseName.message}</span>}
  </div>

  <div className="form-group">
    <h5>Birth Date</h5>
    <input 
      type="date" 
      {...register("treasurerBirthDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Birth date cannot be in the future";
        }
      })} 
    />
    {errors.treasurerBirthDate && <span className="text-red-500 text-sm">{errors.treasurerBirthDate.message}</span>}
  </div>

  <div className="form-group">
    <h5>Spouse's Birth Date</h5>
    <input 
      type="date" 
      {...register("treasurerSpouseBirthDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Birth date cannot be in the future";
        }
      })} 
    />
    {errors.treasurerSpouseBirthDate && <span className="text-red-500 text-sm">{errors.treasurerSpouseBirthDate.message}</span>}
  </div>

  <div className="form-group">
    <h5>Marriage Date</h5>
    <input 
      type="date" 
      {...register("treasurerMarriageDate", {

        validate: value => {
          const date = new Date(value);
          const now = new Date();
          return date < now || "Marriage date cannot be in the future";
        }
      })} 
    />
    {errors.treasurerMarriageDate && <span className="text-red-500 text-sm">{errors.treasurerMarriageDate.message}</span>}
  </div>
      </div>

      {/*Committee Member 1 */}
      <div className="form-section">
  <h3>(11) Committee Member 1</h3>

  <div className="form-group">
    <h5>Name</h5>
    <input 
      type="text" 
      placeholder="Name" 
      {...register("committeemember1Name", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.committeemember1Name && <span className="text-red-500 text-sm">{errors.committeemember1Name.message}</span>}
  </div>

  <div className="form-group full-row">
    <h5>Address</h5>
    <textarea 
      type="text" 
      placeholder="Address" 
      {...register("committeemember1Address", {

        minLength: { value: 10, message: "Please enter complete address" }
      })} 
    />
    {errors.committeemember1Address && <span className="text-red-500 text-sm">{errors.committeemember1Address.message}</span>}
  </div>

  <div className="form-group">
    <h5>Pin Code</h5>
    <input 
      type="text" 
      placeholder="Pin Code" 
      {...register("committeemember1PinCode", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 6, message: "Pin Code must be 6 digits" },
        maxLength: { value: 6, message: "Pin Code must be 6 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember1PinCode && <span className="text-red-500 text-sm">{errors.committeemember1PinCode.message}</span>}
  </div>

  <div className="form-group">
    <h5>Phone (with STD)</h5>
    <input 
      type="text" 
      placeholder="Phone (with STD)" 
      {...register("committeemember1Phone", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 8, message: "Phone number must be at least 8 digits" },
        maxLength: { value: 15, message: "Phone number cannot exceed 15 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember1Phone && <span className="text-red-500 text-sm">{errors.committeemember1Phone.message}</span>}
  </div>

  <div className="form-group">
    <h5>Mobile</h5>
    <input 
      type="text" 
      placeholder="Mobile" 
      {...register("committeemember1Mobile", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "Mobile number must be 10 digits" },
        maxLength: { value: 10, message: "Mobile number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember1Mobile && <span className="text-red-500 text-sm">{errors.committeemember1Mobile.message}</span>}
  </div>

  <div className="form-group">
    <h5>E-Mail</h5>
    <input 
      type="email" 
      placeholder="E-Mail" 
      {...register("committeemember1Email", {

        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })} 
    />
    {errors.committeemember1Email && <span className="text-red-500 text-sm">{errors.committeemember1Email.message}</span>}
  </div>
      </div>

      {/*Committee Member 2 */}
      <div className="form-section">
  <h3>(12) Committee Member 2</h3>


  <div className="form-group">
    <h5>Name</h5>
    <input 
      type="text" 
      placeholder="Name" 
      {...register("committeemember2Name", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.committeemember2Name && <span className="text-red-500 text-sm">{errors.committeemember2Name.message}</span>}
  </div>

  <div className="form-group full-row">
    <h5>Address</h5>
    <textarea 
      type="text" 
      placeholder="Address" 
      {...register("committeemember2Address", {

        minLength: { value: 10, message: "Please enter complete address" }
      })} 
    />
    {errors.committeemember2Address && <span className="text-red-500 text-sm">{errors.committeemember2Address.message}</span>}
  </div>

  <div className="form-group">
    <h5>Pin Code</h5>
    <input 
      type="text" 
      placeholder="Pin Code" 
      {...register("committeemember2PinCode", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 6, message: "Pin Code must be 6 digits" },
        maxLength: { value: 6, message: "Pin Code must be 6 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember2PinCode && <span className="text-red-500 text-sm">{errors.committeemember2PinCode.message}</span>}
  </div>

  <div className="form-group">
    <h5>Phone (with STD)</h5>
    <input 
      type="text" 
      placeholder="Phone (with STD)" 
      {...register("committeemember2Phone", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 8, message: "Phone number must be at least 8 digits" },
        maxLength: { value: 15, message: "Phone number cannot exceed 15 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember2Phone && <span className="text-red-500 text-sm">{errors.committeemember2Phone.message}</span>}
  </div>

  <div className="form-group">
    <h5>Mobile</h5>
    <input 
      type="text" 
      placeholder="Mobile" 
      {...register("committeemember2Mobile", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "Mobile number must be 10 digits" },
        maxLength: { value: 10, message: "Mobile number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember2Mobile && <span className="text-red-500 text-sm">{errors.committeemember2Mobile.message}</span>}
  </div>

  <div className="form-group">
    <h5>E-Mail</h5>
    <input 
      type="email" 
      placeholder="E-Mail" 
      {...register("committeemember2Email", {

        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })} 
    />
    {errors.committeemember2Email && <span className="text-red-500 text-sm">{errors.committeemember2Email.message}</span>}
  </div>
      </div>

      {/*Committee Member 3 */}
      <div className="form-section">
  <h3>(13) Committee Member 3</h3>

  <div className="form-group">
    <h5>Name</h5>
    <input 
      type="text" 
      placeholder="Name" 
      {...register("committeemember3Name", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.committeemember3Name && <span className="text-red-500 text-sm">{errors.committeemember3Name.message}</span>}
  </div>

  <div className="form-group full-row">
    <h5>Address</h5>
    <textarea 
      type="text" 
      placeholder="Address" 
      {...register("committeemember3Address", {

        minLength: { value: 10, message: "Please enter complete address" }
      })} 
    />
    {errors.committeemember3Address && <span className="text-red-500 text-sm">{errors.committeemember3Address.message}</span>}
  </div>

  <div className="form-group">
    <h5>Pin Code</h5>
    <input 
      type="text" 
      placeholder="Pin Code" 
      {...register("committeemember3PinCode", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 6, message: "Pin Code must be 6 digits" },
        maxLength: { value: 6, message: "Pin Code must be 6 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember3PinCode && <span className="text-red-500 text-sm">{errors.committeemember3PinCode.message}</span>}
  </div>

  <div className="form-group">
    <h5>Phone (with STD)</h5>
    <input 
      type="text" 
      placeholder="Phone (with STD)" 
      {...register("committeemember3Phone", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 8, message: "Phone number must be at least 8 digits" },
        maxLength: { value: 15, message: "Phone number cannot exceed 15 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember3Phone && <span className="text-red-500 text-sm">{errors.committeemember3Phone.message}</span>}
  </div>

  <div className="form-group">
    <h5>Mobile</h5>
    <input 
      type="text" 
      placeholder="Mobile" 
      {...register("committeemember3Mobile", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "Mobile number must be 10 digits" },
        maxLength: { value: 10, message: "Mobile number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember3Mobile && <span className="text-red-500 text-sm">{errors.committeemember3Mobile.message}</span>}
  </div>

  <div className="form-group">
    <h5>E-Mail</h5>
    <input 
      type="email" 
      placeholder="E-Mail" 
      {...register("committeemember3Email", {

        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })} 
    />
    {errors.committeemember3Email && <span className="text-red-500 text-sm">{errors.committeemember3Email.message}</span>}
  </div>
      </div>

      {/*Committee Member 4 */}
      <div className="form-section">
  <h3>(14) Committee Member 4</h3>

  <div className="form-group">
    <h5>Name</h5>
    <input 
      type="text" 
      placeholder="Name" 
      {...register("committeemember4Name", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.committeemember4Name && <span className="text-red-500 text-sm">{errors.committeemember4Name.message}</span>}
  </div>

  <div className="form-group full-row">
    <h5>Address</h5>
    <textarea 
      type="text" 
      placeholder="Address" 
      {...register("committeemember4Address", {

        minLength: { value: 10, message: "Please enter complete address" }
      })} 
    />
    {errors.committeemember4Address && <span className="text-red-500 text-sm">{errors.committeemember4Address.message}</span>}
  </div>

  <div className="form-group">
    <h5>Pin Code</h5>
    <input 
      type="text" 
      placeholder="Pin Code" 
      {...register("committeemember4PinCode", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 6, message: "Pin Code must be 6 digits" },
        maxLength: { value: 6, message: "Pin Code must be 6 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember4PinCode && <span className="text-red-500 text-sm">{errors.committeemember4PinCode.message}</span>}
  </div>

  <div className="form-group">
    <h5>Phone (with STD)</h5>
    <input 
      type="text" 
      placeholder="Phone (with STD)" 
      {...register("committeemember4Phone", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 8, message: "Phone number must be at least 8 digits" },
        maxLength: { value: 15, message: "Phone number cannot exceed 15 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember4Phone && <span className="text-red-500 text-sm">{errors.committeemember4Phone.message}</span>}
  </div>

  <div className="form-group">
    <h5>Mobile</h5>
    <input 
      type="text" 
      placeholder="Mobile" 
      {...register("committeemember4Mobile", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "Mobile number must be 10 digits" },
        maxLength: { value: 10, message: "Mobile number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember4Mobile && <span className="text-red-500 text-sm">{errors.committeemember4Mobile.message}</span>}
  </div>

  <div className="form-group">
    <h5>E-Mail</h5>
    <input 
      type="email" 
      placeholder="E-Mail" 
      {...register("committeemember4Email", {

        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })} 
    />
    {errors.committeemember4Email && <span className="text-red-500 text-sm">{errors.committeemember4Email.message}</span>}
  </div>
      </div>

      {/*Committee Member 5 */}
      <div className="form-section">
  <h3>(15) Committee Member 5</h3>

  <div className="form-group">
    <h5>Name</h5>
    <input 
      type="text" 
      placeholder="Name" 
      {...register("committeemember5Name", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.committeemember5Name && <span className="text-red-500 text-sm">{errors.committeemember5Name.message}</span>}
  </div>

  <div className="form-group full-row">
    <h5>Address</h5>
    <textarea 
      type="text" 
      placeholder="Address" 
      {...register("committeemember5Address", {

        minLength: { value: 10, message: "Please enter complete address" }
      })} 
    />
    {errors.committeemember5Address && <span className="text-red-500 text-sm">{errors.committeemember5Address.message}</span>}
  </div>

  <div className="form-group">
    <h5>Pin Code</h5>
    <input 
      type="text" 
      placeholder="Pin Code" 
      {...register("committeemember5PinCode", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 6, message: "Pin Code must be 6 digits" },
        maxLength: { value: 6, message: "Pin Code must be 6 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember5PinCode && <span className="text-red-500 text-sm">{errors.committeemember5PinCode.message}</span>}
  </div>

  <div className="form-group">
    <h5>Phone (with STD)</h5>
    <input 
      type="text" 
      placeholder="Phone (with STD)" 
      {...register("committeemember5Phone", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 8, message: "Phone number must be at least 8 digits" },
        maxLength: { value: 15, message: "Phone number cannot exceed 15 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember5Phone && <span className="text-red-500 text-sm">{errors.committeemember5Phone.message}</span>}
  </div>

  <div className="form-group">
    <h5>Mobile</h5>
    <input 
      type="text" 
      placeholder="Mobile" 
      {...register("committeemember5Mobile", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "Mobile number must be 10 digits" },
        maxLength: { value: 10, message: "Mobile number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember5Mobile && <span className="text-red-500 text-sm">{errors.committeemember5Mobile.message}</span>}
  </div>

  <div className="form-group">
    <h5>E-Mail</h5>
    <input 
      type="email" 
      placeholder="E-Mail" 
      {...register("committeemember5Email", {

        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })} 
    />
    {errors.committeemember5Email && <span className="text-red-500 text-sm">{errors.committeemember5Email.message}</span>}
  </div>
      </div>

      {/*Committee Member 6 */}
      <div className="form-section">
  <h3>(16) Committee Member 6</h3>

  <div className="form-group">
    <h5>Name</h5>
    <input 
      type="text" 
      placeholder="Name" 
      {...register("committeemember6Name", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.committeemember6Name && <span className="text-red-500 text-sm">{errors.committeemember6Name.message}</span>}
  </div>

  <div className="form-group full-row">
    <h5>Address</h5>
    <textarea 
      type="text" 
      placeholder="Address" 
      {...register("committeemember6Address", {

        minLength: { value: 10, message: "Please enter complete address" }
      })} 
    />
    {errors.committeemember6Address && <span className="text-red-500 text-sm">{errors.committeemember6Address.message}</span>}
  </div>

  <div className="form-group">
    <h5>Pin Code</h5>
    <input 
      type="text" 
      placeholder="Pin Code" 
      {...register("committeemember6PinCode", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 6, message: "Pin Code must be 6 digits" },
        maxLength: { value: 6, message: "Pin Code must be 6 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember6PinCode && <span className="text-red-500 text-sm">{errors.committeemember6PinCode.message}</span>}
  </div>

  <div className="form-group">
    <h5>Phone (with STD)</h5>
    <input 
      type="text" 
      placeholder="Phone (with STD)" 
      {...register("committeemember6Phone", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 8, message: "Phone number must be at least 8 digits" },
        maxLength: { value: 15, message: "Phone number cannot exceed 15 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember6Phone && <span className="text-red-500 text-sm">{errors.committeemember6Phone.message}</span>}
  </div>

  <div className="form-group">
    <h5>Mobile</h5>
    <input 
      type="text" 
      placeholder="Mobile" 
      {...register("committeemember6Mobile", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "Mobile number must be 10 digits" },
        maxLength: { value: 10, message: "Mobile number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember6Mobile && <span className="text-red-500 text-sm">{errors.committeemember6Mobile.message}</span>}
  </div>

  <div className="form-group">
    <h5>E-Mail</h5>
    <input 
      type="email" 
      placeholder="E-Mail" 
      {...register("committeemember6Email", {

        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })} 
    />
    {errors.committeemember6Email && <span className="text-red-500 text-sm">{errors.committeemember6Email.message}</span>}
  </div>
      </div>

      {/*Committee Member 7 */}
      <div className="form-section">
  <h3>(17) Committee Member 7</h3>

  <div className="form-group">
    <h5>Name</h5>
    <input 
      type="text" 
      placeholder="Name" 
      {...register("committeemember7Name", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.committeemember7Name && <span className="text-red-500 text-sm">{errors.committeemember7Name.message}</span>}
  </div>

  <div className="form-group full-row">
    <h5>Address</h5>
    <textarea 
      type="text" 
      placeholder="Address" 
      {...register("committeemember7Address", {

        minLength: { value: 10, message: "Please enter complete address" }
      })} 
    />
    {errors.committeemember7Address && <span className="text-red-500 text-sm">{errors.committeemember7Address.message}</span>}
  </div>

  <div className="form-group">
    <h5>Pin Code</h5>
    <input 
      type="text" 
      placeholder="Pin Code" 
      {...register("committeemember7PinCode", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 6, message: "Pin Code must be 6 digits" },
        maxLength: { value: 6, message: "Pin Code must be 6 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember7PinCode && <span className="text-red-500 text-sm">{errors.committeemember7PinCode.message}</span>}
  </div>

  <div className="form-group">
    <h5>Phone (with STD)</h5>
    <input 
      type="text" 
      placeholder="Phone (with STD)" 
      {...register("committeemember7Phone", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 8, message: "Phone number must be at least 8 digits" },
        maxLength: { value: 15, message: "Phone number cannot exceed 15 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember7Phone && <span className="text-red-500 text-sm">{errors.committeemember7Phone.message}</span>}
  </div>

  <div className="form-group">
    <h5>Mobile</h5>
    <input 
      type="text" 
      placeholder="Mobile" 
      {...register("committeemember7Mobile", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "Mobile number must be 10 digits" },
        maxLength: { value: 10, message: "Mobile number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember7Mobile && <span className="text-red-500 text-sm">{errors.committeemember7Mobile.message}</span>}
  </div>

  <div className="form-group">
    <h5>E-Mail</h5>
    <input 
      type="email" 
      placeholder="E-Mail" 
      {...register("committeemember7Email", {

        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })} 
    />
    {errors.committeemember7Email && <span className="text-red-500 text-sm">{errors.committeemember7Email.message}</span>}
  </div>
      </div>

      {/*Committee Member 8 */}
      <div className="form-section">
  <h3>(18) Committee Member 8</h3>

  <div className="form-group">
    <h5>Name</h5>
    <input 
      type="text" 
      placeholder="Name" 
      {...register("committeemember8Name", {

        pattern: { value: /^[A-Za-z\s]+$/, message: "Please enter only alphabets" }
      })} 
    />
    {errors.committeemember8Name && <span className="text-red-500 text-sm">{errors.committeemember8Name.message}</span>}
  </div>

  <div className="form-group full-row">
    <h5>Address</h5>
    <textarea 
      type="text" 
      placeholder="Address" 
      {...register("committeemember8Address", {

        minLength: { value: 10, message: "Please enter complete address" }
      })} 
    />
    {errors.committeemember8Address && <span className="text-red-500 text-sm">{errors.committeemember8Address.message}</span>}
  </div>

  <div className="form-group">
    <h5>Pin Code</h5>
    <input 
      type="text" 
      placeholder="Pin Code" 
      {...register("committeemember8PinCode", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 6, message: "Pin Code must be 6 digits" },
        maxLength: { value: 6, message: "Pin Code must be 6 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember8PinCode && <span className="text-red-500 text-sm">{errors.committeemember8PinCode.message}</span>}
  </div>

  <div className="form-group">
    <h5>Phone (with STD)</h5>
    <input 
      type="text" 
      placeholder="Phone (with STD)" 
      {...register("committeemember8Phone", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 8, message: "Phone number must be at least 8 digits" },
        maxLength: { value: 15, message: "Phone number cannot exceed 15 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember8Phone && <span className="text-red-500 text-sm">{errors.committeemember8Phone.message}</span>}
  </div>

  <div className="form-group">
    <h5>Mobile</h5>
    <input 
      type="text" 
      placeholder="Mobile" 
      {...register("committeemember8Mobile", {

        pattern: { value: /^[0-9]*$/i, message: "Please enter only numbers" },
        minLength: { value: 10, message: "Mobile number must be 10 digits" },
        maxLength: { value: 10, message: "Mobile number must be 10 digits" }
      })} 
      onInput={handleNumericInput}
    />
    {errors.committeemember8Mobile && <span className="text-red-500 text-sm">{errors.committeemember8Mobile.message}</span>}
  </div>

  <div className="form-group">
    <h5>E-Mail</h5>
    <input 
      type="email" 
      placeholder="E-Mail" 
      {...register("committeemember8Email", {

        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address"
        }
      })} 
    />
    {errors.committeemember8Email && <span className="text-red-500 text-sm">{errors.committeemember8Email.message}</span>}
  </div>
      </div>


      {/* Submit Button */}
      <input type="submit" />
    </form>
    </div>
  );
}

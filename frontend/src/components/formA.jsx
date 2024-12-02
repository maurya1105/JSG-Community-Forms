import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./formA.css";
import logo from "../assets/JSG_logo.png";
import axios from "axios";
import { remoteUrl } from "../api.config";

export default function FormA() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  // Watch form inputs for real-time updates
  const coupleMembers = watch("coupleMembers"); // Number of Couple Members
  const singleMembers = watch("singleMembers"); // Number of Single Members
  const previousDues = watch("previousDues"); // Previous Dues
  const creditWithJSGIF = watch("lessPaid"); // Less Paid / Credit

  // State for calculated values
  const [coupleContribution, setCoupleContribution] = useState(0);
  const [singleContribution, setSingleContribution] = useState(0);
  const [grossTotal, setGrossTotal] = useState(0);
  const [gstAmount, setGstAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [netPayable, setNetPayable] = useState(0);

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
          ? coupleBaseRate + Math.max(0, coupleMembers - 50) * additionalCoupleRate
          : 0;

      // GST on Couple Contribution
      const coupleGst = coupleContributionAmount * gstRate;

      // Single Contribution Calculation
      const singleContributionAmount = singleMembers * singleRate;

      // GST on Single Contribution
      const singleGst = singleContributionAmount * gstRate;

      // Gross Total
      const grossTotalAmount = coupleContributionAmount + singleContributionAmount + previousDuesAmount;

      // GST on Gross Total
      const gstAmountCalculated = grossTotalAmount * gstRate;

      // Grand Total
      const grandTotalAmount = grossTotalAmount + gstAmountCalculated;

      // Net Payable after deducting credit
      const netPayableAmount = grandTotalAmount - creditWithJSGIFAmount;
      const finalNetPayable = netPayableAmount < 0 ? 0 : netPayableAmount;

      // Set the calculated values in state
      setCoupleContribution(coupleContributionAmount);
      setSingleContribution(singleContributionAmount);
      setGrossTotal(grossTotalAmount);
      setGstAmount(gstAmountCalculated);
      setGrandTotal(grandTotalAmount);
      setNetPayable(finalNetPayable);
    }
  }, [coupleMembers, singleMembers, previousDues, creditWithJSGIF]);

  const onSubmit = async(data) => {
    console.log("Final Submitted Data: ", {
      ...data,
      coupleContribution,
      singleContribution,
      grossTotal,
      gstAmount,
      grandTotal,
      netPayable,
    });

    //api call to backend
    const response = await axios.post(`${remoteUrl}/api/contributions`,{
      ...data,
      coupleContribution,
      singleContribution,
      grossTotal,
      gstAmount,
      grandTotal,
      netPayable,
    })

    console.log(response)

    alert("Form submitted successfully!");
  };

  return (
    <div className="form-container">
      {/* Header Section */}
      <div className="header-section">
        <img src={logo} alt="Logo" className="logo" />


        <div className="header-details">
        <h1>JAIN SOCIAL GROUPS INT. FEDERATION</h1>
        <p>4-O/P, Vijay Chambers, Opp. Dreamland Cinema, Tribhuvan Road, Mumbai - 400 004<br/>
        Tel.: 022-35302861  Mobile: 8169274400  E-mail: office@jsgif.co.in <a href='https://jsgif.co.in'>www.jsgif.co.in</a></p>

        </div>

        <h1 className="form-title">Form "A"</h1>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="scrolling-form">
        {/* Group Information */}
        <div className="form-section">
          <h3>Group Details</h3>

          <div className="form-group">
            <h5>Name of the Group</h5>
            <input
              type="text"
              placeholder="Name of the Group"
              {...register("groupName", { required: "Group Name is required" })}
            />
            {errors.groupName && <span className="error">{errors.groupName.message}</span>}
          </div>

          <div className="form-group">
            <h5>Group Number</h5>
            <input
              type="text"
              placeholder="Group Number"
              {...register("groupNumber", { required: "Group Number is required" })}
            />
            {errors.groupNumber && <span className="error">{errors.groupNumber.message}</span>}
          </div>

          <div className="form-group">
            <h5>Group Address</h5>
            <input
              type="text"
              placeholder="Address"
              {...register("groupAddress", { required: "Group Address is required" })}
            />
            {errors.groupAddress && <span className="error">{errors.groupAddress.message}</span>}
          </div>

          <div className="form-group">
            <h5>Predident Mobile No.</h5>
            <input
              type="text"
              placeholder="Mobile No."
              {...register("presidentMobileNumber", { required: "Group Number is required" })}
            />
            {errors.presidentMobileNumber && <span className="error">{errors.presidentMobileNumber.message}</span>}
          </div>

          <div className="form-group">
            <h5>Secretary Mobile No.</h5>
            <input
              type="text"
              placeholder="Mobile No."
              {...register("secretaryMobileNumber", { required: "Group Number is required" })}
            />
            {errors.secretaryMobileNumber && <span className="error">{errors.secretaryMobileNumber.message}</span>}
          </div>

          <div className="form-group">
            <h5>Treasurer Mobile No.</h5>
            <input
              type="text"
              placeholder="Mobile No."
              {...register("treasurerMobileNumber", { required: "Group Number is required" })}
            />
            {errors.treasurerMobileNumber && <span className="error">{errors.treasurerMobileNumber.message}</span>}
          </div>



        </div>

        {/* Rates of Contribution */}
        <div className="form-section">
          <fieldset className="rates-section">
            <legend>Rates of Contribution</legend>
            <div className="rates-info">
              <p>
                Rates of Contribution for Year 2025-2026 (01.04.2025 to 31.03.2026):
              </p>
              <ul>
                <li>Contribution for First 50 Couple Members: ₹7,500/- + GST</li>
                <li>Contribution per Couple Members from 51st Couple: ₹100/- + GST</li>
                <li>Contribution per Single Member: ₹50/- + GST</li>
              </ul>
            </div>
          </fieldset>
        </div>

        {/* Contribution Payable */}
          <div className="form-section">
            <h3>Contribution Payable</h3>

            {/* Number of Members */}
            <div className="form-group">
              <h5>Number of Couple Members</h5>
              <input
                type="number"
                placeholder="Couple Members"
                {...register("coupleMembers", { required: "Couple Members is required" })}
              />
            </div>

            <div className="form-group">
              <h5>Number of Single Members</h5>
              <input
                type="number"
                placeholder="Single Members"
                {...register("singleMembers", { required: "Single Members is required" })}
              />
            </div>

            {/* Previous Dues */}
            <div className="form-group">
              <h5>Previous Dues</h5>
              <input
                type="number"
                placeholder="Previous Dues"
                {...register("previousDues", { required: "Previous Dues is required" })}
              />
            </div>

            {/* Calculate and Display Results */}
            <div className="amount-display">
              <h5>Couple Contribution: ₹{coupleContribution}</h5>
              <h5>Single Contribution: ₹{singleContribution}</h5>
              <h5>Gross Total: ₹{grossTotal}</h5>
              <h5>GST @ 18%: ₹{gstAmount}</h5>
              <h5>Grand Total: ₹{grandTotal}</h5>
            </div>

            {/* Payments Section */}
            <div className="form-group">
              <h5>Less Paid / Credit with JSGIF</h5>
              <input
                type="number"
                placeholder="Less Paid / Credit"
                {...register("lessPaid")}
              />
            </div>

            {/* Net Payable */}
            <div className="amount-display">
              <h5>Net Payable: ₹{netPayable}</h5>
            </div>
          </div>



        {/* Action Buttons */}
        <div className="form-actions">
          <button type="submit" className="submit-button">
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
}

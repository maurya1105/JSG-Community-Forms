import React, { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import "./formA.css";
import logo from "../assets/JSG_logo.png";
import axios from "axios";
import { remoteUrl } from "../api.config";

export default function FormA() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false); // State to control PDF button visibility
  const [isSubmitting, setIsSubmitting] = useState(false); // State for showing spinner

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

  //For AutoFilling
  const [groupNo, setGroupNo] = useState(""); // For tracking the group number input
  const [groupDetails, setGroupDetails] = useState({
    groupName: "",
  });

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

      // Gross Total
      const grossTotalAmount =
        coupleContributionAmount +
        singleContributionAmount +
        previousDuesAmount;

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

  const onSubmit = async (data) => {
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
    const response = await axios.post(`${remoteUrl}/api/contributions`, {
      ...data,
      coupleContribution,
      singleContribution,
      grossTotal,
      gstAmount,
      grandTotal,
      netPayable,
    });

    setIsSubmitting(true); // Show the spinner
    console.log(response);

    // Simulate an API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitted(true); // Show the "Download as PDF" button
    setIsSubmitting(false); // Hide the spinner
    alert("Form submitted successfully!");
  };

  //PDF
  const componentRef = useRef();

  const handlePrint = async () => {
    window.print();
  };

  // Fetches group details from the API based on provided group number
  // Makes a GET request to /api/groups/{groupNo} endpoint
  // Updates groupDetails state with the response data
  const fetchGroupDetails = async (groupNo) => {
    try {
      const response = await fetch(`${remoteUrl}/api/groups/${groupNo}`);
      const result = await response.json();

      if (response.ok && result.success) {
        // Update both the display state and the form values
        setGroupDetails({
          groupName: result.data.groupName || "",
        });

        // Update the form values using setValue
        setValue("groupName", result.data.groupName || "");
      } else {
        setGroupDetails({
          groupName: "",
        });

        // Clear the form values
        setValue("sponsoringGroup", "");
      }
    } catch (error) {
      console.error("Error fetching group details:", error);
    }
  };

  // Debounce utility function to limit rate of function calls
  // Returns a new function that will only execute after wait time has elapsed
  // Useful for preventing too many API calls
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Memoized debounced version of fetchGroupDetails
  // Only makes API call after 500ms of no new input
  // Prevents API spam when user is typing
  const debouncedFetch = useCallback(
    debounce((value) => {
      if (value) {
        fetchGroupDetails(value);
      } else {
        // Reset group details if value is empty
        setGroupDetails({ groupName: "" });
      }
    }, 500),
    []
  );

  // Handler for group number input changes
  // Strips non-numeric characters and triggers debounced API fetch
  const handleGroupNoChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric chars
    setGroupNo(value);
    debouncedFetch(value);
  };

  return (
    <div className="form-container">
      {/* Header Section */}
      <div className="header-section">
        <img src={logo} alt="Logo" className="logo" />

        <div className="header-details">
          <h1>JAIN SOCIAL GROUPS INT. FEDERATION</h1>
          <p>
            4-O/P, Vijay Chambers, Opp. Dreamland Cinema, Tribhuvan Road, Mumbai
            - 400 004
            <br />
            Tel.: 022-35302861 Mobile: 8169274400 E-mail: office@jsgif.co.in{" "}
            <a href="https://jsgif.co.in">www.jsgif.co.in</a>
          </p>
        </div>

        <h1 className="form-title">Form "A"</h1>
      </div>

      {/* Form Section */}
      <div
        ref={componentRef}
        style={{ padding: "20px", background: "#3f0986", height: "auto" }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="scrolling-form">
          {/* Group Information */}
          <div className="form-section">
            <h3>Group Details</h3>

            <div className="form-group">
              <h5>Name of the Group</h5>
              <input
                type="text"
                placeholder="Name of the Group"
                defaultValue={groupDetails.groupName}
                {...register("groupName", {
                  required: "Group name is required",
                })}
              />
              {errors.groupName && (
                <span className="error">{errors.groupName.message}</span>
              )}
            </div>

            <div className="form-group">
              <h5>Group Number</h5>
              <input
                type="text"
                placeholder="Group Number"
                value={groupNo}
                {...register("groupNumber", {
                  required: "Group Number is required",
                })}
                onChange={handleGroupNoChange}
              />
              {errors.groupNumber && (
                <span className="error">{errors.groupNumber.message}</span>
              )}
            </div>

            <div className="form-group">
              <h5>Group Address</h5>
              <input
                type="text"
                placeholder="Address"
                {...register("groupAddress", {
                  required: "Group Address is required",
                })}
              />
              {errors.groupAddress && (
                <span className="error">{errors.groupAddress.message}</span>
              )}
            </div>

            <div className="form-group">
              <h5>Predident Mobile No.</h5>
              <input
                type="text"
                placeholder="Mobile No."
                {...register("presidentMobileNumber", {
                  required: "Group Number is required",
                })}
              />
              {errors.presidentMobileNumber && (
                <span className="error">
                  {errors.presidentMobileNumber.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <h5>Secretary Mobile No.</h5>
              <input
                type="text"
                placeholder="Mobile No."
                {...register("secretaryMobileNumber", {
                  required: "Group Number is required",
                })}
              />
              {errors.secretaryMobileNumber && (
                <span className="error">
                  {errors.secretaryMobileNumber.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <h5>Treasurer Mobile No.</h5>
              <input
                type="text"
                placeholder="Mobile No."
                {...register("treasurerMobileNumber", {
                  required: "Group Number is required",
                })}
              />
              {errors.treasurerMobileNumber && (
                <span className="error">
                  {errors.treasurerMobileNumber.message}
                </span>
              )}
            </div>
          </div>

          {/* Rates of Contribution */}
          <div className="form-section">
            <fieldset className="rates-section">
              <legend>Rates of Contribution</legend>
              <div className="rates-info">
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
          <h3>Contribution Payable</h3>

          {/* Number of Couple Members */}
          <div className="form-row">
            <div className="input-group">
              <h5>Number of Couple Members</h5>
              <input
                type="number"
                placeholder="Couple Members"
                {...register("coupleMembers", {
                  required: "Couple Members is required",
                })}
              />
              {errors.coupleMembers && (
                <span className="error">{errors.coupleMembers.message}</span>
              )}
            </div>
            <div className="amount-group">
              <h5>Couple Contribution</h5>
              <p>₹{coupleContribution}</p>
            </div>
          </div>

          {/* Number of Single Members */}
          <div className="form-row">
            <div className="input-group">
              <h5>Number of Single Members</h5>
              <input
                type="number"
                placeholder="Single Members"
                {...register("singleMembers", {
                  required: "Single Members is required",
                })}
              />
              {errors.coupleMembers && (
                <span className="error">{errors.coupleMembers.message}</span>
              )}
            </div>
            <div className="amount-group">
              <h5>Single Contribution</h5>
              <p>₹{singleContribution}</p>
            </div>
          </div>

          {/* Previous Dues */}
          <div className="form-row">
            <div className="input-group">
              <h5>Previous Dues</h5>
              <input
                type="number"
                placeholder="Previous Dues"
                {...register("previousDues")}
              />
            </div>
            <div className="amount-group">
              <h5>Previous Dues Amount</h5>
              <p>₹{previousDues}</p>
            </div>
          </div>

          {/* Gross Total */}
          <div className="form-row">
            <div className="text-group">
              <h5>Gross Total</h5>
            </div>
            <div className="amount-group">
              <h5>₹{grossTotal}</h5>
            </div>
          </div>

          {/* GST */}
          <div className="form-row">
            <div className="text-group">
              <h5>GST @ 18%</h5>
            </div>
            <div className="amount-group">
              <h5>₹{gstAmount}</h5>
            </div>
          </div>

          {/* Grand Total */}
          <div className="form-row">
            <div className="text-group">
              <h5>Grand Total</h5>
            </div>
            <div className="amount-group">
              <h5>₹{grandTotal}</h5>
            </div>
          </div>

          {/* Less Paid / Credit with JSGIF */}
          <div className="form-row">
            <div className="input-group">
              <h5>Less Paid / Credit with JSGIF</h5>
              <input
                type="number"
                placeholder="Less Paid / Credit"
                {...register("lessPaid")}
              />
            </div>
            <div className="amount-group">
              <h5>Credit Amount</h5>
              <p>₹{creditWithJSGIF}</p>
            </div>
            <div className="form-group">
              <h5>Receipt No.</h5>
              <input
                type="text"
                placeholder="Receipt No."
                {...register("receiptNumber", {
                  required: "Receipt Number is required",
                })}
              />
              {errors.receiptNumber && (
                <span className="error">{errors.receiptNumber.message}</span>
              )}
            </div>
          </div>

          {/* Net Payable */}
          <div className="form-row">
            <div className="text-group">
              <h5>Net Payable</h5>
            </div>
            <div className="amount-group">
              <h5>₹{netPayable}</h5>
            </div>
          </div>

          {/* New Payment Details Section */}
          <div className="payment-details">
            <h3>Payment Details</h3>

            <div className="payment-row">
              <div className="input-group">
                <h5>DD / Cheque / IMPS / Online Transfer Ref. No.</h5>
                <input
                  type="text"
                  placeholder="Reference Number"
                  {...register("paymentReferenceNumber", {
                    // required: "Reference Number is required",
                  })}
                />
                {errors.paymentReferenceNumber && (
                  <span className="error">
                    {errors.paymentReferenceNumber.message}
                  </span>
                )}
              </div>
              <div className="input-group">
                <h5 style={{ textAlign: "left" }}>Date</h5>
                <input
                  type="date"
                  {...register("paymentDate", {
                    // required: "Date is required",
                  })}
                />
                {errors.paymentDate && (
                  <span className="error">{errors.paymentDate.message}</span>
                )}
              </div>
            </div>

            <div className="payment-row">
              <div className="input-group">
                <h5>Amount Paid</h5>
                <input
                  type="text"
                  placeholder="Amount Paid"
                  {...register("amountPaid", {
                    // required: "Amount Paid is required",
                  })}
                />
                {errors.amountPaid && (
                  <span className="error">{errors.amountPaid.message}</span>
                )}
              </div>
              <div className="input-group">
                <h5>Drawn On (Bank Name)</h5>
                <input
                  type="text"
                  placeholder="Bank Name"
                  {...register("drawnOnBank", {
                    // required: "Bank Name is required",
                  })}
                />
                {errors.drawnOnBank && (
                  <span className="error">{errors.drawnOnBank.message}</span>
                )}
              </div>
            </div>

            <div className="input-group">
              <h5>Branch</h5>
              <input
                type="text"
                placeholder="Bank Branch"
                {...register("bankBranch", {
                  // required: "Branch is required",
                })}
              />
              {errors.bankBranch && (
                <span className="error">{errors.bankBranch.message}</span>
              )}
            </div>
          </div>

          {/* Account Details Section */}
          <fieldset className="account-section">
            <legend>Account Details</legend>
            <div className="account-details">
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
          <div className="form-actions">
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Form"}
            </button>
          </div>
        </form>
      </div>
      {isSubmitting && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      <div className="print-div">
        {isSubmitted && (
          <button
            onClick={handlePrint}
            className="print-btn"
            style={{ marginTop: "20px" }}
          >
            Print
          </button>
        )}
      </div>
    </div>
  );
}

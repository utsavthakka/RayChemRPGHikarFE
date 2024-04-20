import OTPInput, { ResendOTP } from "otp-input-react";
import Loader from "../../../components/Loader/Loader";
import { useState } from "react";
import Button from "../../../components/Button/Button";
import { verifyOtpAPI, forgotPasswordAPI } from "../services";
import { ToastContainer, toast } from "react-toastify";
import "../ForgotPassword/ForgotPassword.css";
import "./OtpEnter.css";

// Define the OtpEnter component
function OtpEnter({ email, OTP, setOTP, onNextClick, onCancelClick }) {
  const [isLoading, setLoading] = useState(false);

  // Handle the Resend OTP button click
  const handleResendClick = async () => {
    setLoading(true);
    const params = {
      email: email,
    };
    try {
      const resp = await forgotPasswordAPI(params);
      setLoading(false);
      if (resp.data.success == true) {
        onNextClick();
      }
    } catch (error) {
      setLoading(false);
      console.log("handleSubmit", error);
    }
  };

  // Handle the form submit
  const handleSubmit = async () => {
    setLoading(true);
    const params = {
      email: email,
      token: OTP,
    };
    try {
      const resp = await verifyOtpAPI(params);
      setLoading(false);
      if (resp.data.success == true) {
        onNextClick();
      } else {
        toast.error("Something was wrong, try again", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("handleSubmit", error);
    }
  };

  // Render the OtpEnter component
  return (
    <>
      <ToastContainer />
      <div>
        <h3 className="form-login-title">Forgot Password?</h3>
        <p className="form-name">Please Enter OTP sent to {email}</p>
        <OTPInput
          value={OTP}
          onChange={setOTP}
          autoFocus
          OTPLength={6}
          otpType="number"
          disabled={false}
          secure
          className="otp-input"
        />
        {/* Display the Resend OTP button */}
        <ResendOTP onResendClick={handleResendClick} className="resendBtn" />
        <div className="btn-group">
          <Button
            title="Cancel"
            className="bordered common-button"
            onClick={onCancelClick}
          />
          <Button
            type="submit"
            title="Submit"
            onClick={handleSubmit}
            className="common-button"
          />
        </div>
        {/* Display the loading spinner if isLoading is true */}
        {isLoading && <Loader />}
      </div>
    </>
  );
}
export default OtpEnter;

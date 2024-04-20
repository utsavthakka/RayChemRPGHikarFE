import React, { useState } from "react";
import Loader from "../../../components/Loader/Loader";
import { ValidatorForm } from "react-material-ui-form-validator";
import { InputField } from "../../../components/InputField/InputField";
import Button from "../../../components/Button/Button";
import "./ForgotPassword.css";
import { ToastContainer, toast } from "react-toastify";
import { forgotPasswordAPI } from "../services";

function ForgotPassword({ email, setEmail, onNextClick, onCancelClick }) {
  const [isLoading, setLoading] = useState(false);

  // This function is called when the user submits the form
  const handleSubmit = async () => {
    setLoading(true); // Show the loader while the request is being processed
    const params = {
      email: email,
    };
    try {
      // Send a request to the forgot password API
      const resp = await forgotPasswordAPI(params);
      setLoading(false);
      if (resp.data.success == true) {
        onNextClick(); // Call the onNextClick function if the request was successful
      } else {
        // Show an error toast if the request was not successful
        toast.error("Invalid Email", {
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

  return (
    <>
      <ToastContainer />
      <div>
        <h3 className="form-login-title">Forgot Password?</h3>
        <p className="form-name">You will get an OTP to reset your Password</p>

        {/* Add a ValidatorForm with the handleSubmit function */}
        <ValidatorForm onSubmit={handleSubmit}>
          <InputField
            id="standard-basic"
            label="Email"
            onChange={(event) => setEmail(event.target.value)} // Update the email value when the input changes
            name="email"
            value={email}
            validators={["required", "isEmail"]}
            errorMessages={["email is required", "email is not valid"]}
            variant="standard"
          />

          <div className="btn-group">
            <Button
              title="Cancel"
              className="bordered cancel-btn-visiblity common-button"
            />
            <Button type="submit" title="Get OTP" className="common-button" />
          </div>

          {isLoading && <Loader />}
        </ValidatorForm>
        <div className="cancel-btn-wrapper">
          <Button
            title="Cancel"
            class="bordered cancel-btn common-button"
            onClick={onCancelClick}
          />
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;

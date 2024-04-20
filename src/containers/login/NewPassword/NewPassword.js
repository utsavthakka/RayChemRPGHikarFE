import React, { useEffect, useState } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import Loader from "../../../components/Loader/Loader";
import { InputField } from "../../../components/InputField/InputField";
import Button from "../../../components/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import { updatePasswordAPI } from "../services";
import "react-toastify/dist/ReactToastify.css";
import "./NewPassword.css";

function NewPassword({
  OTP,
  email,
  onNextClick,
  onCancelClick,
  setEmail,
  setOTP,
}) {
  // Define state variables
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [isLoading, setLoading] = useState("false");

  // Define a function to handle form submission
  const handleSubmit = async () => {
    // Check if passwords match
    if (password === reEnterPassword) {
      setLoading(true);
      const params = {
        token: OTP,
        email: email,
        password: password,
      };
      try {
        const resp = await updatePasswordAPI(params);
        setLoading(false);
        // If response status is success, clear OTP and email and proceed to next step
        if (resp.status == 200 || resp.status == 201) {
          setEmail("");
          setOTP("");
          onNextClick();
        }
      } catch (error) {
        setLoading(false);
        console.log("handleSubmit", error);
      }
    } else {
      toast.error("Passwords don't match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    // Render the form
    <div>
      <ToastContainer />
      <h3 className="form-login-title">Create New Password</h3>
      <ValidatorForm onSubmit={handleSubmit}>
        <InputField
          type="password"
          id="standard-basic"
          label="Password"
          onChange={(event) => setPassword(event.target.value)}
          name="password"
          value={password}
          validators={["required"]}
          errorMessages={["password is required"]}
          variant="standard"
        />
        <InputField
          type="password"
          id="standard-basic"
          label="Re-enter Password"
          onChange={(event) => setReEnterPassword(event.target.value)}
          name="reEnterPassword"
          value={reEnterPassword}
          validators={["required"]}
          errorMessages={["Re-enter Password is required"]}
          variant="standard"
        />
        <div className="btn-group">
          <Button
            title="Cancel"
            className="bordered cancel-btn-visiblity common-button"
          />
          <Button type="submit" title="Submit" className="common-button" />
        </div>
      </ValidatorForm>
      <div className="cancel-btn-wrapper">
        <Button
          title="Cancel"
          class="bordered cancel-btn common-button"
          onClick={onCancelClick}
        />
      </div>
      {/* {isLoading && <Loader />} */}
    </div>
  );
}

export default NewPassword;

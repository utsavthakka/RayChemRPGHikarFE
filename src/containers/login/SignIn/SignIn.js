import React, { useState, useRef, useEffect, useMemo } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Loader from "../../../components/Loader/Loader";
import { loginAPI } from "../services";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../../components/InputField/InputField";
import Button from "../../../components/Button/Button";
import "./SignIn.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../redux/slices/userSlice";
import { loginForm } from "../../DippingParameters/batchSlice";
import ReCAPTCHA from "react-google-recaptcha";
import { pbkdf2Sync } from "crypto";

function SignIn({ onNextClick }) {
  const recaptchaRef = useRef(null);
  const dispatch = useDispatch();

  // Initialize state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [SignIncount, setSignIncount] = useState(0);
  const [Sitekey, setSitekey] = useState(
    "6LcvUFomAAAAAEjzQKoUaiz7gjxr6CVGjjxTUDMy"
  );
  const [isRecaptchaValid, setRecaptchaValid] = useState(false);
  const [isKeepmelogin, setisKeepmelogin] = useState(true);

  // Use Navigate hook to change the route
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("Keepmelogin", isKeepmelogin);
  }, [isKeepmelogin]);

  const Tosterhandler = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handlekeepMeLogin = () => {
    setisKeepmelogin(!isKeepmelogin);
  };

  const handleSubmit = async () => {
    // setLoading(true);
    setLoading(true);

    function encryptPassword(password, salt, iterations) {
      // setLoading(true);
      const hash = pbkdf2Sync(
        password,
        salt,
        iterations,
        32,
        "sha256"
      ).toString("base64");
      const formattedHash = `pbkdf2_sha256$${iterations}$${salt}$${hash}`;
      return formattedHash;
    }

    const salt = "wUSaq3zAOY9ddYZNFDYqIr";
    const iterations = 320000;

    const encryptedPassword = encryptPassword(password, salt, iterations);

    const params = {
      email: email,
      password: encryptedPassword,
    };

    try {
      // Make the login API request

      const resp = await loginAPI(params);

      // If the request was successful, dispatch the user details and redirect to the dashboard
      if (resp.data.success == true) {
        setLoading(false);
        dispatch(
          setUserDetails({
            email: resp.data.payload.email,
            token: resp.data.payload.token,
            userPermission: resp.data.payload.module_permissions,
            is_superuser: resp.data.payload.is_superuser,
            is_admin: resp.data.payload.is_admin,
            is_manual_database_access:
              resp.data.payload.is_manual_database_access,
          })
        );
        dispatch(
          loginForm({
            email: resp.data.payload.email,
            firstName: resp.data.payload.first_name,
            lastName: resp.data.payload.last_name,
            is_superuser: resp.data.payload.is_superuser,
            is_admin: resp.data.payload.is_admin,
            is_manual_database_access:
              resp.data.payload.is_manual_database_access,
          })
        );

        navigate("/dashboard");
      } else {
        // If the request was not successful, show an error toast and log the error message
        setLoading(false);
        Tosterhandler("Invalid Username and Password");
      }
    } catch (error) {
      // If an error occurs, set loading to false and log the error message
      setLoading(false);
      Tosterhandler("Invalid Username and Password");
      console.log(".........error found", error);
    }
  };

  const SignInHandle = () => {
    setSignIncount(SignIncount + 1);
    setLoading(true);

    setTimeout(async () => {
      if (email) {
        if (password) {
          if (recaptchaRef.current.getValue()) {
            handleSubmit();
          } else {
            setLoading(false);
            Tosterhandler("Recapcha is required");
          }
        } else {
          setLoading(false);
          Tosterhandler("Password is required");
        }
      } else {
        setLoading(false);
        Tosterhandler("Email is required");
      }
    }, 2);
  };

  const setloadinghandle = async () => {
    if (password && email) {
      setLoading(true);
    }
  };

  const Recaptchahandle = () => {
    if (recaptchaRef.current.getValue()) {
      setRecaptchaValid(true);
    }
  };

  const handleEmailChange = (event) => {
    const inputValue = event.target.value;
    setEmail(inputValue);
  };

  const emailRegex = /^[\w\.-]+@[\w\.-]+\.\w+$/;

  const isEmailValid = (value) => {
    const valid = emailRegex.test(value);
    return valid ? null : "isEmail";
  };

  return (
    <div>
      <ToastContainer />
      <h3 className="form-login-title">Welcome</h3>
      <ValidatorForm>
        {
          // Render the email input field
          <InputField
            id="standard-basic"
            label="Email"
            onChange={handleEmailChange}
            name="email"
            value={email}
            // validators={["required", isEmailValid()]}
            // errorMessages={["Email is required", "Email is not valid"]}
            variant="standard"
          />
        }
        {/* { !isEmailValid && (
        <span style={{ color: "red" ,fontSize:"14px"}}>Invalid email</span>
      )} */}
        <InputField
          type="password"
          id="standard-basic"
          label="Password"
          onChange={(event) => setPassword(event.target.value)}
          name="password"
          value={password}
          // validators={["required"]}
          // errorMessages={["password is required"]}
          variant="standard"
        />
        <div
          className={`form-footer ${SignIncount > 2 ? "custom-margin" : ""}`}
        >
          <div className="keep-login-wrap">
            <input
              type="checkbox"
              id="keepMeLogin"
              name="keepMeLogin"
              value={isKeepmelogin}
              checked={isKeepmelogin}
              onChange={handlekeepMeLogin}
            />
            <label
              for="keepMeLogin"
              className={`keep-login-label ${
                SignIncount > 2 ? "custom-margin" : ""
              }`}
            >
              {" "}
              Keep me login
            </label>
          </div>
          <div className="forgot-link" onClick={onNextClick}>
            Forgot Password?
          </div>
        </div>

        {SignIncount >= 0 ? (
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={Sitekey}
            required
            className="ReCAPTCHA-R"
            onChange={Recaptchahandle}
          />
        ) : null}

        <Button
          type="submit"
          title="Login"
          className="common-button"
          onClick={async () => {
            // setloadinghandle();
            SignInHandle();
          }}
        />

        {isLoading && <Loader />}
        {/* <Loader /> */}
      </ValidatorForm>
    </div>
  );
}

export default SignIn;

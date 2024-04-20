import React, { useState } from "react";
import "../../index.css";
import "../login/login.css";
import SignIn from "./SignIn/SignIn";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import OtpEnter from "./OtpEnter/OtpEnter";
import { Grid } from "@mui/material";
import Slider from "react-slick";
import sliderImg1 from "../../assets/images/slider1.jpg";
import sliderImg2 from "../../assets/images/slider2.jpg";
import sliderImg3 from "../../assets/images/slider3.jpg";
import sliderImg4 from "../../assets/images/slider4.jpg";
import sliderImg5 from "../../assets/images/slider5.jpg";
import logo from "../../assets/images/rayChemlogo.png";
import hiker_logo from "../../assets/images/hikar-logo.png";
import NewPassword from "./NewPassword/NewPassword";

const Login = () => {
  // Define settings for Slider component
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    fade: true,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    pauseOnFocus: false,
  };

  // Define content for each slide of the Slider component
  const sliderContrent = [
    {
      img: sliderImg1,
      title1: "Connecting Your World",
      disc: "The promise of safe and reliable electrification to power ecosystems and empower communities",
    },
    {
      img: sliderImg2,
      title1: "Innovative Solutions,",
      title2: "Reliable Connections for a Lifetime",
      disc: "A comprehensive offering meeting worlds electrification needs",
    },
    {
      img: sliderImg3,
      title1: "A Partner of Choice,",
      title2: "Multitude of Industries",
      disc: "Proven Solutions, meeting Energy Efficiencies",
    },
    {
      img: sliderImg4,
      title1: "Empowered people,",
      title2: "Collaborative Culture",
      disc: "An inclusive and happy workplace built on pillars of unleashing talent, outperformance and touching lives",
    },
    {
      img: sliderImg5,
      title1: "Inspiring Innovation,",
      title2: "Creating the Future",
      disc: "Pioneering technologies, processes, and business practices, challenge the status quo and add value to our stakeholders",
    },
  ];

  // Define state variables
  const [currentState, setCurrentState] = useState("login");
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");

  // Handle click events to change state
  const onNextClick = (nextState) => {
    setCurrentState(nextState);
  };

  const currentComponent = () => {
    switch (currentState) {
      case "forgotPassword":
        return (
          <ForgotPassword
            email={email}
            setEmail={setEmail}
            onNextClick={() => onNextClick("verifyOTP")}
            onCancelClick={() => onNextClick("signIn")}
          />
        );
      case "verifyOTP":
        return (
          <OtpEnter
            OTP={OTP}
            email={email}
            onNextClick={() => onNextClick("changePassword")}
            onCancelClick={() => onNextClick("signIn")}
            setOTP={setOTP}
            setEmail={setEmail}
          />
        );
      case "changePassword":
        return (
          <NewPassword
            email={email}
            OTP={OTP}
            onNextClick={() => onNextClick("login")}
            onCancelClick={() => onNextClick("signIn")}
            setEmail={setEmail}
            setOTP={setOTP}
          />
        );
      case "signIn":
        return <SignIn onNextClick={() => onNextClick("forgotPassword")} />;

      default:
        return <SignIn onNextClick={() => onNextClick("forgotPassword")} />;
    }
  };

  return (
    <>
      <Grid container className="main-container">
        <Grid item xs={12} md={7} lg={8} className="slider-wrapper">
          <div className="slider-container">
            <Slider {...settings}>
              {sliderContrent.map((detail, index) => (
                <div className="single-slide" key={index}>
                  <img src={detail.img} alt="banner" />
                  <div className="slider-detail">
                    <h2>
                      {detail.title1}
                      <br />
                      {detail.title2}
                    </h2>
                    <p>{detail.disc}</p>
                  </div>
                  <div className="overlay"></div>
                </div>
              ))}
            </Slider>
          </div>
        </Grid>
        <Grid item xs={12} md={5} lg={4} className="form-container">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="hikar-logo">
            <img src={'https://raychem-backend-storage.s3.ap-south-1.amazonaws.com/assets/hikar-logo-color-4.png'} alt="logo" />
          </div>
          {currentComponent()}
          <div className="footer-content">
            <p>
              Powered by <br />
              <b>Hikar&#174;Technomation</b> Private Limited &#169; All Rights
              Reserved
            </p>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default Login;

import React from "react";
import "./LandingPage.css";

const CLIENT_ID = "fce56752d45cdd10f6a3";

const LandingPage = () => {
  function loginWithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
  }
  return (
    <div>
      <div className="body">
        <b className="landing-page-body-brand">Welcome to the WeatherWatch</b>
        <div className="landing-page-body">
          <p className="login-reminder">
            Please login with your Github account to use the application and
            view the weather in your city.
          </p>
        </div>
        <button
          className="cssbuttons-io-button"
          onClick={() => {
            loginWithGithub();
          }}
        >
          Get started
          <div className="icon-landing">
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

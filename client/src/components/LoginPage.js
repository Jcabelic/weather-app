import React from "react";

import "./LoginPage.css";
import DisplayWeatherData from "./DisplayWeatherData";

const LoginPage = () => {
  return (
    <div>
      <div className="login-page-body">
        <div className="user-info">
          <></>
        </div>
        <>
          <DisplayWeatherData />
        </>
      </div>
    </div>
  );
};

export default LoginPage;

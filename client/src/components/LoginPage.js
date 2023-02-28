import React from "react";

import "./LoginPage.css";
import DisplayWeatherData from "./DisplayWeatherData";

const LoginPage = (props) => {
  const { userData } = props;

  return (
    <div>
      <div className="login-page-body">
        <div className="display-user-data">
          <h4 className="userName">{userData.login}</h4>
          <a href={userData.html_url} target="_blank" rel="noreferrer">
            {" "}
            {userData.html_url}
          </a>
        </div>
        <div>
          <DisplayWeatherData />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

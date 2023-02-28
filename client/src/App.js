/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";

import "./App.css";

function App() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const [codeParam, setCodeParam] = useState(urlParams.get("code"));

  useEffect(() => {
    console.log(codeParam);

    // Check if the access token has expired
    const expiryTime = localStorage.getItem("expiryTime");
    const currentTime = new Date().getTime();
    if (expiryTime && currentTime > expiryTime) {
      // Remove the access token and redirect to the landing page
      localStorage.removeItem("accessToken");
      localStorage.removeItem("expiryTime");
      setRerender(!rerender);
      setCodeParam(null);
      window.location.href = "http://localhost:3000";
    }

    // We will use only local storage for this project
    // but we can use cookies or session storage
    // if we want to store the access token in the browser
    // but for the sake of simplicity for the project
    // <~leaving page for a while and come back & still be logged in>

    if (codeParam && localStorage.getItem("accessToken") === null) {
      async function getAccessToken() {
        await fetch("http://localhost:4000/getAccessToken?code=" + codeParam, {
          method: "GET",
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            if (data.access_token) {
              // Set the expiry time to 1 hour from now
              const expiryTime = new Date().getTime() + 0.5 * 60 * 1000;
              localStorage.setItem("accessToken", data.access_token);
              localStorage.setItem("expiryTime", expiryTime);
              setRerender(!rerender);
            }
          });
      }
      getAccessToken();
    }
    getUserData();
  }, [codeParam, rerender]);

  async function getUserData() {
    await fetch("http://localhost:4000/getUserData", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //set the user data in the state
        setUserData(data);
        console.log(data);
      });
  }

  //  getUserData();
  return (
    <div className="App">
      {localStorage.getItem("accessToken") ? (
        <>
          <div className="main">
            {" "}
            <div className="landing-page-header">
              <img src="logo.png" alt="weather-watch-logo" className="logo" />
              <h1 className="brand">WeatherWatch</h1>

              <button
                className="logout-button"
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  setCodeParam(null);
                  setRerender(!rerender);
                  window.location.href = "http://localhost:3000";
                }}
              >
                Logout
              </button>
            </div>
            <div className="pagebody">
              <LoginPage userData={userData} />
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="landing-page-header">
            <img src="logo.png" alt="weather-watch-logo" className="logo" />
            <h1 className="brand">WeatherWatch</h1>
          </div>
          <div className="pagebody">
            <LandingPage />
          </div>
        </>
      )}
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;

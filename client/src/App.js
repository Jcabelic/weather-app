import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";

import "./App.css";

function App() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);

    //We will use only local storage for this project
    //but we can use cookies or session storage
    //if we want to store the access token in the browser
    //but for the sake of simplicity for the project
    //<~leaving page for a while and come back & still be logged in>

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
              localStorage.setItem("accessToken", data.access_token);
              setRerender(!rerender);
            }
          });
      }
      getAccessToken();
    }
    getUserData();
  }, [rerender]);

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
          {" "}
          <div className="landing-page-header">
            <img src="logo.png" alt="weather-watch-logo" className="logo" />
            <h1 className="brand">WeatherWatch</h1>

            <button
              className="logout-button"
              onClick={() => {
                localStorage.removeItem("accessToken");
                setRerender(!rerender);
              }}
            >
              Logout
            </button>
          </div>
          <div className="pagebody">
            <div className="display-user-data">
              <h4 className="userName">{userData.login}</h4>
              <a href={userData.html_url} target="_blank" rel="noreferrer">
                {" "}
                {userData.html_url}
              </a>
            </div>
            <LoginPage />
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
      <Footer />
    </div>
  );
}

export default App;

var express = require("express");
var cors = require("cors");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

var bodyParser = require("body-parser");
const { request } = require("express");
require("dotenv").config();

// create an env file and add the client id and client secret from Github API
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const app = express();

app.use(cors());
app.use(bodyParser.json());

//create a route to handle the github login
app.get("/getAccessToken", async function (req, res) {
  req.query.code;
  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;

  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.json(data);
    });
});

//getUserData
//access_token is gotten from the github login route above

//getUserData from frontend
app.get("/getUserData", async function (req, res) {
  //this is the access_token of the user

  req.get("Authorization"); //(passed in as an Authorization header)
  //fetch the user data from github
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"), // Bearer <access_token>
    },
  })
    //once data is fetched
    // first we translating it to json
    .then((response) => {
      return response.json();
    })
    //then we will take that json and send it to the frontend
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

app.listen(4000, function () {
  console.log("CORS server is running on port 4000");
});

# WeatherWatch

- A web application that will give you the weather data in real time by entering specific city
- features can only be accesed by logging in using Github

Application Logic:

![image](https://user-images.githubusercontent.com/70260491/219828449-a94b57ba-0c88-407e-a5b3-6cbb1900056d.png)

Application Demo
https://user-images.githubusercontent.com/70260491/219828619-4281be0c-ac7f-4ade-b54b-718ed7b56799.mp4

IMPORTANT NOTE!!!
Do the following steps after cloning the repository:

1. Go to https://openweathermap.org/

- 1.1 sign-in and get API-key
- 1.2 go to your user-drop-down icon and go to My API Keys
- 1.3 then note it

2. Go to github developer settings

- 2.1 create OAuth Apps with ff. info:
- 2.2 Application Name: Login with github
- 2.3 Homepage URL: http://localhost:3000
- 2.4 Authorization callback URL: http://localhost:3000
  2.5
  -get the CLIENT_ID and note it
  -then generate CLIENT_SECRET and note it

3. Create .env file on your project directory

- 3.1paste the following
- 3.2 REACT_APP_API_KEY = <your-API-key>
- 3.3 CLIENT_ID= <your_client_id>
- 3.4 CLIENT_SECRET= <your_client_secret>

- 3.5 then save it

4. In your development terminal:

- 4.1 go to backend directory by typing
- cd ./weather-app/backend
- npm install
- node server.js

- to establish the local node express server that will fetch and save accessToken to localStorage

- 4.2 open another dev terminal
- 4.3 go to client directory by typing
- cd ./weather-app/client
- npm install
- npm start

You can now view your own development server at http://localhost:3000/

Happy Hacking!

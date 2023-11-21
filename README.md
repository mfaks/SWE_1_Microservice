# SWE_Minigame_Site

Index.html and some code from server.mjs taken from my partner to test the implementation of the microservice.

This microservice has multiple files, user_model.mjs, server.mjs, and leaderboard.js

Requesting and receiving data from this microservice involves the same call as it uses the Fetch API.

# **Prerequisites**

Node.js, Express, MongoDB/Mongoose

# **Requesting data from the microservice**

## Steps to Request Data

1. Download leaderboard.js and copy and paste server code (handles get requests) into the server
2. Run the existing express server 
3. Navigate to leaderboard.html
    a. Make sure to have leaderboard.html open leaderboard.js

When you access leaderboard.html, it should automatically request data based on the DOMContentLoaded listener.
(Fetch requests and receives data in the same call).

## Example Call from leaderboard.js

    fetch('/globalStats') // This line requests data
        .then(response => response.json())
        .then(data => {
                Whatever you want to do with the data inside here
        }) 
                

# **Receiving Data from the Microservice**

## Steps to Recieve Data

1. Download leaderboard.js and copy and paste server code (handles get requests) into the server
2. Run the existing express server 
3. Navigate to leaderboard.html
    a. Make sure to have leaderboard.html open leaderboard.js

When you access leaderboard.html, it should automatically recieve data based on the DOMContentLoaded listener.
(Fetch requests and recieves data in the same call).

## Example Call from leaderboard.js

  fetch('/globalStats') // This line requests data
      .then(response => response.json())
      .then(data => {
              Whatever you want to do with the data inside here
      }) 

# **UML Sequence Diagram**

![umldiagram](https://github.com/justpham/SWE_Minigame_Site/assets/124479834/38e15b59-67af-40b7-b46c-eb525b114bb7)

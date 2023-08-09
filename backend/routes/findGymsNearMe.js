const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

router.post('/findgymnearme', async (req, res) => {
  const lat = req.body.latitude;
  const long = req.body.longitude;
  const keyword = "gym;GYM;Gym";


  try {
    const fetch = await import('node-fetch'); // Dynamic import for node-fetch
    
    const tokenResponse = await generateToken(fetch.default);
    if (tokenResponse == null) {
      return;
    }
    const tokenStatus = tokenResponse.status;
    if (tokenStatus != 200) {
      handleTokenErrors(tokenStatus);
      return;
    }
    else if (tokenStatus == 200) {
      const tokenData = await tokenResponse.json();
      const { access_token, token_type } = tokenData;
      // console.log(tokenData);

      let url = '';
      if (lat !== '' && long !== '') {
        url = `https://atlas.mapmyindia.com/api/places/nearby/json?keywords=${encodeURIComponent(keyword)}&refLocation=${lat},${long}`;
      }
      const response = await fetchNearBYGyms(access_token, token_type, url, fetch.default);
      if(response == null){
         return;
      }
      else if(response.status == 200) {
        const data = await response.json();
        // console.log(data);
        res.status(200).send(data);
        return;
      }
      else if(response.status == 204){
         console.log("no results are found");
         res.status(204).json({error: 'No results are found'})
      }
      else{
        console.log("errors while fetching gym", response.status)
        res.status(response.status) ;
    }
  }} catch (error) {
    console.error(error);
    // Handle any other errors that may occur
    res.status(500).json({ error: 'Something went wrong' });
  }
})


const generateToken = async () => {
  const token_url = "https://outpost.mappls.com/api/security/oauth/token";
  const clientId = process.env.clientId_mappls;
  const clientSecret = process.env.clientSecret_mappls;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'grant_type': "client_credentials",
      'client_id': clientId,
      'client_secret': clientSecret
    })
  };
  try {
    const tokenResponse = await fetch(token_url, options);
    return tokenResponse;
  } catch (error) {
    console.error('Error while generating token:', error)
    return null;
  }
}


const fetchNearBYGyms = async (access_token, token_type, url) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token_type} ${access_token}`
    }
  }
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    console.error('Error while fetching nearbyGyms from nearbyAPI:', error);
    return null;
  }
}


const handleTokenErrors = (tokenStatus) => {
  if (tokenStatus == 204) {
    console.log("error while creating token: ", "No matches were found for the provided query");
  }
  else if (tokenStatus == 400) {
    console.log("error while creating token: ", "Something’s just not right with the request");
  }
  else if (tokenStatus == 401) {
    console.log("error while creating token: ", "Unauthorized, Some extra invalid authorization object is being used to send a request.");
  }
  else if (tokenStatus == 403) {
    console.log("error while creating token: ", " Forbidden.");
  }
  else if (tokenStatus == 500) {
    console.log("error while creating token: ", "Internal Server Error at mappls, the request caused an error in our systems.");
  }
  else if (tokenStatus == 503) {
    console.log("error while creating token: ", "Maintenance Break at mappls");
  }
  else if (tokenStatus == 410) {
    console.log("error while creating token: ", "Deleted");
  }
  else if (tokenStatus == 422) {
    console.log("error while creating token: ", "Unprocessed entity");
  }
  else if (tokenStatus == 412) {
    console.log("error while creating token: ", "Precondition Failed");
  }
  else if (tokenStatus == 428) {
    console.log("error while creating token: ", "Precondition Required");
  }
}


module.exports = router;
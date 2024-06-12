const axios = require("axios");

async function getToken() {
  const authUrl =
    "https://stoplight.io/mocks/highlevel/integrations/39582851/oauth/token";

  const req_body = {
    grant_type: "authorization_code",
  };

  const header = {
    headers: {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/x-www-form-urlencoded",
    },
  };
  try {
    const response = await axios.post(authUrl, req_body, header);

    // console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting token:", error.message);
  }
}

async function getContacts() {
  const authToken = await getToken();
  baseUrl = `https://stoplight.io/mocks/highlevel/integrations/39582863/contacts/?locationId=${authToken.locationId}`;
  const header = {
    headers: {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/x-www-form-urlencoded",
      Version: "2021-07-28",
      Authorization: `Bearer ${authToken.access_token}`,
    },
  };
  try {
    const response = await axios.get(baseUrl, header);
    console.log("response id :", response.data.contacts[0].id);
    console.log("response :", response.data.contacts);
  } catch (error) {
    console.log("error fetching contacts", error);
    throw error.message;
  }
}

getContacts();

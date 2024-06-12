const axios = require("axios");

async function getToken() {
  const authUrl =
    "https://stoplight.io/mocks/highlevel/integrations/39582851/oauth/token";

  const req_body = {
    client_id: "65c0a9a4277b2961322c545a-ls8q934d",
    client_secret: "94af4663-c0c7-4340-9ce5-39b38e88c146",
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
    return response.data.contacts;
  } catch (error) {
    console.log("error fetching contacts", error);
    throw error.message;
  }
}

async function updateContacts() {
  const authToken = await getToken();
  const contact = await getContacts();
  baseUrl = `https://services.leadconnectorhq.com/contacts/${contact[0].id}`;
  const header = {
    headers: {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/x-www-form-urlencoded",
      Version: "2021-07-28",
      Authorization: `Bearer ${authToken.access_token}`,
    },
  };
  let body = [
    {
      id: contact[0].id,
      locationId: contact[0].locationId,
      email: contact[0].email,
      timezone: contact[0].timezone,
      country: contact[0].country,
      source: contact[0].source,
      dateAdded: contact[0].dateAdded,
      customFields: contact[0].customFields,
      tags: contact[0].tags,
      businessId: contact[0].businessId,
      attributions: contact[0].attributions,
      followers: contact[0].followers,
    },
  ];
  console.log("BODY :", body);
  return;
  try {
    const response = await axios.put(baseUrl, header);
    console.log("response id :", response.data);
    console.log("response :", response.data);
  } catch (error) {
    console.log("error fetching contacts", error);
    throw error.message;
  }
}

updateContacts();

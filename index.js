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
    console.log("response id :", response.data.contacts[0].customFields[0]);
    console.log("response :", response.data.contacts[0].id);
    // return;
    return response.data.contacts;
  } catch (error) {
    console.log("error fetching contacts", error);
    throw error.message;
  }
}

async function updateContacts() {
  const authToken = await getToken();
  const contact = await getContacts();
  baseUrl = `https://stoplight.io/mocks/highlevel/integrations/39582863/contacts/${contact[0].id}`;
  const header = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "Accept-Encoding": "application/json",
      Version: "2021-07-28",
      Authorization: `Bearer ${authToken.access_token}`,
    },
  };
  // let body = [
  //   {
  //     id: contact[0].id,
  //     locationId: contact[0].locationId,
  //     email: contact[0].email,
  //     timezone: contact[0].timezone,
  //     country: contact[0].country,
  //     source: contact[0].source,
  //     dateAdded: contact[0].dateAdded,
  //     customFields: contact[0].customFields,
  //     tags: contact[0].tags,
  //     businessId: contact[0].businessId,
  //     attributions: contact[0].attributions,
  //     followers: contact[0].followers,
  //   },
  // ];
  // console.log("BODY :", body);
  // return;
  let body = {
    firstName: "roshan",
    lastName: "Deo",
    name: "rosan Deo",
    email: "rosan@deos.com",
    phone: "+1 888-888-8888",
    address1: "3535 1st St N",
    city: "Dolomite",
    state: "AL",
    postalCode: "35061",
    website: "https://www.tesla.com",
    timezone: "America/Chihuahua",
    dnd: true,
    dndSettings: {
      Call: {
        status: "active",
        message: "string",
        code: "string",
      },
      Email: {
        status: "active",
        message: "string",
        code: "string",
      },
      SMS: {
        status: "active",
        message: "string",
        code: "string",
      },
      WhatsApp: {
        status: "active",
        message: "string",
        code: "string",
      },
      GMB: {
        status: "active",
        message: "string",
        code: "string",
      },
      FB: {
        status: "active",
        message: "string",
        code: "string",
      },
    },
    inboundDndSettings: {
      all: {
        status: "active",
        message: "string",
      },
    },
    tags: ["nisi sint commodo amet", "consequat"],
    customFields: [
      {
        // id: "6dvNaf7VhkQ9snc5vnjJ",
        id: "TEST",
        value: "TEST",
      },
    ],
    source: "public api",
    country: "US",
  };
  console.log("body :", body.customFields);
  // return;
  try {
    const response = await axios.put(baseUrl, body, header);
    console.log("response id :", response.data);
    console.log("body :");
    console.log("response :", response.data.contact.customFields);
  } catch (error) {
    console.log("error updating contacts", error.message);
    // throw error.message;
  }
}

updateContacts();

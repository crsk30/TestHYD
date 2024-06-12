async function getToken() {
  const authUrl = "https://jsonplaceholder.typicode.com/posts/1";

  // Data to be sent in the request body
  //   const params = new URLSearchParams();
  //   params.append("client_id", "65c0a9a4277b2961322c545a-ls8q934d");
  //   params.append("client_secret", "94af4663-c0c7-4340-9ce5-39b38e88c146");
  //   params.append("grant_type", "authorization_token");

  try {
    // const response = await fetch(authUrl, {
    //   method: "GET",
    // headers: {
    //   Accept: "application/json",
    //   "Content-Type": "application/x-www-form-urlencoded",
    // },
    //   body: params.toString(), // Convert URLSearchParams to string for the request body
    // });

    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    // const data = await response.json();
    // console.log("Response data:", data);
    // return data;

    // fetch("https://jsonplaceholder.typicode.com/todos/1")
    // .then((response) => response.json())
    // .then((json) => console.log(json));

    async function postData(
      url = "https://stoplight.io/mocks/highlevel/integrations/39582851/oauth/token",
      data = {
        client_id: "65c0a9a4277b2961322c545a-ls8q934d",
        client_secret: "94af4663-c0c7-4340-9ce5-39b38e88c146",
        grant_type: "authorization_token",
      }
    ) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *client
        body: data, // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

    postData(
      "https://stoplight.io/mocks/highlevel/integrations/39582851/oauth/token",
      {
        client_id: "65c0a9a4277b2961322c545a-ls8q934d",
        client_secret: "94af4663-c0c7-4340-9ce5-39b38e88c146",
        grant_type: "authorization_token",
      }
    )
      .then((data) => {
        console.log(data); // JSON data parsed by `response.json()` call
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.error("Error getting token:", error.message);
  }
}

getToken();

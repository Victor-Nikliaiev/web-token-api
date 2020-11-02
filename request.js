const fetch = require("node-fetch");

const verifyTokenUrl = `https://arhis-webtoken-api.herokuapp.com/verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ29ycCBJbmMuIiwiaWF0IjoxNjA0MTk3MjA1LCJleHAiOjE2MDQ4MDIwMDV9.eRbEQu-zGx31sKDvVS1Uuhtjv3Sf08LB82MURM1DBBs`;
const creatTokenUrl = `http://arhis-webtoken-api.herokuapp.com/create?token=difjdij5tjifivj84&exp=7`;

class Server {
  async #processRequest(url) {
    const response = await fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        return data;
      });
    return response;
  }

  varifyToken(url) {
    this.#processRequest(url).then((data) => {
      if (!data.valid) {
        console.log("Token is not valid");
        return;
      }
      // YOUR CODE
      console.log("Data is cool! Let's go next");
    });
  }
  createToken(url) {
    this.#processRequest(url).then((data) => {
      if (!data.token) {
        console.log("Secret key is incorrect");
        return;
      }
      console.log(data);
      // YOUR CODE HERE
    });
  }
}

const server = new Server();
server.varifyToken(verifyTokenUrl);
server.createToken(creatTokenUrl);

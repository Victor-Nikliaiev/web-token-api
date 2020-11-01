const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const secretKey = "difjdij5tjifivj84";

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT"
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

app.get("/", async function (req, res) {
  let token = req.query.token;
  if (token) {
    let decoded;
    let valid = false;
    try {
      jwt.verify(token, secretKey, (err, data) => {
        decoded = data;
      });
    } catch (err) {
      res.send({ valid });
    }
    if (!decoded || decoded.exp < Math.floor(Date.now() / 1000)) {
      return res.send({ valid: false });
    }
    valid = true;
    return res.send({ valid });
  }

  let createToken = req.query.createToken;

  if (!createToken) return res.send("404");
  if (createToken !== secretKey)
    return res.send({ createToken: "Invalid key" });
  if (createToken == secretKey) {
    const token = jwt.sign({ name: "Corp Inc." }, secretKey, {
      expiresIn: "7 days",
    });
    return res.send({ token });
  }
});

let server = app.listen(8080, function () {
  console.log("Server is listening on port 8080");
});

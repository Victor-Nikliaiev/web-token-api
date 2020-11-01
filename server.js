const express = require("express");
const bodyParser = require("body-parser"); 
const { verifyToken, createToken } = require('./utils/utils')
const router = express.Router()

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('dotenv').config()

router.get('/', (req, res)=>{
  verifyToken(req, res);
  createToken(req, res); 
})

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

app.use('/', router)

app.listen(process.env.PORT || 5000, ()=>{
  console.log("Server is up on port: 5000");
});

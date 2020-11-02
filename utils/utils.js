const jwt = require("jsonwebtoken");
const path = require("path");

module.exports.verifyToken = (req, res) => {
  if (req.query.token) {
    let token = req.query.token;
    let decoded;
    let valid = false;
    try {
      jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        decoded = data;
      });
    } catch (err) {
      return res.send({ valid });
    }
    if (!decoded || decoded.exp < Math.floor(Date.now() / 1000)) {
      return res.send({ valid: false });
    }
    valid = true;
    return res.send({ valid });
  } return res.render('index')
};

module.exports.createToken = (req, res) => {
  if (req.query.token && req.query.exp) {
    if (isNaN(req.query.exp))
      return res.send({ createToken: "Invalid expiry date value" });
    const createToken = req.query.token;
    const expiresIn = req.query.exp;
    if (createToken !== process.env.SECRET_KEY)
      return res.send({ createToken: "Invalid key" });
    if (createToken == process.env.SECRET_KEY) {
      const token = jwt.sign(
        { name: "Created on https://arhis-webtoken-api.herokuapp.com/" },
        process.env.SECRET_KEY,
        {
          expiresIn: `${expiresIn} days`,
        }
      );
      return res.send({ token });
    }
  } return res.render('index')
};

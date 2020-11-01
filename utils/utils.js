const jwt = require('jsonwebtoken')

module.exports.verifyToken = (req, res) => {
  if(!req.query.token && !req.query.createToken) res.send("WEBTokenAPI: v1.0");
  if(req.query.token) {
    let token = req.query.token;
    let decoded;
    let valid = false;
    
    try {
     
      jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
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
}

module.exports.createToken = (req, res) => {
  if(req.query.createToken){
    let createToken = req.query.createToken;
    if (createToken !== process.env.SECRET_KEY)
    return res.send({ createToken: "Invalid key" });
    if (createToken == process.env.SECRET_KEY) {
      const token = jwt.sign({ name: "Corp Inc." }, process.env.SECRET_KEY, {
        expiresIn: "7 days",
      });
      return res.send({ token });
    }
  }
  
  
}
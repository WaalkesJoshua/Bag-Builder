require('dotenv').config();

const validateReqAuth = (req, res, next) => {
  if(req.headers.authorization !== process.env.API_KEY) {
    res.status(403).send('Bad api key');
  } else {
    next();
  }
}

module.exports = {
  validateReqAuth
}
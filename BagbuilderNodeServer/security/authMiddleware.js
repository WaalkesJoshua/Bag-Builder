require('dotenv').config();

const validateReqAuth = (req, res, next) => {
  if(req.headers.authorization !== process.env.API_KEY) {
    res.sendStatus(403);
  } else {
    next();
  }
}

module.exports = {
  validateReqAuth
}
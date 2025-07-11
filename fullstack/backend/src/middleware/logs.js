function logRequest(req, res, next) {
  console.log("tejadi request ke PATH: " , req.path);
  next();
};

module.exports = logRequest;
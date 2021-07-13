let reqId = 0;

module.exports = function (req, res, next) {
  reqId += 1;
  res.options = { reqId };
  return next();
};

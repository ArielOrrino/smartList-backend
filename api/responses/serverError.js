module.exports = function (data) {
  // Set status code 500
  const { res } = this;
  const errorCode = data.code || 500;
  res.status(errorCode);
  res.type('application/json');
  return res.json(data);
};

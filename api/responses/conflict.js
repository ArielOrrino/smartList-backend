module.exports = function (data) {
  // Set status code 409
  const { res } = this;
  res.status(409);
  res.type('application/json');
  return res.json(data);
};

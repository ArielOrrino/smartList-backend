module.exports = function (data) {
  // Set status code 400
  const { res } = this;
  res.status(400);
  res.type('application/json');
  return res.json(data);
};

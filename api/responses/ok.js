module.exports = function (data) {
  // Set status code 200
  const { res } = this;
  res.status(200);
  res.type('application/json');
  return res.json(data);
};

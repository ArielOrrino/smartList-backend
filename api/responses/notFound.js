module.exports = function (data) {
  // Set status code 404
  const { res } = this;
  res.status(404);
  res.type('application/json');
  return res.json(data);
};

module.exports = function (data) {
  // Set status code 403
  const {res} = this;
  res.status(403);
  res.type('application/json');
  return res.json(data);
};

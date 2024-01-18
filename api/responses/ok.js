module.exports = function (data) {
  // Set status code 200
  const { req, res } = this;
  res.status(200);
  res.type('application/json');
  console.log('Requested :: ', req.method, req.url, res.statusCode);
  return res.json(data);
};

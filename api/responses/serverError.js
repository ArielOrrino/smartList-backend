module.exports = function (data) {
  // Set status code 500
  const { req, res } = this;
  const errorCode = data.code || 500;
  res.status(errorCode);
  res.type('application/json');
  console.log('******************LOGGING ERROR*************************');
  const timestamp = new Date().toISOString();
  console.log('Requested::', timestamp, req.method, req.url, errorCode);
  if (req.body) {
    console.log('body: ', req.body);
  }
  console.log('errorMessage: ', data || '');
  console.log('********************************************************');
  return res.json(data);
};

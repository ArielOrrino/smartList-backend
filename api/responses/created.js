module.exports = function (data) {
  // Set status code 201
  const { res } = this;
  const { reqId } = res.options;
  RequestsService.cleanCurrentRequest(reqId);
  res.status(201);
  res.type('application/json');
  return res.json(data);
};

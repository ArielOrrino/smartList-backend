const currentRequests = {};

module.exports = {
  setCurrentRequest(reqId, response) {
    const request = {
      url: response.config.url,
      method: response.config.method,
      data: response.config.data ? response.config.data : undefined,
      params: response.config.params ? response.config.params : undefined,
      response: {
        data: response.data,
        statusCode: response.status,
      },
    };
    if (!currentRequests[reqId]) {
      currentRequests[reqId] = [request];
    } else {
      currentRequests[reqId].push(request);
    }
  },

  getCurrentRequest(reqId) {
    return currentRequests[reqId];
  },

  cleanCurrentRequest(reqId) {
    if (currentRequests[reqId]) {
      delete currentRequests[reqId];
    }
  },
};

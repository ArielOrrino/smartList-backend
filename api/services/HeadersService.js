module.exports = {
  addUserAgentHeader() {
    return {
      'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36',
    };
  },

  createHeaders(headers = {}) {
    return {
      ...headers,
      ...HeadersService.addUserAgentHeader(),
      'Content-Type': 'application/json',
    };
  }
};

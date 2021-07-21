const axios = require('axios-https-proxy-fix');
const qs = require('qs');

const HEADERS = { 'Content-Type': 'application/json' };

const paramsSerializer = (rawParams) => qs.stringify(rawParams, { arrayFormat: 'comma' });

const PROXY_URL='195.55.94.74';
const PROXY_PORT='8080';
const proxy = { host: PROXY_URL, port: PROXY_PORT};

module.exports = {
  async get(axiosParams, useProxy=false) {
    const {
      url, params, reqId, headers,
    } = axiosParams;
    if (!reqId) {
      sails.log.error('reqId is required');
      return Promise.resolve();
    }
    const mergedHeaders = JSON.parse(JSON.stringify({ ...HEADERS, ...headers }));
    const [err, data] = await ToService.promiseToAsync(
            axios.get(url, false ?
              { params, paramsSerializer, headers: mergedHeaders, proxy}
              : { params, paramsSerializer, headers: mergedHeaders}),
    );
    if (err) {
      RequestsService.setCurrentRequest(reqId, err.response);
      throw err;
    }
    RequestsService.setCurrentRequest(reqId, data);
    return data;
  },

  async post(axiosParams) {
    const {
      url, payload, reqId, headers = {}, params = {},
    } = axiosParams;
    if (!reqId) {
      sails.log.error('reqId is required');
      return Promise.resolve();
    }
    const mergedHeaders = JSON.parse(JSON.stringify({ ...HEADERS, ...headers }));
    const [err, data] = await ToService.promiseToAsync(axios.post(url, payload, { headers: mergedHeaders, params }));
    if (err) {
      RequestsService.setCurrentRequest(reqId, err.response);
      throw err;
    }
    RequestsService.setCurrentRequest(reqId, data);
    return data;
  },

  async put(axiosParams) {
    const {
      url, payload, reqId, headers = {},
    } = axiosParams;
    if (!reqId) {
      sails.log.error('reqId is required');
      return Promise.resolve();
    }
    const mergedHeaders = JSON.parse(JSON.stringify({ ...HEADERS, ...headers }));
    const [err, data] = await ToService.promiseToAsync(axios.put(url, payload, { headers: mergedHeaders }));
    if (err) {
      RequestsService.setCurrentRequest(reqId, err.response);
      throw err;
    }
    RequestsService.setCurrentRequest(reqId, data);
    return data;
  },

  async delete(axiosParams) {
    const {
      url, params, reqId, headers = {},
    } = axiosParams;
    if (!reqId) {
      sails.log.error('reqId is required');
      return Promise.resolve();
    }
    const mergedHeaders = JSON.parse(JSON.stringify({ ...HEADERS, ...headers }));
    const [err, data] = await ToService.promiseToAsync(axios.delete(url, {
      data: params, headers: mergedHeaders, params, paramsSerializer,
    }));
    if (err) {
      RequestsService.setCurrentRequest(reqId, err.response);
      throw err;
    }
    RequestsService.setCurrentRequest(reqId, data);
    return data;
  },

  async multipleRequests(requests) {
    const allRequests = requests.map((request) => {
      const {
        method, url, payload, reqId, headers, params,
      } = request;
      const axiosParams = {
        url, payload, reqId, headers, params,
      };
      return this[method](axiosParams);
    });
    const [err, data] = await ToService.promiseToAsync(axios.all(allRequests));
    if (err) {
      throw err;
    }
    return data;
  },

  async patch(axiosParams) {
    const {
      url, payload, reqId, headers = {},
    } = axiosParams;
    if (!reqId) {
      sails.log.error('reqId is required');
      return Promise.resolve();
    }
    const mergedHeaders = JSON.parse(JSON.stringify({ ...HEADERS, ...headers }));
    const [err, data] = await ToService.promiseToAsync(axios.patch(url, payload, { headers: mergedHeaders }));
    if (err) {
      RequestsService.setCurrentRequest(reqId, err.response);
      throw err;
    }
    RequestsService.setCurrentRequest(reqId, data);
    return data;
  },
};

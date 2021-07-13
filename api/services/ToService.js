module.exports = {
  /**
   * @param {Promise} promise
   * Function receives a promise as parameter and return a pre-structured response
   * @return {[err, data]}
   */
  promiseToAsync: (promise) => promise
      .then((data) => [null, data])
      .catch((err) => [err]),
};

module.exports = {

  async fn(inputs, exits, env) {
    const {req, res} = env;
    const { query } = req;
    const { reqId } = res.options;
    const { lat, lng } = query;
    const limit = 3000;
    const headers = {
      'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36',
    };
    const axiosParams = {
      url: UrlsService.getSucursales(),
      reqId,
      headers,
      params: {
        lat,
        lng,
        limit
      },
    };
    const useProxy=true;
    const [err, data] = await ToService.promiseToAsync(AxiosService.get(axiosParams,useProxy));
    if (err) {
      return res.ok(err);
    }
    return res.ok(data.data);
  },
};

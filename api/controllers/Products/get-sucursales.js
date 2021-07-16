module.exports = {


  async fn(inputs, exits, env) {
    const {req, res} = env;
    const { query } = req;
    const { reqId } = res.options;
    const { lat, lng } = query;
    const limit = 3000;
    delete req.headers.host;
    const headers = {
      ...req.headers,
      'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36'
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
    console.log('AxiosParams get-sucursales: ', axiosParams);
    const [err, data] = await ToService.promiseToAsync(AxiosService.get(axiosParams));
    console.log('\x1b[31m');
    console.log('**************************************************************');
    console.log('\x1b[37m');
    console.log('offers err: ', err);
    console.log('offers data: ', data);
    console.log('\x1b[31m');
    console.log('**************************************************************');
    console.log('\x1b[37m');
    if (err) {
      return res.ok(err);
    }
    return res.ok(data.data);
  },
};

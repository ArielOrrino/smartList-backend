module.exports = {


  async fn(inputs, exits, env) {
    const {req, res} = env;
    const { query } = req;
    const { reqId } = res.options;
    const { productName, sucursales: sucursalesString, distancia } = query;
    const limit = 50;
    const headers = {
      'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36',
    };
    const sucursales = JSON.parse(sucursalesString);
    const axiosParams = {
      url: UrlsService.getProductsByName(),
      reqId,
      headers,
      params: {
        string :productName,
        // eslint-disable-next-line camelcase
        array_sucursales: SucursalesService.findSucursales({sucursales, distancia}),
        offset:0,
        sort:'-cant_sucursales_disponible',
        limit,
      },
    };
    const [err, data] = await ToService.promiseToAsync(AxiosService.get(axiosParams));
    if (err) {
      return res.ok(err);
    }
    return res.ok(data.data);
  },
};

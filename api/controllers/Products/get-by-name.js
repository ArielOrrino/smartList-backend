module.exports = {


  async fn(inputs, exits, env) {
    try {
      const { req, res } = env;
      const { query } = req;
      const { reqId } = res.options;
      const { productName, stringSucursales } = query;
      const limit = 50;
      const headers = HeadersService.createHeaders();
      const arraySucursales = stringSucursales.split(',');
      const axiosParams = {
        url: UrlsService.getProductsByName(),
        reqId,
        headers,
        params: {
          string: productName,
          // eslint-disable-next-line camelcase
          array_sucursales: arraySucursales,
          offset: 0,
          sort: '-cant_sucursales_disponible',
          limit,
        },
      };
      const [err, data] = await ToService.promiseToAsync(AxiosService.get(axiosParams));
      if (err) {
        return res.ok(err);
      }
      return res.ok(data.data);
    } catch (error) {
      return res.ok(error);
    }
  },
};

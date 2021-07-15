/* eslint-disable camelcase */
module.exports = {

  async fn(inputs, exits, env) {
    const {req, res} = env;
    const { query } = req;
    const { reqId } = res.options;
    const { productId, sucursales: sucursalesString, distancia } = query;
    const limit = 30;
    const headers = {
      'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36'
    };
    const sucursales = JSON.parse(sucursalesString);
    const axiosParams = {
      url: UrlsService.getProducts(),
      reqId,
      headers,
      params: {
        id_producto :productId,
        array_sucursales: SucursalesService.findSucursales({sucursales, distancia}),
        limit
      },
    };
    const [err, data] = await ToService.promiseToAsync(AxiosService.get(axiosParams));
    if (err) {
      return res.ok(err);
    }
    const {sucursales: sucursalesResponse, sucursalesConProducto, producto} = data.data;
    const sucursalesFiltradas = sucursalesResponse.filter((sucursal)=> !sucursal.message);
    const response = {
      sucursales: sucursalesFiltradas,
      producto,
      sucursalesConProducto
    };
    return res.ok(response);
  },
};

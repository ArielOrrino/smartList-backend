const SucursalesService = require('../../services/SucursalesService');

module.exports = {

  async fn(inputs, exits, env) {
    const { req, res } = env;
    try {
      const { query } = req;
      const { reqId } = res.options;
      const { lat, lng, limit = 3000 } = query;
      const headers = HeadersService.createHeaders();
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
      const [err, data] = await ToService.promiseToAsync(AxiosService.get(axiosParams));
      if (err || data.status !== 200 || !data.data.sucursales) {
        const errorResponse = err || data.data;
        return res.ok(errorResponse);
      }
      const sucursales = SucursalesService.filterSucursales(data.data.sucursales);
      return res.ok(sucursales);
    } catch (error) {
      return res.serverError(error);
    }
  },
};

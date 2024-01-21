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
        const dataWithError = {
          errorMessage: 'Estamos actualizando la lista de precios, intente nuevamente en unos minutos.'
        };
        return res.ok(dataWithError);
      }
      const sucursales = SucursalesService.filterSucursales(data.data.sucursales);
      if (sucursales.length === 0) {
        const dataWithError = {
          errorMessage: 'No se encontraron supermercados dentro del radio de búsqueda.',
        };
        return res.ok(dataWithError);
      }
      return res.ok(sucursales);
    } catch (error) {
      return res.serverError(error);
    }
  },
};

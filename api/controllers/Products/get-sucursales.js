const SucursalesService = require('../../services/SucursalesService');

module.exports = {

  async fn(inputs, exits, env) {
    const { req, res } = env;
    try {
      const { query } = req;
      const { reqId } = res.options;
      const { lat, lng, limit = 3000, includeMayoristas = null } = query;
      const headers = HeadersService.createHeaders();
      const shouldIncludeMayoristas = Boolean(includeMayoristas);
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
      let data2;
      let err2;
      let moreThanZero = false;
      if (shouldIncludeMayoristas) {
        const axiosParams2 = {
          url: UrlsService.getSucursales(),
          reqId,
          headers,
          params: {
            lat,
            lng,
            limit,
            entorno: 'mayoristas'
          },
        };
        [err2, data2] = await ToService.promiseToAsync(AxiosService.get(axiosParams2));
        if (err2 || data2.status !== 200 || !data2.data.sucursales) {
          const dataWithError = {
            errorMessage: 'Estamos actualizando la lista de precios, intente nuevamente en unos minutos.'
          };
          return res.ok(dataWithError);
        }
        moreThanZero = data2.data.sucursales.length > 0;
      }
      let sucursales = SucursalesService.filterSucursales(data.data.sucursales);

      if (shouldIncludeMayoristas && moreThanZero) {
        sucursales = sucursales.concat(SucursalesService.filterSucursales(data2.data.sucursales))
      };
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

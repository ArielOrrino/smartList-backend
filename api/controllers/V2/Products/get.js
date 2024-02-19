module.exports = {

  async fn(inputs, exits, env) {
    const { req, res } = env;
    try {
      const { query } = req;
      const { reqId } = res.options;
      const { productId, sucursalesString, limit = 50, finalList = null } = query;
      const headers = HeadersService.createHeaders();
      let arraySucursales = [];
      if (sucursalesString.indexOf('[') !== -1) {
        arraySucursales = JSON.parse(sucursalesString);
      } else {
        arraySucursales = sucursalesString.split(',');
      }
      const axiosParams = {
        url: UrlsService.getProducts(),
        reqId,
        headers,
        params: {
          id_producto: productId,
          array_sucursales: arraySucursales,
          limit
        },
      };
      const [err, data] = await ToService.promiseToAsync(AxiosService.get(axiosParams));
      if (err) {
        return res.serverError(err);
      }
      const { sucursales: sucursalesResponse } = data.data;
      const sucursalesFiltradas = sucursalesResponse.filter((sucursal) => !sucursal.message);
      const producto = ProductsService.translateProduct(data.data.producto);
      const sucursalesConStock = ProductsService.translateSucursalesConStock(sucursalesFiltradas);
      const response = {
        sucursales: sucursalesConStock,
        producto,
      };
      if (!finalList) {
        return res.ok(response);
      }
      const priceByMarket = sucursalesFiltradas.map((sucursal) => ({
        latitude: sucursal.lat,
        longitude: sucursal.lng,
        price: sucursal.preciosProducto && sucursal.preciosProducto.precioLista,
        banderaId: sucursal.banderaId,
        comercioId: sucursal.comercioId,
        banderaDescripcion: sucursal.banderaDescripcion,
        comercioRazonSocial: sucursal.comercioRazonSocial,
        id: sucursal.id,
      }));
      const priceByMarketFiltered = priceByMarket.filter((prices) => prices.price);
      return res.ok({ producto, priceByMarketFiltered });
    } catch (error) {
      return res.serverError(error);
    }
  }
};

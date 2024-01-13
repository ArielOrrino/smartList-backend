module.exports = {

  async fn(inputs, exits, env) {
    try {
      const { req, res } = env;
      const { query } = req;
      const { reqId } = res.options;
      const { productId, sucursalesString, limit = 50, finalList=null } = query;
      const headers = HeadersService.createHeaders();
      let arraySucursales = JSON.parse(sucursalesString);
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
        return res.ok(err);
      }
      const { sucursales: sucursalesResponse, sucursalesConProducto, producto } = data.data;
      const sucursalesFiltradas = sucursalesResponse.filter((sucursal) => !sucursal.message);
      const response = {
        sucursales: sucursalesFiltradas,
        producto,
        sucursalesConProducto
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
      return res.ok(error);
    }
  }
};

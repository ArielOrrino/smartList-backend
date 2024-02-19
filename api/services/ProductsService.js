module.exports = {
  translateProduct(product) {
    const { id, nombre, cantSucursalesDisponible, precioMax, precioMin } = product;
    return {
      id,
      nombre,
      cantSucursalesDisponible,
      precioMax,
      precioMin,
    };
  },
  translateProductsByName(products) {
    return products.map(product => {
      const { id, nombre, precioMin, cantSucursalesDisponible } = product;
      return {
        id,
        nombre,
        precioMin,
        cantSucursalesDisponible,

      };
    });
  },
  translateSucursalesConStock(sucursales) {
    return sucursales.map(sucursal => {
      const { id: sucursalId, nombre, direccion, preciosProducto, comercioId, banderaId,
        banderaDescripcion, localidad,
      } = sucursal;
      return {
        sucursalId,
        nombre,
        direccion,
        preciosProducto,
        comercioId,
        banderaId,
        banderaDescripcion,
        localidad,
      };
    });
  },
  async getProductsByNameFromPC({ name, sucursales, offset = 0, headers, reqId, res }) {
    let axiosParams = {
      url: UrlsService.getProductsByName(),
      reqId,
      headers,
      params: {
        string: name,
        array_sucursales: sucursales,
        offset,
        sort: '-cant_sucursales_disponible',
        limit: 100,
      },
    };
    const [err, data] = await ToService.promiseToAsync(AxiosService.get(axiosParams));
    if (err) {
      return res.serverError(err);
    }
    return data;
  },
};

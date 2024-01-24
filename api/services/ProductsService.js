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
  }
};

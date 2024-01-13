module.exports = {
  findSucursales({ sucursalesParsed, distancia }) {
    const distanciaMaxima = distancia;
    const arraySucursales = sucursalesParsed
    .filter((sucursal) => sucursal.distancia <= distanciaMaxima)
    .map((sucursal) => `${sucursal.id}`);
    return arraySucursales;
  },

  filterSucursales(sucursales) {
    const filteredSucursales = sucursales.filter((key) => key.id);
    const mappedSucursales = filteredSucursales.map((sucursal) => ({
      id: sucursal.id,
      distancia: sucursal.distanciaNumero,
      distanciaDescripcion: sucursal.distanciaDescripcion,
      nombre: sucursal.banderaDescripcion,
      latitud: sucursal.lat,
      longitud: sucursal.lng,
      direccion: sucursal.direccion,
      localidad: sucursal.localidad,
      comercioId: sucursal.comercioId,
      sucursalId: sucursal.sucursalId,
      banderaId: sucursal.banderaId,
    }));
    return mappedSucursales;
  },
};

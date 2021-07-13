module.exports = {
  findSucursales({ sucursales, distancia }) {
    const distanciaMaxima = distancia;
    const arraySucursales = sucursales
    .filter((sucursal) => sucursal.distancia <= distanciaMaxima)
    .map((sucursal) => `${sucursal.id}`);
    return arraySucursales;
  },
};

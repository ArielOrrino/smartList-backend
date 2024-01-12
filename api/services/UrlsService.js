const cloudfrontServer = 'https://d3e6htiiul5ek9.cloudfront.net';
const locationServer = 'https://apis.datos.gob.ar';

module.exports = {
  getProduct() {
    const segment = `/prod/producto`;
    return `${cloudfrontServer}${segment}`;
  },

  getProductsByName() {
    const segment = `/prod/productos`;
    return `${cloudfrontServer}${segment}`;
  },

  getSucursales() {
    const segment = `/prod/sucursales`;
    return `${cloudfrontServer}${segment}`;
  },

  getLocation() {
    const segment = `/georef/api/ubicacion`;
    return `${locationServer}${segment}`;
  },
};

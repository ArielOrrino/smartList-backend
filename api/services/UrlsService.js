const cloudfrontServer = 'https://d3e6htiiul5ek9.cloudfront.net';

module.exports = {
  getProducts() {
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
};

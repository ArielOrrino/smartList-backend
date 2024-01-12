const HeaderService = require('../../services/HeaderService');

/* eslint-disable camelcase */
module.exports = {

  async fn(inputs, exits, env) {
    const {req, res} = env;
    const { query } = req;
    const { reqId } = res.options;
    let { productId, sucursales: sucursalesString, distancia } = query;
    const limit = 30;
    const headers = HeaderService.createHeaders();
    //https://d3e6htiiul5ek9.cloudfront.net/prod/producto?limit=30&id_producto=7798080520534&array_sucursales=10-2-109,2005-1-76,2004-1-15,3-1-66,9-1-640,9-1-36,12-1-149,13-1-136,9-2-62,10-2-144,3-1-65,3-1-1344,19-1-00525,25-1-1,9-1-636,9-2-42,9-1-633,10-1-8,11-5-3601,19-1-00523,3-1-1736,1000-1-1,9-2-111,10-3-445,3-1-1735,23-1-6277,23-1-6297,10-3-495,10-3-452,10-3-449
    //const sucursales = JSON.parse(sucursalesString);
    productId = '7798080520534';
    array_sucursales = '10-2-109,2005-1-76,2004-1-15,3-1-66,9-1-640,9-1-36,12-1-149,13-1-136,9-2-62,10-2-144,3-1-65,3-1-1344,19-1-00525,25-1-1,9-1-636,9-2-42,9-1-633,10-1-8,11-5-3601,19-1-00523,3-1-1736,1000-1-1,9-2-111,10-3-445,3-1-1735,23-1-6277,23-1-6297,10-3-495,10-3-452,10-3-449';
    const axiosParams = {
      url: UrlsService.getProduct(),
      reqId,
      headers,
      params: {
        id_producto :productId,
        array_sucursales: array_sucursales,
        limit
      },
    };
    const [err, data] = await ToService.promiseToAsync(AxiosService.get(axiosParams));
    if (err) {
      return res.ok(err);
    }
    const {sucursales: sucursalesResponse, sucursalesConProducto, producto} = data.data;
    const sucursalesFiltradas = sucursalesResponse.filter((sucursal)=> !sucursal.message);
    const response = {
      sucursales: sucursalesFiltradas,
      producto,
      sucursalesConProducto
    };
    return res.ok(response);
  },
};

const AVOID_WORDS = ['a', 'e', 'i', 'o', 'u', 'la', 'las', 'lo', 'los', 'le', 'les'];
module.exports = {
  async fn(inputs, exits, env) {
    const { req, res } = env;
    try {
      const { query } = req;
      const { reqId } = res.options;
      const { productName, stringSucursales } = query;
      const limit = 50;
      const headers = HeadersService.createHeaders();
      const arraySucursales = stringSucursales.split(',');
      const splited_name = productName.split(' ');
      let new_search = splited_name[0];
      while (splited_name.length > 0 && AVOID_WORDS.includes(new_search.toLowerCase())) {
        splited_name.shift();
        new_search = splited_name[0];
      }
      if (splited_name.length === 0) {
        return res.ok({ productos: [], total: 0 });
      }
      let axiosParams = {
        url: UrlsService.getProductsByName(),
        reqId,
        headers,
        params: {
          string: new_search,
          // eslint-disable-next-line camelcase
          array_sucursales: arraySucursales,
          offset: 0,
          sort: '-cant_sucursales_disponible',
          limit,
        },
      };
      const [err, data] = await ToService.promiseToAsync(AxiosService.get(axiosParams));
      if (err) {
        return res.serverError(err);
      }
      productos = ProductsService.translateProductsByName(data.data.productos);
      total = productos.length;
      splited_name.shift();
      splited_name.forEach(name => {
        productos = productos.filter((producto) => producto.nombre.toLowerCase().includes((name + ' ').toLowerCase()));
        total = productos.length;
      })

      const response = {
        productos,
        total
      };
      return res.ok(response);
    } catch (error) {
      return res.serverError(error);
    }
  },
};

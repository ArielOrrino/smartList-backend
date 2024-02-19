const AVOID_WORDS = ['a', 'e', 'i', 'o', 'u', 'la', 'las', 'lo', 'los', 'le', 'les'];
module.exports = {
  async fn(inputs, exits, env) {
    const { req, res } = env;
    try {
      const { query } = req;
      const { reqId } = res.options;
      const { productName = '', stringSucursales } = query;
      // offset is -100 because for the first request we want to start from zero
      let offset = -100;
      const headers = HeadersService.createHeaders();
      const arraySucursales = stringSucursales.split(',');
      let productos = [];
      const splited_name = productName.split(' ');
      let new_search = splited_name[0];
      while (splited_name.length > 0 && AVOID_WORDS.includes(new_search.toLowerCase())) {
        splited_name.shift();
        new_search = splited_name[0];
      }
      if (splited_name.length === 0 || new_search === '') {
        return res.ok({ productos: [], total: 0 });
      }
      let iteration = 0;
      let iterationMax = 0;
      while (iteration === 0 || iteration < iterationMax) {
        offset = iteration === 0 ? 0 : offset + 99;
        const target_products = await ProductsService.getProductsByNameFromPC({
          name: new_search,
          sucursales: arraySucursales,
          offset,
          headers,
          reqId,
          res,
        });
        if (target_products.error) {
          return res.serverError(target_products);
        }
        productos = productos.concat(ProductsService.translateProductsByName(target_products.data.productos));
        iterationMax = Math.ceil(target_products.data.total / 100);
        iteration += 1;
      }

      splited_name.shift();
      splited_name.forEach(name => {
        productos = productos.filter((producto) => producto.nombre.toLowerCase().includes((name + ' ').toLowerCase()));
      })

      const response = {
        productos,
        total: productos.length,
      };
      return res.ok(response);
    } catch (error) {
      return res.serverError(error);
    }
  },
};

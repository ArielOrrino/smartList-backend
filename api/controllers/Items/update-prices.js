module.exports = {

  async fn(inputs, exits, env) {
    const { res, req } = env;
    try {
      const { body } = req;
      const { productPrice, lastProductPrice, id } = body;
      if (!productPrice || !lastProductPrice || !id) {
        return res.badRequest('productPrice, lastProductPrice or id is not being sent');
      }
      const itemEdited = await ItemsService.updatePrices({ productPrice, lastProductPrice, id });
      if (itemEdited.error) {
        return res.serverError(itemEdited);
      }
      return res.created(itemEdited);
    } catch (error) {
      return res.serverError(error);
    }
  },
};

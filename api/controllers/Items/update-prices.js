module.exports = {

  async fn(inputs, exits, env) {
    const {res, req} = env;
    const { body } = req;
    const { productPrice, lastProductPrice, id } = body;
    const itemEdited = await ItemsService.updatePrices({productPrice, lastProductPrice, id});
    if (itemEdited.error){
      return res.serverError(itemEdited);
    }
    return res.created(itemEdited);
  },
};

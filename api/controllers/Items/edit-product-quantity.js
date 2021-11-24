module.exports = {

  async fn(inputs, exits, env) {
    const {res, req} = env;
    const { body } = req;
    const { quantity,id } = body;
    if (!quantity || !id) {
      return res.badRequest('Quantity or id is not being sent');
    }
    const itemEdited = await ItemsService.editProductQuantity({quantity,id});
    if (itemEdited.error){
      return res.serverError(itemEdited);
    }
    return res.created(itemEdited);
  },
};

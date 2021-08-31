module.exports = {

    async fn(inputs, exits, env) {
      const {res, req} = env;
      const { body } = req;
      const { Quantity,id } = body;
      const itemEdited = await ItemsService.editProductQuantity({Quantity,id});
      if (itemEdited.error){
        return res.serverError(itemEdited);
      }
      return res.created(itemEdited);
    },
  };
  
module.exports = {

    async fn(inputs, exits, env) {
      const {res, req} = env;
      const { body } = req;
      const { idProduct,productName,productPrice,lastProductPrice,productQuantity,idCategory,addedBy} = body;
      const itemsCreated = await ItemsService.createItem({idProduct,productName,productPrice,lastProductPrice,productQuantity,idCategory,addedBy});
      if (itemsCreated.error){
        return res.serverError(itemsCreated);
      }
      return res.created(itemsCreated);
    },
  };
  
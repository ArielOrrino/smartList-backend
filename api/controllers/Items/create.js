module.exports = {

  async fn(inputs, exits, env) {
    const {res, req} = env;
    const { body } = req;
    const { idProduct,productName,productPrice,lastProductPrice,productQuantity,idCategory,addedBy,shoppingList} = body;
    const itemsCreated = await ItemsService.createItem({idProduct,productName,productPrice,lastProductPrice,productQuantity,idCategory,addedBy,shoppingList});
    if (itemsCreated.error){
      return res.serverError(itemsCreated);
    }
    const list = await ItemsService.findItemsByShoppingList({idList:shoppingList});
    return res.created(list);
  },
};


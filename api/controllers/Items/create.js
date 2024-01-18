module.exports = {

  async fn(inputs, exits, env) {
    const { res, req } = env;
    try {
      const { body } = req;
      const { idProduct,productName,productPrice,lastProductPrice,productQuantity,idCategory,addedBy,shoppingList} = body;
      const itemsCreated = await ItemsService.createItem({idProduct,productName,productPrice,lastProductPrice,productQuantity,idCategory,addedBy,shoppingList});
      if (itemsCreated.error){
        return res.serverError(itemsCreated);
      }
      const list = await ItemsService.findItemsByShoppingList({idList:shoppingList});
      const sortedItems = _.sortBy(list, 'productName');
      return res.ok(sortedItems);
    } catch (error) {
      return res.serverError(error);
    }
  },
};


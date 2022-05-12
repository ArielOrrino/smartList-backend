module.exports = {

  async fn(inputs, exits, env) {
    const {res,req} = env;
    const {id} = req.query;
    let listOfIds = await ShoppingListsService.findShoppingListSharedTo({id});
    if (listOfIds.error){
      return res.serverError(listOfIds);
    }
    let lists = [];
    if (listOfIds.length > 0){
      lists = await ShoppingListsService.findSharedShoppingList({listOfIds});
    }
    return res.ok(lists);
  },
};

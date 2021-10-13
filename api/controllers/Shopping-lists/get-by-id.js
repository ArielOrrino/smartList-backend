module.exports = {

  async fn(inputs, exits, env) {
    const {res,req} = env;
    const {id} = req.query;
    let list = await ShoppingListsService.findShoppingList({id});
    if (list.error){
      return res.serverError(list);
    }
    return res.ok(list);
  },
};

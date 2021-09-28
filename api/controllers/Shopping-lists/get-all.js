module.exports = {

  async fn(inputs, exits, env) {
    const {res} = env;
    const shoppingLists = await ShoppingListsService.getAllShoppingLists();
    return res.ok(shoppingLists);
  },
};

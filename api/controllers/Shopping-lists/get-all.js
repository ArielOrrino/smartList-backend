module.exports = {

  async fn(inputs, exits, env) {
    const { res } = env;
    try {
      const shoppingLists = await ShoppingListsService.getAllShoppingLists();
      return res.ok(shoppingLists);
    } catch (error) {
      return res.serverError(error);
    }
  },
};

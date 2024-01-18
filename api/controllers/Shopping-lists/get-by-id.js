module.exports = {

  async fn(inputs, exits, env) {
    const { res, req } = env;
    try {
      const { id } = req.query;
      let list = await ShoppingListsService.findShoppingList({ id });
      if (list.error) {
        return res.serverError(list);
      }
      return res.ok(list);
    } catch (error) {
      return res.serverError(error);
    }
  },
};

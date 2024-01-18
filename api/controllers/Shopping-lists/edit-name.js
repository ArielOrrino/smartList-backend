module.exports = {

  async fn(inputs, exits, env) {
    const { res, req } = env;
    try {
      const { body } = req;
      const { name, id } = body;
      const listEdited = await ShoppingListsService.editNameShoppingList({ name, id });
      if (listEdited.error) {
        return res.serverError(listEdited);
      }
      return res.created(listEdited);
    } catch (error) {
      return res.serverError(error);
    }
  },
};

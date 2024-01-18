module.exports = {

  async fn(inputs, exits, env) {
    const { res, req } = env;
    try {
      const { body } = req;
      const { name,createdBy } = body;
      const listCreated = await ShoppingListsService.createShoppingList({name,createdBy});
      if (listCreated.error){
        return res.serverError(listCreated);
      }
      return res.created(listCreated);
    } catch (error) {
      return res.serverError(error);
    }
  },
};


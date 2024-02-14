const UsersService = require("../../../services/UsersService");

module.exports = {

  async fn(inputs, exits, env) {
    const { res, req } = env;
    try {
      const { idCreator } = req.query;
      let list = await ShoppingListsService.findShoppingListByCreator({ idCreator });
      if (list.error) {
        return res.serverError(list);
      }
      const sortedLists = _.sortBy(list, 'name');
      let sharedLists = await ShoppingListsService.findSharedShoppingListToUser({ idCreator });
      if (sharedLists.error) {
        return res.serverError(sharedLists);
      }
      const sortedSharedLists = _.sortBy(sharedLists, 'name');
      return res.ok({ ownLists: sortedLists, sharedLists: sortedSharedLists });
    } catch (error) {
      return res.serverError(error);
    }
  },
};

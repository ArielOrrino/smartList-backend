const UsersService = require("../../../services/UsersService");

module.exports = {

  async fn(inputs, exits, env) {
    const { res, req } = env;
    try {
      let { idCreator } = req.query;
      idCreator = parseInt(idCreator);
      let list = await ShoppingListsService.findShoppingListByCreator({ idCreator });
      if (list.error) {
        return res.serverError(list);
      }
      const sortedLists = _.sortBy(list, 'name');
      let sharedLists = await ShoppingListsService.findSharedShoppingListToUser({ idCreator });
      if (sharedLists.error) {
        return res.serverError(sharedLists);
      }
      let completeSharedList = []
      if (sharedLists.length > 0) {

        const creatorsIds = [...new Set(sharedLists.map((list) => list.createdBy))]
        const creatorsInfo = await Promise.all(creatorsIds.map((id) => UsersService.findUserById({ id })))
        completeSharedList = creatorsInfo.map((creator) => {
          return {
            owner: creator,
            lists: _.sortBy(sharedLists.filter((list) => list.createdBy === creator.id), 'name')
          }
        })
      }

      return res.ok({ ownLists: sortedLists, sharedLists: completeSharedList });
    } catch (error) {
      return res.serverError(error);
    }
  },
};

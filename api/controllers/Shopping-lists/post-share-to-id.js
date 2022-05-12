module.exports = {

  async fn(inputs, exits, env) {
    const {res, req} = env;
    const { body } = req;
    const { toUserId, idList } = body;
    const sharedList = await ShoppingListsService.shareShoppingList({toUserId,idList});
    if (sharedList.error){
      return res.serverError(sharedList);
    }
    return res.created(sharedList);
  },
};


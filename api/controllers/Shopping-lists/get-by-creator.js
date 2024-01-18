module.exports = {

  async fn(inputs, exits, env) {
    const { res, req } = env;
    try {
      const {idCreator} = req.query;
      let list = await ShoppingListsService.findShoppingListByCreator({idCreator});
      if (list.error){
        return res.serverError(list);
      }
      const sortedLists = _.sortBy(list, 'name');
      return res.ok(sortedLists);
    } catch (error) {
      return res.serverError(error);
    }
  },
};

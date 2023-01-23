module.exports = {

  async fn(inputs, exits, env) {
    const {res,req} = env;
    const { idCreator } = req.query;
    console.log('idCreator: ', idCreator);
    let list = await ShoppingListsService.findShoppingListByCreator({idCreator});
    if (list.error){
      return res.serverError(list);
    }
    const sortedLists = _.sortBy(list, 'name');
    return res.ok(sortedLists);
  },
};

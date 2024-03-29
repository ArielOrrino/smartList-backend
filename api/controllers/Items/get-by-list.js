module.exports = {

  async fn(inputs, exits, env) {
    const { res, req } = env;
    try {
      const {idList} = req.params;
      let itemsInList = await ItemsService.findItemsByShoppingList({idList});
      if (itemsInList.error){
        return res.serverError(itemsInList);
      }
      const sortedItems = _.sortBy(itemsInList, 'productName');
      return res.ok(sortedItems);
    } catch (error) {
      return res.serverError(error);
    }
  },
};

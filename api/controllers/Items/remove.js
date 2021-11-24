module.exports = {

  async fn(inputs, exits, env) {
    const {res,req} = env;
    const {id, idList} = req.query;
    if (!id) {
      return res.badRequest('id is not being sent');
    }
    const itemRemoved = await ItemsService.remove({id});
    if (itemRemoved && itemRemoved.error){
      return res.serverError(itemsCreated);
    }
    const list = await ItemsService.findItemsByShoppingList({idList});
    const sortedItems = _.sortBy(list, 'productName');
    return res.ok(sortedItems);
  },
};

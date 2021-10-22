module.exports = {

  async fn(inputs, exits, env) {
    const {res,req} = env;
    const {id, idList} = req.query;
    const itemRemoved = await ItemsService.remove({id});
    if (itemRemoved && itemRemoved.error){
      return res.serverError(itemsCreated);
    }
    const list = await ItemsService.findItemsByShoppingList({idList});
    return res.ok(list);
  },
};

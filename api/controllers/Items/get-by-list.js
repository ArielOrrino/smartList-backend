module.exports = {

  async fn(inputs, exits, env) {
    const {res,req} = env;
    const {idList} = req.params;
    let itemsInList = await ItemsService.findItemsByShoppingList({idList});
    if (itemsInList.error){
      return res.serverError(itemsInList);
    }
    return res.ok(itemsInList);
  },
};

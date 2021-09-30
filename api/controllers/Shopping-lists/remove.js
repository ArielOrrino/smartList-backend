module.exports = {

  async fn(inputs, exits, env) {
    const {res,req} = env;
    const {id} = req.query;
    let list = await ShoppingListsService.remove({id});
    if (list && list.error){
      return res.serverError(list);
    }
    return res.ok();
  },
};

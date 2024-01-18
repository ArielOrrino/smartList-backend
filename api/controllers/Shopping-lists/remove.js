module.exports = {

  async fn(inputs, exits, env) {
    const { res, req } = env;
    try {
      const {id, createdBy} = req.query;
      if (!id) {
        return res.badRequest('id is not being sent');
      }
      let list = await ShoppingListsService.remove({id, createdBy});
      if (list && list.error){
        return res.serverError(list);
      }
      const sortedLists = _.sortBy(list, 'name');
      return res.ok(sortedLists);
    } catch (error) {
      return res.serverError(error);
    }
  },
};

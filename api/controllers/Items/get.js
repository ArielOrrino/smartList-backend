module.exports = {

  async fn(inputs, exits, env) {
    const { res, req } = env;
    try {
      const {id} = req.query;
      let item = await ItemsService.findItem({id});
      if (item.error){
        return res.serverError(item);
      }
      return res.ok(item);
    } catch (error) {
      return res.serverError(error);
    }
  },
};

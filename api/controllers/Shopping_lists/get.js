module.exports = {

    async fn(inputs, exits, env) {
      const {res,req} = env;
      const {id} = req.query;
      let list = await Shopping_listsService.findShopping_list({id});
      if (list.error){
        return res.serverError(list);
      }
      return res.ok(list);
    },
  };
  
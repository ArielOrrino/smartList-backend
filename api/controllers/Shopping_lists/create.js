module.exports = {

    async fn(inputs, exits, env) {
      const {res, req} = env;
      const { body } = req;
      const { name,createdBy } = body;
      const listCreated = await Shopping_listsService.createShopping_list({name,createdBy});
      if (listCreated.error){
        return res.serverError(listCreated);
      }
      return res.created(listCreated);
    },
  };
  
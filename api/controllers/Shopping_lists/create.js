module.exports = {

    async fn(inputs, exits, env) {
      const {res, req} = env;
      const { body } = req;
      const { createdBy } = body;
      const listCreated = await Shopping_listsService.createShopping_list({createdBy});
      if (listCreated.error){
        return res.serverError(listCreated);
      }
      return res.created(listCreated);
    },
  };
  
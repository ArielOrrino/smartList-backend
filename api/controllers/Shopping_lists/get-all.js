module.exports = {

    async fn(inputs, exits, env) {
      const {res} = env;
      const shopping_lists = await Shopping_listsService.getAllShopping_lists();
      return res.ok(shopping_lists);
    },
  };
  
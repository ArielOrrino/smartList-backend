const ItemsService = require("../../services/ItemsService");

module.exports = {

    async fn(inputs, exits, env) {
      const {res} = env;
      const item = await ItemsService.getAllItems();
      return res.ok(item);
    },
  };
  
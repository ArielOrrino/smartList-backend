module.exports = {

  async fn(inputs, exits, env) {
    const { res } = env;
    try {
      const item = await ItemsService.getAllItems();
      return res.ok(item);
    } catch (error) {
      return res.serverError(error);
    }
  },
};

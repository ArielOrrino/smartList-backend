module.exports = {

  async fn(inputs, exits, env) {
    const { res } = env;
    try {
      const users = await UsersService.getAllUsers();
      return res.ok(users);
    } catch (error) {
      return res.serverError(error);
    }
  },
};

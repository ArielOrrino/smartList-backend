module.exports = {

  async fn(inputs, exits, env) {
    const {res} = env;
    const users = await UsersService.getAllUsers();
    return res.ok(users);
  },
};

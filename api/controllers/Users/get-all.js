module.exports = {

  async fn(inputs, exits, env) {
    const {res} = env;
    const users = await UsersService.findUser();
    return res.ok(users);
  },
};

/* eslint-disable camelcase */

module.exports = {

  async fn(inputs, exits, env) {
    const {res, req} = env;
    const { body } = req;
    const {name, lastName, email, password} = body;
    return res.ok(UsersService.createUser({name, lastName, email, password}));
  },
};

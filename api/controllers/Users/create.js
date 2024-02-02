/* eslint-disable camelcase */

module.exports = {

  async fn(inputs, exits, env) {
    const { res, req } = env;
    try {
      const { body } = req;
      const { name, lastName, email, password } = body;
      const password2 = 'Null';
      const userCreated = await UsersService.createUser({ name, lastName, email, password: password2 });
      if (userCreated.error) {
        return res.serverError(userCreated);
      }
      console.log('user created!');
      return res.created(userCreated);
    } catch (error) {
      return res.serverError(error);
    }
  },
};

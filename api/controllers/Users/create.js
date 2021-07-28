/* eslint-disable camelcase */

module.exports = {

  async fn(inputs, exits, env) {
    const {res, req} = env;
    const { body } = req;
    const {name, lastName, email, password} = body;
    const userCreated = await UsersService.createUser({name, lastName, email, password});
    if (userCreated.error){
      return res.serverError(userCreated);
    }
    console.log('user created!');
    return res.created(userCreated);
  },
};

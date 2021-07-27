module.exports = {

  async fn(inputs, exits, env) {
    const {res, req} = env;
    const {email} = req.query;
    const user = await UsersService.findUser({email});
    if (user.error){
      return res.serverError(user);
    }
    return res.ok(user);
  },
};

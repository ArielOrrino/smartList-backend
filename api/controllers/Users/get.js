module.exports = {

  async fn(inputs, exits, env) {
    const {res, req} = env;
    const {email, 'login-attempt': loginAttempt} = req.query;
    let user = await UsersService.findUser({email});
    if (!user.error){
      if (loginAttempt){
        user = await UsersService.updateLastLogin({email});
      }
    }
    if (user.error){
      return res.serverError(user);
    }
    return res.ok(user);
  },
};

module.exports = {

  async fn(inputs, exits, env) {
    const {res} = env;
    return res.ok('Server is up and running!');
  },
};

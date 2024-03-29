const moment = require('moment');

module.exports = {
  async findUser({ email }) {
    let user;
    try {
      user = await Users.findOne({ email });
      if (!user) {
        return {
          message: 'user not exists',
          error: true,
          code: 404,
        };
      }
    } catch (err) {
      return {
        message: err,
        error: true,
        code: 500,
      };
    }
    delete user.password;
    return user;
  },

  async findUserById({ id }) {
    let user;
    try {
      user = await Users.findOne({ id });
      if (!user) {
        return {
          message: 'user not exists',
          error: true,
          code: 404,
        };
      }
    } catch (err) {
      return {
        message: err,
        error: true,
        code: 500,
      };
    }
    delete user.password;
    return user;
  },

  getAllUsers() {
    return Users.find();
  },

  updateLastLogin({ email }) {
    const currentTimestamp = moment().unix();
    let user;
    try {
      user = Users.update({ email }).set({ lastLogin: currentTimestamp }).fetch();
    } catch (err) {
      return {
        message: err,
        error: true,
        code: 500,
      };
    }
    delete user.password;
    return user;
  },

  async createUser({ name, lastName, email, password }) {
    let userCreated;
    const currentTimestamp = moment().unix();
    try {
      userCreated = await Users.create({ name, lastName, email, password, lastLogin: currentTimestamp }).fetch();
    } catch (err) {
      if (err.message.includes('unique_email')) {
        return {
          message: 'Email address already exist',
          error: true,
          code: 409,
        };
      }
      return {
        message: 'User couldnt be created',
        error: true,
        code: 500,
      };
    }
    delete userCreated.password;
    return userCreated;
  },
};

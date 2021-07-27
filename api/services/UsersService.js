module.exports = {
  async findUser({email}) {
    let user;
    try {
      user = await Users.findOne({email});
      if (!user) {
        return {
          message: 'user not exists',
          error: true,
          code:404,
        };
      }
    } catch (err) {
      return {
        message: err,
        error: true,
        code:500,
      };
    }
    delete user.password;
    return user;
  },

  getAllUsers() {
    return Users.find();
  },

  async createUser({name, lastName, email, password}) {
    const createdAt = new Date();
    let userCreated;
    try {
      userCreated = await Users.create({name, lastName, email, password, createdAt}).fetch();
    } catch (err) {
      if (err.message.includes('unique_email')) {
        return {
          message: 'Email address already exist',
          error: true,
          code:409,
        };
      }
      return {
        message: 'User couldnt be created',
        error: true,
        code:500,
      };
    }
    delete userCreated.password;
    return userCreated;

  },
/*     userCreation = await Users.create({name, lastName, email, password})
    .intercept('E_UNIQUE', (err)=> {
      console.log(err);
      return 'emailAlreadyInUse';
    });
    .intercept({name:'UsageError'}, (err)=> {
      return 'invalid';
    });
    return userCreation;
  } */
};

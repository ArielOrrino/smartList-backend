const moment = require('moment');

module.exports = {
  findUser({email}) {
    return Users.findOne({email});
  },

  getAllUsers() {
    return Users.find();
  },

  createUser({name, lastName, email, password}, res) {
    // const createdAt = moment().utc();
    return Users.create({name, lastName, email, password}, (err, createdData) => {
      if(err){
        return res.badRequest({error: err});
      } else {
        return res.json({data : createdData});
      }
    });
  }
};

/* eslint-disable camelcase */
const moment = require('moment');
//const Users = require('../models/Users');

module.exports = {
  findUser({email}) {
    return Users.findOne({email});
  },

  getAllUsers() {
    return Users.find();
  },

  createUser({name, lastName, email, password}) {
    const created_at = moment().utc();
    return Users.create({name, lastName, email, password,created_at}, (err, createdData) => {
      if(err){
        return res.badRequest({error: err});
      } else {
        return res.json({data : createdData});
      }
    });
  }
};

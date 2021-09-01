const moment = require('moment');
const Shopping_lists = require('../models/Shopping_lists');

module.exports = {
  findShopping_list({id}) {
    return ShoppingLists.findOne({id});
  },

  getAllShopping_lists() {
    return ShoppingLists.find();
  },

  async createShopping_list({name,createdBy}) {
    let listCreated;
    try {
      listCreated = await ShoppingLists.create({name,createdBy}).fetch();
    } catch (err) {
      return {
        message: 'List couldnt be created',
        error: true,
        code:500,
      };
    }
    
    return listCreated;

  },

  async editNameShopping_list({name,id}) {
    let listEdited;
    try {
      listEdited = await ShoppingLists.update({id}).set({name: name}).fetch();
    } catch (err) {
      return {
        message: 'List couldnt be edited',
        error: true,
        code:500,
      };
    }
    
    return listEdited;

  },

};

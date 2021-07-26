/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: 'default',
  identity: 'Users',
  primaryKey: 'id',
  attributes: {

    id: {
      type: 'number',
      autoIncrement: true,
      unique: true
    },
    name: {
      type: 'string'
    },
    lastName: {
      type: 'string',
      columnName: 'last_name'
    },
    email:{
      type: 'string',
      isEmail: true,
      required: true,
      columnType: 'varchar(64)',
      //unique:true,
    },
    password:{
      type: 'string',
      required: true
    },
    createdAt: {
      type: 'string',
      columnName: 'created_at'
    },
    lastLogin: {
      type: 'string',
      columnName: 'last_login'
    },

    //References

    //many users,many lists

    shoppingLists:{
      collection: 'ShoppingLists',
      via: 'users'
    }



    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};


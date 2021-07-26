/**
 * Shopping_lists.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: 'default',
  identity:'ShoppingLists',
  primaryKey: 'id',
  attributes: {

    id: {
      type: 'number',
      autoIncrement: true,
      unique: true,
    },
    idSupermarket: {
      type: 'number',
      columnName: 'id_supermarket'
    },
    createdBy: {
      type: 'number',
      columnName: 'created_by'
    },
    updatedBy: {
      type: 'number',
      columnName: 'updated_by'
    },
    createdAt:{
      type: 'number',
      autoCreatedAt: true,
      columnName: 'created_at'
    },
    lastUpdate:{
      type: 'string',
      columnType: 'datetime',
      columnName: 'last_update'
    },


    //References

    //one list, many items
    items:{
      collection: 'items',
      via: 'shoppingList'
    },

    //many users, many lists

    users:{
      collection: 'users',
      via: 'shoppingLists'
    },



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


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
    name:{
      type: 'string',
      required: true,
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
    lastUpdate:{
      type: 'number',
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


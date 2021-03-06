/**
 * items.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: 'default',
  identity:'Items',
  primaryKey: 'id',
  attributes: {
    idProduct: {
      type: 'string',
      columnName: 'id_product'
    },
    productName: {
      type: 'string',
      columnName: 'product_name'
    },
    productPrice: {
      type: 'number',
      columnName: 'product_price'
    },
    lastProductPrice: {
      type: 'number',
      columnName: 'last_product_price'
    },
    productQuantity: {
      type: 'number',
      columnName: 'product_quantity'
    },
    idCategory: {
      type: 'number',
      columnName: 'id_category'
    },
    addedBy: {
      type: 'number',
      columnName: 'added_by'
    },

    //Reference

    //one list,many items
    shoppingList: {
      model: 'ShoppingLists'
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


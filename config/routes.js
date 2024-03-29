/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  // Products
  'GET /products': 'Products/get',
  'GET /products/by-name': 'Products/get-by-name',
  'GET /v2/products': 'V2/Products/get',
  'GET /v2/products/by-name': 'V2/Products/get-by-name',

  // Sucursales
  'GET /sucursales': 'Products/get-sucursales',

  // Location
  'GET /location': 'Location/get',

  // Health
  'GET /health': 'health/get',

  // Users
  'GET /all-users': 'Users/get-all',
  'GET /user': 'Users/get',
  'POST /user': 'Users/create',

  //Shopping lists
  'GET /all-shopping-lists': 'Shopping-lists/get-all',
  'GET /shopping-list': 'Shopping-lists/get-by-id',
  'GET /shopping-list/by-creator': 'Shopping-lists/get-by-creator',
  'POST /shopping-list': 'Shopping-lists/create',
  'PATCH /shopping-list': 'Shopping-lists/edit-name',
  'DELETE /shopping-list': 'Shopping-lists/remove',
  'POST /shopping-list/share': 'Shopping-lists/share',
  'GET /v2/shopping-list/by-creator': 'V2/Shopping-lists/get-by-creator',

  //Items
  'GET /all-items': 'Items/get-all',
  'GET /item': 'Items/get',
  'DELETE /item': 'Items/remove',
  'GET /shopping-list/:idList/items': 'Items/get-by-list',
  'POST /item': 'Items/create',
  'PATCH /item': 'Items/edit-product-quantity',
  'PATCH /item/prices': 'Items/update-prices',

};

module.exports = {
  findShoppingList({id}) {
    return ShoppingLists.findOne({id});
  },

  getAllShoppingLists() {
    return ShoppingLists.find();
  },

  async createShoppingList({name,createdBy}) {
    let listCreated;
    try {
      listCreated = await ShoppingLists.create({name,createdBy}).fetch();
    } catch (err) {
      return {
        message: 'List couldnt be created',
        errMessage: err,
        error: true,
        code:500,
      };
    }

    return listCreated;

  },

  async editNameShoppingList({name,id}) {
    let listEdited;
    try {
      listEdited = await ShoppingLists.update({id}).set({name: name}).fetch();
    } catch (err) {
      return {
        message: 'List couldnt be edited',
        errMessage: err,
        error: true,
        code:500,
      };
    }

    return listEdited;

  },

};

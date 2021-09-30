module.exports = {
  findShoppingList({id}) {
    return ShoppingLists.findOne({id});
  },

  getAllShoppingLists() {
    return ShoppingLists.find();
  },

  findShoppingListByCreator({idCreator}) {
    return ShoppingLists.find({createdBy: idCreator});
  },

  async remove({id, createdBy}) {
    try {
      await ShoppingLists.destroy({id});
      return this.findShoppingListByCreator({idCreator:createdBy});
    } catch (err) {
      return {
        message: 'List couldnt be removed',
        errMessage: err,
        error: true,
        code:500,
      };
    }
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

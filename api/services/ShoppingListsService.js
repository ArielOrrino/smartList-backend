module.exports = {
  findShoppingList({ id }) {
    return ShoppingLists.findOne({ id });
  },

  getAllShoppingLists() {
    return ShoppingLists.find();
  },

  findShoppingListByCreator({ idCreator }) {
    return ShoppingLists.find({ createdBy: idCreator });
  },

  async remove({ id, createdBy }) {
    try {
      await ShoppingLists.destroy({ id });
      return this.findShoppingListByCreator({ idCreator: createdBy });
    } catch (err) {
      return {
        message: 'List couldnt be removed',
        errMessage: err,
        error: true,
        code: 500,
      };
    }
  },

  async createShoppingList({ name, createdBy }) {
    let listCreated;
    try {
      listCreated = await ShoppingLists.create({ name, createdBy }).fetch();
    } catch (err) {
      return {
        message: 'List couldnt be created',
        errMessage: err,
        error: true,
        code: 500,
      };
    }
    return listCreated;
  },

  async editNameShoppingList({ name, id }) {
    let listEdited;
    try {
      listEdited = await ShoppingLists.update({ id }).set({ name: name }).fetch();
    } catch (err) {
      return {
        message: 'List couldnt be edited',
        errMessage: err,
        error: true,
        code: 500,
      };
    }
    return listEdited;
  },

  async shareList({ idShoppingList, user }) {
    let sharedList;
    const userId = user.id;
    try {
      sharedList = await SharedShoppingListsUsers.create({ idShoppingList, idUser: userId }).fetch();
    } catch (err) {
      return {
        message: 'List couldnt be shared',
        errMessage: err,
        error: true,
        code: 500,
      };
    }
    return sharedList;
  },

  async findSharedShoppingListToUser({ idCreator }) {
    try {
      const sharedLists = await SharedShoppingListsUsers.find({ idUser: idCreator });
      let completeSharedList = [];
      if (sharedLists.length === 0) {
        return completeSharedList;
      }
      completeSharedList = await Promise.all(sharedLists.map(list => ShoppingListsService.findShoppingList({ id: list.idShoppingList })));
      return completeSharedList;
    } catch (err) {
      return {
        message: 'Shared List couldnt be found',
        errMessage: err,
        error: true,
        code: 500,
      };
    }
  },
};

module.exports = {
  async findShoppingList({id}) {
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

  findShoppingListSharedTo({id}) {
    return SharedShoppingListsUsers.find({idUser: id});
  },

  async shareShoppingList({ toUserId, idList }) {
    let sharedList = null;
    try {
      sharedList = await SharedShoppingListsUsers.create({idUser: toUserId, idShoppingList: idList}).fetch();
    } catch (err) {
      return {
        message: 'List couldnt be shared',
        errMessage: err,
        error: true,
        code:500,
      };
    }
    return sharedList;
  },

  async findSharedShoppingList({ listOfIds }) {
    let lists = null;
    try {
      lists = Promise.all(listOfIds.map((idList) => {
        return this.findShoppingList({ id: idList.idShoppingList });
      }));
    } catch (err) {
      return {
        message: 'Lists couldnt be retrieved',
        errMessage: err,
        error: true,
        code: 500,
      };
    }
    return lists;
  }
};

module.exports = {
  findItem({id}) {
    return Items.findOne({id});
  },

  getAllItems() {
    return Items.find();
  },

  async createItem({idProduct,productName,productPrice,lastProductPrice,productQuantity,idCategory,addedBy,shoppingList}) {
    let itemCreated;
    try {
      itemCreated = await Items.create({idProduct,productName,productPrice,lastProductPrice,productQuantity,idCategory,addedBy,shoppingList}).fetch();
    } catch (err) {
      return {
        message: 'Item couldnt be created',
        errMessage: err,
        error: true,
        code:500,
      };
    }
    return itemCreated;

  },

  async editProductQuantity({quantity,id}) {
    let itemEdited;
    try {
      itemEdited = await Items.update({id}).set({productQuantity: quantity}).fetch();
    } catch (err) {
      return {
        message: 'Item Quantity couldnt be edited',
        errorMessage: err,
        error: true,
        code:500,
      };
    }
    return itemEdited;
  },

  findItemsByShoppingList({idList}) {
    return Items.find({shoppingList: idList});
  },

  async remove({id}) {
    try {
      await Items.destroy({id});
    } catch (err) {
      return {
        message: 'Item couldnt be removed',
        errMessage: err,
        error: true,
        code:500,
      };
    }
  },
};

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
        error: true,
        code:500,
      };
    }
    return itemCreated;

  },

  async editProductQuantity({Quantity,id}) {
    let itemEdited;
    try {
      itemEdited = await Items.update({id}).set({productQuantity: Quantity}).fetch();
    } catch (err) {
      return {
        message: 'Item Quantity couldnt be edited',
        error: true,
        code:500,
      };
    }
    return itemEdited;

  },


};

module.exports = {
  findItem({id}) {
    return Items.findOne({id});
  },

  getAllItems() {
    return Items.find();
  },

  async createItem({idProduct,productName,productPrice,lastProductPrice,productQuantity,idCategory,addedBy}) {
    let itemCreated;
    try {
      itemCreated = await Items.create({idProduct,productName,productPrice,lastProductPrice,productQuantity,idCategory,addedBy}).fetch();
    } catch (err) {
      return {
        message: 'List couldnt be created',
        error: true,
        code:500,
      };
    }
    return itemCreated;

  },

};

module.exports = {

  async fn(inputs, exits, env) {
    const { res, req } = env;
    try {
      const { to, idShoppingList } = req.query;
      const user = await UsersService.findUser({ email: to });
      if (user.error) {
        return {
          message: 'User not found',
          errMessage: err,
          error: true,
          code: 500,
        };
      }
      const sharedList = await ShoppingListsService.shareList({ idShoppingList, user });
      if (sharedList.error) {
        return res.serverError(sharedList);
      }
      return res.created();
    } catch (error) {
      return res.serverError(error);
    }
  },
};

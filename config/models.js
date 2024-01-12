/**
 * Default model settings
 * (sails.config.models)
 *
 * Your default, project-wide model settings. Can also be overridden on a
 * per-model basis by setting a top-level properties in the model definition.
 *
 * For details about all available model settings, see:
 * https://sailsjs.com/config/models
 *
 * For more general background on Sails model settings, and how to configure
 * them on a project-wide or per-model basis, see:
 * https://sailsjs.com/docs/concepts/models-and-orm/model-settings
 */

module.exports.models = {
  attributes: {
    //--------------------------------------------------------------------------
    //  /\   Using MongoDB?
    //  ||   Replace `id` above with this instead:
    //
    // ```
    // id: { type: 'string', columnName: '_id' },
    // ```
    //
    // Plus, don't forget to configure MongoDB as your default datastore:
    // https://sailsjs.com/docs/tutorials/using-mongo-db
    //--------------------------------------------------------------------------
    id: {
      type: 'number',
      autoIncrement: true,
      autoMigrations: {
        autoIncrement: true,
        columnType: '_number',
        unique: true,
      },
    },
    createdAt : {
      type: 'number',
      autoCreatedAt: true,
      columnName: 'created_at'
    },
  },
  schema: true,
  migrate: 'alter',
  dataEncryptionKeys: {
    default: 'eW0rrEtt9EoJyRT7eBlrUZ0p1q3NCcGuisayHjAaaE8='
  },
  ssl:true
};

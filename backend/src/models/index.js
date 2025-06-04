// // models/index.js
// const Sequelize = require("sequelize");
// const sequelize = require("../../config/db");

// const User = require("./user.model")(sequelize);
// const Store = require("./store.model")(sequelize);
// const StoreRating = require("./store_rating.model")(sequelize);

// // Set up associations
// User.associate?.({ StoreRating });
// Store.associate?.({ StoreRating });
// StoreRating.associate?.({ User, Store });

// const db = {
//   sequelize,
//   Sequelize,
//   User,
//   Store,
//   StoreRating,
// };

// module.exports = db;


const Sequelize = require("sequelize");
const sequelize = require("../../config/db");

const User = require("./user.model")(sequelize, Sequelize.DataTypes);
const StoreRating = require("./store_rating.model")(sequelize, Sequelize.DataTypes);

const db = {
  sequelize,
  Sequelize,
  User,
  StoreRating,
};

// Call associations after model definitions
Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

module.exports = db;

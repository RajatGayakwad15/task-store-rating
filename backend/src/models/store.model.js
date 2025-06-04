const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db.js");

const Store = sequelize.define("Store", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { notEmpty: true },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
});

// Association function (to be called in models/index.js)
Store.associate = (models) => {
  Store.hasMany(models.StoreRating, {
    foreignKey: "store_id",
    onDelete: "CASCADE",
  });
};

module.exports = Store;

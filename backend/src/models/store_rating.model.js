const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db.js");

const StoreRating = sequelize.define(
  "StoreRating",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
        feedback: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "store_ratings",
    timestamps: true,
  }
);

// Association function (to be called in models/index.js)
StoreRating.associate = (models) => {
  StoreRating.belongsTo(models.User, {
    foreignKey: "user_id",
  });

  StoreRating.belongsTo(models.Store, {
    foreignKey: "store_id",
  });
};

module.exports = StoreRating;

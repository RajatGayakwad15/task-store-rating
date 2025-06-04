const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db.js");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 3,
  },
});

// Association function (to be called in models/index.js)
User.associate = (models) => {
  User.hasMany(models.StoreRating, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });
};

module.exports = User;

// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define("User", {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: { notEmpty: true },
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: { notEmpty: true },
//     },
//     address: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: { notEmpty: true },
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     role_id: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       defaultValue: 3,
//     },
//   });

//   User.associate = (models) => {
//     User.hasMany(models.StoreRating, {
//       foreignKey: "user_id",
//       onDelete: "CASCADE",
//     });
//   };

//   return User;
// };


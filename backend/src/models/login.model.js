const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db.js");

const Login = sequelize.define(
  "Login",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "1 = SystemAdmin, 2 = StoreOwner, 3 = User",
    },
  },
  {
    tableName: "logins",
    timestamps: true,
  }
);

module.exports = Login;

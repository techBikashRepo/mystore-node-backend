const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "users", timestamps: false }
);

User.insertUser = async ({ username, password }) => {
  await User.create({
    username: username,
    password: password,
  });
};

User.fetchUserByUsername = async (username) => {
  return User.findOne({
    where: {
      username: username,
    },
  });
};

module.exports = User;

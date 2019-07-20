module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.STRING
    },
    postCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  return User;
};

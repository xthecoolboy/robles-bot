module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        userId: {
            type: DataTypes.STRING
        },
        text: {
            type: DataTypes.STRING
        },
        emotion: {
            type: DataTypes.STRING,
            default: 'unset'
        }
    });

    return Post;
};

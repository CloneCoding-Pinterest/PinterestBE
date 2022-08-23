'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PinComment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    PinComment.init(
        {
            pinCommentId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            pinId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            commentId: {
                allowNull: false,
                type: DataTypes.INTEGER
            }
        },
        {
            sequelize,
            timestamps: false,
            modelName: 'PinComment'
        }
    );
    PinComment.associate = function (models) {
        PinComment.belongsTo(models.User, {
            foreignKey: 'userId', // PinComment.userId
            targetKey: 'userId', // User.userId
            onUpdate: 'cascade', // User.userId 가 변경되면 같이 변경됨
            onDelete: 'cascade' // User.userId 가 사라지면 같이 사라짐
        });
        PinComment.belongsTo(models.Pin, {
            foreignKey: 'pinId', // PinComment.pinId
            targetKey: 'pinId', // Pin.pinId
            onUpdate: 'cascade', // Pin.pinId 가 변경되면 같이 변경됨
            onDelete: 'cascade' // Pin.pinId 가 사라지면 같이 사라짐
        });
        PinComment.belongsTo(models.Comment, {
            foreignKey: 'commentId', // PinComment.commentId
            targetKey: 'commentId', // Comment.commentId
            onUpdate: 'cascade', // Comment.commentId 가 변경되면 같이 변경됨
            onDelete: 'cascade' // Comment.commentId 가 사라지면 같이 사라짐
        });
    };
    return PinComment;
};

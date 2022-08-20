'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserPin extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    UserPin.init(
        {
            userPinId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            pinId: {
                allowNull: false,
                type: DataTypes.INTEGER
            }
        },
        {
            sequelize,
            timestamps: false,
            modelName: 'UserPin'
        }
    );
    UserPin.associate = function (models) {
        UserPin.belongsTo(models.User, {
            foreignKey: 'userId', // UserPin.userId
            targetKey: 'userId', // User.userId
            onUpdate: 'cascade', // User.userId 가 변경되면 같이 변경됨
            onDelete: 'cascade' // User.userId 가 사라지면 같이 사라짐
        });
        UserPin.belongsTo(models.Pin, {
            foreignKey: 'pinId', // UserPin.userId
            targetKey: 'pinId', // User.userId
            onUpdate: 'cascade', // User.userId 가 변경되면 같이 변경됨
            onDelete: 'cascade' // User.userId 가 사라지면 같이 사라짐
        });
    };
    return UserPin;
};

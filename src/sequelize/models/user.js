'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            userId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            snsTokenId: {
                allowNull: false,
                type: DataTypes.NUMBER,
                references: {
                    model: 'SnsTokens', // company migration define
                    key: 'snsTokenId'
                }
            },
            pinTokenId: {
                allowNull: false,
                type: DataTypes.NUMBER,
                references: {
                    model: 'PinTokens', // company migration define
                    key: 'pinTokenId'
                }
            },
            detailId: {
                allowNull: false,
                type: DataTypes.NUMBER,
                references: {
                    model: 'UserDetails', // company migration define
                    key: 'detailId'
                }
            }
        },
        {
            sequelize,
            timestamps: false,
            modelName: 'User'
        }
    );

    User.associate = function (models) {
        User.belongsTo(models.SnsTokens, {
            foreignKey: 'snsTokenId', // User.snsTokenId
            targetKey: 'snsTokenId', // SnsTokens.snsTokenId
            onUpdate: 'cascade', // SnsTokens.category 가 변경되면 같이 변경됨
            onDelete: 'cascade' // SnsTokens.category 가 사라지면 같이 사라짐
        });
        User.belongsTo(models.PinTokens, {
            foreignKey: 'pinTokenId', // User.pinTokenId
            targetKey: 'pinTokenId', // PinTokens.pinTokenId
            onUpdate: 'cascade', // PinTokens.category 가 변경되면 같이 변경됨
            onDelete: 'cascade' // PinTokens.category 가 사라지면 같이 사라짐
        });
        User.belongsTo(models.UserDetail, {
            foreignKey: 'detailId', // User.detailId
            targetKey: 'detailId', // UserDetail.detailId
            onUpdate: 'cascade', // UserDetail.category 가 변경되면 같이 변경됨
            onDelete: 'cascade' // UserDetail.category 가 사라지면 같이 사라짐
        });
    };

    return User;
};

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SnsTokens extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    SnsTokens.init(
        {
            snsTokenId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            category: {
                allowNull: false,
                type: DataTypes.STRING,
                defaultValue: 'kakao'
            },
            accessToken: {
                allowNull: false,
                type: DataTypes.STRING
            },
            refreshToken: {
                allowNull: false,
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            timestamps: false,
            modelName: 'SnsTokens'
        }
    );
    return SnsTokens;
};

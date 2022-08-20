'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PinTokens extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    PinTokens.init(
        {
            pinTokenId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            refreshToken: {
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            timestamps: false,
            modelName: 'PinTokens'
        }
    );
    return PinTokens;
};

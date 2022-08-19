'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Pin extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Pin.init(
        {
            pinId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            title: {
                allowNull: false,
                type: DataTypes.STRING
            },
            content: {
                allowNull: false,
                type: DataTypes.STRING
            },
            picKey: {
                allowNull: false,
                type: DataTypes.STRING
            },
            picUrl: {
                allowNull: false,
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            timestamps: false,
            modelName: 'Pin'
        }
    );
    return Pin;
};

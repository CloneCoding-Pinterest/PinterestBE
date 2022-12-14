'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    UserDetail.init(
        {
            detailId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            nickname: {
                allowNull: false,
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            ageRange: {
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            timestamps: false,
            modelName: 'UserDetail'
        }
    );
    return UserDetail;
};

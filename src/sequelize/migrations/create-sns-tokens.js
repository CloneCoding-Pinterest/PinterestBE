'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('SnsTokens', {
            snsTokenId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            providedId: {
                allowNull: false,
                unique: true,
                type: Sequelize.INTEGER
            },
            category: {
                allowNull: false,
                type: Sequelize.STRING,
                defaultValue: 'kakao'
            },
            accessToken: {
                allowNull: false,
                type: Sequelize.STRING
            },
            refreshToken: {
                allowNull: false,
                type: Sequelize.STRING
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('SnsTokens');
    }
};

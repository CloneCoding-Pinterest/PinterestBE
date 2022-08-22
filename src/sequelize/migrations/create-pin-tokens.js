'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('PinTokens', {
            pinTokenId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            refreshToken: {
                allowNull: true,
                type: Sequelize.STRING
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('PinTokens');
    }
};

'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('UserDetails', {
            detailId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nickname: {
                allowNull: false,
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            ageRange: {
                type: Sequelize.STRING
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('UserDetails');
    }
};

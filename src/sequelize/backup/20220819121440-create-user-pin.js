'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('UserPins', {
            userId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            pinId: {
                allowNull: false,
                type: Sequelize.INTEGER
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('UserPins');
    }
};

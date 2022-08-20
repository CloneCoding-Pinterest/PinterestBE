'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('UserPins', {
            userId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users', // company migration define
                    key: 'userId'
                }
            },
            pinId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Pins', // company migration define
                    key: 'pinId'
                }
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('UserPins');
    }
};

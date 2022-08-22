'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            userId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            snsTokenId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'SnsTokens', // company migration define
                    key: 'snsTokenId'
                }
            },
            pinTokenId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'PinTokens', // company migration define
                    key: 'pinTokenId'
                }
            },
            detailId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'UserDetails', // company migration define
                    key: 'detailId'
                }
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};

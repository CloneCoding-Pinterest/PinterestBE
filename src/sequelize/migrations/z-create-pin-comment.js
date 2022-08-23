'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('PinComments', {
            pinCommentId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onUpdate: 'cascade',
                onDelete: 'cascade',
                references: {
                    model: 'Users', // company migration define
                    key: 'userId'
                }
            },
            pinId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onUpdate: 'cascade',
                onDelete: 'cascade',
                references: {
                    model: 'Pins', // company migration define
                    key: 'pinId'
                }
            },
            commentId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onUpdate: 'cascade',
                onDelete: 'cascade',
                references: {
                    model: 'Comments', // company migration define
                    key: 'commentId'
                }
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('PinComments');
    }
};

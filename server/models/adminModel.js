const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

// TO DO
// id and org_id 

const adminModel = sequelize.define('admin', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    org_id: {
        type: DataTypes.UUID,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'name is required' }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'email is required' }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'password is required' }
        }
    },
    picture: {
        type: DataTypes.STRING,
    }
});

module.exports = adminModel;
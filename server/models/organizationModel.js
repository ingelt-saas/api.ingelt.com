
const organizationModel = (sequelize, DataTypes) => {
    return sequelize.define('oraganisation', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'name is required' }
            }
        },
        owner_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'owner name is required' }
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
        logo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        website: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'address is required' }
            }
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'state is required' }
            }
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'country is required' }
            }
        },
        registration_date: {
            type: DataTypes.DATE
        },
        plan: {
            type: DataTypes.STRING
        },
        active: {
            type: DataTypes.BOOLEAN
        }
    });
}

module.exports = organizationModel;

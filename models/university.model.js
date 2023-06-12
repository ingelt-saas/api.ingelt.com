const universityModel = (sequelize, DataTypes) => {
    return sequelize.define('university', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'university name is required' }
            }
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'university logo is required' }
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'university location is required' }
            }
        },
        ranking: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        yearlyFee: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'yearly fee is required' }
            }
        },
        courseName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'course name is required' }
            }
        },
        courseDuration: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notNull: { msg: 'course duration is required' }
            }
        },
    });
}

module.exports = universityModel;
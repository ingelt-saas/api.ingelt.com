module.exports = (sequelize, DataTypes) => {
    return sequelize.define('assignment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        batch_id: {
            type: DataTypes.UUID,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'name is required' }
            }
        },
        assigned_date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: { msg: 'assigned date is required' }
            }
        },
        end_date: DataTypes.DATE,
        file: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'file is required' }
            }
        },
    });
}
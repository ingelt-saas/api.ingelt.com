
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('batch', {
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
        reg_date: DataTypes.DATE,
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: { msg: 'required' }
            }
        },
        end_date: DataTypes.DATE,
        classroom_link: DataTypes.STRING,
        average_band: DataTypes.INTEGER,
        total_average_band: DataTypes.INTEGER,
    });
};
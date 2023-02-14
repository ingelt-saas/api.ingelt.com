
const documentModel = (sequelize, DataTypes) => {
    return sequelize.define('document', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        org_id: {
            type: DataTypes.UUID,
        },
        file: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'file is required' }
            }
        },
        filesize: DataTypes.STRING,
        date: DataTypes.DATE,
    });
}

module.exports = documentModel;
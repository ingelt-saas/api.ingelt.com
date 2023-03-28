const studentApplied = (sequelize, DataTypes) => {
    return sequelize.define('studentApplied', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        status: {
            type: DataTypes.ENUM,
            values: [
                'applied', // student applied to institute
                'accepted', // student accepted in institute
            ],
            defaultValue: 'applied'
        }
    });
}

module.exports = studentApplied;
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('session', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        schedule: {
            type: DataTypes.DATE,
            defaultValue: null,
        },
        amount: {
            type: DataTypes.FLOAT,
            defaultValue: null,
        },
        transactionId: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        speaker: {
            type: DataTypes.ENUM,
            values: ['indian', 'american']
        },
    });
}
module.exports = (sequelize, DataTypes) => {
    return sequelize.define({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        assignment_id: {
            type: DataTypes.UUID,
        },
        student_id: {
            type: DataTypes.UUID,
        },
        file: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'file is required' }
            }
        },
        submission_date: DataTypes.DATE,
        evaluated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        scores: DataTypes.STRING,
        remarks: DataTypes.STRING,
    });
}
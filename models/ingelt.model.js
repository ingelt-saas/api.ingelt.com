module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "ingelt",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "email is required" },
                },
            },

            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "password is required" },
                },
            },
        }
    );
};
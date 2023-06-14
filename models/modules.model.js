const moduleModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "modules",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "name is required" },
                },
            },
            file: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: "file is required" },
                },
            },
            subject: {
                type: DataTypes.ENUM,
                values: ['Reading', 'Writing', 'Speaking', 'Listening', 'All']
            },
            fileSize: DataTypes.INTEGER,
            duration: DataTypes.INTEGER,
            views: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            thumbnail: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            timestamps: true,
        }
    );
};

module.exports = moduleModel;

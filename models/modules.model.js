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
                allowNull: true,
            },
            subject: {
                type: DataTypes.ENUM,
                values: ['Reading', 'Writing', 'Speaking', 'Listening', 'All'],
                defaultValue: null,
            },
            fileSize: DataTypes.INTEGER,
            duration: DataTypes.INTEGER,
            views: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            type: {
                type: DataTypes.STRING,
                values: ['modules', 'library', 'module_ppt', 'mock_test'],
                defaultValue: null,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            thumbnail: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            order: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },
            releaseDate: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            timestamps: true,
        }
    );
};

module.exports = moduleModel;

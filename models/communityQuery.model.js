module.exports = (sequelize,DataTypes) => {
    const CommunityQuery = sequelize.define('communityQuery', {
        id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        },
        name: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   notNull: { msg: "name is required" },
        // },
        },
        phoneNo: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   notNull: { msg: "Phone Number is required" },
        // },
        },
        email: {
        type: DataTypes.STRING,
        allowNull: true,
        },
    },
    {
        timestamps: true,
    }
    );
    return CommunityQuery;
}
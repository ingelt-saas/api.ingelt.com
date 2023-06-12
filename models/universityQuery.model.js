module.exports = (sequelize,DataTypes) => {
    const UniversityQuery = sequelize.define('universityQuery', {
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
        intrestedCountry: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        intrestedCourse: {
            type: DataTypes.STRING,
            allowNull: true,
            },
        educationLevel: {
            type: DataTypes.ENUM,
            values: ['intermediate','undergraduate', 'postgraduate'],
            allowNull: true,
            },
            preferredStudyArea:{
                type: DataTypes.STRING,
                allowNull: true,
            }
    },
    {
        timestamps: true,
    }
    );
    return UniversityQuery;
}
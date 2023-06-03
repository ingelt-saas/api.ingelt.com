const organisationModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "organization",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },

      ownerName: {
        type: DataTypes.STRING,
        allowNull: true,
        // validate: {
        //   notNull: { msg: "Owner Name is required" },
        // },
      },

      name: {
        type: DataTypes.STRING,
        allowNull: true,
        // validate: {
        //   notNull: { msg: "Name is required" },
        // },
      },

      images: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      phoneNo: {
        type: DataTypes.STRING,
        allowNull: true,
        // validate: {
        //   notNull: { msg: "Phone Number is required" },
        // },
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Email is required" },
        },
      },

      logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      website: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      address: {
        type: DataTypes.STRING,
        allowNull: true,
        // validate: {
        //   notNull: { msg: "address is required" },
        // },
      },

      state: {
        type: DataTypes.STRING,
        allowNull: true,
        // validate: {
        //   notNull: { msg: "state is required" },
        // },
      },
      zone: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      country: {
        type: DataTypes.STRING,
        allowNull: true,
        // validate: {
        //   notNull: { msg: "country is required" },
        // },
      },

      tagline: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      listeningRating: {
        type: DataTypes.FLOAT,
      },

      readingRating: {
        type: DataTypes.FLOAT,
      },

      writingRating: {
        type: DataTypes.FLOAT,
      },

      speakingRating: {
        type: DataTypes.FLOAT,
      },

      overallRating: {
        type: DataTypes.FLOAT,
      },

      ratingsCount: {
        type: DataTypes.INTEGER,
      },

      sponsored: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      modeOfClasses: {
        type: DataTypes.ENUM,
        values: ["online", "offline", "hybrid"],
      },

      plan: {
        type: DataTypes.STRING,
      },

      courseDuration: {
        type: DataTypes.INTEGER,
        defaultValue:45,
      },

      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      endBatches: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },

      verified: {
        type: DataTypes.BOOLEAN,
      },

      fee: {
        type: DataTypes.FLOAT,
      },
      discountedFee: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      walkInRevenue: {
        type: DataTypes.FLOAT,
      },
      ingeltRevenue: {
        type: DataTypes.FLOAT,
      },

      commission: {
        type: DataTypes.FLOAT,
        defaultValue: 50,
      },

      bankName: {
        type: DataTypes.STRING,
      },

      bankAccountNumber: {
        type: DataTypes.STRING,
      },

      bankAccountIfsc: {
        type: DataTypes.STRING,
      },

      panId: {
        type: DataTypes.STRING,
      },

      panPicture: {
        type: DataTypes.STRING,
      },

      gstId: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
};

module.exports = organisationModel;

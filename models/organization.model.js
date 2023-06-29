const organisationModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "organization",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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

      // images: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },

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
        // unique: true,
        // validate: {
        //   notNull: { msg: "Email is required" },
        // },
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
        allowNull: true,
      },

      readingRating: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },

      writingRating: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },

      speakingRating: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },

      overallRating: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },

      ratingsCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      sponsored: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      modeOfClasses: {
        type: DataTypes.ENUM,
        values: ["online", "offline", "hybrid"],
        defaultValue: "online",
      },

      plan: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      courseDuration: {
        type: DataTypes.INTEGER,
        defaultValue: 45,
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
        defaultValue: false,
      },

      fee: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      discountedFee: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      walkInRevenue: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      ingeltRevenue: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },

      commission: {
        type: DataTypes.FLOAT,
        defaultValue: 50,
      },

      bankName: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      bankAccountNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      bankAccountIfsc: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      panId: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      panPicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      gstId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      embedUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
};

module.exports = organisationModel;
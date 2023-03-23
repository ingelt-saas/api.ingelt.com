const organisationModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "organization",
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
          notNull: { msg: "Name is required" },
        },
      },

      images: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Phone Number is required" },
        },
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
        unique: true,
        allowNull: true,
      },

      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "address is required" },
        },
      },

      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "state is required" },
        },
      },

      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "country is required" },
        },
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
      },

      modeOfClasses: {
        type: DataTypes.STRING,
      },

      plan: {
        type: DataTypes.STRING,
      },

      active: {
        type: DataTypes.BOOLEAN,
      },

      verified: {
        type: DataTypes.BOOLEAN,
      },

      fee: {
        type: DataTypes.FLOAT,
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

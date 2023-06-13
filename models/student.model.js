const studentModel = (sequelize, DataTypes) => {
  const Student = sequelize.define("student", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    // roll: {
    //   type: DataTypes.UUID,
    //   unique: true,
    //   validate: {
    //     notNull: { msg: "roll is required" },
    //   }
    // },

    batchId: {
      type: DataTypes.UUID,
      allowNull: true,
      default: null,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "name is required" },
      },
    },

    fathersName: DataTypes.STRING,

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "email is required" },
      },
      // unique: true,
    },

    image: {
      type: DataTypes.STRING,
      default: null,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "password is required" },
      },
    },

    phoneNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "phone number is required" },
      },
    },

    gender: {
      type: DataTypes.STRING,
    },

    city: {
      type: DataTypes.STRING,
    },

    state: {
      type: DataTypes.STRING,
    },

    country: {
      type: DataTypes.STRING,
    },
    interestedCountry: {
      type: DataTypes.STRING,
    },

    pinCode: {
      type: DataTypes.STRING,
    },

    dob: DataTypes.DATE,

    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    passed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,  
    },

    status: {
      type: DataTypes.ENUM,
      values: ['PRE', 'APPL', 'FEE', 'ADM', 'COM'],
      defaultValue: "PRE", // PRE - before applied | APPL - Applied | FEE - Fee Paid | ADM - Admitted | COM - Completed
    },
    type: {
      type: DataTypes.ENUM,
      values: ['ingelt', 'walk-in'],
      defaultValue: 'ingelt',
    },
    batchAssignedDate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },

    targetScore: DataTypes.FLOAT,

    previousScore: DataTypes.FLOAT,

    averageBands: DataTypes.FLOAT,
  });

  Student.beforeCreate(async (student, options) => {
    try {
      const lastStudent = await Student.findOne({
        order: [['createdAt', 'DESC']],
      });

      if (lastStudent) {
        const numericPart = parseInt(lastStudent.id.slice(3), 16);
        const nextNumericPart = numericPart + 1;
        const nextRollNumber = `IGS${nextNumericPart.toString(16).toUpperCase()}`;
        student.id = nextRollNumber;
      } else {
        student.id = 'IGS3E6'; // Default value for the first student
      }
    } catch (err) {
      throw err;
    }
  });

  return Student;
};


module.exports = studentModel;
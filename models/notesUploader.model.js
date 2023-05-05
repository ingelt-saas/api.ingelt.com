const notesUploaderModel = (sequelize, DataTypes) => {
    return sequelize.define("notesUploader", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        }
    });
};

module.exports = notesUploaderModel;

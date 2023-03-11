const { notesModel } = require("../models");
const notesUtil = {};

// POST
notesUtil.createNotes = async (note) => {
  try {
    const newNote = await notesModel.create(note);
    return newNote;
  } catch (error) {
    throw error;
  }
};

// GET by batch id
notesUtil.getNotesByBatch = async (batchId) => {
  try {
    const notes = await notesModel.findAll({
      where: {
        batchId: batchId,
      },
    });
    return notes;
  } catch (error) {
    throw error;
  }
};

// GET by id
notesUtil.readById = async (noteId) => {
  try {
    const note = await notesModel.findByPk(noteId);
    return note;
  } catch (error) {
    throw error;
  }
};

// DELETE
notesUtil.deleteNotes = async (noteId) => {
  try {
    const result = await notesModel.destroy({
      where: {
        id: noteId,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = notesUtil;

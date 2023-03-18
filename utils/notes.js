const { notes } = require("../models");
const notesUtil = {};

// POST
notesUtil.createNotes = async (note) => {
  try {
    const newNote = await notes.create(note);
    return newNote;
  } catch (error) {
    throw error;
  }
};

// GET by batch id
notesUtil.getNotesByBatch = async (batchId) => {
  try {
    const result = await notes.findAll({
      where: {
        batchId: batchId,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

// GET by id
notesUtil.readById = async (noteId) => {
  try {
    const note = await notes.findByPk(noteId);
    return note;
  } catch (error) {
    throw error;
  }
};

// DELETE
notesUtil.deleteNotes = async (noteId) => {
  try {
    const result = await notes.destroy({
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

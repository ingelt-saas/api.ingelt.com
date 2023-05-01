const { Op } = require("sequelize");
const { notes, teacher, admin } = require("../models");
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

// get notes by organization
notesUtil.getNotesByOrg = async (orgId, pageNo, limit) => {
  try {
    const result = await notes.findAndCountAll({
      offset: (pageNo - 1) * limit,
      limit: limit,
      where: {
        organizationId: orgId,
      },
      order: [['createdAt', 'DESC']],
    });
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

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

// search notes in the organization
notesUtil.search = async (orgId, searchQuery) => {
  try {
    const result = await notes.findAll({
      where: {
        organizationId: orgId,
        [Op.or]: {
          file: { [Op.like]: `%${searchQuery}%` },
          uploaderName: { [Op.like]: `%${searchQuery}%` },
          subject: { [Op.like]: `%${searchQuery}%` },
        }
      }
    });
    return result;
  } catch (err) {
    throw err;
  }
}

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

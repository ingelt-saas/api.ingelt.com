const { Op, literal } = require("sequelize");
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
notesUtil.getNotesByOrg = async (orgId, pageNo, limit, searchQuery = null) => {

  let findQuery;

  if (searchQuery) {
    findQuery = {
      organizationId: orgId,
      [Op.or]: {
        name: { [Op.like]: `%${searchQuery}%` },
        // uploaderName: { [Op.like]: `%${searchQuery}%` },
        subject: { [Op.like]: `%${searchQuery}%` },
      }
    };
  } else {
    findQuery = {
      organizationId: orgId,
    };
  }

  try {
    const result = await notes.findAndCountAll({
      include: [
        { model: teacher, as: 'teacherUploader', attributes: [] },
        { model: admin, as: 'adminUploader', attributes: [] },
      ],
      attributes: [
        'name', 'id', 'file', 'fileSize', 'subject', 'createdAt', 'uploaderId',
        [literal('CASE WHEN `Notes`.`uploaderType` = "Teacher" THEN (SELECT `name` FROM `Teachers` WHERE `Teachers`.`id` = `Notes`.`uploaderId`) ELSE (SELECT `name` FROM `Admins` WHERE `Admins`.`id` = `Notes`.`uploaderId`) END'), 'uploaderName'],
        [literal('CASE WHEN `Notes`.`uploaderType` = "Teacher" THEN (SELECT `image` FROM `Teachers` WHERE `Teachers`.`id` = `Notes`.`uploaderId`) ELSE (SELECT `image` FROM `Admins` WHERE `Admins`.`id` = `Notes`.`uploaderId`) END'), 'uploaderImage'],
      ],
      where: findQuery,
      order: [['createdAt', 'DESC']],
      offset: (pageNo - 1) * limit,
      limit: limit,
    });
    return result;
  } catch (err) {
    console.log(err)
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
notesUtil.search = async (orgId, searchQuery, pageNo, limit) => {
  try {
    const result = await notes.findAndCountAll({
      where: {
        organizationId: orgId,

      },
      offset: (pageNo - 1) * limit,
      limit: limit,
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

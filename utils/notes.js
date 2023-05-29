const { Op, literal } = require("sequelize");
const { notes, teacher, admin } = require("../models");
const notesUtil = {};

// POST
notesUtil.createNotes = async (note) => {
  try {
    let name = note.name;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    note.name = name;
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
        [literal('CASE WHEN `notes`.`uploaderType` = "Teacher" THEN (SELECT `name` FROM `teachers` WHERE `teachers`.`id` = `notes`.`uploaderId`) ELSE (SELECT `name` FROM `admins` WHERE `admins`.`id` = `notes`.`uploaderId`) END'), 'uploaderName'],
        [literal('CASE WHEN `notes`.`uploaderType` = "Teacher" THEN (SELECT `image` FROM `teachers` WHERE `teachers`.`id` = `notes`.`uploaderId`) ELSE (SELECT `image` FROM `admins` WHERE `admins`.`id` = `notes`.`uploaderId`) END'), 'uploaderImage'],
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

// search notes in the organization
notesUtil.search = async (orgId, searchQuery, pageNo, limit) => {
  try {
    const result = await notes.findAndCountAll({
      where: {
        organizationId: orgId,
        [Op.or]: {
          name: { [Op.like]: `%${searchQuery}%` },
          uploaderName: { [Op.like]: `%${searchQuery}%` },
          subject: { [Op.like]: `%${searchQuery}%` },
        }
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

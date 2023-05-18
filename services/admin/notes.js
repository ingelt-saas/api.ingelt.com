const multer = require('multer');
const { memoryStorage } = require('multer');
const notesUtil = require('../../utils/notes');

const notesService = require('express').Router();

const storage = memoryStorage();
const upload = multer({ storage });
const awsUpload = require('../../aws/upload');
const deleteFile = require('../../aws/delete');

// add new notes
notesService.post('/', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        awsUpload(file, 'admin/notes', async (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                const newNote = req.body;
                newNote.uploaderId = req.decoded.id;
                newNote.uploaderName = req.decoded.name;
                newNote.name = file.originalname;
                newNote.file = data.Key;
                newNote.fileSize = file.size;
                const result = await notesUtil.createNotes(newNote);
                res.status(201).json(result);
            }
        });

    } catch (err) {
        res.status(400).send(err);
    }
});


// get notes by organization
notesService.get('/', async (req, res) => {
    try {
        const orgId = req.decoded.organizationId;
        const { pageNo, limit } = req.query;
        const result = await notesUtil.getNotesByOrg(orgId, parseInt(pageNo), parseInt(limit));
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// search notes 
notesService.get('/search', async (req, res) => {
    try {
        const { s, pageNo, limit } = req.query;
        const orgId = req.decoded.organizationId;
        const result = await notesUtil.search(orgId, s, parseInt(pageNo), parseInt(limit));
        res.send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// delete note
notesService.delete('/:noteId', async (req, res) => {
    try {
        const noteId = req.params.noteId;
        let getNote = await notesUtil.readById(noteId);

        if (getNote) {
            getNote = getNote.dataValues;
        }

        getNote.file && await deleteFile(getNote.file);

        await notesUtil.deleteNotes(noteId);
        res.sendStatus(202);

    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = notesService;
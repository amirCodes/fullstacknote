const express = require('express');
const router = express.Router();
const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  toggleArchiveNote
} = require('../controllers/NoteController');

// Routes
router.route('/')
  .get(getAllNotes)
  .post(createNote);

router.route('/:id')
  .get(getNoteById)
  .put(updateNote)
  .delete(deleteNote);

router.route('/:id/toggle-archive')
  .patch(toggleArchiveNote);

module.exports = router;

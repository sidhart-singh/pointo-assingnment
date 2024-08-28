const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// GET /notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve notes" });
  }
});

// POST /notes
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await Note.create({ title, content });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to create note" });
  }
});

// PUT /notes/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const note = await Note.findByPk(id);
    if (note) {
      note.title = title || note.title;
      note.content = content || note.content;
      await note.save();
      res.json(note);
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
});

// DELETE /notes/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findByPk(id);
    if (note) {
      await note.destroy();
      res.json({ message: "Note deleted successfully" });
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

module.exports = router;

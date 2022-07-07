const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const Notes = require("../models/Notes");

//Get all Data
router.get("/", async (req, res) => {
  try {
    const notes = await Notes.find();
    res.json(notes);
  } catch (err) {
    res.json({ message: err });
  }
});

//post Notes data

router.post("/", async (req, res) => {
  const notes = new Notes({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedNotes = await notes.save();
    res.json(savedNotes);
  } catch (err) {
    res.json({ message: err });
  }
});

//specific Notes

router.get("/:notesId", async (req, res) => {
  try {
    const notes = await Notes.findById(req.params.notesId);
    res.json(notes);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete Notes

router.delete("/:notesId", async (req, res) => {
  try {
    const removedNotes = await Notes.remove({
      _id: req.params.notesId,
    });
    res.json(removedNotes);
  } catch (err) {
    res.json({ message: err });
  }
});

//update the NOtes

router.patch("/:notesId", async (req, res) => {
  try {
    const updatedNotes = await Notes.updateOne(
      { _id: req.params.notesId },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
        },
      }
    );
    res.json(updatedNotes);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

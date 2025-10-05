const express = require("express");
const Classroom = require("../models/classrooms");

const router = express.Router();

// GET all classrooms
router.get("/", async (req, res) => {
  try {
    const classes = await Classroom.find();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single classroom by ID
router.get("/:id", async (req, res) => {
  try {
    const cls = await Classroom.findById(req.params.id);
    if (!cls) return res.status(404).json({ message: "Class not found" });
    res.json(cls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new classroom
router.post("/", async (req, res) => {
  try {
    const classroom = new Classroom(req.body);
    const saved = await classroom.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

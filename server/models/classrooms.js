const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema({
  department: { type: String, required: true },
  section: { type: String, required: true },
  year: { type: Number, required: true },
  leader: { type: String, required: true },
  nssMembers: { type: Number, required: true },
  normalStudents: { type: Number, required: true },
  averageScore: { type: Number, default: 0 },
  progress: {
    attendance: { type: Number, default: 0 },
    eventParticipation: { type: Number, default: 0 },
    assignmentCompletion: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("Classroom", classroomSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name : { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Student", "NSS Leader" , "Faculty"],
    required: true
  },
  subRole: {
    type: String,
    enum: ["normal", "Class leader", "NSS member"],
    default: "normal",
  },
  department: {
    type: String,
    enum: ["CSE", "IT", "AIDS", "AIML", "MECH", "CSE (AIML)", "CYB", "CSBS", "CCE"],
    required: true
  },
  section: { type: String, enum: ["A", "B", "C", "D"], required: true },
  year: { type: String, enum: ["1", "2", "3", "4"], required: true }
});

module.exports = mongoose.model("User", userSchema);

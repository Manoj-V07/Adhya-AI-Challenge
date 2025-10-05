const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth");
const classroomRoutes = require("./routes/classrooms");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/classrooms", classroomRoutes);
app.use("/api", authRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());


// MongoDB connection
mongoose.connect("mongodb://localhost:27017/QL_Web")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
  

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
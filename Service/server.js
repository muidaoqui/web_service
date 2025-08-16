import express from "express";
import mongoose from "mongoose";
import domainRoutes from "./routes/domain.js";
import hostingRoutes from "./routes/hosting.js";

const app = express();
app.use(express.json());

// Kết nối MongoDB
mongoose.connect("mongodb://localhost:27017/QL_Web")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error(err));


// Định nghĩa route
app.use("/api/domains", domainRoutes);
app.use("/api/hostings", hostingRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));

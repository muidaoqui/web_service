import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import domainRoutes from "./routes/domain.js";
import hostingRoutes from "./routes/hosting.js";
import userRoutes from './routes/users.js';
import checkDomain from './routes/checkDomain.js';
import orderRoutes from './routes/order.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Kết nối MongoDB
mongoose.connect("mongodb://localhost:27017/QL_Web")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error(err));


// Định nghĩa route
app.use("/api/domains", domainRoutes);
app.use("/api/hostings", hostingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/check-domain", checkDomain);
app.use("/api/orders", orderRoutes);

app.listen(5000, () => console.log("✅ Server running on port 5000"));

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/course', courseRouter);
app.use('/api/v1/admin', adminRouter);

// Frontend static files
const clientPath = path.join(__dirname, "..", "client", "dist");
if (fs.existsSync(clientPath)) {
    app.use(express.static(clientPath));
    app.get(/^(?!\/api).*/, (req, res) => {
        res.sendFile(path.join(clientPath, "index.html"));
    });
}

// Global error handler
app.use(errorHandler);

const PORT = process.env.localhost || 3000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();


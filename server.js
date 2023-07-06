// APP Modules
require("dotenv").config();
const express = require("express");
const cron = require("node-cron");
const studentUtil = require("./utils/student");
const bodyParser = require("body-parser");
const cors = require("cors");

const { createServer } = require("http");
const { Server } = require("socket.io");

// App Config
const app = express();
const server = createServer(app);

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:5173",
            "https://board.ingelt.com",
            "https://student.ingelt.com",
            "https://teacher.ingelt.com",
            "https://partner.ingelt.com",
            "https://godseye.ingeltboard.com",
        ],
    })
);
// Socket Config
exports.io = new Server(server, {
    // To be used in socket/socket.js
    cors: {
        origin: [
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:5173",
            "https://student.ingelt.com",
            "https://teacher.ingelt.com",
            "https://partner.ingelt.com",
            "https://godseye.ingeltboard.com",
        ],
    },
});
// Socket Functionality
require("./socket/socket");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Services Config
const ingeltServices = require("./services/ingelt");
const studentServices = require("./services/student");
const adminServices = require("./services/admin");
const teacherServices = require("./services/teacher");
app.use("/ingelt", ingeltServices);
app.use("/student", studentServices);

// Schedule the updateStudentStatus function to run every day at 00:00 (midnight)
cron.schedule("0 0 * * *", () => {
    studentUtil.updateStudentStatus();
});

// cron.schedule('30 15 * * *', () => {
//   console.log('Running updateStudentStatus...');
//   studentUtil.updateStudentStatus();
// });

app.use("/admin", adminServices);
app.use("/teacher", teacherServices);

// Auth Config
const auth = require("./auth");
app.use("/auth", auth);

// get images route
const image = require("./assets/getimage");
app.use("/images", image);

// mail service
const mailService = require("./mail");
app.use("/mail", mailService);

// DB and Server Config
const PORT = process.env.PORT || 8000;
const db = require("./models");
require("./models/associations");

// TODO: FORCE ALTER ONLY FOR DEV ENVIRONMENT { alter: true, force: true }
db.sequelize.sync({ alter: true }).then(() => {
    // App Listen
    server.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
});
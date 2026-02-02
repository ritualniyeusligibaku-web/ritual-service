const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const serviceRoutes = require("./routes/service.route");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5555;

// Connect to database!
db();

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://ritualnieuslugibaku.com",
  "http://38.242.129.161:3000",
  "http://ritualnieuslugibaku.com",
  "https://www.ritualnieuslugibaku.com",
  process.env.CLIENT_URL,
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies and authorization headers
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/services", serviceRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

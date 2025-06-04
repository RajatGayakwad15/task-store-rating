const express = require("express");
const app = express();
const sequelize = require("./config/db");
const authRoutes = require("./src/routes/auth.route.js");
const cors = require("cors");
// const db = require("./src/models");
app.use(
  cors({
    origin: true, // Reflects the request origin
    credentials: true, // Allows cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization","authToken"],
  })
);
app.use(express.json());

//routes
app.use("/api", authRoutes);



// Sync Sequelize models with DB
sequelize.sync().then(() => {
  console.log("✅ All models were synchronized");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

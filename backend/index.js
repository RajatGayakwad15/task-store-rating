const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const sequelize = require("./config/db");
const authRoutes = require("./src/routes/auth.route.js");
const cors = require("cors");
const Login = require("./src/models/login.model.js");

const SystemAdmin = require("./src/models/system_admin.model");
const StoreOwner = require("./src/models/store_owner.model");
const Store = require("./src/models/store.model");
const User = require("./src/models/user.model");
// const Login = require("./src/models/login.model");
// const db = require("./src/models");

app.use(
  cors({
    origin: true, // Reflects the request origin
    credentials: true, // Allows cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "authToken"],
  })
);
app.use(express.json());

//routes
app.use("/api", authRoutes);

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // drops & recreates tables
    console.log("✅ Database synchronized");

    const hash = async (password) => await bcrypt.hash(password, 10);

    // Seed SystemAdmin
    const adminPassword = await hash("Admin@123");
    const admin = await SystemAdmin.create({
      name: "Admin",
      email: "admin@gmail.com",
      address: "Pune",
      password: adminPassword,
      role_id: 1,
    });

    // Seed StoreOwners
    const storeOwners = await StoreOwner.bulkCreate([
      {
        name: "Apple",
        email: "apple@gmail.com",
        address: "Pune",
        password: await hash("Apple@123"),
        role_id: 2,
      },
      {
        name: "Hp",
        email: "hp@gmail.com",
        address: "Mumbai",
        password: await hash("Hp@123"),
        role_id: 2,
      },
      {
        name: "Dell",
        email: "dell@gmail.com",
        address: "Delhi",
        password: await hash("Dell@123"),
        role_id: 2,
      },
      {
        name: "Oneplus",
        email: "Oneplus@email.com",
        address: "Pune",
        password: await hash("Oneplus@123"),
        role_id: 2,
      },
    ]);

    // Seed Users
    const users = await User.bulkCreate([
      {
        name: "Text User",
        email: "textuser@gmail.com",
        address: "Chandgad",
        password: await hash("User@123"),
        role_id: 3,
      },
      {
        name: "Omkar",
        email: "omkar@gmail.com",
        address: "Pune",
        password: await hash("Omkar@123"),
        role_id: 3,
      },
      {
        name: "Apple",
        email: "apple@gmail.com",
        address: "Pune",
        password: await hash("Apple@123"),
        role_id: 2,
      },
      {
        name: "Hp",
        email: "hp@gmail.com",
        address: "Mumbai",
        password: await hash("Hp@123"),
        role_id: 2,
      },
      {
        name: "Dell",
        email: "dell@gmail.com",
        address: "Delhi",
        password: await hash("Dell@123"),
        role_id: 2,
      },
      {
        name: "Oneplus",
        email: "Oneplus@email.com",
        address: "Pune",
        password: await hash("Oneplus@123"),
        role_id: 2,
      },
    ]);

    // Seed Stores
    await Store.bulkCreate([
      {
        name: "Apple",
        email: "apple@gmail.com",
        address: "Pune",
      },
      {
        name: "Hp",
        email: "hp@gmail.com",
        address: "Mumbai",
      },
      {
        name: "Dell",
        email: "dell@gmail.com",
        address: "Delhi",
      },
      {
        name: "Oneplus",
        email: "Oneplus@email.com",
        address: "Pune",
      },
    ]);

    // Seed Login Table (email + role_id)
    await Login.bulkCreate([
      {
        user_id: admin.id,
        email: admin.email,
        password: admin.password,
        role_id: 1,
      },
      {
        user_id: storeOwners[0].id,
        email: storeOwners[0].email,
        password: storeOwners[0].password,
        role_id: 2,
      },
      {
        user_id: storeOwners[1].id,
        email: storeOwners[1].email,
        password: storeOwners[1].password,
        role_id: 2,
      },
      {
        user_id: storeOwners[2].id,
        email: storeOwners[2].email,
        password: storeOwners[2].password,
        role_id: 2,
      },
      {
        user_id: storeOwners[3].id,
        email: storeOwners[3].email,
        password: storeOwners[3].password,
        role_id: 2,
      },
      {
        user_id: users[0].id,
        email: users[0].email,
        password: users[0].password,
        role_id: 3,
      },
      {
        user_id: users[1].id,
        email: users[1].email,
        password: users[1].password,
        role_id: 3,
      },
    ]);

    console.log("🌱 Seeder executed successfully.");
    return true;
  } catch (err) {
    console.error("❌ Seeder error:", err);
    process.exit(1);
  }
};

// Sync Sequelize models with DB
sequelize.sync().then(async () => {
  console.log("✅ All models were synchronized");
  seed();
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

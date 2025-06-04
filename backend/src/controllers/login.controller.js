const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Login = require("../models/login.model.js");
// const User = require("../models/User");
// const StoreOwner = require("../models/StoreOwner");
// const SystemAdmin = require("../models/SystemAdmin");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find login entry by email
    const loginEntry = await Login.findOne({ where: { email } });

    if (!loginEntry) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, loginEntry.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Determine user model based on role
    // let user = null;
    // if (loginEntry.role_id === 1) {
    //   user = await SystemAdmin.findByPk(loginEntry.user_id);
    // } else if (loginEntry.role_id === 2) {
    //   user = await StoreOwner.findByPk(loginEntry.user_id);
    // } else if (loginEntry.role_id === 3) {
    //   user = await User.findByPk(loginEntry.user_id);
    // }

    // if (!user) {
    //   return res.status(404).json({ message: "Associated user not found!" });
    // }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: loginEntry.user_id,
        role_id: loginEntry.role_id,
      },
      "JWTSECRETKEY@4815",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        id: loginEntry.user_id,
        name: loginEntry.name,
        email: loginEntry.email,
        role_id: loginEntry.role_id,
      },
      token,
      status: true,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { login };

const bcrypt = require("bcrypt");
const SystemAdmin = require("../models/system_admin.model.js");
const jwt = require("jsonwebtoken");
const Login = require("../models/login.model.js");
const user = require("../models/user.model.js");


const signupSystemAdmin = async (req, res) => {
  const { name, email, address, password } = req.body;

  try {
    // Check if SystemAdmin or Login already exists with the same email
    const existingLogin = await Login.findOne({ where: { email } });
    if (existingLogin) {
      return res.status(400).json({ message: "Email already exists in login records" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create SystemAdmin
    const newSystemAdmin = await SystemAdmin.create({
      name,
      email,
      address,
      password: hashedPassword,
    });

    // Add entry to Login table
    await Login.create({
      user_id: newSystemAdmin.id,
      email,
      password: hashedPassword,
      role_id: 1, // 1 = SystemAdmin
    });

    res.status(201).json({
      status: true,
      success: true,
      message: "System Admin registered successfully",
      SystemAdmin: {
        id: newSystemAdmin.id,
        name: newSystemAdmin.name,
        email: newSystemAdmin.email,
        address: newSystemAdmin.address,
      },
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

// const loginSystemAdmin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // ✅ Rename the local variable to avoid conflict
//     const systemAdmin = await SystemAdmin.findOne({ where: { email } });

//     if (!systemAdmin) {
//       return res.status(401).json({ message: "Invalid credentials!" });
//     }

//     const isMatch = await bcrypt.compare(password, systemAdmin.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials!" });
//     }

//     const token = jwt.sign(
//       { id: systemAdmin.id, email: systemAdmin.email, role: systemAdmin.role_id },
//       "JWTSECRETKEY@4815",
//       { expiresIn: "1d" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       SystemAdmin: {
//         id: systemAdmin.id,
//         name: systemAdmin.name,
//         email: systemAdmin.email,
//       },
//       token,
//       status: true,
//       success: true,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ status: false, success: false, message: "Server error", error: error.message });
//   }
// };

const getSysAdminProfile = async (req, res) => {
  try {
    const { adminId } = req.params;

    const admin = await SystemAdmin.findByPk(adminId, {
      attributes: ["id", "name", "email", "address", "role_id", "createdAt", "updatedAt"],
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "System admin not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "System admin profile fetched successfully",
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const updateSystemAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { name, email, address } = req.body;

    const admin = await SystemAdmin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "System admin not found",
      });
    }

    await admin.update({
      name: name || admin.name,
      email: email || admin.email,
      address: address || admin.address,
    });

    res.status(200).json({
      success: true,
      message: "System admin updated successfully",
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const updateSystemAdminPassword = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old and new passwords are required",
      });
    }

    const admin = await SystemAdmin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "System admin not found",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await admin.update({ password: hashedPassword });

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteSystemAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;

    const admin = await user.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "System admin not found",
      });
    }

    await admin.destroy();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  signupSystemAdmin,
  // loginSystemAdmin,
  getSysAdminProfile,
  updateSystemAdmin,
  updateSystemAdminPassword,
  deleteSystemAdmin,
};

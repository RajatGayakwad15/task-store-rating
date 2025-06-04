const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const Login = require("../models/login.model.js");

const signup = async (req, res) => {
  const { name, email, address, password } = req.body;

  try {
    // Check if user already exists in Login
    const existingLogin = await Login.findOne({ where: { email } });
    if (existingLogin) {
      return res.status(400).json({ message: "Email already exists in login records" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      address,
      password: hashedPassword,
      role_id: 3, // normal user
    });

    // Create login entry
    await Login.create({
      user_id: newUser.id,
      email,
      password: hashedPassword,
      role_id: 3,
    });

    res.status(201).json({
      status: true,
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        address: newUser.address,
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

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const user = await User.findOne({ where: { email } });

//     // If user not found
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials!" });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials!" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role },
//       "JWTSECRETKEY@4815",
//       { expiresIn: "1d" }
//     );

//     // Respond with user info and token
//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role_id: 3,
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

const getAllUsers = async (req, res) => {
  try {
    const { name, email, address, role_id } = req.query;

    const whereClause = {};

    if (name) {
      whereClause.name = { [Op.like]: `%${name}%` };
    }

    if (email) {
      whereClause.email = { [Op.like]: `%${email}%` };
    }

    if (address) {
      whereClause.address = { [Op.like]: `%${address}%` };
    }

    if (role_id) {
      whereClause.role_id = role_id;
    }

    const queryOptions = {};

    // Only add `where` if filters are present
    if (Object.keys(whereClause).length > 0) {
      queryOptions.where = whereClause;
    }

    // const users = await User.findAll(queryOptions);
    const users = await User.findAll(queryOptions);


    if (users.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No users found",
        users: [],
      });
    }

    res.status(200).json({
      success: true,
      status: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, address } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.update({
      name: name || user.name,
      email: email || user.email,
      address: address || user.address,
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old and new passwords are required",
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedPassword });

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

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.destroy();

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
  signup,
  // login,
  getAllUsers,
  updateUser,
  updateUserPassword,
  deleteUser,
};

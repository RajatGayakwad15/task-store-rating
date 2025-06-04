const bcrypt = require("bcrypt");
const StoreOwner = require("../models/store_owner.model.js");
const StoreRating = require("../models/store_rating.model.js");
const Store = require("../models/store.model.js");
const sequelize = require("../../config/db.js");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const Login = require("../models/login.model.js");

const signupStoreOwner = async (req, res) => {
  const { name, email, address, password } = req.body;
  const transaction = await sequelize.transaction();

  try {
    // Check if email already exists in Login table
    const existingLogin = await Login.findOne({ where: { email } });
    if (existingLogin) {
      await transaction.rollback();
      return res
        .status(400)
        .json({ message: "Email already exists in login records" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create StoreOwner
    const newStoreOwner = await StoreOwner.create(
      {
        name,
        email,
        address,
        password: hashedPassword,
      },
      { transaction }
    );

    // Create associated Store
    const newStore = await Store.create(
      {
        name,
        email,
        address,
      },
      { transaction }
    );

    // Create Login record
    await Login.create(
      {
        user_id: newStoreOwner.id,
        email,
        password: hashedPassword,
        role_id: 2, // 2 = StoreOwner
      },
      { transaction }
    );

    // Commit transaction
    await transaction.commit();

    res.status(201).json({
      status: true,
      success: true,
      message: "Store Owner registered successfully",
      StoreOwner: {
        id: newStoreOwner.id,
        name: newStoreOwner.name,
        email: newStoreOwner.email,
        address: newStoreOwner.address,
      },
      Store: newStore,
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({
      status: false,
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// const loginStoreOwner = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find StoreOwner by email
//     const StoreOwner = await StoreOwner.findOne({ where: { email } });

//     // If StoreOwner not found
//     if (!StoreOwner) {
//       return res.status(401).json({ message: "Invalid credentials!" });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, StoreOwner.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials!" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: StoreOwner.id, email: StoreOwner.email, role: StoreOwner.role },
//       "JWTSECRETKEY@4815",
//       { expiresIn: "1d" }
//     );

//     // Respond with StoreOwner info and token
//     res.status(200).json({
//       status: true,
//       success: true,
//       message: "Login successful",
//       StoreOwner: {
//         id: StoreOwner.id,
//         name: StoreOwner.name,
//         email: StoreOwner.email,
//       },
//       token,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ status: false, success: false, message: "Server error", error: error.message });
//   }
// };

const getAllStoreOwners = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;

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

    if (role) {
      whereClause.role_id = role;
    }

    const queryOptions = {};
    if (Object.keys(whereClause).length > 0) {
      queryOptions.where = whereClause;
    }

    const storeOwners = await StoreOwner.findAll(queryOptions);

    res.status(200).json({
      status: true,
      success: true,
      message: storeOwners.length
        ? "Store owners fetched successfully"
        : "No store owners found",
      storeOwners,
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

// const getAllStores = async (req, res) => {
//   try {
//     const { name, address } = req.query;

//     const whereClause = {};

//     if (name) {
//       whereClause.name = { [Op.like]: `%${name}%` };
//     }

//     if (address) {
//       whereClause.address = { [Op.like]: `%${address}%` };
//     }

//     const queryOptions = {};
//     if (Object.keys(whereClause).length > 0) {
//       queryOptions.where = whereClause;
//     }

//     const stores = await Store.findAll(queryOptions);

//     res.status(200).json({
//       status: true,
//       success: true,
//       message: stores.length ? "Stores fetched successfully" : "No stores found",
//       stores,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ status: false, success: false, message: "Server error", error: error.message });
//   }
// };
// const getAllStores = async (req, res) => {
//   try {
//     const { searchQuery } = req.query;

//     const whereClause = {};

//     if (searchQuery) {
//       whereClause[Op.or] = [
//         { name: { [Op.like]: `%${searchQuery}%` } },
//         { address: { [Op.like]: `%${searchQuery}%` } },
//       ];
//     }

//     const stores = await Store.findAll({
//       where: whereClause,
//     });

//     res.status(200).json({
//       status: true,
//       success: true,
//       message: stores.length
//         ? "Stores fetched successfully"
//         : "No stores found",
//       stores,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// const { Op } = require("sequelize");
// const StoreOwner = require("../models/StoreOwner");
// const StoreRating = require("../models/StoreRating");

const getAllStores = async (req, res) => {
  try {
    const { searchQuery } = req.query;
    const token = req.headers.authtoken;
    const decodedToken = await jwt.verify(token, "JWTSECRETKEY@4815");
    const { id } = decodedToken;
    const userId = id;

    console.log(userId);
    const whereClause = {};

    if (searchQuery) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${searchQuery}%` } },
        { address: { [Op.like]: `%${searchQuery}%` } },
      ];
    }

    const stores = await StoreOwner.findAll({ where: whereClause });

    // For each store, check if user has already rated
    const storeWithRatings = await Promise.all(
      stores.map(async (store) => {
        let alreadyRated = false;

        if (userId) {
          const rating = await StoreRating.findOne({
            where: {
              store_id: store.id,
              user_id: userId,
            },
          });

          if (rating) alreadyRated = true;
        }

        return {
          ...store.toJSON(),
          already_rated: alreadyRated,
        };
      })
    );

    res.status(200).json({
      status: true,
      success: true,
      message: storeWithRatings.length
        ? "Stores fetched successfully"
        : "No stores found",
      stores: storeWithRatings,
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

// const getAllStores = async (req, res) => {
//   try {
//     const { searchQuery } = req.query;

//     const whereClause = {};

//     if (searchQuery) {
//       whereClause[Op.or] = [
//         { name: { [Op.like]: `%${searchQuery}%` } },
//         { address: { [Op.like]: `%${searchQuery}%` } },
//       ];
//     }

//     const stores = await StoreOwner.findAll({
//       where: whereClause,
//       // include: [
//       //   {
//       //     model: User,
//       //     attributes: ['name', 'email'], // fetch only name & email
//       //   },
//       // ],
//     });

//     res.status(200).json({
//       status: true,
//       success: true,
//       message: stores.length
//         ? "Stores fetched successfully"
//         : "No stores found",
//       stores, // each store will have `User: { name, email }`
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

const updateStoreOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const { name, email, address } = req.body;

    const owner = await StoreOwner.findByPk(ownerId);

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Store owner not found",
      });
    }

    await owner.update({
      name: name || owner.name,
      email: email || owner.email,
      address: address || owner.address,
    });

    res.status(200).json({
      success: true,
      message: "Store owner updated successfully",
      data: owner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const updateStoreOwnerPassword = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old and new passwords are required",
      });
    }

    const owner = await StoreOwner.findByPk(ownerId);

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Store owner not found",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, owner.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await owner.update({ password: hashedPassword });

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

const deleteStoreOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;

    const owner = await StoreOwner.findByPk(ownerId);

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Store owner not found",
      });
    }

    await owner.destroy();

    res.status(200).json({
      success: true,
      message: "Store owner deleted successfully",
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
  signupStoreOwner,
  // loginStoreOwner,
  getAllStoreOwners,
  getAllStores,
  updateStoreOwner,
  updateStoreOwnerPassword,
  deleteStoreOwner,
};

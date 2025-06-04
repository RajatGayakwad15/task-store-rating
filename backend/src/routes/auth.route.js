const express = require("express");
const router = express.Router();

const {
  signup,
  getAllUsers,
  updateUser,
  updateUserPassword,
  deleteUser,
} = require("../controllers/user.controller.js");
const { signupValidator } = require("../utils/signupValidator.js");
const { systemAdminAuth } = require("../middleware/system_admin.middleware.js");
const {
  signupSystemAdmin,
  getSysAdminProfile,
  updateSystemAdmin,
  updateSystemAdminPassword,
  deleteSystemAdmin,
} = require("../controllers/system_admin.controller.js");
const {
  signupStoreOwner,
  getAllStoreOwners,
  getAllStores,
  updateStoreOwner,
  updateStoreOwnerPassword,
  deleteStoreOwner,
} = require("../controllers/store_owner.controller.js");
const {
  createRating,
  getStoreAverageRatings,
  getAllStoreAvrageRating,
  getAllRatingsByStore,
  updateRating,
  deleteRating,
} = require("../controllers/ratings.controller.js");
const { login } = require("../controllers/login.controller.js");

//common login
router.post("/user/login", login);

//User
router.post("/user/signup", signupValidator, signup);
// router.post("/user/login", login);
router.put("/users/:userId", updateUser);
router.put("/users/:userId/password", updateUserPassword);
router.delete("/users/:userId", deleteUser);
//create user by system Admminstrator;
router.post("/create-user/signup", signupValidator, systemAdminAuth, signup);

//System Admin
router.post("/system-owner/signup", signupValidator, signupSystemAdmin);
// router.post("/system-owner/login", loginSystemAdmin);
router.get("/admins/:adminId/profile", getSysAdminProfile);
router.put("/admins/:adminId", updateSystemAdmin);
router.delete("/admins/:adminId", deleteSystemAdmin);
router.put("/admins/:adminId/password", updateSystemAdminPassword);

//Store Owner
router.post("/store-owner/signup", signupValidator, signupStoreOwner);
// router.post("/store-owner/login", loginStoreOwner);
router.put("/store-owners/:ownerId", updateStoreOwner);
router.delete("/store-owners/:ownerId", deleteStoreOwner);
router.put("/store-owners/:ownerId/password", updateStoreOwnerPassword);
//create user by system Admminstrator;
router.post(
  "/create-store-owner/signup",
  signupValidator,
  systemAdminAuth,
  signupStoreOwner
);

//Store Ratings
router.post("/ratings/:userId/:storeId", createRating); //user
router.get("/ratings/average/:storeId", getStoreAverageRatings); //user storeOwner admin
router.get("/ratings/average/all-store", getAllStoreAvrageRating); //admin
router.get("/ratings/store/:storeId", getAllRatingsByStore); //user storeOwner admin
router.post("/ratings/:userId/:storeId", updateRating); //user
router.delete("/ratings/:userId/:storeId", deleteRating); //user

//get All Store (Public API)
router.get("/all-stores", getAllStores);

//get all users with authToken system administrator
router.get("/all-users", getAllUsers);

//get all store owners with authtoken system administrator
router.get("/store-owners", systemAdminAuth, getAllStoreOwners);

//get all users with authtoken system administrator
module.exports = router;

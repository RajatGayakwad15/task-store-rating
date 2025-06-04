const StoreRating = require("../models/store_rating.model");
const User = require("../models/user.model.js");
const { Sequelize } = require("sequelize");

const createRating = async (req, res) => {
  try {
    const { rating, feedback } = req.body;
    const { userId, storeId } = req.params;

    if (!rating || !userId || !storeId) {
      return res.status(400).json({
        success: false,
        message: "Rating, userId, and storeId are required",
      });
    }

    const newRating = await StoreRating.create({
      user_id: userId,
      store_id: storeId,
      rating: parseFloat(rating),
      feedback,
    });

    res.status(201).json({
      success: true,
      message: "Rating created successfully",
      data: newRating,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getStoreAverageRatings = async (req, res) => {
  try {
    const { storeId } = req.params;

    if (!storeId) {
      return res.status(400).json({
        success: false,
        message: "storeId is required",
      });
    }

    const result = await StoreRating.findAll({
      where: { store_id: storeId },
      attributes: [
        [Sequelize.fn("AVG", Sequelize.col("rating")), "averageRating"],
        [Sequelize.fn("COUNT", Sequelize.col("rating")), "ratingCount"],
      ],
      raw: true,
    });

    const averageRating = parseFloat(result[0].averageRating) || 0;
    const ratingCount = parseInt(result[0].ratingCount) || 0;

    res.status(200).json({
      success: true,
      message: `Average rating for store ${storeId}`,
      data: {
        averageRating: averageRating.toFixed(2),
        ratingCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getAllStoreAvrageRating = async (req, res) => {
  try {
    const averageRatings = await Store.findAll({
      include: [
        {
          model: StoreRating,
          attributes: [],
        },
      ],
      attributes: [
        "id",
        "name",
        "email",
        [
          Sequelize.fn("AVG", Sequelize.col("StoreRatings.rating")),
          "averageRating",
        ],
        [
          Sequelize.fn("COUNT", Sequelize.col("StoreRatings.rating")),
          "ratingCount",
        ],
      ],
      group: ["Store.id"],
      order: [[Sequelize.literal("averageRating"), "DESC"]],
      raw: true,
    });

    res.status(200).json({
      success: true,
      message: "Average ratings for all stores",
      data: averageRatings.map((store) => ({
        storeId: store.id,
        name: store.name,
        email: store.email,
        averageRating: parseFloat(store.averageRating).toFixed(2),
        ratingCount: parseInt(store.ratingCount),
      })),
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

const getAllRatingsByStore = async (req, res) => {
  try {
    const { storeId } = req.params;

    if (!storeId) {
      return res.status(400).json({
        success: false,
        message: "storeId is required",
      });
    }

    // Get all ratings for the store
    const ratings = await StoreRating.findAll({
      where: { store_id: storeId },
      order: [["createdAt", "DESC"]],
    });

    // Manually fetch user data and attach it
    const resultWithUsers = await Promise.all(
      ratings.map(async (rating) => {
        const user = await User.findByPk(rating.user_id, {
          attributes: ["id", "name", "email"],
        });

        return {
          ...rating.toJSON(),
          user,
        };
      })
    );

    res.status(200).json({
      success: true,
      message: `Ratings for store ${storeId}`,
      data: resultWithUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// const getAllRatingsByStore = async (req, res) => {
//   try {
//     const { storeId } = req.params;
//     console.log(storeId, "storeI");
//     if (!storeId) {
//       return res.status(400).json({
//         success: false,
//         message: "storeId is required",
//       });
//     }

//     const ratings = await StoreRating.findAll({
//       where: { store_id: storeId },
//       // include: [
//       //   {
//       //     model: User,
//       //     attributes: ["id", "name"], // only include id and name of user
//       //   },
//       // ],
//       order: [["createdAt", "DESC"]],
//     });

//     res.status(200).json({
//       success: true,
//       message: `Ratings for store ${storeId}`,
//       data: ratings,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// const getAllRecentRatings = async (req, res) => {
//   try {
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       status: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// const getRating = async (req, res) => {
//   try {
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       status: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

const updateRating = async (req, res) => {
  try {
    const { rating } = req.body;
    const { userId, storeId } = req.params;

    if (!rating || !userId || !storeId) {
      return res.status(400).json({
        success: false,
        message: "Rating, userId, and storeId are required",
      });
    }

    // Find the existing rating by user and store
    const existingRating = await StoreRating.findOne({
      where: {
        user_id: userId,
        store_id: storeId,
      },
    });

    if (!existingRating) {
      return res.status(404).json({
        success: false,
        message: "Rating not found or not owned by the user",
      });
    }

    // Update the rating
    existingRating.rating = parseFloat(rating);
    await existingRating.save();

    res.status(200).json({
      success: true,
      message: "Rating updated successfully",
      data: existingRating,
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

const deleteRating = async (req, res) => {
  try {
    const { userId, storeId } = req.params;

    if (!userId || !storeId) {
      return res.status(400).json({
        success: false,
        message: "userId and storeId are required",
      });
    }

    // Find the rating created by this user for this store
    const rating = await StoreRating.findOne({
      where: {
        user_id: userId,
        store_id: storeId,
      },
    });

    if (!rating) {
      return res.status(404).json({
        success: false,
        message: "Rating not found or not owned by user",
      });
    }

    // Delete the rating
    await rating.destroy();

    res.status(200).json({
      success: true,
      message: "Rating deleted successfully",
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

// const getUsersSubmitedRatingList = async (req, res) => {
//   try {
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       status: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

module.exports = {
  createRating,
  getStoreAverageRatings,
  getAllStoreAvrageRating,
  getAllRatingsByStore,
  updateRating,
  deleteRating,
};

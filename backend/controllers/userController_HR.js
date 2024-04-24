const User = require("../models/User_HR");
const ResignedEmployees = require("../models/ResignedEmployees_HR");

const userController = {
  // get all users
  getUsers: async (req, res) => {
    try {
      // exclude password field and populate trainings
      const users = await User.find().select("-password").populate("trainings");

      res.status(200).json({ success: true, employees: users });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get user by id
  getUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      // exclude password field and populate trainings
      const user = await User.findById(userId)
        .select("-password")
        .populate("trainings");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // update user
  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      let updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });

      // exclude password field
      updatedUser.password = undefined;

      res.status(200).json({
        success: true,
        user: updatedUser,
        message: "User updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // delete user
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // move user to resigned employees collection before deleting
      await ResignedEmployees.create({
        name: user.name,
        email: user.email,
        role: user.role,
        baseSalary: user.baseSalary,
        allowance: user.allowance,
        designation: user.designation,
        department: user.department,
        skillLevel: user.skillLevel,
        document: user.document,
        photo: user.photo,
        resignedAt: new Date(),
      });

      let deletedUser = await User.findByIdAndDelete(userId);

      // exclude password field
      deletedUser.password = undefined;

      res.status(200).json({
        success: true,
        user: deletedUser,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get users count using aggregation
  getUsersCount: async (req, res) => {
    try {
      const usersCount = await User.aggregate([
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ]);

      res.status(200).json({ success: true, count: usersCount[0]?.count || 0 });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get resigned employees
  getResignedEmployees: async (req, res) => {
    try {
      const resignedEmployees = await ResignedEmployees.find();

      res.status(200).json({ success: true, resignedEmployees });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get resigned employees count using aggregation
  getResignedEmployeesCount: async (req, res) => {
    try {
      const resignedEmployeesCount = await ResignedEmployees.aggregate([
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ]);

      res.status(200).json({
        success: true,
        count: resignedEmployeesCount[0]?.count || 0,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // add training to user
  addTrainingToUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const { training } = req.body;
      console.log(training);

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // check if training already exists in user's trainings
      const isTrainingExists = user.trainings.includes(training);

      if (isTrainingExists) {
        return res.status(400).json({
          success: false,
          message: "Training already exists in user's trainings",
        });
      }

      user.trainings.push(training);

      await user.save();

      res.status(200).json({
        success: true,
        user,
        message: "Training added to user successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },
};

module.exports = userController;

require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User_HR");
const USER_ROLES = require("../constants_HR/roles_HR");
const { z } = require("zod");
const sendEmail = require("../util_HR/sendEmail_HR");
const welcomeEmailTemplate = require("../util_HR/email_templates/welcomeEmailTemplate_HR");

const employeeSignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.enum(Object.values(USER_ROLES)),
  baseSalary: z.number(),
  allowance: z.number(),
  designation: z.string(),
  department: z.string(),
  skillLevel: z.string(),
  document: z.string(),
  photo: z.string(),
});

const authController = {
  employeeSignup: async (req, res) => {
    try {
      const {
        name,
        email,
        role,
        baseSalary,
        allowance,
        designation,
        department,
        skillLevel,
        document,
        photo,
      } = req.body;

      // validate request body
      employeeSignupSchema.parse(req.body);

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }

      // auto-generate password with 8 characters
      const password = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        baseSalary,
        allowance,
        designation,
        department,
        skillLevel,
        document,
        photo,
      });

      await newUser.save();

      // Send welcome email to the supplier
      const emailTemplate = welcomeEmailTemplate(name, email, password);
      //
      sendEmail(email, "Welcome to Selyn Clothes!", emailTemplate);

      res.status(201).json({
        success: true,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        message: "Employee created successfully",
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

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // check if user status is suspended
      if (user.status === "suspended") {
        return res.status(403).json({
          success: false,
          message: "Your account has been suspended. Please contact support",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          // expiresIn: "1h",
        }
      );

      res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
        message: "Logged in successfully",
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

module.exports = authController;

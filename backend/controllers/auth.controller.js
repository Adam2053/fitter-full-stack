import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import generateCookieAndSetToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  const { userName, password, confirmPassword, email } = req.body;

  try {
    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    if (password != confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    if (!userName || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      password: hashedPassword,
      email,
    });

    if (newUser) {
      generateCookieAndSetToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        success: true,
        message: "User Created Successfully",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Invalid User Data",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Unable to Sign Up: ${error.message}`,
    });
  }
};

export const login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      res.status(500).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    generateCookieAndSetToken(user._id, res);

    res.status(200).json({
      success: true,
      message: "User Logged In Successfully",
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Unable to Login: ${error.message}`,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      success: true,
      message: "User Logged Out Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to logout",
    });
  }
};

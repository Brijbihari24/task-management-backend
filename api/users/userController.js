import asyncHandler from "express-async-handler";
import generateToken from "../../utils/generateToken.js";
import sendEmail from "../../utils/mail.js";
import User from "./UserModel.js";
import { FORGET_PASSWORD_TEMPLATE } from "../../utils/template/ForgetPassword.js";
import jwt from "jsonwebtoken";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

// @desc    Forget Password
// @route   POST /api/users/
// @access  Public
const forgetUser = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      sendEmail({
        to: user.email,
        subject: `You have requested for password reset`,
        html: FORGET_PASSWORD_TEMPLATE({
          user: user,
          token: generateToken(user._id),
        }),
      });
      res.json({
        message:
          "Password reset email has been successfully sent to your email. Please check",
      });
    } else {
      res.status(404);
      throw new Error("Email Not found");
    }
  } catch (error) {
    console.log(error);
    res.status(404);
    throw new Error("Email Not found");
  }
});
const resetUser = asyncHandler(async (req, res) => {
  try {
    const { password, token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded", decoded);
    const user = await User.findById(decoded.id).select("-password");

    if (user) {
      if (password) {
        user.password = password;
      }

      const updatedUser = await user.save();

      res.json({
        message: "Password reset successfully",
      });
    } else {
      res.status(404);
      throw new Error("Password Reset Request expired. Please try again later");
    }
  } catch (error) {
    console.log(error);
    res.status(404);
    throw new Error("Email Not found");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);

      console.log("userExists-", userExists);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      username: email,
      email,
      password,
      phone,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Invalid user data");
  }
  // console.log(req.body);

});
const registerVendor = asyncHandler(async (req, res) => {
  try {
    const { name, phone, email, password, vendor } = req.body;

    const vendorExists = await User.findOne({ email });

    if (vendorExists) {
      res.status(400);

      console.log("userExists-", userExists);
      throw new Error("Vendor already exists");
    }

    const user = await User.create({
      name,
      username: email,
      email,
      password,
      phone,
      vendor,
      role: "VENDOR"
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,

        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Invalid user data");
  }
  // console.log(req.body);

});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(502);
    throw new Error("Something Went wrong");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.username = req.body.username || user.username;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        role: updatedUser.role,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    console.log(error);
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Create a lead
// @route   POST /api/leads
// @access  Private/Admin
const createUser = asyncHandler(async (req, res) => {
  var data = req.body;
  const user = new User(data);
  let createdUser = await user.save();

  res.status(201).json({
    _id: createdUser._id,
    name: createdUser.name,
    username: createdUser.username,
    email: createdUser.email,
    phone: createdUser.phone,
    address: createdUser.address,
    role: createdUser.role,
  });
});

export {
  authUser,
  registerUser,
  registerVendor,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  createUser,
  forgetUser,
  resetUser,
};

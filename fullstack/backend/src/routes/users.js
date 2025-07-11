const mongoose = require('mongoose');

// User Schema & Model
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  age: {
    type: Number,
    min: [0, 'Age must be positive'],
    max: [150, 'Age must be less than 150']
  },
  address: {
    type: String,
    trim: true
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt
});

const User = mongoose.model('User', UserSchema);

// CREATE - POST
const createNewUser = async (req, res) => {
  try {
    const { name, email, age, address } = req.body;
    
    // Validation
    if (!name || !email) {
      return res.status(400).json({
        message: 'Name and email are required',
        data: null
      });
    }
    
    const newUser = new User({
      name,
      email,
      age,
      address
    });
    
    const savedUser = await newUser.save();
    
    res.status(201).json({
      message: 'CREATE new user success',
      data: savedUser
    });
  } catch (error) {
    console.error('Create user error:', error);
    
    if (error.code === 11000) {
      // Duplicate email error
      res.status(409).json({
        message: 'Email already exists',
        data: null
      });
    } else if (error.name === 'ValidationError') {
      // Validation error
      const errors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({
        message: 'Validation failed',
        errors: errors,
        data: null
      });
    } else {
      res.status(500).json({
        message: 'Server error',
        serverMessage: error.message,
        data: null
      });
    }
  }
};

// READ - GET ALL
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }); // Sort by newest first
    
    res.json({
      message: 'GET all users success',
      data: users,
      total: users.length
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      message: 'Server error',
      serverMessage: error.message,
      data: null
    });
  }
};

// READ BY ID - GET
const getUserById = async (req, res) => {
  try {
    const { idUser } = req.params;
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(idUser)) {
      return res.status(400).json({
        message: 'Invalid user ID format',
        data: null
      });
    }
    
    const user = await User.findById(idUser);
    
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        data: null
      });
    }
    
    res.json({
      message: 'GET user by ID success',
      data: user
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({
      message: 'Server error',
      serverMessage: error.message,
      data: null
    });
  }
};

// UPDATE - PATCH
const updateUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const { name, email, age, address } = req.body;
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(idUser)) {
      return res.status(400).json({
        message: 'Invalid user ID format',
        data: null
      });
    }
    
    // Create update object with only provided fields
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (age !== undefined) updateData.age = age;
    if (address !== undefined) updateData.address = address;
    
    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: 'No fields to update',
        data: null
      });
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      idUser,
      updateData,
      { 
        new: true, // Return updated document
        runValidators: true // Run schema validators
      }
    );
    
    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found',
        data: null
      });
    }
    
    res.json({
      message: 'UPDATE user success',
      data: updatedUser
    });
  } catch (error) {
    console.error('Update user error:', error);
    
    if (error.code === 11000) {
      // Duplicate email error
      res.status(409).json({
        message: 'Email already exists',
        data: null
      });
    } else if (error.name === 'ValidationError') {
      // Validation error
      const errors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({
        message: 'Validation failed',
        errors: errors,
        data: null
      });
    } else {
      res.status(500).json({
        message: 'Server error',
        serverMessage: error.message,
        data: null
      });
    }
  }
};

// DELETE - DELETE
const deleteUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(idUser)) {
      return res.status(400).json({
        message: 'Invalid user ID format',
        data: null
      });
    }
    
    const deletedUser = await User.findByIdAndDelete(idUser);
    
    if (!deletedUser) {
      return res.status(404).json({
        message: 'User not found',
        data: null
      });
    }
    
    res.json({
      message: 'DELETE user success',
      data: deletedUser
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      message: 'Server error',
      serverMessage: error.message,
      data: null
    });
  }
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
import User from "../models/UsersModel.js";
import generateToken from '../utils/generateToken.js'
// Import the necessary modules and dependencies
import asyncHandler from '../middleware/asyncHandler.js';

// Controller function for authenticating a user (POST /api/users/login)
const authUser = asyncHandler(async (req, res) => {
  const{email,password}=req.body
  const user = await User.findOne({email})
  if(user &&(await user.matchPassword(password))){
     generateToken(res, user._id)
   res.json({
    _id:user._id,
    name:user.name,
    email:user.email,
    isAdmin:user.isAdmin
   })
  }else{
   res.status(401)
   throw new Error(`Invalid email or password`)
  }
 
});

// Controller function for registering a new user (POST /api/users/)
const registerUser = asyncHandler(async (req, res) => {
  const{name,password,email}= req.body
  const userExists = await User.findOne({email})
  if(userExists){
    res.status(400)
    throw new Error("User exists")
  }
  const user = await User.create({
    name,
    email,
    password
  })
  if(user){
     generateToken(res, user._id)
    res.status(201).json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin
    })
  }else{
    res.status(400)
    throw new Error("Invalid user data")
  }
});

// Controller function for logging out a user (POST /api/users/logout)
const logoutUser = asyncHandler(async (req, res) => {
  
  res.cookie("jwt","",{
    httpOnly:true,
    expires:new Date()
  })
  res.status(200).json({message:"Logged out successfully"})
});

// Controller function for retrieving user profile information (GET /api/users/profile)
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error(`User not found`)
  }
})


// Controller function for updating user profile information (PUT /api/users/profile)
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error(`User not found`)
  }
})


// Controller function for retrieving a list of all users (GET /api/users)
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
})

// Controller function for retrieving a specific user by ID (GET /api/users/:id)
const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// Controller function for deleting a user (DELETE /api/users/:id)
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    if (user.isAdmin) {
      res.status(400)
      throw new Error('Cant delete admin user')
    }
    await User.deleteOne({ _id: user._id })
    res.status(200).json({ message: 'User deleted successfully' })
  } else {
    res.status(404)
    throw new error('User not found')
  }
})
// Controller function for updating a user (PUT /api/users/:id)
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = Boolean(req.body.isAdmin)
    const updatedUser = await user.save()
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not  found')
  }
})

// Export the controller functions for use in other files
export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser
};

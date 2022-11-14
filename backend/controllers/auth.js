const User = require("../modal/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

const updateUser = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        use_filename: true,
        folder: "file-upload",
      }
    );
    fs.unlinkSync(req.files.image.tempFilePath);
    let image = { src: result.secure_url };
    image = image.src;
    const user = await User.findByIdAndUpdate(
      { _id: req.user.userId },
      { image: image },
      { new: true, runValidators: true }
    );
    return res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    console.log(error);
  }
};

const getCurrentUser = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const user = await User.findOne({ _id: userId });
  res.status(StatusCodes.OK).json({ user });
};

module.exports = { login, register, getCurrentUser, updateUser };

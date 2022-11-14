const { StatusCodes } = require("http-status-codes");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const User = require("../modal/User");

const uploadProductImage = async (req, res) => {
  console.log(req.files);
  // const result = await cloudinary.uploader.upload(req.files.image.teamFile, {
  //   use_filename: true,
  //   folder: "file-upload",
  // });
  // fs.unlinkSync(req.files.image.tempFilePath);
  // console.log(result);
  // console.log({ image: { src: result.secure_url } });
  // return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = uploadProductImage;
